import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Loader2, Sparkles, AlertCircle, CheckCircle2, FileCode, Terminal, HelpCircle } from "lucide-react";

export default function CodingPlayground() {
  const [language, setLanguage] = useState<"javascript" | "python" | "html" | "java">("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [mentorFeedback, setMentorFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Boilerplate Templates
  const templates = {
    javascript: `// Medha XL Javascript Sandbox
// Write a function to check if a string is a palindrome

function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleanStr.split('').reverse().join('');
  return cleanStr === reversed;
}

const testWord = "A man, a plan, a canal. Panama";
console.log("Is '" + testWord + "' a palindrome?");
console.log("Answer:", isPalindrome(testWord));
`,
    python: `# Medha XL Python Sandbox
# Write a function to find the factorial of a number

def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

test_num = 6
print(f"Factorial of {test_num} is: {factorial(test_num)}")
`,
    html: `<!-- Medha XL HTML Canvas -->
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 border">
  <div class="flex-shrink-0">
    <div class="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">XL</div>
  </div>
  <div>
    <div class="text-xs font-semibold text-gray-500 uppercase">Academy Hub</div>
    <p class="text-sm font-black text-gray-900">Welcome to Medha XL Code Sandboxes!</p>
  </div>
</div>
`,
    java: `// Medha XL Java Enterprise Playground
// Simple program to search an element in an array

import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 23, 4, 89, 7, 56};
        int target = 89;
        
        int index = searchArray(arr, target);
        System.out.println("Searching target: " + target);
        System.out.println("Element found at index: " + index);
    }
    
    public static int searchArray(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}
`
  };

  // Load template on language change
  useEffect(() => {
    setCode(templates[language]);
    setOutput("");
    setMentorFeedback("");
    setStatus("idle");
  }, [language]);

  // Submit Code to server-side AI Mentor
  const handleRunCode = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setOutput("");
    setMentorFeedback("");
    setStatus("idle");

    try {
      const response = await fetch("/api/ai/code-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problemStatement: `Execute code and verify correctness for ${language} track.`
        }),
      });

      const data = await response.json();
      setOutput(data.output);
      setStatus(data.status || "success");
      setMentorFeedback(data.mentorFeedback);
    } catch (err) {
      console.error(err);
      setOutput("[Compiler Error] System could not bind server resources to compile code. Review console logs.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Restore Template
  const handleResetCode = () => {
    setCode(templates[language]);
    setOutput("");
    setMentorFeedback("");
    setStatus("idle");
  };

  return (
    <div className="py-12 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold dark:bg-blue-950/40 dark:border-blue-900/40 dark:text-blue-300 font-poppins">
            <Terminal className="h-3.5 w-3.5" />
            <span>Medha XL Interactive Compiler Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins tracking-tight text-gray-900 dark:text-white">
            Enterprise Coding Playground
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-500 dark:text-slate-400">
            Write, compile, and run your algorithms right inside your browser window. Receive continuous optimization advice and structural bug tracing from our **Senior AI Mentor**.
          </p>
        </div>

        {/* IDE Layout Matrix */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Language selector and Code Editor */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-100 dark:border-slate-850 bg-slate-950 shadow-xl overflow-hidden min-h-[500px]">
            {/* Editor Header */}
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <FileCode className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-300">medha_sandbox_workspace</span>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e: any) => setLanguage(e.target.value)}
                  className="rounded bg-slate-850 px-2.5 py-1 text-xs font-bold text-slate-200 border border-slate-800 outline-none uppercase"
                >
                  <option value="javascript">JavaScript (Node)</option>
                  <option value="python">Python 3</option>
                  <option value="html">HTML5 Render</option>
                  <option value="java">Java (JDK 21)</option>
                </select>
                <button
                  onClick={handleResetCode}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                  title="Reset Sandbox template"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Editor TextArea */}
            <div className="flex-1 relative flex">
              {/* Line Numbers sidebar */}
              <div className="w-12 bg-slate-950 border-r border-slate-850/60 py-4 text-center select-none font-mono text-[11px] text-slate-600 leading-6 text-right pr-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-slate-950 p-4 font-mono text-[12px] text-green-400 outline-none resize-none leading-6 caret-white"
                spellCheck="false"
              />
            </div>

            {/* Run triggers block */}
            <div className="bg-slate-900 px-4 py-3 flex justify-between items-center border-t border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono font-medium">ESC to quit • Ctrl + Enter to run</span>
              <button
                onClick={handleRunCode}
                disabled={loading || !code.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 shadow transition-all transform active:scale-95"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                Run Code & Mentor
              </button>
            </div>
          </div>

          {/* Right Column: Console Output & AI Coding Mentor Feedback */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 1. Terminal Console Output */}
            <div className="flex flex-col rounded-2xl border border-slate-100 dark:border-slate-850 bg-slate-950 shadow-md h-52 overflow-hidden">
              <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-850">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-slate-400" /> Output Console
                </span>
                {status !== "idle" && (
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                    status === "success" ? "bg-green-950 text-green-400" : "bg-red-950 text-red-400"
                  }`}>
                    {status}
                  </span>
                )}
              </div>
              <div className="flex-1 p-4 font-mono text-[11px] text-slate-300 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {output ? output : "No execution logs yet. Click 'Run Code' to execute and trigger compiler evaluations."}
              </div>
            </div>

            {/* 2. AI Coding Mentor Explanation */}
            <div className="flex-1 flex flex-col rounded-2xl border border-slate-100 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 p-5 dark:from-slate-900 dark:to-slate-950 dark:border-slate-800 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <h4 className="text-sm font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider">AI Senior Code Mentor</h4>
              </div>

              {mentorFeedback ? (
                <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                  <div className="space-y-3">
                    <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                      {mentorFeedback}
                    </p>
                  </div>
                  <div className="border-t pt-3 mt-4 flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Always practice clean OOP design and memory profiling.</span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 p-6">
                  <HelpCircle className="h-10 w-10 mb-2 text-slate-300 animate-pulse" />
                  <p className="text-xs font-semibold">Static Analyzer Idle</p>
                  <p className="text-[10px] text-gray-500 max-w-xs mt-0.5">
                    Your AI Mentor is ready. Once you hit run, the system checks algorithm loops, identifies memory leakage, and comments on clean variable allocations.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
