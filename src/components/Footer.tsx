import React, { useState } from "react";
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, ShieldCheck } from "lucide-react";

export default function Footer({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      {/* Upper Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand identity */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="bg-blue-600 text-white h-9 w-9 rounded-xl flex items-center justify-center font-bold font-poppins shadow-md shrink-0">
              <svg viewBox="0 0 100 100" className="h-6 w-6 text-white">
                <polygon points="50,5 93,30 93,80 50,95 7,80 7,30" fill="currentColor" />
                <text x="50" y="62" fill="white" fontSize="36" fontWeight="900" fontFamily="Poppins, sans-serif" textAnchor="middle">MR</text>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-poppins font-extrabold text-white text-sm tracking-wide leading-tight">MR TECHNOLOGIES</span>
              <span className="font-poppins font-bold text-purple-400 text-xs tracking-widest leading-none">MEDHA - RUBIKS</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0">
            Learn Today. Lead Tomorrow. Industry-oriented, hands-on IT training designed to land students in premium MNC developer roles.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 text-slate-400">
            <Facebook className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            <Youtube className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Sitemap */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-xs font-bold uppercase text-white tracking-widest font-poppins">Platform Curriculums</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate("courses")} className="hover:text-white transition-colors cursor-pointer text-slate-400">MERN Stack Development</button></li>
            <li><button onClick={() => onNavigate("courses")} className="hover:text-white transition-colors cursor-pointer text-slate-400">Java Full Stack Developer</button></li>
            <li><button onClick={() => onNavigate("courses")} className="hover:text-white transition-colors cursor-pointer text-slate-400">SDET Testing Automation</button></li>
            <li><button onClick={() => onNavigate("courses")} className="hover:text-white transition-colors cursor-pointer text-slate-400">Cloud DevOps Architecture</button></li>
          </ul>
        </div>

        {/* Resource links */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-xs font-bold uppercase text-white tracking-widest font-poppins">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate("ai")} className="hover:text-white transition-colors cursor-pointer text-slate-400">AI Career Counsellor</button></li>
            <li><button onClick={() => onNavigate("sandbox")} className="hover:text-white transition-colors cursor-pointer text-slate-400">Online Code Compiler</button></li>
            <li><button onClick={() => onNavigate("contact")} className="hover:text-white transition-colors cursor-pointer text-slate-400">Office Branches Map</button></li>
            <li><button onClick={() => onNavigate("contact")} className="hover:text-white transition-colors cursor-pointer text-slate-400">Admissions FAQ</button></li>
          </ul>
        </div>

        {/* Inbound Newsletter */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-xs font-bold uppercase text-white tracking-widest font-poppins">Placement Newsletter</h4>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0">
            Receive weekly lists of MNC hiring drives, salary trends, and interview reviews.
          </p>
          {subscribed ? (
            <div className="bg-blue-900/30 border border-blue-800 text-blue-300 rounded-lg p-3 text-xs text-center max-w-xs mx-auto md:mx-0">
              <p className="font-semibold font-poppins">🎉 Enrolled Successfully!</p>
              <p className="text-[10px] text-slate-400 mt-1">Check your inbox for weekly hiring lists.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-xs mx-auto md:mx-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="bg-slate-950 text-xs px-3 py-2 rounded-lg border border-slate-800 outline-none flex-1 text-white focus:border-blue-600 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow cursor-pointer transition-colors font-poppins"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Compliance footer section */}
      <div className="border-t border-slate-800 py-6 text-center text-[10px] text-slate-500 bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Medha XL Software Solutions Private Limited. All Rights Reserved.</p>
          <div className="flex gap-3 justify-center text-slate-400">
            <span className="hover:underline cursor-pointer">Refund Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
