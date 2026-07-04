import React, { useState } from "react";
import { Users, CreditCard, Award, PhoneCall, CheckCircle2, TrendingUp, Calendar, Trash2, Search, ArrowUpRight, BarChart3, AlertCircle } from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"students" | "batches" | "leads" | "analytics">("students");

  // Mock Students Database
  const [students, setStudents] = useState([
    { id: "101", name: "Rohan Deshmukh", course: "MERN Stack Web Dev", attendance: "95%", fees: "Paid", tasks: "12/14" },
    { id: "102", name: "Aanya Verma", course: "Java Enterprise Full Stack", attendance: "98%", fees: "Pending", tasks: "14/14" },
    { id: "103", name: "Karthik Raja", course: "Cloud DevOps Architect", attendance: "92%", fees: "Paid", tasks: "11/14" },
    { id: "104", name: "Pooja Hegde", course: "SDET Automation Testing", attendance: "90%", fees: "Pending", tasks: "9/14" },
    { id: "105", name: "Siddharth Jain", course: "AI, ML & Prompt Engineering", attendance: "96%", fees: "Paid", tasks: "13/14" }
  ]);

  // Mock Leads Database
  const [leads, setLeads] = useState([
    { id: "L01", name: "Amit Sharma", phone: "+91 98765 43210", course: "MERN Stack", date: "July 3", status: "New Inquire" },
    { id: "L02", name: "Neha Patel", phone: "+91 87654 32109", course: "Java Full Stack", date: "July 3", status: "Follow up" },
    { id: "L03", name: "Rahul Deshpande", phone: "+91 76543 21098", course: "DevOps", date: "July 2", status: "Booked Demo" },
    { id: "L04", name: "Sneha Reddy", phone: "+91 65432 10987", course: "Automation Testing", date: "July 1", status: "Enrolled" }
  ]);

  // Toggle Fees Paid/Pending
  const toggleFees = (id: string) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        return { ...s, fees: s.fees === "Paid" ? "Pending" : "Paid" };
      }
      return s;
    }));
  };

  // Change Lead Status
  const updateLeadStatus = (id: string, newStatus: string) => {
    setLeads(leads.map(l => {
      if (l.id === id) {
        return { ...l, status: newStatus };
      }
      return l;
    }));
  };

  return (
    <div className="py-10 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Dashboard header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900 dark:text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <TrendingUp className="h-7 w-7 text-blue-600" /> MEDHA XL Admin Command
            </h2>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Manage student fee status, batch schedules, inbound CRM leads, and performance reports in real time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" /> System Logs: Connected
            </span>
          </div>
        </div>

        {/* Quick KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Users className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">1,240</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Active Students</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center shrink-0">
              <CreditCard className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">₹4.58M</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Fees Collected</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
            <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
              <Award className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white">92.4%</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Placement Rate</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-all hover:shadow-md">
            <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
              <PhoneCall className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xl font-bold font-poppins text-slate-900 dark:text-white font-poppins">18 New</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Inbound Inquiries</p>
            </div>
          </div>
        </div>

        {/* Workspace Menu Tabs */}
        <div className="flex flex-wrap border-b border-slate-100 dark:border-slate-800 gap-1 pb-1">
          {[
            { id: "students", label: "Trainee Database" },
            { id: "batches", label: "Cohort Timetable" },
            { id: "leads", label: "CRM Leads Tracker" },
            { id: "analytics", label: "Platform Analytics" }
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

        {/* Dynamic Workspace display */}
        <div className="bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 min-h-[350px]">

          {/* 1. Trainee Database */}
          {activeTab === "students" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Manage Enrolled Trainees</span>
                <span className="text-gray-400">Total Database Count: {students.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-gray-400 uppercase font-bold tracking-wider">
                      <th className="py-3 px-4">Trainee ID</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Enrolled Course</th>
                      <th className="py-3 px-4 text-center">Attendance</th>
                      <th className="py-3 px-4 text-center">Tasks Done</th>
                      <th className="py-3 px-4 text-center">Fee Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                    {students.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-100/45 dark:hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-mono font-bold text-gray-500">{s.id}</td>
                        <td className="py-3 px-4 font-extrabold text-gray-900 dark:text-white">{s.name}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{s.course}</td>
                        <td className="py-3 px-4 text-center font-bold text-green-500">{s.attendance}</td>
                        <td className="py-3 px-4 text-center font-semibold text-gray-500">{s.tasks}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleFees(s.id)}
                            className={`px-3 py-1 rounded text-[10px] font-bold ${
                              s.fees === "Paid"
                                ? "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400"
                                : "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                            }`}
                          >
                            {s.fees}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. Cohort Timetable */}
          {activeTab === "batches" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Active Technical Batches</span>
                <span className="text-gray-400 font-poppins">Total Active Sprints: 3</span>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "MERN Stack #4", timing: "Daily Evening 7-9 PM", trainer: "Anil Kumar", topic: "Docker orchestration" },
                  { title: "Java Full Stack #9", timing: "Weekend Batch 9-1 PM", trainer: "Dr. Srinivas Rao", topic: "Microservices JPA ORM" },
                  { title: "DevOps & Cloud #12", timing: "Weekend Batch 2-6 PM", trainer: "Suresh Pillai", topic: "Kubernetes LoadBalancer" }
                ].map((cohort, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider">{cohort.title}</h4>
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-100 text-blue-600 rounded">Running</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 dark:text-slate-400">
                      <p><strong>Lecture Slot:</strong> {cohort.timing}</p>
                      <p><strong>Domain Trainer:</strong> {cohort.trainer}</p>
                      <p><strong>Active Topic:</strong> {cohort.topic}</p>
                    </div>
                    <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-[10px] font-bold rounded-lg border">
                      Broadcast Notification
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. CRM Leads Tracker */}
          {activeTab === "leads" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Inbound Inquiries Log</span>
                <span className="text-gray-400 font-poppins">Total Intake: {leads.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-gray-400 uppercase font-bold tracking-wider">
                      <th className="py-3 px-4">Lead ID</th>
                      <th className="py-3 px-4">Contact Person</th>
                      <th className="py-3 px-4">Phone Number</th>
                      <th className="py-3 px-4">Course Query</th>
                      <th className="py-3 px-4">Inquire Date</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-gray-100/45 dark:hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-mono font-bold text-gray-500">{l.id}</td>
                        <td className="py-3 px-4 font-extrabold text-gray-900 dark:text-white">{l.name}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{l.phone}</td>
                        <td className="py-3 px-4 text-gray-500">{l.course}</td>
                        <td className="py-3 px-4 text-gray-400">{l.date}</td>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={l.status}
                            onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                            className="bg-white border rounded p-1.5 outline-none text-[10px] font-bold dark:bg-slate-900 dark:border-gray-850"
                          >
                            <option value="New Inquire">New Inquire</option>
                            <option value="Follow up">Follow up</option>
                            <option value="Booked Demo">Booked Demo</option>
                            <option value="Enrolled">Enrolled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. Analytics and Charts */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold font-poppins text-gray-400 uppercase tracking-wider">Operational Distributions</span>
                <span className="text-gray-400 font-poppins">July 2026 Reporting</span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Tuition distributions */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
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
                          <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: item.percent }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placement Package Distributions */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
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
                          <div className="h-full bg-purple-600 rounded-full animate-pulse" style={{ width: item.percent }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
