import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import CoursesView from "./components/CoursesView";
import AIHub from "./components/AIHub";
import CodingPlayground from "./components/CodingPlayground";
import LMSPortal from "./components/LMSPortal";
import AdminPanel from "./components/AdminPanel";
import ContactView from "./components/ContactView";
import Footer from "./components/Footer";

import { Sparkles, Star, ChevronRight, CheckCircle, MessageSquare, Phone, ArrowUp, Send, Loader2, X, CreditCard, Ticket, CheckCircle2 } from "lucide-react";
import { Course, STUDENT_STORIES, COURSES } from "./types";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [userRole, setUserRole] = useState<"visitor" | "student" | "trainer" | "admin">("visitor");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Checkout Modal State
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentMode, setPaymentMode] = useState<"upi" | "card" | "emi">("upi");
  const [promoFeedback, setPromoFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Floating Widgets State
  const [showAiChatDesk, setShowAiChatDesk] = useState(false);
  const [aiChatQuery, setAiChatQuery] = useState("");
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "Hello! I am Medha XL's Admissions Counselor. Ask me about batch timings, placement statistics, or physical branch locations." }
  ]);
  const [aiDeskLoading, setAiDeskLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Synchronize Dark Mode Theme to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Monitor Scroll for Back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Wishlist Toggling
  const handleWishlistToggle = (courseId: string) => {
    if (wishlist.includes(courseId)) {
      setWishlist(wishlist.filter(id => id !== courseId));
    } else {
      setWishlist([...wishlist, courseId]);
    }
  };

  // Submit Promo Code discount check
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "MEDHA20") {
      setDiscountPercent(20);
      setPromoFeedback({ type: "success", text: "Coupon MEDHA20 applied! 20% discount applied to your tuition." });
    } else {
      setPromoFeedback({ type: "error", text: "Invalid Coupon Code. Try using 'MEDHA20'!" });
    }
  };

  // Submit Checkout Purchase
  const handleConfirmPurchase = () => {
    setPaymentDone(true);
  };

  // Submit query inside floating AI companion
  const handleSendAiDeskMsg = async () => {
    if (!aiChatQuery.trim()) return;
    const userMsg = aiChatQuery;
    setAiChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setAiChatQuery("");
    setAiDeskLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Student query about MEDHA XL IT Training and Academics: "${userMsg}". Provide a helpful corporate response as MEDHA XL support representative.` }),
      });
      const data = await response.json();
      setAiChatMessages(prev => [...prev, { role: "ai", text: data.text }]);
    } catch (err) {
      console.error(err);
      setAiChatMessages(prev => [...prev, { role: "ai", text: "Our server-side AI model is currently rebooting. For instant admissions assistance, please ping our coordinator at hyd@medhaxl.com." }]);
    } finally {
      setAiDeskLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans">
      
      {/* Header element */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        wishlistCount={wishlist.length}
      />

      {/* --- RENDER SPECIFIC ROUTE TABS --- */}
      <main className="relative min-h-[70vh]">
        
        {/* TAB 1: Home Landing */}
        {currentTab === "home" && (
          <div className="space-y-16 pb-12">
            {/* Immersive Hero */}
            <Hero setCurrentTab={setCurrentTab} onBookDemo={() => setCurrentTab("contact")} />

            {/* Why Medha XL - Corporate USP Matrix */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Why Medha XL?</p>
                <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">What Sets Us Apart</h3>
                <p className="max-w-xl mx-auto text-xs text-gray-500">Unlike general online courses, we focus on interactive live code-along sprints and real-world project portfolios.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-slate-900 border p-6 rounded-2xl space-y-3 shadow-sm hover:shadow-lg transition-all">
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center font-bold">1</div>
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">Senior MNC Tech Leads</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Learn directly from experts who build products for major MNCs. Real production architectures, not just dry slide-decks.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border p-6 rounded-2xl space-y-3 shadow-sm hover:shadow-lg transition-all">
                  <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center font-bold">2</div>
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">AI Integrated Workspace</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Evaluate your resume against top MNC job profiles and practice live coding interviews with simulated recruiters.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border p-6 rounded-2xl space-y-3 shadow-sm hover:shadow-lg transition-all">
                  <div className="h-10 w-10 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-xl flex items-center justify-center font-bold">3</div>
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">Physical Classrooms Tour</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Gain hands-on guidance with walk-in lab sessions at our Hyderabad (Madhapur), Bangalore, and Visakhapatnam branches.
                  </p>
                </div>
              </div>
            </section>

            {/* Placement Success Stories Bento-Grid layout */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Student Success Stories</p>
                <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Bento Placements Matrix</h3>
                <p className="max-w-xl mx-auto text-xs text-gray-500">Read how manual QAs, college freshers, and non-IT graduates transformed their careers.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {STUDENT_STORIES.map((story) => (
                  <div
                    key={story.id}
                    className="bg-white dark:bg-slate-900 border p-5 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex gap-3 items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {story.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">{story.name}</h4>
                          <p className="text-[10px] text-gray-400 font-semibold">{story.course} ({story.previousSalary})</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-slate-400 italic leading-relaxed">
                        "{story.quote}"
                      </p>
                    </div>

                    <div className="border-t pt-3 mt-2 flex justify-between items-center text-[11px] font-bold">
                      <span className="text-purple-600 dark:text-purple-400">{story.company}</span>
                      <span className="bg-green-50 text-green-600 dark:bg-green-950/20 px-2 py-0.5 rounded text-[10px]">{story.placedSalary}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hiring Partners & Corporate Grid */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
              <p className="text-center text-[10px] font-black uppercase text-gray-400 tracking-widest">Acredited Hiring Partnerships</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                {["TCS", "Infosys", "Wipro", "Tech Mahindra", "Cognizant", "Accenture"].map((corp, i) => (
                  <span key={i} className="font-serif font-black text-sm tracking-widest text-slate-400 dark:text-slate-500">
                    {corp}
                  </span>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: Explore Courses */}
        {currentTab === "courses" && (
          <CoursesView
            onWishlistToggle={handleWishlistToggle}
            wishlist={wishlist}
            onEnroll={(course) => setCheckoutCourse(course)}
          />
        )}

        {/* TAB 3: About Us */}
        {currentTab === "about" && (
          <About />
        )}

        {/* TAB 4: AI Learning Hub */}
        {currentTab === "ai-hub" && (
          <AIHub />
        )}

        {/* TAB 5: Online Code Editor */}
        {currentTab === "playground" && (
          <CodingPlayground />
        )}

        {/* TAB 6: Contact & Branch Directory */}
        {currentTab === "contact" && (
          <ContactView />
        )}

        {/* TAB 7: Student LMS */}
        {currentTab === "lms" && (
          <LMSPortal />
        )}

        {/* TAB 8: Trainer & Admin Portal */}
        {currentTab === "admin" && (
          <AdminPanel role={userRole} />
        )}

      </main>

      {/* --- STANDARD GLOBAL SITE FOOTER --- */}
      <Footer onNavigate={(tab) => setCurrentTab(tab)} />

      {/* --- INTERACTIVE ENROLLMENT & CHECKOUT MODAL --- */}
      {checkoutCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 dark:bg-slate-900 shadow-2xl border border-gray-150 dark:border-gray-800">
            <button
              onClick={() => { setCheckoutCourse(null); setPaymentDone(false); setPromoCode(""); setDiscountPercent(0); setPromoFeedback(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {!paymentDone ? (
              <div className="space-y-5">
                <div className="space-y-1 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] font-bold uppercase text-blue-600 tracking-wider font-poppins">Medha Tuition Checkout</p>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white font-poppins">Secure Enrollment Gateway</h4>
                </div>

                <div className="bg-gray-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-gray-800 dark:text-slate-200 font-poppins">
                    <span>Course Selected:</span>
                    <span>{checkoutCourse.title}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-poppins">
                    <span>Original Tuition Fee:</span>
                    <span>₹{checkoutCourse.price.toLocaleString("en-IN")}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-500 font-bold font-poppins">
                      <span>Promo Discount ({discountPercent}%):</span>
                      <span>- ₹{Math.round((checkoutCourse.price * discountPercent) / 100).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-950 dark:text-white border-t border-slate-150 dark:border-slate-800 pt-1.5 mt-1 font-poppins">
                    <span>Total Investment:</span>
                    <span className="text-blue-600 dark:text-blue-400">₹{Math.round(checkoutCourse.price * (1 - discountPercent / 100)).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1.5">
                  <div className="flex gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Enter Coupon (Try: MEDHA20)"
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value); setPromoFeedback(null); }}
                      className="flex-1 rounded-xl border bg-gray-50 px-3 py-2 outline-none uppercase dark:border-gray-850 dark:bg-slate-950 font-semibold"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold dark:bg-white dark:text-slate-900 font-poppins"
                    >
                      Apply
                    </button>
                  </div>

                  {promoFeedback && (
                    <div className={`p-2.5 rounded-lg text-xs font-semibold ${
                      promoFeedback.type === "success" 
                        ? "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 border border-green-100 dark:border-green-900/40" 
                        : "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/40"
                    }`}>
                      {promoFeedback.text}
                    </div>
                  )}
                </div>

                {/* Choose Payment Method */}
                <div className="space-y-2 text-xs">
                  <label className="block font-bold text-gray-400 uppercase tracking-wide font-poppins">Choose Payment Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMode("upi")}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer font-poppins ${
                        paymentMode === "upi" ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-950/30" : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      Instant UPI
                    </button>
                    <button
                      onClick={() => setPaymentMode("card")}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer font-poppins ${
                        paymentMode === "card" ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-950/30" : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      onClick={() => setPaymentMode("emi")}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer font-poppins ${
                        paymentMode === "emi" ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-950/30" : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      0% EMI Plan
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleConfirmPurchase}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 font-poppins cursor-pointer transition-opacity"
                >
                  <CreditCard className="h-4 w-4" /> Confirm & Transact Payment
                </button>
              </div>
            ) : (
              <div className="text-center p-6 space-y-4 animate-fadeIn">
                <div className="h-12 w-12 bg-green-100 text-green-600 dark:bg-green-950/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white font-poppins">Tuition payment Successful!</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Congratulations! Your transaction was approved securely. Your slot in <strong className="font-semibold text-gray-800 dark:text-white">{checkoutCourse.title}</strong> is secured. Direct batch timings and log codes have been texted to your registered mobile.
                </p>
                <div className="bg-slate-950 text-white p-4 rounded-xl text-left text-[11px] font-mono border border-slate-800 space-y-1">
                  <p className="font-bold text-blue-400">MEDHA XL OFFICIAL RECEIPT</p>
                  <p>Transaction ID: TXN-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p>Amount Settled: ₹{Math.round(checkoutCourse.price * (1 - discountPercent / 100)).toLocaleString("en-IN")}</p>
                  <p>Payment Source: {paymentMode.toUpperCase()}</p>
                </div>
                <button
                  onClick={() => { setCheckoutCourse(null); setPaymentDone(false); setPromoCode(""); setDiscountPercent(0); setPromoFeedback(null); }}
                  className="px-5 py-2 border rounded-xl text-xs font-bold hover:bg-gray-50 dark:border-gray-800 font-poppins cursor-pointer transition-colors"
                >
                  Close Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- PERSISTENT FLOATING WIDGETS --- */}
      {/* 1. WhatsApp Float chat */}
      <a
        href="https://wa.me/919652532753"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 h-12 w-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        title="Chat on WhatsApp"
      >
        <Phone className="h-5.5 w-5.5" />
      </a>

      {/* 2. Floating AI Assistant Chat drawer */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Toggle bubble button */}
        <button
          onClick={() => setShowAiChatDesk(!showAiChatDesk)}
          className="h-12 w-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          title="Medha AI Admissions Assistant"
        >
          {showAiChatDesk ? <X className="h-5.5 w-5.5" /> : <MessageSquare className="h-5.5 w-5.5" />}
        </button>

        {/* Chat Drawer element */}
        {showAiChatDesk && (
          <div className="w-80 sm:w-96 rounded-2xl border border-gray-150 bg-white shadow-2xl dark:border-gray-800 dark:bg-slate-900 overflow-hidden flex flex-col animate-slideUp">
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-yellow-300 animate-spin" />
                <div className="text-left">
                  <h4 className="text-xs font-black">MEDHA XL AI Assistant</h4>
                  <p className="text-[9px] text-blue-200">Online support desk</p>
                </div>
              </div>
              <button onClick={() => setShowAiChatDesk(false)} className="text-white hover:opacity-85">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Chat screen history */}
            <div className="h-64 overflow-y-auto p-4 space-y-3.5 bg-gray-50 dark:bg-slate-950">
              {aiChatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 text-xs max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div className={`p-2.5 rounded-xl ${
                    msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 border dark:bg-slate-900 dark:text-slate-100 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiDeskLoading && (
                <div className="flex gap-2 items-center text-xs text-gray-400">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                  <span>AI counselor is typing...</span>
                </div>
              )}
            </div>

            {/* Input Desk */}
            <div className="p-3 border-t flex gap-1.5 bg-white dark:bg-slate-900">
              <input
                type="text"
                placeholder="Ask about admissions, branches, or EMI..."
                value={aiChatQuery}
                onChange={(e) => setAiChatQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSendAiDeskMsg(); }}
                className="flex-1 rounded-xl border bg-gray-50 px-3 py-2 text-xs outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-slate-950 dark:text-white"
              />
              <button
                onClick={handleSendAiDeskMsg}
                disabled={aiDeskLoading || !aiChatQuery.trim()}
                className="px-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Smooth Back To Top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-22 right-6 z-30 h-10 w-10 bg-white text-gray-800 hover:bg-gray-100 border dark:bg-slate-900 dark:text-slate-100 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
          title="Scroll to Top"
        >
          <ArrowUp className="h-4.5 w-4.5" />
        </button>
      )}

    </div>
  );
}
