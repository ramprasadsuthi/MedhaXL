import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI client securely on the server
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Secure Gemini AI Client initialized successfully.");
  } catch (err) {
    console.error("Error initializing Gemini AI Client:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined in environment variables. AI features will run in Demo/Mock fallback mode.");
}

// Helper to handle AI requests with fallback responses
async function generateAIContent(prompt: string, systemInstruction?: string, responseSchema?: any) {
  if (!ai) {
    throw new Error("Gemini API Key is missing. Please configure your GEMINI_API_KEY in the Secrets panel under Settings.");
  }

  const config: any = {};
  if (systemInstruction) {
    config.systemInstruction = systemInstruction;
  }
  if (responseSchema) {
    config.responseMimeType = "application/json";
    config.responseSchema = responseSchema;
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: config,
  });

  return response.text;
}

// --- API ROUTES ---

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiEnabled: !!ai, timestamp: new Date() });
});

// 1. AI Chat Assistant & General Chat
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // Elegant demo response if API key is not configured yet
      return res.json({
        text: `[Demo Mode] Welcome to MEDHA XL! I am your AI Assistant. It looks like the GEMINI_API_KEY is not configured yet in Settings > Secrets. Here is a simulated response to your question: "${message}". I can help you select the ideal tech course, write Java/React programs, draft resumes, or schedule a free live demo. Please configure the API key to try my full generative intelligence!`,
      });
    }

    const sysInstruction = "You are Medha, the expert AI Learning Assistant and Career Advisor for MEDHA XL, a top IT Training and Software Development firm. Guide students on courses (Java FS, MERN stack, DevOps, QA Automation, Data Analytics), live projects, and placements. Be professional, motivating, and brief.";
    const responseText = await generateAIContent(message, sysInstruction);
    res.json({ text: responseText });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: error.message || "AI failed to process chat" });
  }
});

// 2. AI Career Counselor & Roadmap Generator (Structured JSON Output)
app.post("/api/ai/counselor", async (req, res) => {
  try {
    const { background, targetRole } = req.body;
    if (!background || !targetRole) {
      return res.status(400).json({ error: "Background and targetRole are required" });
    }

    if (!ai) {
      // Simulated structural fallback response
      return res.json({
        recommendedCourse: "MERN Stack Web Development (AI-Powered)",
        matchScore: 92,
        reasoning: "Your background in basic logic matches excellently with the visual and structural nature of full-stack JavaScript. This high demand field will leverage your existing knowledge.",
        milestones: [
          { phase: "Week 1-4: Frontend Mastery", content: "Learn HTML5, CSS3, modern JavaScript (ES6+), and responsive layout designing with Tailwind CSS." },
          { phase: "Week 5-8: React Core Engine", content: "Master React components, state, hooks, APIs, and client-side page transitions." },
          { phase: "Week 9-12: Backend APIs", content: "Build RESTful microservices with Node.js, Express, JWT, and design relational/no-SQL databases." },
          { phase: "Week 13-16: Live Project Integration", content: "Develop an Enterprise Student LMS portal and learn continuous deployment with Git, Docker, and AWS." }
        ],
        industryInsight: "MERN full stack developers are highly sought after by product scaleups and corporate MNCs. Average starting salaries range from 6 LPA to 12 LPA."
      });
    }

    const systemInstruction = "You are a world-class IT Career Counselor. Analyze user background and generate a customized roadmap in JSON format matching the schema provided.";
    const prompt = `Analyze this user profile:\nBackground: ${background}\nDesired IT Target Role: ${targetRole}\nCreate a structured course recommendation and study roadmap.`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        recommendedCourse: { type: Type.STRING, description: "Name of the most matching Medha XL course" },
        matchScore: { type: Type.INTEGER, description: "Match score percentage out of 100" },
        reasoning: { type: Type.STRING, description: "Clear explanation why this is the perfect career choice" },
        milestones: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phase: { type: Type.STRING, description: "e.g. Phase 1: Weeks 1-4" },
              content: { type: Type.STRING, description: "What to learn and focus on" }
            },
            required: ["phase", "content"]
          }
        },
        industryInsight: { type: Type.STRING, description: "Current salary trends and hiring patterns for this role" }
      },
      required: ["recommendedCourse", "matchScore", "reasoning", "milestones", "industryInsight"]
    };

    const jsonText = await generateAIContent(prompt, systemInstruction, schema);
    if (!jsonText) throw new Error("Received empty response from Gemini");
    res.json(JSON.parse(jsonText));
  } catch (error: any) {
    console.error("AI Counselor Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate roadmap" });
  }
});

