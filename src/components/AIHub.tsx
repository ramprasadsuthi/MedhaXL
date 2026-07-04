import React, { useState } from "react";
import { Sparkles, ArrowRight, ClipboardCopy, Send, Loader2, BrainCircuit, UserCheck, Code2, AlertTriangle, HelpCircle, CheckCircle2, Award, Zap } from "lucide-react";

export default function AIHub() {
  const [activeSubTab, setActiveSubTab] = useState<"counselor" | "resume" | "doubt" | "interview">("counselor");
  const [loading, setLoading] = useState(false);

  // 1. Career Counselor State
  const [background, setBackground] = useState("Mechanical Engineering graduate, knows basic HTML & C programming.");
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [counselorResult, setCounselorResult] = useState<any | null>(null);

  // 2. Resume Analyzer State
  const [resumeText, setResumeText] = useState(
    "Name: Rohan Deshmukh\nSkills: HTML, CSS, Javascript, Core Java.\nExperience: Intern at local software firm for 3 months. Worked on web layouts.\nInterests: Frontend Development."
  );
  const [targetAnalysisRole, setTargetAnalysisRole] = useState("MERN Stack Developer");
  const [resumeResult, setResumeResult] = useState<any | null>(null);

  // 3. Doubt Assistant State
  const [topic, setTopic] = useState("React");
  const [question, setQuestion] = useState("How does the dependency array in useEffect trigger re-renders, and why are primitive values preferred?");
  const [doubtResult, setDoubtResult] = useState<string>("");

  // 4. Interview Simulator State
  const [domain, setDomain] = useState("MERN Stack Web Development");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "assistant" | "user"; text: string }>>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  // API Call: Career Counselor
  const handleCounselorSubmit = async () => {
    if (!background.trim() || !targetRole.trim()) return;
    setLoading(true);
    setCounselorResult(null);
    try {
      const response = await fetch("/api/ai/counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ background, targetRole }),
      });
      const data = await response.json();
      setCounselorResult(data);
    } catch (err) {
      console.error(err);
      alert("Error generating career plan. Please make sure the backend is active.");
    } finally {
      setLoading(false);
    }
  };

  // API Call: Resume Analyzer
  const handleResumeSubmit = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setResumeResult(null);
    try {
      const response = await fetch("/api/ai/resume-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetRole: targetAnalysisRole }),
      });
      const data = await response.json();
      setResumeResult(data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  // API Call: Doubt Solver
  const handleDoubtSubmit = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setDoubtResult("");
    try {
      const response = await fetch("/api/ai/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, question }),
      });
      const data = await response.json();
      setDoubtResult(data.answer);
    } catch (err) {
      console.error(err);
      setDoubtResult("Failed to retrieve an answer from your AI Mentor. Check backend terminal logs.");
    } finally {
      setLoading(false);
    }
  };

  // Interview simulator start & turn processing
  const handleStartInterview = async () => {
    setLoading(true);
    setInterviewStarted(true);
    setChatMessages([]);
    try {
      const introPrompt = `You are a strict technical recruiter evaluating a student. Start a mock technical interview for a candidates applying for a ${difficulty}-level ${domain} position. Ask a brief first core interview question directly to start. Do not output conversational preamble. Just output the question.`;
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: introPrompt }),
      });
      const data = await res.json();
      setChatMessages([{ role: "assistant", text: data.text }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendAnswer = async () => {
    if (!currentAnswer.trim()) return;
    const userMsg = currentAnswer;
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setCurrentAnswer("");
    setLoading(true);

    try {
      const prompt = `You are a recruiter evaluating a student. The student is answering the question for a ${difficulty}-level ${domain} position. Here is their response: "${userMsg}". Briefly evaluate if their answer is correct (1 sentence), provide a tiny tip (1 sentence), and ask the next follow-up interview question (1 sentence).`;
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: "assistant", text: data.text }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold dark:bg-cyan-950/40 dark:border-cyan-900/40 dark:text-cyan-300 font-poppins">
            <Sparkles className="h-3.5 w-3.5 animate-spin text-cyan-500" />
            <span>Medha XL AI Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins tracking-tight text-gray-900 dark:text-white">
            AI-Powered Career & Learning Workspace
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-500 dark:text-slate-400">
            Real server-side intelligence designed to recommend personalized career roadmaps, analyze resumes, simulate recruiters, and resolve student doubts.
          </p>
        </div>

        {/* AI Segment Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <button
            onClick={() => { setActiveSubTab("counselor"); setDoubtResult(""); setCounselorResult(null); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all font-poppins ${
              activeSubTab === "counselor"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-500 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <BrainCircuit className="h-4 w-4" /> AI Career Advisor
          </button>
          <button
            onClick={() => { setActiveSubTab("resume"); setDoubtResult(""); setResumeResult(null); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all font-poppins ${
              activeSubTab === "resume"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-500 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <UserCheck className="h-4 w-4" /> AI Resume Analyzer
          </button>
          <button
            onClick={() => { setActiveSubTab("doubt"); setDoubtResult(""); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all font-poppins ${
              activeSubTab === "doubt"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-500 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <HelpCircle className="h-4 w-4" /> AI Doubt Solver
          </button>
          <button
            onClick={() => { setActiveSubTab("interview"); setInterviewStarted(false); setChatMessages([]); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all font-poppins ${
              activeSubTab === "interview"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-500 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <Code2 className="h-4 w-4" /> AI Interview Simulator
          </button>
        </div>

        {/* AI SUBTAB CONTENT BLOCKS */}
        <div className="bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/80 min-h-[400px]">

          {/* 1. Career Counselor Block */}
          {activeSubTab === "counselor" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider">Configure Counselor</h3>
                  
                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Your Educational & Professional Background</label>
                    <textarea
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs outline-none focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                      placeholder="e.g. Commerce graduate, basic math knowledge, wants a career change..."
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Desired IT Career Goal</label>
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                    >
                      <option value="Full Stack Developer">Full Stack Developer (React / Spring Boot)</option>
                      <option value="DevOps & Cloud Engineer">DevOps & Cloud Architect</option>
                      <option value="QA SDET Automation Engineer">QA SDET Automation Specialist</option>
                      <option value="AI / Data Analytics Specialist">AI / Business Intelligence Analyst</option>
                    </select>
                  </div>

                  <button
                    onClick={handleCounselorSubmit}
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Analyze Profile & Generate Study Roadmap
                  </button>
                </div>

                {/* Result Section */}
                <div className="space-y-4">
                  {counselorResult ? (
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-poppins">Recommended Program</p>
                          <h4 className="text-base font-bold font-poppins text-gray-900 dark:text-white">{counselorResult.recommendedCourse}</h4>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/40 p-2 rounded-xl text-center">
                          <p className="text-[9px] font-black text-green-500 uppercase tracking-wider leading-none">Match Score</p>
                          <p className="text-xl font-extrabold text-green-600 dark:text-green-400 leading-none mt-1">{counselorResult.matchScore}%</p>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-100/30">
                        <strong>Advisor Assessment:</strong> {counselorResult.reasoning}
                      </div>

                      {/* Milestones rendering */}
                      <div className="space-y-3 pt-2 border-t">
                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Weekly Curriculum Milestones</p>
                        <div className="relative border-l border-blue-200/50 dark:border-slate-800 ml-2 space-y-3.5">
                          {counselorResult.milestones.map((mile: any, idx: number) => (
                            <div key={idx} className="relative pl-5">
                              <div className="absolute top-1 -left-1 h-2.5 w-2.5 rounded-full bg-blue-600 border border-white" />
                              <h5 className="text-xs font-bold text-gray-900 dark:text-white">{mile.phase}</h5>
                              <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-snug mt-0.5">{mile.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t flex items-center gap-2 text-[11px] text-gray-500 dark:text-slate-400">
                        <Zap className="h-4 w-4 text-yellow-500 shrink-0" />
                        <span><strong>Hiring Insight:</strong> {counselorResult.industryInsight}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400 min-h-[300px]">
                      <BrainCircuit className="h-12 w-12 mb-3 text-slate-300 animate-pulse" />
                      <p className="text-sm font-semibold">Your study roadmaps will render here.</p>
                      <p className="text-xs text-gray-500 max-w-sm mt-1">Configure your academic background and desired career tracks on the left to receive customized milestone directions.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. Resume Analyzer Block */}
          {activeSubTab === "resume" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider">Configure Analyzer</h3>
                  
                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Target IT Job Title</label>
                    <input
                      type="text"
                      value={targetAnalysisRole}
                      onChange={(e) => setTargetAnalysisRole(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-xs outline-none focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-950 dark:text-white font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Paste Your Resume Content / Text</label>
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      rows={6}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs outline-none focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-950 dark:text-white font-mono"
                    />
                  </div>

                  <button
                    onClick={handleResumeSubmit}
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Analyze Resume Credentials
                  </button>
                </div>

                {/* Results block */}
                <div className="space-y-4">
                  {resumeResult ? (
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase font-poppins">Analysis Outcome</p>
                          <h4 className="text-base font-bold font-poppins text-gray-900 dark:text-white">Target: {targetAnalysisRole}</h4>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950/40 p-2 rounded-xl text-center">
                          <span className="text-sm font-black text-blue-500">Score:</span>
                          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{resumeResult.score} / 100</span>
                        </div>
                      </div>

                      {/* Strengths */}
                      <div>
                        <p className="text-[10px] font-extrabold text-green-500 uppercase tracking-wider mb-1.5">Identified Strengths</p>
                        <ul className="space-y-1 text-xs">
                          {resumeResult.strengths.map((str: string, index: number) => (
                            <li key={index} className="flex gap-1.5 items-start text-gray-600 dark:text-slate-300">
                              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Improvements */}
                      <div>
                        <p className="text-[10px] font-extrabold text-amber-500 uppercase tracking-wider mb-1.5">Areas of Improvement</p>
                        <ul className="space-y-1 text-xs">
                          {resumeResult.improvements.map((imp: string, index: number) => (
                            <li key={index} className="flex gap-1.5 items-start text-gray-600 dark:text-slate-300">
                              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                              <span>{imp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Missing Keywords */}
                      <div>
                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">Missing Enterprise Keywords</p>
                        <div className="flex flex-wrap gap-1.5">
                          {resumeResult.keywordsMissing.map((kw: string, index: number) => (
                            <span key={index} className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 border border-red-100/50 dark:border-red-900/10 rounded">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Recruiter Verdict */}
                      <div className="pt-3 border-t text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">HR Reviewer Verdict:</strong> {resumeResult.finalVerdict}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400 min-h-[300px]">
                      <ClipboardCopy className="h-12 w-12 mb-3 text-slate-300 animate-pulse" />
                      <p className="text-sm font-semibold">Your resume reports will render here.</p>
                      <p className="text-xs text-gray-500 max-w-sm mt-1">Paste your current resume details and choose your target career profiles to check strength ratings and keywords mismatch.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 3. Doubt Solves Block */}
          {activeSubTab === "doubt" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-1 space-y-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider">Configure Doubt solver</h3>
                  
                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Subject Framework</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                    >
                      <option value="React & Next.js">React & Next.js</option>
                      <option value="Java Spring Boot">Java Spring Boot</option>
                      <option value="DevOps Container Pipelines">DevOps Container Pipelines</option>
                      <option value="QA Test Automation">QA Test Automation</option>
                      <option value="SQL databases & BI">SQL databases & BI</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Your Question / Bug</label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows={5}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs outline-none focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                      placeholder="e.g. How do I construct a composite key mapping in Hibernate ORM?"
                    />
                  </div>

                  <button
                    onClick={handleDoubtSubmit}
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    Submit Doubt to AI Mentor
                  </button>
                </div>

                {/* Output block */}
                <div className="md:col-span-2">
                  {doubtResult ? (
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-150/60 dark:border-gray-800 space-y-4 animate-fadeIn">
                      <div className="border-b pb-3 flex justify-between items-center">
                        <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-600 dark:bg-blue-950/40 rounded uppercase">{topic} Question</span>
                        <span className="text-[10px] text-gray-400">Response generated by Medha AI</span>
                      </div>
                      <div className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                        {doubtResult}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400 min-h-[350px] bg-white dark:bg-slate-900 rounded-xl border">
                      <HelpCircle className="h-12 w-12 mb-3 text-slate-300 animate-pulse" />
                      <p className="text-sm font-semibold">AI Doubt Solution Panel</p>
                      <p className="text-xs text-gray-500 max-w-sm mt-1">Submit your coding bug or curriculum questions on the left. The AI Tutor resolves queries instantly with code blocks and explanation templates.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. Interview Simulator Block */}
          {activeSubTab === "interview" && (
            <div className="space-y-6">
              {!interviewStarted ? (
                <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center space-y-4">
                  <div className="h-12 w-12 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-full flex items-center justify-center mx-auto">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white">Start Simulated Recruiter Interview</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Test your verbal/technical coding skills under stress. Choose your framework and difficulty. The simulator generates targeted HR/MNC interview questions, reviews your typed solutions, and offers continuous grades.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 text-left">
                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-400 uppercase mb-1">Target Subject Track</label>
                      <select
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full rounded-lg border p-2 text-xs outline-none bg-gray-50 dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                      >
                        <option value="MERN Stack Development">MERN Stack Web Dev</option>
                        <option value="Java Full Stack Enterprise">Java Enterprise (Spring Boot)</option>
                        <option value="SDET QA Test Automation">SDET QA Automation (Playwright)</option>
                        <option value="DevOps & Cloud Systems">DevOps & Cloud Systems (AWS)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-400 uppercase mb-1">Experience Level</label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full rounded-lg border p-2 text-xs outline-none bg-gray-50 dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                      >
                        <option value="Beginner">Junior Associate (0-2 Yrs)</option>
                        <option value="Intermediate">Senior Engineer (2-5 Yrs)</option>
                        <option value="Advanced">Technical Architect (5+ Yrs)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleStartInterview}
                    disabled={loading}
                    className="w-full py-3 bg-cyan-600 text-white font-bold rounded-xl text-xs hover:bg-cyan-700 transition-all flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Initialize Interview Boardroom
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-w-3xl mx-auto">
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Active Interview: {domain} ({difficulty})</span>
                    <button
                      onClick={() => setInterviewStarted(false)}
                      className="px-3 py-1 bg-red-50 text-red-600 dark:bg-red-950/40 rounded text-xs font-bold hover:underline"
                    >
                      Exit Room
                    </button>
                  </div>

                  {/* Message History */}
                  <div className="space-y-4 h-[350px] overflow-y-auto p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-150/60 dark:border-gray-800">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-3 max-w-[85%] ${
                          msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        }`}
                      >
                        <div
                          className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            msg.role === "user" ? "bg-blue-600 text-white" : "bg-cyan-600 text-white"
                          }`}
                        >
                          {msg.role === "user" ? "U" : "HR"}
                        </div>
                        <div
                          className={`p-3 rounded-xl text-xs leading-relaxed ${
                            msg.role === "user"
                              ? "bg-blue-500 text-white rounded-tr-none"
                              : "bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100 rounded-tl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex gap-2 items-center text-xs text-gray-400">
                        <Loader2 className="h-4.5 w-4.5 animate-spin text-cyan-600" />
                        <span>Recruiter is writing feedback / typing next question...</span>
                      </div>
                    )}
                  </div>

                  {/* Input form */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      placeholder="Type your technical response here..."
                      onKeyDown={(e) => { if (e.key === "Enter") handleSendAnswer(); }}
                      className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs outline-none focus:border-cyan-500 dark:border-gray-800 dark:bg-slate-900 dark:text-white"
                    />
                    <button
                      onClick={handleSendAnswer}
                      disabled={loading || !currentAnswer.trim()}
                      className="px-5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl disabled:opacity-40 transition-all flex items-center justify-center"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
