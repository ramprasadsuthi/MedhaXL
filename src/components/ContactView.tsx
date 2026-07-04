import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, Check, HelpCircle, ChevronDown, Award } from "lucide-react";
import { FAQS } from "../types";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "MERN Stack Web Development",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please populate all required fields.");
      return;
    }
    setIsSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Branch offices list
  const branches = [
    {
      city: "Hyderabad (HQ)",
      area: "Madhapur, Near Metro Pillar C1652",
      phone: "+91 96525 32753",
      email: "hyd@medhaxl.com",
      mapUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=60"
    },
    {
      city: "Bangalore",
      area: "Marathahalli Outer Ring Road",
      phone: "+91 80 4251 9832",
      email: "blr@medhaxl.com",
      mapUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc18a523?w=400&auto=format&fit=crop&q=60"
    },
    {
      city: "Visakhapatnam",
      area: "Dwarka Nagar 3rd Lane",
      phone: "+91 891 273 5431",
      email: "vizag@medhaxl.com",
      mapUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-slate-950/50 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 font-poppins">Reach Our Support Team</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white tracking-tight">
            Connect with Medha XL Offices
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-500 dark:text-slate-400">
            Book a physical classroom tour, request a syllabus counseling callback, or resolve tuition payment queries.
          </p>
        </div>

        {/* Contact Form and Corporate Offices Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="h-4.5 w-4.5 text-blue-500" /> Send a Counseling Query
              </h3>
              <p className="text-xs text-gray-500">Our senior curriculum advisors will callback within 2 hours.</p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-400 uppercase mb-1">Your Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anil Kumar"
                      className="w-full rounded-lg border p-2.5 outline-none bg-gray-50 focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-400 uppercase mb-1">Active Mobile Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 96525 32753"
                      className="w-full rounded-lg border p-2.5 outline-none bg-gray-50 focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-400 uppercase mb-1">Email ID <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full rounded-lg border p-2.5 outline-none bg-gray-50 focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-400 uppercase mb-1">Select Domain Track</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full rounded-lg border p-2.5 outline-none bg-gray-50 focus:border-blue-500 dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="MERN Stack Web Development">MERN Stack Web Development</option>
                    <option value="Java Full Stack Enterprise">Java Full Stack Enterprise (Spring Boot)</option>
                    <option value="SDET QA Test Automation">SDET Automation Testing (Playwright)</option>
                    <option value="Cloud DevOps Architecture">Cloud DevOps Architecture (Kubernetes)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-400 uppercase mb-1">Briefly Describe Your Requirements</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current qualifications, years of experience, or preference for online vs physical batches..."
                    className="w-full rounded-lg border p-3 outline-none bg-gray-50 focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="h-4 w-4" /> Book Free Counselor Demo Now
                </button>
              </form>
            ) : (
              <div className="bg-green-50 dark:bg-green-950/20 p-8 rounded-xl border border-green-100 dark:border-green-900/25 text-center space-y-4 animate-fadeIn">
                <div className="h-12 w-12 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold font-poppins text-gray-900 dark:text-white">Counseling Request Logged!</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 max-w-md mx-auto">
                  Thank you, <strong className="font-semibold text-gray-800 dark:text-white">{formData.name}</strong>. Our Senior Counselor has reserved your free demo on <strong className="text-blue-600">{formData.course}</strong>. We will text/call your number shortly.
                </p>
                <button
                  onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", phone: "", course: "MERN Stack Web Development", message: "" }); }}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-50 dark:border-gray-800 font-bold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Office Branches Directory */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold font-poppins text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="h-4.5 w-4.5 text-blue-500" /> Physical Branch Locations
              </h3>
              <p className="text-xs text-gray-500">Walk into our classrooms for a face-to-face demo with our lead instructors.</p>
            </div>
 
            <div className="space-y-4">
              {branches.map((branch, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl flex gap-4 items-center shadow-sm">
                  <img src={branch.mapUrl} alt={branch.city} className="h-16 w-16 object-cover rounded-xl shrink-0 bg-slate-50" />
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold font-poppins text-gray-900 dark:text-white">{branch.city} Branch</h4>
                    <p className="text-gray-500 flex items-start gap-1"><MapPin className="h-3.5 w-3.5 shrink-0 text-blue-500 mt-0.5" /> <span>{branch.area}</span></p>
                    <p className="text-gray-500 flex items-center gap-1"><Phone className="h-3.5 w-3.5 shrink-0 text-blue-500" /> <span>{branch.phone}</span></p>
                    <p className="text-gray-500 flex items-center gap-1"><Mail className="h-3.5 w-3.5 shrink-0 text-blue-500" /> <span>{branch.email}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- DYNAMIC FAQ ACCORDION ENGINE --- */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-md">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
              <HelpCircle className="h-5.5 w-5.5 text-blue-500" /> Curriculums & Admissions FAQ
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">Everything you need to know about corporate training timelines and job-guaranteed milestones.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden transition-all bg-gray-50/50 dark:bg-slate-950/20"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 flex justify-between items-center text-left hover:bg-gray-100/55 dark:hover:bg-slate-900/40"
                  >
                    <span className="text-xs font-bold text-gray-800 dark:text-slate-200">{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-slate-300 leading-relaxed whitespace-pre-line animate-slideDown">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
