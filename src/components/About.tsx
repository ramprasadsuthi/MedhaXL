import React from "react";
import { ShieldCheck, Target, Eye, Compass, Award, Building, Heart, Users, Calendar } from "lucide-react";
import { TRAINERS } from "../types";

export default function About() {
  const values = [
    {
      title: "Industry Aligned Excellence",
      desc: "Our courses are strictly structured on what enterprise giants require today. No obsolete content, just pure live engineering frameworks.",
      icon: <Target className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Real Client Labs",
      desc: "Through our parent software development wing, students work on real-time client software requirements, APIs, and automated test pipelines.",
      icon: <Building className="h-6 w-6 text-cyan-500" />
    },
    {
      title: "AI-Native Education",
      desc: "We integrate Gemini models into our LMS to provide students with 24/7 resume analyzers, roadmap simulators, and doubt solvers.",
      icon: <Award className="h-6 w-6 text-cyan-600" />
    },
    {
      title: "Continuous Mentoring",
      desc: "Every trainee receives weekly 1-on-1 calls with technical architects to trace coding errors, review git repositories, and guide career paths.",
      icon: <Users className="h-6 w-6 text-green-600" />
    }
  ];

  const timeline = [
    { year: "2018", title: "Local Consulting Firm", desc: "Started as an industry-focused QA test automation and Java web development consulting vendor." },
    { year: "2020", title: "Training Division Birth", desc: "Launched dedicated Java Enterprise and MERN Full Stack batches to address our internal hiring gaps." },
    { year: "2022", title: "100+ Partner Companies", desc: "Forged key placement tie-ups with TCS, Cognizant, Wipro, and high-growth Bangalore SaaS start-ups." },
    { year: "2024", title: "AI-Powered LMS Launch", desc: "Upgraded our platform with dynamic QR code verification, online sandbox editor, and server-side LLMs." },
    { year: "2026", title: "Industry Leader Status", desc: "Named among the top 10 premium IT training and consulting firms with 10,000+ graduates globally." }
  ];

  return (
    <div className="py-12 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 font-poppins">Discover Medha XL</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins tracking-tight text-gray-900 dark:text-white">
            We Build Engineers, Not Just Certificate Holders
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-500 dark:text-slate-400">
            Learn directly from active technical architects and project managers working on live software products.
          </p>
        </div>

        {/* Company Vision & Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-gradient-to-tr from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 p-6 sm:p-8 rounded-2xl border border-blue-100/50 dark:border-blue-900/20 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                To democratize premium, high-impact software engineering training. We aim to convert raw, traditional graduates into highly productive IT developers, SDET automation specialists, and cloud architects from Day 1 of their corporate onboarding.
              </p>
            </div>
            <div className="mt-6 border-t border-blue-200/40 pt-4 flex items-center gap-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Action Oriented Syllabus</span>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-cyan-50 to-white dark:from-slate-950 dark:to-slate-900 p-6 sm:p-8 rounded-2xl border border-cyan-100/50 dark:border-cyan-900/20 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white">Our Vision</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                To stand as the absolute global benchmark for industry-oriented technology incubation. We envision a future where MEDHA XL certificates represent guaranteed proof of actual operational engineering competencies and clean coding practices.
              </p>
            </div>
            <div className="mt-6 border-t border-cyan-200/40 pt-4 flex items-center gap-3">
              <span className="text-xs font-extrabold text-cyan-600 uppercase tracking-widest">Industry Aligned Outcomes</span>
            </div>
          </div>
        </div>

        {/* Founder message banner */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 sm:p-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl blur-md opacity-30 transform rotate-3" />
              <img
                src={TRAINERS[0].avatar}
                alt="Anil Kumar CEO"
                className="relative h-48 w-48 object-cover rounded-2xl border-4 border-white dark:border-slate-800 shadow-xl"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded">Founder's Vision</span>
            <blockquote className="text-base sm:text-lg font-medium italic text-gray-800 dark:text-slate-200">
              "Traditional colleges teach code written in textbooks 15 years ago. But modern DevOps pipelines, AWS architectures, microservices, and AI integrations demand practical, agile engineering reflexes. At MEDHA XL, you work on real project sprints, build actual services, and solve real bugs from day one. That is why our students succeed."
            </blockquote>
            <div>
              <p className="text-sm font-black text-gray-900 dark:text-white">Anil Kumar</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Founder, CEO & Principal Architect • MEDHA XL Group</p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">Our Core Pillars</h3>
            <p className="text-xs text-gray-500 mt-1">Four elements that define our high quality training culture</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl hover:border-blue-200 dark:hover:border-blue-900/50 shadow-sm transition-all duration-300">
                <div className="h-10 w-10 rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h4 className="text-sm font-black text-gray-900 dark:text-white mb-2">{v.title}</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Startup timeline / Achievements */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">Our Evolutionary Timeline</h3>
            <p className="text-xs text-gray-500 mt-1">Tracing our growth from local tech advisors to a trusted global training platform</p>
          </div>
          
          <div className="relative border-l border-gray-200 dark:border-gray-800 ml-4 md:ml-32 space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-6 md:pl-8">
                {/* Year tag left-aligned on desktop */}
                <div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900" />
                <div className="hidden md:block absolute right-full mr-8 top-0 text-right">
                  <span className="text-sm font-bold font-poppins text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full">{item.year}</span>
                </div>
                <div className="bg-gray-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 max-w-2xl hover:-translate-y-0.5 transition-all">
                  <span className="inline-block md:hidden text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-0.5 rounded-full mb-2">{item.year}</span>
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
