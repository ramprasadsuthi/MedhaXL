import React, { useState } from "react";
import { 
  Users, CreditCard, Award, PhoneCall, CheckCircle2, TrendingUp, Calendar, 
  Trash2, Search, ArrowUpRight, BarChart3, AlertCircle, 
  BookOpen, Clock, Check, Plus, Send, Edit3, Settings, Sparkles, RefreshCw, X, GraduationCap, ChevronRight
} from "lucide-react";

interface AdminPanelProps {
  role?: "visitor" | "student" | "trainer" | "admin";
}

export default function AdminPanel({ role = "admin" }: AdminPanelProps) {
  const isTrainer = role === "trainer";

  // Trainer Hub Specific Tab State
  const [trainerActiveTab, setTrainerActiveTab] = useState<"batches" | "assignments" | "attendance" | "milestones">("batches");
  
  // Admin Panel Specific Tab State
  const [adminActiveTab, setAdminActiveTab] = useState<"students" | "leads" | "analytics" | "config">("students");

  // Mock Students Database (Shared context)
  const [students, setStudents] = useState([
    { id: "101", name: "Rohan Deshmukh", course: "MERN Stack Web Dev", attendance: "95%", fees: "Paid", tasks: "12/14", batchId: "B1" },
    { id: "102", name: "Aanya Verma", course: "Java Enterprise Full Stack", attendance: "98%", fees: "Pending", tasks: "14/14", batchId: "B2" },
    { id: "103", name: "Karthik Raja", course: "Cloud DevOps Architect", attendance: "92%", fees: "Paid", tasks: "11/14", batchId: "B3" },
    { id: "104", name: "Pooja Hegde", course: "SDET Automation Testing", attendance: "90%", fees: "Pending", tasks: "9/14", batchId: "B1" },
    { id: "105", name: "Siddharth Jain", course: "AI, ML & Prompt Engineering", attendance: "96%", fees: "Paid", tasks: "13/14", batchId: "B2" }
  ]);

  // Mock Leads Database
  const [leads, setLeads] = useState([
    { id: "L01", name: "Amit Sharma", phone: "+91 98765 43210", course: "MERN Stack", date: "July 3", status: "New Inquire" },
    { id: "L02", name: "Neha Patel", phone: "+91 87654 32109", course: "Java Full Stack", date: "July 3", status: "Follow up" },
    { id: "L03", name: "Rahul Deshpande", phone: "+91 76543 21098", course: "DevOps", date: "July 2", status: "Booked Demo" },
    { id: "L04", name: "Sneha Reddy", phone: "+91 65432 10987", course: "Automation Testing", date: "July 1", status: "Enrolled" }
  ]);

  // Trainer Batches / Cohorts State
  const [batches, setBatches] = useState([
    { id: "B1", title: "MERN Stack #4", timing: "Daily Evening 7-9 PM", trainer: "Anil Kumar", topic: "Docker orchestration", progress: 78, students: 28 },
    { id: "B2", title: "Java Full Stack #9", timing: "Weekend Batch 9-1 PM", trainer: "Dr. Srinivas Rao", topic: "Microservices JPA ORM", progress: 45, students: 32 },
    { id: "B3", title: "DevOps & Cloud #12", timing: "Weekend Batch 2-6 PM", trainer: "Suresh Pillai", topic: "Kubernetes LoadBalancer", progress: 15, students: 18 }
  ]);

  // Trainer Assignments Submissions State
  const [submissions, setSubmissions] = useState([
    { id: "SUB-01", student: "Rohan Deshmukh", course: "MERN Stack Web Dev", repo: "https://github.com/rohan/mern-ecommerce", date: "July 3", status: "Pending Review", score: null as number | null, feedback: "" },
    { id: "SUB-02", student: "Aanya Verma", course: "Java Enterprise Full Stack", repo: "https://github.com/aanya/spring-auth", date: "July 3", status: "Graded", score: 98, feedback: "Excellent microservices structure!" },
    { id: "SUB-03", student: "Karthik Raja", course: "Cloud DevOps Architect", repo: "https://github.com/karthik/k8s-infra", date: "July 2", status: "Pending Review", score: null as number | null, feedback: "" },
    { id: "SUB-04", student: "Pooja Hegde", course: "SDET Automation Testing", repo: "https://github.com/pooja/playwright-suite", date: "July 1", status: "Graded", score: 85, feedback: "Good assertions. Work on Page Object Model design." }
  ]);

  // Trainer Attendance List State
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: "101", name: "Rohan Deshmukh", status: "Present", batchId: "B1" },
    { id: "102", name: "Aanya Verma", status: "Present", batchId: "B2" },
    { id: "103", name: "Karthik Raja", status: "Absent", batchId: "B3" },
    { id: "104", name: "Pooja Hegde", status: "Present", batchId: "B1" },
    { id: "105", name: "Siddharth Jain", status: "Late", batchId: "B2" }
  ]);

  // Selected batch for Trainer attendance tab
  const [selectedAttendanceBatch, setSelectedAttendanceBatch] = useState("B1");

  // Search & Filter states
  const [studentSearch, setStudentSearch] = useState("");
  const [leadSearch, setLeadSearch] = useState("");

  // Modals / Input states
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", course: "", fees: "Pending" });

  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", phone: "", course: "" });

  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [inputScore, setInputScore] = useState("");
  const [inputFeedback, setInputFeedback] = useState("");

  const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
  const [newTopicText, setNewTopicText] = useState("");

  // Toast / Status Feedbacks
  const [actionFeedback, setActionFeedback] = useState<{ type: "success" | "info"; text: string } | null>(null);

  const showFeedback = (text: string, type: "success" | "info" = "success") => {
    setActionFeedback({ text, type });
    setTimeout(() => {
      setActionFeedback(null);
    }, 4500);
  };

  // Handlers for Admin Role
  const toggleFees = (id: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const nextFees = s.fees === "Paid" ? "Pending" : "Paid";
        showFeedback(`Trainee ${s.name} fee status set to ${nextFees}`);
        return { ...s, fees: nextFees };
      }
      return s;
    }));
  };

  const updateLeadStatus = (id: string, newStatus: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        showFeedback(`Lead ${l.name} status updated to: ${newStatus}`);
        return { ...l, status: newStatus };
      }
      return l;
    }));
  };

  const handleDeleteStudent = (id: string, name: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    showFeedback(`Successfully removed student ${name} from roster`, "info");
  };

  const handleDeleteLead = (id: string, name: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    showFeedback(`Removed CRM lead ${name}`, "info");
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.course) {
      showFeedback("Please complete all student fields", "info");
      return;
    }
    const id = String(100 + students.length + 1);
    setStudents(prev => [
      ...prev,
      {
        id,
        name: newStudent.name,
        course: newStudent.course,
        attendance: "100%",
        fees: newStudent.fees,
        tasks: "0/14",
        batchId: "B1"
      }
    ]);
    setShowAddStudentModal(false);
    showFeedback(`Trainee ${newStudent.name} registered successfully!`);
    setNewStudent({ name: "", course: "", fees: "Pending" });
  };

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone || !newLead.course) {
      showFeedback("Please fill out all inquiry fields", "info");
      return;
    }
    const id = `L0${leads.length + 1}`;
    setLeads(prev => [
      ...prev,
      {
        id,
        name: newLead.name,
        phone: newLead.phone,
        course: newLead.course,
        date: "Today",
        status: "New Inquire"
      }
    ]);
    setShowAddLeadModal(false);
    showFeedback(`Inbound lead ${newLead.name} logged into CRM!`);
    setNewLead({ name: "", phone: "", course: "" });
  };

  // Handlers for Trainer Role
  const handleUpdateTopicSubmit = (batchId: string) => {
    if (!newTopicText) return;
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        showFeedback(`Updated ${b.title} current topic to: ${newTopicText}`);
        return { ...b, topic: newTopicText };
      }
      return b;
    }));
    setEditingBatchId(null);
    setNewTopicText("");
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubId) return;
    const scoreVal = parseInt(inputScore) || 100;
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === gradingSubId) {
        showFeedback(`Graded ${sub.student}'s assignment: ${scoreVal}/100`);
        return {
          ...sub,
          status: "Graded",
          score: scoreVal,
          feedback: inputFeedback || "Completed and evaluated."
        };
      }
      return sub;
    }));
    setGradingSubId(null);
    setInputScore("");
    setInputFeedback("");
  };

  const toggleAttendanceStatus = (studentId: string) => {
    const statusCycle: ("Present" | "Absent" | "Late")[] = ["Present", "Absent", "Late"];
    setAttendanceRecords(prev => prev.map(rec => {
      if (rec.id === studentId) {
        const currentIndex = statusCycle.indexOf(rec.status as any);
        const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
        showFeedback(`${rec.name} marked as ${nextStatus}`);
        return { ...rec, status: nextStatus };
      }
      return rec;
    }));
  };

  const handleTriggerBackup = () => {
    showFeedback("Performing complete system cold backups ... Success (Cloud Firestore & Auth rules synchronized!)");
  };

  const handleTriggerCacheClear = () => {
    showFeedback("Purged course syllabus configurations, client assets, and CDN cache successfully!");
  };

  const handleBroadcastAlert = (batchTitle: string) => {
    showFeedback(`Broadcast text notice & push alerts dispatched to all registered attendees in ${batchTitle}!`);
  };

  // Filter students & leads
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.course.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
    l.course.toLowerCase().includes(leadSearch.toLowerCase())
  );

  // Common calculations
  const pendingSubCount = submissions.filter(s => s.status === "Pending Review").length;
  const activeAttendanceForSelectedBatch = attendanceRecords.filter(r => r.batchId === selectedAttendanceBatch);
  const presentCount = activeAttendanceForSelectedBatch.filter(r => r.status === "Present").length;
  const attendanceRate = activeAttendanceForSelectedBatch.length > 0 
    ? Math.round((presentCount / activeAttendanceForSelectedBatch.length) * 100)
    : 100;

  return (
    <div className="py-10 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Real-time System Feedback Toast notification */}
        {actionFeedback && (
          <div className="fixed bottom-6 right-6 z-50 p-4 max-w-md rounded-2xl border bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xl flex items-center gap-3 animate-fadeIn">
            <Sparkles className="h-5 w-5 text-yellow-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">System Status Action</p>
              <p className="opacity-80 font-medium">{actionFeedback.text}</p>
            </div>
            <button onClick={() => setActionFeedback(null)} className="ml-auto opacity-65 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ----------------- TRAINER HUB DESIGN ----------------- */}
        {isTrainer ? (
          <>
            {/* Header section for Trainer Hub */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded">
                  Faculty Workspace
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
                  <GraduationCap className="h-8 w-8 text-blue-600" /> MEDHA XL Trainer Console
                </h2>
                <p className="text-xs text-gray-500 dark:text-slate-400 max-w-xl">
                  Analyze active sprints, grade coding repository check-ins, record daily cohort logs, and communicate directly with active cohorts.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 rounded-full flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" /> Active Session
                </span>
              </div>
            </div>

            {/* Trainer KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">{batches.length}</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Active Batches</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
                <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">94.2%</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Avg Class Attendance</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
                <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">{pendingSubCount}</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Tasks To Evaluate</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
                <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">18 Sprints</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Completed Sprints</p>
                </div>
              </div>
            </div>

            {/* Trainer Sub-menu Tabs */}
            <div className="flex flex-wrap border-b border-slate-100 dark:border-slate-800 gap-1 pb-1">
              {[
                { id: "batches", label: "My Cohorts" },
                { id: "assignments", label: "Assignment Evaluation" },
                { id: "attendance", label: "Mark Attendance" },
                { id: "milestones", label: "Milestone Roadmaps" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTrainerActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 font-poppins cursor-pointer ${
                    trainerActiveTab === tab.id
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                  {tab.id === "assignments" && pendingSubCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-orange-500 text-white text-[9px] rounded-full">
                      {pendingSubCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Trainer Workspaces Display */}
            <div className="bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 min-h-[350px]">
              
              {/* Trainer Tab 1: Cohort lists */}
              {trainerActiveTab === "batches" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Assigned Teaching Batches</span>
                    <span className="text-gray-400 font-poppins">Total Batches: {batches.length}</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {batches.map((cohort) => (
                      <div key={cohort.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider">{cohort.title}</h4>
                            <p className="text-[10px] text-gray-400 font-medium">{cohort.timing}</p>
                          </div>
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 rounded">
                            {cohort.students} Students
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <p className="text-gray-500 dark:text-slate-400">
                            <strong>Assigned Lead:</strong> {cohort.trainer}
                          </p>
                          <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-gray-500 dark:text-slate-400 text-[10px]">
                              <strong>Topic today:</strong> {cohort.topic}
                            </span>
                            <button
                              onClick={() => {
                                setEditingBatchId(cohort.id);
                                setNewTopicText(cohort.topic);
                              }}
                              className="text-blue-600 hover:underline text-[10px] font-bold shrink-0 cursor-pointer"
                            >
                              Edit Topic
                            </button>
                          </div>
                        </div>

                        {editingBatchId === cohort.id && (
                          <div className="space-y-2 p-3 bg-blue-50/45 dark:bg-blue-950/15 rounded-xl border border-blue-100 dark:border-blue-900/30 animate-fadeIn">
                            <label className="block text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Change Active Lecture Focus</label>
                            <div className="flex gap-1.5">
                              <input
                                type="text"
                                value={newTopicText}
                                onChange={(e) => setNewTopicText(e.target.value)}
                                className="flex-1 bg-white border px-2.5 py-1 text-xs rounded-lg dark:bg-slate-950 dark:border-slate-800 outline-none"
                                placeholder="E.g. Kubernetes Cluster Config"
                              />
                              <button
                                onClick={() => handleUpdateTopicSubmit(cohort.id)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-semibold text-gray-500">
                            <span>Syllabus Completion</span>
                            <span>{cohort.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${cohort.progress}%` }} />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-50 dark:border-slate-800 flex gap-2">
                          <button
                            onClick={() => handleBroadcastAlert(cohort.title)}
                            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Broadcast Alert
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trainer Tab 2: Evaluate Submissions */}
              {trainerActiveTab === "assignments" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">GitHub Assignments Queue</span>
                    <p className="text-gray-400 font-poppins">Pending Evaluation: {pendingSubCount}</p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-800 text-gray-400 uppercase font-bold tracking-wider bg-gray-50/50 dark:bg-slate-900/50">
                            <th className="py-3.5 px-4">Student</th>
                            <th className="py-3.5 px-4">Course Track</th>
                            <th className="py-3.5 px-4">Repository Link</th>
                            <th className="py-3.5 px-4">Date Sub</th>
                            <th className="py-3.5 px-4 text-center">Status</th>
                            <th className="py-3.5 px-4 text-center">Marks Score</th>
                            <th className="py-3.5 px-4 text-center">Evaluation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                          {submissions.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-900/40">
                              <td className="py-3 px-4">
                                <p className="font-extrabold text-gray-900 dark:text-white">{sub.student}</p>
                                <span className="text-[10px] text-gray-400 font-mono">{sub.id}</span>
                              </td>
                              <td className="py-3 px-4 font-medium text-gray-600 dark:text-slate-300">{sub.course}</td>
                              <td className="py-3 px-4">
                                <a 
                                  href={sub.repo} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-blue-500 hover:underline font-mono inline-flex items-center gap-1 shrink-0"
                                >
                                  github-link <ArrowUpRight className="h-3 w-3" />
                                </a>
                              </td>
                              <td className="py-3 px-4 text-gray-400">{sub.date}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                  sub.status === "Graded" 
                                    ? "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400"
                                    : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
                                }`}>
                                  {sub.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center font-bold font-mono">
                                {sub.score !== null ? `${sub.score}/100` : "-"}
                              </td>
                              <td className="py-3 px-4 text-center">
                                {sub.status === "Pending Review" ? (
                                  <button
                                    onClick={() => {
                                      setGradingSubId(sub.id);
                                      setInputScore("");
                                      setInputFeedback("");
                                    }}
                                    className="px-2.5 py-1 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-colors cursor-pointer text-[10px]"
                                  >
                                    Grade Task
                                  </button>
                                ) : (
                                  <span className="text-gray-400 italic text-[10px] block max-w-[150px] truncate mx-auto" title={sub.feedback}>
                                    "{sub.feedback}"
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {gradingSubId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
                      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => setGradingSubId(null)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                        >
                          <X className="h-5 w-5" />
                        </button>
                        <form onSubmit={handleGradeSubmit} className="space-y-4">
                          <div className="space-y-1 pb-3 border-b dark:border-slate-800">
                            <span className="text-[10px] font-bold text-blue-600 uppercase">Assessment Hub</span>
                            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Evaluate Code Submission</h4>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase">Assignment Repo</label>
                            <p className="text-xs font-mono bg-gray-50 p-2 rounded-lg dark:bg-slate-950 border dark:border-slate-800 truncate">
                              {submissions.find(s => s.id === gradingSubId)?.repo}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase">Score Earned (0 - 100)</label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              required
                              value={inputScore}
                              onChange={(e) => setInputScore(e.target.value)}
                              placeholder="E.g. 95"
                              className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl dark:bg-slate-950 dark:border-slate-800 outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase">Written Feedback</label>
                            <textarea
                              value={inputFeedback}
                              onChange={(e) => setInputFeedback(e.target.value)}
                              placeholder="Great architecture. Add modular tests next time."
                              className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl dark:bg-slate-950 dark:border-slate-800 outline-none min-h-[80px]"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                          >
                            Save Evaluation & Grade
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Trainer Tab 3: Daily Attendance */}
              {trainerActiveTab === "attendance" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Cohort Daily Register</span>
                      <p className="text-gray-500">Cycle status to mark student present, absent, or late for today's lecture.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-medium">Select Cohort:</span>
                      <select
                        value={selectedAttendanceBatch}
                        onChange={(e) => setSelectedAttendanceBatch(e.target.value)}
                        className="bg-white border rounded-xl p-2 font-bold dark:bg-slate-900 dark:border-slate-800 outline-none"
                      >
                        {batches.map(b => (
                          <option key={b.id} value={b.id}>{b.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Attendance Stats box */}
                  <div className="bg-white dark:bg-slate-900 border p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                        {attendanceRate}%
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">Cohort attendance Rate</p>
                        <p className="text-[10px] text-gray-400">Target benchmark is 90% or higher.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 text-xs font-semibold">
                      <div className="text-center">
                        <span className="text-green-500 block text-sm font-bold">{presentCount}</span>
                        <span className="text-gray-400 text-[9px] uppercase">Present</span>
                      </div>
                      <div className="text-center">
                        <span className="text-orange-500 block text-sm font-bold">
                          {activeAttendanceForSelectedBatch.filter(r => r.status === "Late").length}
                        </span>
                        <span className="text-gray-400 text-[9px] uppercase">Late</span>
                      </div>
                      <div className="text-center">
                        <span className="text-red-500 block text-sm font-bold">
                          {activeAttendanceForSelectedBatch.filter(r => r.status === "Absent").length}
                        </span>
                        <span className="text-gray-400 text-[9px] uppercase">Absent</span>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Roster Table */}
                  <div className="bg-white dark:bg-slate-900 border rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-gray-400 uppercase font-bold tracking-wider bg-gray-50/50 dark:bg-slate-900/50">
                          <th className="py-3 px-4">Trainee</th>
                          <th className="py-3 px-4">Designated Batch ID</th>
                          <th className="py-3 px-4 text-center">Status Tag</th>
                          <th className="py-3 px-4 text-center">Interactive Switch</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                        {activeAttendanceForSelectedBatch.map((rec) => (
                          <tr key={rec.id} className="hover:bg-gray-50/45 dark:hover:bg-slate-900/30">
                            <td className="py-3 px-4 flex items-center gap-2.5">
                              <div className="h-7 w-7 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold rounded-full flex items-center justify-center text-[10px]">
                                {rec.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="font-extrabold text-gray-900 dark:text-white">{rec.name}</span>
                            </td>
                            <td className="py-3 px-4 font-mono text-gray-500 font-bold">{rec.batchId}</td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold inline-block w-16 text-center ${
                                rec.status === "Present" 
                                  ? "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400"
                                  : rec.status === "Absent"
                                  ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                                  : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
                              }`}>
                                {rec.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => toggleAttendanceStatus(rec.id)}
                                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10px] font-bold rounded-lg cursor-pointer"
                              >
                                Toggle Status
                              </button>
                            </td>
                          </tr>
                        ))}
                        {activeAttendanceForSelectedBatch.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-gray-400 italic">
                              No students registered in this specific batch. Change filter above.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* Trainer Tab 4: Milestones tracker */}
              {trainerActiveTab === "milestones" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Milestone Roadmap Progress</span>
                    <span className="text-gray-400 font-poppins">Curriculum Milestones</span>
                  </div>

                  <div className="space-y-6">
                    {[
                      { 
                        course: "MERN Stack Web Dev", 
                        current: "Phase 3: Back-End Docker Containerization",
                        percentage: 78,
                        steps: ["Foundations (HTML5/CSS3/ES6)", "React 19 & Component Hooks", "Node.js & Express REST APIs", "Docker containerization", "AWS Deployments & Cloud Pipelines"]
                      },
                      { 
                        course: "Java Enterprise Full Stack", 
                        current: "Phase 2: Microservices Architecture & JPA",
                        percentage: 45,
                        steps: ["Core Java & OOPS fundamentals", "Advanced Hibernate ORM Mapping", "Spring Boot RESTful Microservices", "Spring Security & OAuth2", "CI/CD Orchestration"]
                      }
                    ].map((roadmap, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-900 border p-5 rounded-2xl space-y-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <div>
                            <h4 className="text-xs font-bold font-poppins text-blue-600 dark:text-blue-400 uppercase">{roadmap.course}</h4>
                            <p className="text-xs font-bold text-gray-900 dark:text-white mt-0.5">Active Sprint: {roadmap.current}</p>
                          </div>
                          <span className="text-xs font-mono font-bold bg-gray-50 dark:bg-slate-950 border px-2 py-0.5 rounded text-gray-500">
                            {roadmap.percentage}% Syllabus Done
                          </span>
                        </div>

                        <div className="h-2 w-full bg-gray-100 dark:bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: `${roadmap.percentage}%` }} />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                          {roadmap.steps.map((step, sIdx) => {
                            const isCompleted = (sIdx + 1) * 20 <= roadmap.percentage;
                            const isActive = !isCompleted && (sIdx) * 20 < roadmap.percentage;
                            return (
                              <div 
                                key={sIdx} 
                                className={`p-2.5 rounded-xl border text-center space-y-1.5 transition-all ${
                                  isCompleted 
                                    ? "bg-green-50/45 dark:bg-green-950/10 border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400" 
                                    : isActive 
                                    ? "bg-blue-50/45 dark:bg-blue-950/10 border-blue-300 dark:border-blue-900/30 text-blue-700 dark:text-blue-400 ring-2 ring-blue-100 dark:ring-blue-950/60"
                                    : "bg-gray-50/50 dark:bg-slate-900/50 text-gray-400 border-slate-100 dark:border-slate-800"
                                }`}
                              >
                                <div className="h-5 w-5 rounded-full mx-auto flex items-center justify-center border font-mono font-bold text-[9px]">
                                  {isCompleted ? <Check className="h-3.5 w-3.5 text-green-500" /> : sIdx + 1}
                                </div>
                                <p className="text-[10px] font-bold leading-tight line-clamp-2">{step}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </>
        ) : (
          /* ----------------- ADMIN PANEL DESIGN ----------------- */
          <>
            {/* Header section for Admin Command */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded">
                  System Registrar
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
                  <TrendingUp className="h-8 w-8 text-indigo-600" /> MEDHA XL Admin Command
                </h2>
                <p className="text-xs text-gray-500 dark:text-slate-400 max-w-xl">
                  Review student fee status, manage inbound registration queries, visualize institution analytics, and deploy hot system actions.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" /> Live Server connected
                </span>
              </div>
            </div>

            {/* Quick KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="h-5.5 w-5.5" />
                </div>
                <div>
                  <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">1,240</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Active Students</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
                <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <CreditCard className="h-5.5 w-5.5" />
                </div>
                <div>
                  <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">₹4.58M</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Fees Collected</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
                <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="h-5.5 w-5.5" />
                </div>
                <div>
                  <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">92.4%</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Placement Rate</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
                <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <PhoneCall className="h-5.5 w-5.5" />
                </div>
                <div>
                  <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">18 New</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">CRM Inquiries</p>
                </div>
              </div>
            </div>

            {/* Workspace Menu Tabs */}
            <div className="flex flex-wrap border-b border-slate-100 dark:border-slate-800 gap-1 pb-1">
              {[
                { id: "students", label: "Trainee Registrar" },
                { id: "leads", label: "CRM Leads" },
                { id: "analytics", label: "Financial & Placement Analytics" },
                { id: "config", label: "System Config & Logs" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdminActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 font-poppins cursor-pointer ${
                    adminActiveTab === tab.id
                      ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dynamic Workspace display */}
            <div className="bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 min-h-[350px]">

              {/* Admin Tab 1. Trainee Database */}
              {adminActiveTab === "students" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                    <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Trainees Directory</span>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="relative text-xs">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                        <input
                          type="text"
                          value={studentSearch}
                          onChange={(e) => setStudentSearch(e.target.value)}
                          placeholder="Search name or course..."
                          className="pl-8 pr-3 py-1.5 w-48 rounded-xl border bg-white dark:bg-slate-900 outline-none text-xs dark:border-slate-800"
                        />
                      </div>

                      <button
                        onClick={() => setShowAddStudentModal(true)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" /> Register Trainee
                      </button>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-800 text-gray-400 uppercase font-bold tracking-wider bg-gray-50/50 dark:bg-slate-900/50">
                            <th className="py-3 px-4">Trainee ID</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Enrolled Course</th>
                            <th className="py-3 px-4 text-center">Attendance</th>
                            <th className="py-3 px-4 text-center">Tasks Done</th>
                            <th className="py-3 px-4 text-center">Fee Status</th>
                            <th className="py-3 px-4 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                          {filteredStudents.map((s) => (
                            <tr key={s.id} className="hover:bg-gray-150/15 dark:hover:bg-slate-900/30">
                              <td className="py-3 px-4 font-mono font-bold text-gray-500">{s.id}</td>
                              <td className="py-3 px-4 font-extrabold text-gray-900 dark:text-white">{s.name}</td>
                              <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{s.course}</td>
                              <td className="py-3 px-4 text-center font-bold text-green-500">{s.attendance}</td>
                              <td className="py-3 px-4 text-center font-semibold text-gray-500">{s.tasks}</td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  onClick={() => toggleFees(s.id)}
                                  className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                                    s.fees === "Paid"
                                      ? "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400"
                                      : "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                                  }`}
                                >
                                  {s.fees}
                                </button>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  onClick={() => handleDeleteStudent(s.id, s.name)}
                                  className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {filteredStudents.length === 0 && (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-gray-400 italic">
                                No trainees match search keyword.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Add Student Modal */}
                  {showAddStudentModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
                      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => setShowAddStudentModal(false)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                        >
                          <X className="h-5 w-5" />
                        </button>
                        <form onSubmit={handleAddStudentSubmit} className="space-y-4">
                          <div className="space-y-1 pb-3 border-b dark:border-slate-800">
                            <span className="text-[10px] font-bold text-blue-600 uppercase">Trainee Setup</span>
                            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Register New Student</h4>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase">Full Name</label>
                            <input
                              type="text"
                              required
                              value={newStudent.name}
                              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                              placeholder="E.g. Vivek Anand"
                              className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl dark:bg-slate-950 dark:border-slate-800 outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase">Course Selection</label>
                            <select
                              value={newStudent.course}
                              onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                              className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl dark:bg-slate-950 dark:border-slate-800 outline-none font-semibold"
                              required
                            >
                              <option value="">-- Choose Course Track --</option>
                              <option value="MERN Stack Web Dev">MERN Stack Web Dev</option>
                              <option value="Java Enterprise Full Stack">Java Enterprise Full Stack</option>
                              <option value="Cloud DevOps Architect">Cloud DevOps Architect</option>
                              <option value="SDET Automation Testing">SDET Automation Testing</option>
                              <option value="AI, ML & Prompt Engineering">AI, ML & Prompt Engineering</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase">Fees Initial State</label>
                            <div className="flex gap-4 pt-1 text-xs">
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="radio"
                                  name="fees"
                                  checked={newStudent.fees === "Paid"}
                                  onChange={() => setNewStudent({ ...newStudent, fees: "Paid" })}
                                />
                                Paid Upfront
                              </label>
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="radio"
                                  name="fees"
                                  checked={newStudent.fees === "Pending"}
                                  onChange={() => setNewStudent({ ...newStudent, fees: "Pending" })}
                                />
                                Pending Installment
                              </label>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                          >
                            Add Student Record
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Admin Tab 2. CRM Leads Tracker */}
              {adminActiveTab === "leads" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                    <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Inbound Inquiries CRM Logs</span>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="relative text-xs">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                        <input
                          type="text"
                          value={leadSearch}
                          onChange={(e) => setLeadSearch(e.target.value)}
                          placeholder="Search query leads..."
                          className="pl-8 pr-3 py-1.5 w-44 rounded-xl border bg-white dark:bg-slate-900 outline-none text-xs dark:border-slate-800"
                        />
                      </div>

                      <button
                        onClick={() => setShowAddLeadModal(true)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" /> Log Inquiry
                      </button>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-800 text-gray-400 uppercase font-bold tracking-wider bg-gray-50/50 dark:bg-slate-900/50">
                            <th className="py-3.5 px-4">Lead ID</th>
                            <th className="py-3.5 px-4">Contact Person</th>
                            <th className="py-3.5 px-4">Phone Number</th>
                            <th className="py-3.5 px-4">Course Query</th>
                            <th className="py-3.5 px-4">Inquire Date</th>
                            <th className="py-3.5 px-4 text-center">Status</th>
                            <th className="py-3.5 px-4 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                          {filteredLeads.map((l) => (
                            <tr key={l.id} className="hover:bg-gray-100/45 dark:hover:bg-slate-900/30">
                              <td className="py-3 px-4 font-mono font-bold text-gray-500">{l.id}</td>
                              <td className="py-3 px-4 font-extrabold text-gray-900 dark:text-white">{l.name}</td>
                              <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{l.phone}</td>
                              <td className="py-3 px-4 text-gray-500 font-medium">{l.course}</td>
                              <td className="py-3 px-4 text-gray-400">{l.date}</td>
                              <td className="py-3 px-4 text-center">
                                <select
                                  value={l.status}
                                  onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                                  className="bg-white border rounded-xl p-1.5 outline-none text-[10px] font-bold dark:bg-slate-900 dark:border-gray-800"
                                >
                                  <option value="New Inquire">New Inquire</option>
                                  <option value="Follow up">Follow up</option>
                                  <option value="Booked Demo">Booked Demo</option>
                                  <option value="Enrolled">Enrolled</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  onClick={() => handleDeleteLead(l.id, l.name)}
                                  className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {filteredLeads.length === 0 && (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-gray-400 italic">
                                No Leads recorded.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Add Lead Modal */}
                  {showAddLeadModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
                      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => setShowAddLeadModal(false)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                        >
                          <X className="h-5 w-5" />
                        </button>
                        <form onSubmit={handleAddLeadSubmit} className="space-y-4">
                          <div className="space-y-1 pb-3 border-b dark:border-slate-800">
                            <span className="text-[10px] font-bold text-indigo-600 uppercase">Sales CRM Engine</span>
                            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Log Live Lead Inquiry</h4>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase">Person Name</label>
                            <input
                              type="text"
                              required
                              value={newLead.name}
                              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                              placeholder="E.g. Priyanka Deshmukh"
                              className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl dark:bg-slate-950 dark:border-slate-800 outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase">Phone contact</label>
                            <input
                              type="text"
                              required
                              value={newLead.phone}
                              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                              placeholder="E.g. +91 91234 56789"
                              className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl dark:bg-slate-950 dark:border-slate-800 outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase">Target Course Program</label>
                            <input
                              type="text"
                              required
                              value={newLead.course}
                              onChange={(e) => setNewLead({ ...newLead, course: e.target.value })}
                              placeholder="E.g. Python DevOps"
                              className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl dark:bg-slate-950 dark:border-slate-800 outline-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                          >
                            Save Inbound Lead
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Admin Tab 3. Analytics and Charts */}
              {adminActiveTab === "analytics" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Operational Distributions</span>
                    <span className="text-gray-400 font-poppins">July 2026 Reporting Cycle</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Tuition distributions */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold font-poppins text-gray-400 uppercase tracking-wider">Trainees Enrolled by Track</h4>
                      <div className="space-y-3 pt-2">
                        {[
                          { name: "Java Full Stack Developer", count: 420, percent: "85%" },
                          { name: "MERN Stack Development", count: 510, percent: "95%" },
                          { name: "SDET Automation QA", count: 180, percent: "60%" },
                          { name: "Cloud DevOps Architecture", count: 130, percent: "45%" }
                        ].map((item, idx) => (
                          <div key={idx} className="space-y-1.5 text-xs">
                            <div className="flex justify-between font-semibold">
                              <span className="text-gray-700 dark:text-slate-300 font-poppins">{item.name}</span>
                              <span className="text-blue-600 dark:text-blue-400 font-poppins">{item.count} Students</span>
                            </div>
                            <div className="h-2.5 w-full bg-gray-100 dark:bg-slate-950 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full" style={{ width: item.percent }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Placement Package Distributions */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold font-poppins text-gray-400 uppercase tracking-wider">Annuity Offer Packages (LPA)</h4>
                      <div className="space-y-3 pt-2">
                        {[
                          { lpa: "12+ LPA (Premium Core)", count: 210, percent: "75%" },
                          { lpa: "8 - 12 LPA (Senior Associate)", count: 480, percent: "90%" },
                          { lpa: "5 - 8 LPA (Associate SDET)", count: 320, percent: "65%" },
                          { lpa: "3 - 5 LPA (Entry Support)", count: 90, percent: "30%" }
                        ].map((item, idx) => (
                          <div key={idx} className="space-y-1.5 text-xs">
                            <div className="flex justify-between font-semibold">
                              <span className="text-gray-700 dark:text-slate-300 font-poppins">{item.lpa}</span>
                              <span className="text-purple-600 dark:text-purple-400 font-poppins">{item.count} Placed</span>
                            </div>
                            <div className="h-2.5 w-full bg-gray-100 dark:bg-slate-950 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-600 rounded-full" style={{ width: item.percent }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Admin Tab 4. System Configurations and Live Logs */}
              {adminActiveTab === "config" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Server Infrastructure Control</span>
                    <span className="text-gray-400 font-poppins">Version: build_v4.2.1-lts</span>
                  </div>

                  {/* Hot action buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                      <h5 className="text-xs font-bold font-poppins text-gray-900 dark:text-white">Relational Cold Backup</h5>
                      <p className="text-[10px] text-gray-400 leading-relaxed">Snapshot all current transaction logs and students schema files safely.</p>
                      <button 
                        onClick={handleTriggerBackup}
                        className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RefreshCw className="h-3 w-3 animate-spin-slow" /> Trigger Database Sync
                      </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                      <h5 className="text-xs font-bold font-poppins text-gray-900 dark:text-white">Flush Course Cache</h5>
                      <p className="text-[10px] text-gray-400 leading-relaxed">Prune stale client assets bundles to speed up static loading queries.</p>
                      <button 
                        onClick={handleTriggerCacheClear}
                        className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                      >
                        Clear CDN Cache
                      </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                      <h5 className="text-xs font-bold font-poppins text-gray-900 dark:text-white">System Status Integrity</h5>
                      <p className="text-[10px] text-gray-400 leading-relaxed">Security handshake and firestore security rules are actively audited.</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-500">
                        <Check className="h-3.5 w-3.5" /> Handshake OK
                      </span>
                    </div>
                  </div>

                  {/* Simulated Server terminal output log */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold font-poppins text-gray-400 uppercase tracking-wide">Simulated Server Logs</label>
                    <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[11px] leading-relaxed border border-slate-800 space-y-1 shadow-inner h-44 overflow-y-auto">
                      <p className="text-blue-400">[SYSTEM] Starting deployment build on Host 0.0.0.0:3000...</p>
                      <p className="text-gray-400">[SYSTEM] Server instance mapped successfully. Binding ingress proxy routes.</p>
                      <p className="text-gray-400">[DATABASE] Connecting PostgreSQL cluster... Success (4 active pooling nodes)</p>
                      <p className="text-gray-400">[FIREBASE] Listening for Firestore documents stream triggers.</p>
                      <p className="text-yellow-400">[SECURITY] Handshake authorized for ramprasadsuthi@gmail.com.</p>
                      <p className="text-green-400">[SUCCESS] MEDHA XL build is hot and compiled. Vite static engine active.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
}
