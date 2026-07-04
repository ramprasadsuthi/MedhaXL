import React, { useState } from "react";
import { GraduationCap, Award, Video, FileText, CheckCircle2, User, Calendar, BookOpen, AlertCircle, Play, ChevronRight, Upload, Sparkles, Send, RefreshCw, Trophy, ShieldAlert } from "lucide-react";
import { COURSES } from "../types";

export default function LMSPortal() {
  const [activeTab, setActiveTab] = useState<"overview" | "recorded" | "assignments" | "quiz" | "certificates">("overview");

  // Assignment states
  const [gitLink, setGitLink] = useState("");
  const [notesText, setNotesText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Certification States
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [studentName, setStudentName] = useState("Rohan Deshmukh");
  const [certificateCourse, setCertificateCourse] = useState("MERN Stack Web Development");

  // Play Video States
  const [playingVideo, setPlayingVideo] = useState({
    title: "Lesson 12: React State & Custom Hooks",
    url: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&auto=format&fit=crop&q=60"
  });

  // Quiz states
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const quizQuestions = [
    {
      q: "Which hook is used to optimize performance by memoizing computed values?",
      options: ["useEffect", "useMemo", "useCallback", "useContext"],
      answer: 1
    },
    {
      q: "What does the 'M' in MERN stack stand for?",
      options: ["MySQL", "MongoDB", "MariaDB", "Memory"],
      answer: 1
    },
    {
      q: "In Java Spring Boot, which annotation is used to create a Rest API controller?",
      options: ["@Controller", "@RestAPI", "@RestController", "@Service"],
      answer: 2
    },
    {
      q: "Which AWS resource is utilized to secure assets inside isolated network zones?",
      options: ["EC2", "VPC", "S3", "IAM"],
      answer: 1
    }
  ];

  // Handle Quiz selection
  const handleQuizAnswer = (optionIdx: number) => {
    if (quizSubmitted) return;
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentQuizIndex] = optionIdx;
    setSelectedAnswers(nextAnswers);
  };

  const calculateQuizScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) score += 25;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers([]);
    setQuizSubmitted(false);
    setCurrentQuizIndex(0);
    setQuizScore(0);
  };

  // Recorded Lessons list
  const lectures = [
    { id: "1", title: "Lesson 1: Introduction to ES6+ and functional closures", duration: "1h 15m", completed: true },
    { id: "2", title: "Lesson 2: Advanced Flexbox grids and responsive styling", duration: "1h 45m", completed: true },
    { id: "3", title: "Lesson 3: React Virtual DOM, reconciliation, and elements", duration: "1h 30m", completed: true },
    { id: "4", title: "Lesson 12: React State, Context APIs and Custom Hooks", duration: "2h 05m", completed: false },
    { id: "5", title: "Lesson 13: MongoDB modeling schemas, validations, and mongoose", duration: "1h 55m", completed: false },
    { id: "6", title: "Lesson 14: JWT session authentication & Spring Security", duration: "2h 10m", completed: false }
  ];

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gitLink) {
      alert("Please provide your assignment repository link.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="py-10 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* LMS Student Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-900/30">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/20 font-poppins">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-yellow-300" />
              Batch: MERN Stack #4 (Live Sprints)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-poppins tracking-tight flex items-center justify-center md:justify-start gap-2">
              Welcome Back, {studentName}!
            </h2>
            <p className="text-xs text-slate-300 max-w-lg">
              You are currently trailing at <strong className="text-green-400">95% attendance</strong> and completed 12 module topics. Keep up the momentum to trigger recruitment reviews!
            </p>
          </div>

          {/* Core metrics badges */}
          <div className="flex gap-4">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-center">
              <p className="text-2xl font-black text-cyan-400">12/14</p>
              <p className="text-[10px] uppercase font-bold text-slate-300 tracking-wide">Tasks Done</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-center">
              <p className="text-2xl font-black text-green-400">1st</p>
              <p className="text-[10px] uppercase font-bold text-slate-300 tracking-wide">LMS Rank</p>
            </div>
          </div>
        </div>

        {/* LMS Workspace Menu Tabs */}
        <div className="flex flex-wrap border-b border-slate-100 dark:border-slate-800 gap-1 pb-1">
          {[
            { id: "overview", label: "Dashboard Overview" },
            { id: "recorded", label: "Recorded Lectures" },
            { id: "assignments", label: "Assignment portal" },
            { id: "quiz", label: "Quiz Center" },
            { id: "certificates", label: "Digital Certificate" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 font-poppins ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- DYNAMIC TAB WORKSPACE --- */}
        <div className="bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl border border-gray-150 dark:border-gray-800/80 min-h-[400px]">

          {/* Tab 1: Dashboard Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Notifications and Badges */}
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Weekly live sprint notification */}
                <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-xl space-y-4">
                  <h4 className="text-xs font-bold font-poppins text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="h-4 w-4 text-blue-500" /> Current Batch Schedule
                  </h4>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-950/40 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest animate-pulse font-poppins">● Live Class Now Active</p>
                      <h5 className="text-sm font-bold font-poppins text-gray-900 dark:text-white mt-1">Docker Containerization Sprints</h5>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Suresh Pillai (DevOps Lead)</p>
                    </div>
                    <button
                      onClick={() => { setActiveTab("recorded"); }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 shadow"
                    >
                      Join Session
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Upcoming Lectures</p>
                    <div className="flex justify-between items-center text-xs border-b pb-2">
                      <span className="font-semibold text-gray-700 dark:text-slate-300">AWS ECS Deployments & Load Balancer</span>
                      <span className="text-gray-400">Tomorrow 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-gray-700 dark:text-slate-300">Kubernetes Clusters, Pods, and Services</span>
                      <span className="text-gray-400">Monday 7:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Gamification Achievements */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-xl space-y-4">
                  <h4 className="text-xs font-bold font-poppins text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-yellow-500" /> Active Badges & Streaks
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-slate-950 p-2.5 rounded-xl border text-center space-y-1">
                      <div className="h-10 w-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto text-sm font-black">🔥 12</div>
                      <p className="text-[10px] font-extrabold">Sprint Streak</p>
                      <p className="text-[9px] text-gray-400">12 Days Active</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-950 p-2.5 rounded-xl border text-center space-y-1">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-sm font-black">💻</div>
                      <p className="text-[10px] font-extrabold">Code Warrior</p>
                      <p className="text-[9px] text-gray-400">Clean code loops</p>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-tr from-yellow-50 to-amber-50 dark:from-slate-950 dark:to-slate-900 border border-yellow-100/50 rounded-xl">
                    <p className="text-[10px] font-black text-yellow-600 uppercase tracking-wider">Next Reward</p>
                    <p className="text-xs text-gray-700 dark:text-slate-300 mt-1">Submit your Docker portfolio to earn the <strong className="font-semibold">DevOps Alchemist</strong> badge.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Recorded Lectures & Player */}
          {activeTab === "recorded" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-12 gap-6 items-start">
                
                {/* Lessons Sidebar */}
                <div className="md:col-span-5 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold font-poppins text-gray-400 uppercase tracking-wider">Curriculum Lecture Streams</h4>
                  <div className="space-y-1 max-h-[350px] overflow-y-auto">
                    {lectures.map((lec) => (
                      <button
                        key={lec.id}
                        onClick={() => setPlayingVideo({ title: lec.title, url: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&auto=format&fit=crop&q=60" })}
                        className="flex items-center justify-between text-left p-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 w-full rounded-lg text-xs"
                      >
                        <div className="space-y-0.5">
                          <p className="font-semibold text-gray-800 dark:text-slate-200 line-clamp-1">{lec.title}</p>
                          <p className="text-[10px] text-gray-400">{lec.duration}</p>
                        </div>
                        {lec.completed ? (
                          <span className="text-green-500 font-extrabold text-[10px] uppercase">Finished</span>
                        ) : (
                          <Play className="h-4 w-4 text-blue-500 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Player screen */}
                <div className="md:col-span-7 space-y-4">
                  <div className="aspect-video w-full rounded-xl bg-slate-950 relative overflow-hidden flex flex-col justify-end p-6 border">
                    <img src={playingVideo.url} alt="Video cover" className="absolute inset-0 h-full w-full object-cover opacity-20" />
                    
                    {/* Centered large play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="h-14 w-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-105">
                        <Play className="h-6 w-6 fill-current ml-1" />
                      </button>
                    </div>

                    <div className="relative z-10 space-y-1 text-white bg-slate-900/60 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-[9px] font-bold text-blue-400 uppercase tracking-wider font-poppins">LMS Player Active</p>
                      <h4 className="text-xs sm:text-sm font-bold font-poppins">{playingVideo.title}</h4>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Assignment portal */}
          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 space-y-5">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider">LMS Coding Task Submission</h3>
                  <p className="text-xs text-gray-500">Provide your repository links to initiate peer and AI static code reviews.</p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleAssignmentSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-400 uppercase tracking-wider mb-1">Select Task Unit</label>
                      <select className="w-full rounded-lg border p-2.5 outline-none bg-gray-50 dark:border-gray-800 dark:bg-slate-950">
                        <option>Assignment 12: React Custom hooks state persistence</option>
                        <option>Assignment 13: Mongoose schema and index modeling</option>
                        <option>Assignment 14: Spring Security JWT Authentication</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-400 uppercase tracking-wider mb-1">Git Repository / Portfolio URL</label>
                      <input
                        type="url"
                        required
                        value={gitLink}
                        onChange={(e) => setGitLink(e.target.value)}
                        placeholder="https://github.com/yourprofile/medhaxl-task"
                        className="w-full rounded-lg border p-2.5 outline-none bg-gray-50 dark:border-gray-800 dark:bg-slate-950"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-400 uppercase tracking-wider mb-1">Implementation Notes / Comments (Optional)</label>
                      <textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        rows={3}
                        placeholder="Detail any specific deployment steps or bugs you encountered..."
                        className="w-full rounded-lg border p-3 outline-none bg-gray-50 dark:border-gray-800 dark:bg-slate-950"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 shadow"
                    >
                      <Upload className="h-4 w-4" /> Submit Coding Portfolio
                    </button>
                  </form>
                ) : (
                  <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-xl border border-green-100 dark:border-green-900/20 text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto" />
                    <h4 className="text-sm font-bold font-poppins text-gray-900 dark:text-white">Portfolio Submitted Successfully!</h4>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                      Your GitHub code at <code className="text-blue-600 dark:text-blue-400 font-mono text-[10px]">{gitLink}</code> is queued for review. Our Technical Team and AI Code Mentor will evaluate within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setGitLink(""); }}
                      className="mt-4 px-4 py-2 border rounded-lg text-xs font-bold hover:bg-gray-50 dark:border-gray-800"
                    >
                      Submit Another Assignment
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Quiz Center */}
          {activeTab === "quiz" && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                
                <div className="flex justify-between items-center border-b pb-3 text-xs">
                  <span className="font-bold text-gray-400 uppercase tracking-wider font-poppins">Weekly IT Evaluation Sprints</span>
                  <span className="text-blue-600 font-bold font-poppins">Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
                </div>

                {!quizSubmitted ? (
                  <div className="space-y-4">
                    <p className="text-sm font-extrabold text-gray-900 dark:text-white leading-relaxed">
                      {quizQuestions[currentQuizIndex].q}
                    </p>

                    <div className="grid gap-2">
                      {quizQuestions[currentQuizIndex].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleQuizAnswer(oIdx)}
                          className={`w-full p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                            selectedAnswers[currentQuizIndex] === oIdx
                              ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-950/30"
                              : "border-gray-150 bg-gray-50/50 hover:bg-gray-100 dark:border-gray-800 dark:bg-slate-950"
                          }`}
                        >
                          <span className="inline-block h-5 w-5 bg-white dark:bg-slate-900 border text-center rounded-md font-bold mr-2 text-[10px] leading-5">{String.fromCharCode(65 + oIdx)}</span>
                          {opt}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between pt-4 mt-2 border-t">
                      <button
                        disabled={currentQuizIndex === 0}
                        onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)}
                        className="px-4 py-2 border rounded-xl text-xs font-bold disabled:opacity-45"
                      >
                        Previous
                      </button>

                      {currentQuizIndex < quizQuestions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
                          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          onClick={calculateQuizScore}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-xs font-bold"
                        >
                          Finish Quiz
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 space-y-4 animate-fadeIn">
                    <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Award className="h-7 w-7" />
                    </div>
                    <h4 className="text-base font-bold font-poppins text-gray-900 dark:text-white">Weekly evaluation Completed!</h4>
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400">Score: {quizScore}%</p>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                      {quizScore >= 75
                        ? "🎉 Excellent job! You scored above average and earned the 'Theory Whiz' certification mark!"
                        : "Good try! Review your syllabus logs and recorded sessions to improve on subsequent attempts."}
                    </p>
                    <button
                      onClick={handleResetQuiz}
                      className="px-5 py-2 border rounded-xl text-xs font-bold hover:bg-gray-50 dark:border-gray-800 inline-flex items-center gap-1.5"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Retake Evaluation
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 5: Digital Certificates with Custom QR block */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 space-y-5">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider">Medha XL Certified Credentials</h3>
                  <p className="text-xs text-gray-500">Trainees completing all tasks can claim their digital опыта experience letters.</p>
                </div>

                {!certificateGenerated ? (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-400 uppercase mb-1">Confirm Student Name</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full rounded-lg border p-2 text-xs outline-none bg-gray-50 dark:border-gray-800 dark:bg-slate-950 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-400 uppercase mb-1">Choose Completed Domain Track</label>
                      <select
                        value={certificateCourse}
                        onChange={(e) => setCertificateCourse(e.target.value)}
                        className="w-full rounded-lg border p-2 text-xs outline-none bg-gray-50 dark:border-gray-800 dark:bg-slate-950 font-semibold"
                      >
                        <option value="MERN Stack Web Development">MERN Stack Web Development</option>
                        <option value="Java Full Stack Enterprise">Java Full Stack Enterprise</option>
                        <option value="SDET QA Test Automation">SDET Automation Testing</option>
                        <option value="Cloud DevOps Architect">Cloud DevOps Architect</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setCertificateGenerated(true)}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl text-xs hover:opacity-90 shadow flex items-center justify-center gap-1.5"
                    >
                      <Award className="h-4.5 w-4.5" /> Generate Digital Certificate & QR
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    {/* The Certificate itself */}
                    <div className="border-[10px] border-double border-slate-900 p-8 bg-amber-50/20 text-center relative rounded-sm dark:bg-slate-950 dark:border-amber-800/40">
                      {/* Decorative elements */}
                      <div className="absolute top-2 left-2 text-slate-300 font-black uppercase text-[10px] font-poppins">MEDHA XL</div>
                      <div className="absolute bottom-2 right-2 text-slate-300 font-black uppercase text-[10px] font-poppins font-mono">VERIFIED CREDENTIALS</div>

                      <div className="space-y-4">
                        <GraduationCap className="h-10 w-10 text-blue-600 mx-auto" />
                        <h4 className="font-poppins text-xl font-bold tracking-wide uppercase text-slate-900 dark:text-white">Certificate of Achievement</h4>
                        <p className="text-[10px] text-gray-400 italic">This experience credential is proudly conferred to</p>
                        
                        <p className="font-serif text-2xl font-black text-blue-700 dark:text-blue-400 underline decoration-double underline-offset-4 py-1">{studentName}</p>
                        
                        <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                          for successfully completing 350+ classroom sprint hours, comprehensive portfolio task submissions, and simulated HR mock interviews in 
                          <strong className="text-slate-900 dark:text-white block font-extrabold mt-1">{certificateCourse}</strong>
                        </p>

                        <div className="flex justify-between items-end pt-6 border-t border-gray-100 dark:border-gray-800/80">
                          {/* QR Verification block */}
                          <div className="flex items-center gap-3 text-left">
                            <div className="h-14 w-14 bg-white border p-1 rounded shrink-0 relative flex items-center justify-center">
                              {/* Pixelated QR simulation */}
                              <div className="grid grid-cols-5 gap-0.5 w-full h-full bg-slate-900 p-1">
                                {Array.from({ length: 25 }).map((_, i) => (
                                  <div key={i} className={`rounded-sm ${i % 3 === 0 || i % 7 === 0 ? "bg-white" : "bg-slate-900"}`} />
                                ))}
                              </div>
                            </div>
                            <div className="text-[9px] text-gray-400">
                              <p className="font-bold text-slate-800 dark:text-slate-300">SYSTEM VERIFIED</p>
                              <p>ID: MXL-{Math.floor(100000 + Math.random() * 900000)}</p>
                              <p>Scan code for logs</p>
                            </div>
                          </div>

                          <div className="text-right text-[10px] space-y-0.5">
                            <p className="font-serif font-bold text-slate-900 dark:text-white">Anil Kumar</p>
                            <p className="text-gray-400">MEDHA XL Governing Director</p>
                            <p className="text-gray-400 font-mono text-[9px]">{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end text-xs">
                      <button
                        onClick={() => setCertificateGenerated(false)}
                        className="px-4 py-2 border rounded-xl hover:bg-gray-50 dark:border-gray-850"
                      >
                        Regenerate / Edit Name
                      </button>
                      <button
                        onClick={() => alert("Digital copy saved to browser local store. Share link via LinkedIn.")}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