// 3. AI Resume Analyzer
app.post("/api/ai/resume-analyzer", async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: "Resume text is required" });
    }

    if (!ai) {
      return res.json({
        score: 75,
        strengths: ["Clean contact credentials", "Basic programming knowledge listed"],
        improvements: ["Missing modern frameworks (React/Spring Boot)", "No live cloud deployment metrics", "Needs industry keyword optimization"],
        keywordsMissing: ["TailwindCSS", "Git version control", "Agile SCRUM", "AWS Lambda"],
        finalVerdict: "Your resume represents a good starting block, but lacks the enterprise keywords and live project references needed to stand out to MNC recruiters. Enroll in our Internship Program to add live software engineer credentials."
      });
    }

    const systemInstruction = "You are an expert HR recruiter and Technical Resume Reviewer. Review the user's resume and target role, then output a structured analysis in JSON.";
    const prompt = `Resume Content: "${resumeText}"\nTarget Role: "${targetRole || "General Software Engineer"}"\nGrade the resume and suggest critical updates.`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: "Resume score out of 100" },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Strengths found in resume" },
        improvements: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Constructive improvements and corrections" },
        keywordsMissing: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Critical industry keywords or frameworks missing from resume" },
        finalVerdict: { type: Type.STRING, description: "Final verdict and advice on how to stand out" }
      },
      required: ["score", "strengths", "improvements", "keywordsMissing", "finalVerdict"]
    };

    const jsonText = await generateAIContent(prompt, systemInstruction, schema);
    if (!jsonText) throw new Error("Empty response from model");
    res.json(JSON.parse(jsonText));
  } catch (error: any) {
    console.error("Resume Analyzer Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze resume" });
  }
});

// 4. AI Coding Mentor & Code Compiler Simulator
app.post("/api/ai/code-mentor", async (req, res) => {
  try {
    const { code, language, problemStatement } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code content is required" });
    }

    if (!ai) {
      return res.json({
        output: "[Simulated Output] Code compiled with 0 warnings.\nProcess exited with status code 0.",
        status: "success",
        mentorFeedback: "Your code structure is clean! Please configure GEMINI_API_KEY to activate your continuous AI Coding Mentor who can perform deep static analysis, spot algorithmic bottlenecks, suggest optimizations, and explain runtime errors."
      });
    }

    const systemInstruction = "You are a friendly, expert Senior Developer and Coding Mentor. Review the code, output simulated compilation logs, and give actionable feedback.";
    const prompt = `Language: ${language || "JavaScript"}\nProblem: ${problemStatement || "General code snippet"}\nSource Code:\n\`\`\`${language}\n${code}\n\`\`\`\nEvaluate if it works, explain bugs if any, and provide a simulation output and a concise mentorship commentary.`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        output: { type: Type.STRING, description: "Simulated execution console output logs" },
        status: { type: Type.STRING, description: "success or error" },
        mentorFeedback: { type: Type.STRING, description: "Concise coding advice, optimization tips, or syntax corrections" }
      },
      required: ["output", "status", "mentorFeedback"]
    };

    const jsonText = await generateAIContent(prompt, systemInstruction, schema);
    if (!jsonText) throw new Error("Empty response from mentor");
    res.json(JSON.parse(jsonText));
  } catch (error: any) {
    console.error("Code Mentor Error:", error);
    res.status(500).json({ error: error.message || "Coding Mentor failed to review" });
  }
});

// 5. AI Doubt Assistant (Instant solution)
app.post("/api/ai/doubt", async (req, res) => {
  try {
    const { topic, question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (!ai) {
      return res.json({
        answer: `[Demo Mode] Regarding your doubt on "${topic || "General IT"}": "${question}". To resolve this, make sure to double check your syntax, verify imports, check your database configuration, and ensure your services are running. Configure the Gemini API key to receive comprehensive step-by-step solutions with diagrams, code comparisons, and expert explanations.`
      });
    }

    const systemInstruction = "You are an elite, patient Technical Trainer and Doubt assistant at Medha XL. Resolve the student's question clearly, provide clean code snippets if applicable, and offer brief debugging tips.";
    const prompt = `Topic: ${topic || "IT Core"}\nStudent Question: "${question}"\nResolve this doubt thoroughly with examples.`;

    const text = await generateAIContent(prompt, systemInstruction);
    res.json({ answer: text });
  } catch (error: any) {
    console.error("AI Doubt Error:", error);
    res.status(500).json({ error: error.message || "Failed to resolve doubt" });
  }
});

// --- VITE DEV / PROD HANDLER ---

async function startServer() {
  // Mount Vite middleware for development or serve dist assets for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files serving enabled.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MEDHA XL Web Application running on http://localhost:${PORT}`);
  });
}

startServer();
