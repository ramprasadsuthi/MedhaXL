import React, { useState } from "react";
import { Play, Sparkles, CheckCircle2, ArrowRight, Video, Calendar, ArrowUpRight, GraduationCap } from "lucide-react";

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  onBookDemo: () => void;
}

export default function Hero({ setCurrentTab, onBookDemo }: HeroProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const stats = [
    { value: "25+", label: "Years Experience", description: "In Corporate & IT Consulting" },
    { value: "10,000+", label: "Students Trained", description: "With 95% satisfaction rates" },
    { value: "500+", label: "Placements", description: "In top tier MNC products & services" },
    { value: "150+", label: "Corporate Clients", description: "Custom upskilling initiatives" },
    { value: "100+", label: "Live Client Projects", description: "Sourced from our development wing" },
    { value: "95%", label: "Satisfaction Rate", description: "Voted by premium Google reviews" }
  ];

  const floatingTechnologies = [
    { name: "React 19", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", pos: "top-10 left-10" },
    { name: "Spring Boot", color: "bg-green-500/10 text-green-500 border-green-500/20", pos: "top-40 right-12" },
    { name: "AWS Cloud", color: "bg-orange-500/10 text-orange-500 border-orange-500/20", pos: "bottom-16 left-20" },
    { name: "Python ML", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", pos: "bottom-32 right-16" },
    { name: "Playwright SDET", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", pos: "top-2/3 left-4" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-16 lg:py-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      
      {/* Decorative background grid and ambient glows */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/5" />
      <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Textual Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/25 px-3 py-1 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] text-blue-600 dark:text-blue-300 font-bold uppercase tracking-widest font-poppins">AI-Powered Learning Platform</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins tracking-tight text-slate-900 dark:text-white leading-tight">
              Transform Your Career with <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Industry-Ready
              </span>{" "}
              IT Training
            </h1>

            {/* Secondary Subheading */}
            <p className="mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
              Master in-demand technologies with real-time enterprise projects, corporate internships, 
              <strong className="text-blue-600 dark:text-blue-400 font-semibold"> AI-powered workspace mentors</strong>, 
              placement drives, verified certifications, and 1-on-1 career support.
            </p>

            {/* Checkmark benefits */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> Live Mock Interviews
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> Official Experience Letter
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> Zero Cost EMI Options
              </span>
            </div>

            {/* CTA Button Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setCurrentTab("courses")}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                id="hero-enroll-now-btn"
              >
                Enroll Now <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onBookDemo}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                id="hero-book-demo-btn"
              >
                <Calendar className="h-4 w-4 text-blue-500" /> Book Free Demo
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1.5 hover:underline"
                id="hero-watch-stories-btn"
              >
                <Play className="h-3.5 w-3.5 fill-blue-600 dark:fill-blue-400" /> Watch Success Stories
              </button>
            </div>

            {/* Placement assurance trust banner */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-center lg:justify-start gap-3 flex-wrap">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Our Alumni Work at</span>
              <div className="flex items-center gap-4 text-sm font-extrabold text-gray-400 dark:text-slate-500">
                <span>TCS</span>
                <span>•</span>
                <span>Cognizant</span>
                <span>•</span>
                <span>Capgemini</span>
                <span>•</span>
                <span>Infosys</span>
                <span>•</span>
                <span>Wipro</span>
              </div>
            </div>

          </div>

          {/* Right: Immersive Laptop Mockup / Graphics */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 shadow-2xl ai-glow">
              <div className="w-full h-full rounded-xl bg-slate-900 overflow-hidden relative">
                
                {/* Simulated IDE inside the mockup */}
                <div className="absolute top-0 left-0 right-0 bg-slate-950 px-3 py-1.5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-[10px] text-slate-500 font-mono ml-2">medha_xl_lms_controller.ts</span>
                  </div>
                  <span className="text-[9px] text-slate-600 font-mono">100% Compiled</span>
                </div>
                
                {/* Simulated lines of code */}
                <div className="pt-10 px-4 font-mono text-[10px] text-slate-400 space-y-2 leading-relaxed select-none">
                  <p className="text-purple-400">import <span className="text-blue-300">{"{ MedhaXLStudent }"}</span> from <span className="text-green-400">"@medhaxl/core"</span>;</p>
                  <p className="text-purple-400">import <span className="text-blue-300">{"{ GeminiAssistant }"}</span> from <span className="text-green-400">"@google/genai"</span>;</p>
                  <p className="text-gray-500">// Initialize personalized mentoring</p>
                  <p><span className="text-blue-400">const</span> student = <span className="text-yellow-400">MedhaXLStudent</span>.getProfile();</p>
                  <p className="pl-4">student.<span className="text-cyan-400">setRoadmap</span>(<span className="text-purple-400">await</span> GeminiAssistant.<span className="text-yellow-400">buildStudyPlan</span>({"{"}</p>
                  <p className="pl-8">curriculum: <span className="text-green-400">"MERN Stack & AI Engineering"</span>,</p>
                  <p className="pl-8">placementStatus: <span className="text-orange-400">"Assured"</span></p>
                  <p className="pl-4">{"}"}));</p>
                  <p className="text-green-500 font-semibold">// Output: Ready to land 12 LPA Offer Letter!</p>
                </div>

                {/* Overlaid UI components to make it look highly high-tech */}
                <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-900/95 border border-blue-500/30 p-2.5 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <GraduationCap className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-900 dark:text-white">Live Mentorship</p>
                    <p className="text-[9px] font-bold text-green-500">Active: Dr. Srinivas Rao</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Float badges for decoration */}
            {floatingTechnologies.map((tech, idx) => (
              <div
                key={idx}
                className={`absolute hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border bg-white dark:bg-slate-900 font-mono text-xs font-semibold shadow-md ${tech.color} ${tech.pos}`}
              >
                <span className="h-2 w-2 rounded-full bg-current" />
                {tech.name}
              </div>
            ))}
          </div>

        </div>

        {/* Dynamic Statistics Grid */}
        <div className="mt-20 border-t border-gray-200/80 dark:border-gray-800/80 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/40 dark:bg-slate-900/40 border border-gray-100 dark:border-gray-800/40 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5 leading-snug">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Success Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 dark:bg-slate-900 shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Medha XL Student Success Journey
            </h3>
            {/* Embed video or nice high-fidelity screenshot message */}
            <div className="aspect-video bg-slate-950 rounded-xl relative flex flex-col items-center justify-center p-6 text-center text-white border border-gray-800">
              <Play className="h-12 w-12 text-blue-500 animate-pulse mb-3" />
              <p className="text-sm font-semibold">"How I went from 3 LPA to 12.4 LPA in 5 Months"</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Listen to Rohan Deshmukh describe his coding journey, how he utilized our custom AI Doubt Assistant and secured hiring interviews.
              </p>
              <button
                onClick={() => { setIsVideoModalOpen(false); setCurrentTab("courses"); }}
                className="mt-6 px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all"
              >
                Explore Syllabus Content
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

// Minimal missing component X placeholder inline for safety
function X(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
