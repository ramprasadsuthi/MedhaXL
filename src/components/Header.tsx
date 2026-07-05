import React, { useState, useEffect } from "react";
import { BookOpen, Search, Sun, Moon, Sparkles, User, LogIn, ChevronDown, Heart, Shield, GraduationCap, Menu, X, ArrowRight, Phone } from "lucide-react";
import { COURSES } from "../types";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: "visitor" | "student" | "trainer" | "admin";
  setUserRole: (role: "visitor" | "student" | "trainer" | "admin") => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  wishlistCount: number;
}

export default function Header({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  darkMode,
  setDarkMode,
  wishlistCount
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Handle Search Input
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filtered = COURSES.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  // Handle outside clicks for Role Dropdown
  useEffect(() => {
    if (!isRoleDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#portal-switcher-container")) {
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isRoleDropdownOpen]);

  return (
    <header className="glass sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Top Banner (Info / Action) */}
      <div className="bg-gradient-to-r from-blue-700 to-purple-600 py-1.5 px-4 text-center text-xs font-semibold text-white tracking-wide shadow-sm">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-purple-200" />
          Medha XL AI Hub is LIVE: Generate personalized study plans & analyze your resume instantly!
          <button 
            onClick={() => setCurrentTab("ai-hub")}
            className="underline hover:text-purple-100 ml-1.5 transition-all font-bold"
            id="header-cta-top"
          >
            Try AI Advisor <ArrowRight className="inline-block h-3 w-3" />
          </button>
        </span>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => { setCurrentTab("home"); setIsMobileMenuOpen(false); }}
          className="flex cursor-pointer items-center gap-3"
          id="brand-logo-container"
        >
          {/* Hexagonal Blue Logo as in the actual MR Technologies image */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0 shadow-md">
            <svg viewBox="0 0 100 100" className="h-8 w-8 text-white">
              <polygon points="50,5 93,30 93,80 50,95 7,80 7,30" fill="currentColor" />
              <polygon points="50,12 87,33 87,77 50,90 13,77 13,33" fill="none" stroke="#a78bfa" strokeWidth="4" />
              <text x="50" y="62" fill="white" fontSize="32" fontWeight="900" fontFamily="Poppins, sans-serif" textAnchor="middle">MR</text>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-extrabold font-poppins tracking-wider text-blue-600 dark:text-blue-400 leading-tight">
              MR TECHNOLOGIES
            </span>
            <span className="text-[10px] font-bold font-poppins tracking-widest text-slate-800 dark:text-slate-100 leading-none">
              MEDHA - RUBIKS
            </span>
            <span className="text-[7px] font-extrabold tracking-widest text-slate-500 dark:text-slate-400 uppercase leading-none mt-1 font-poppins">
              Trainings - Placements - Services
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          <button
            onClick={() => setCurrentTab("home")}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              currentTab === "home"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            }`}
          >
            Home
          </button>

          {/* Courses with Mega Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button
              onClick={() => setCurrentTab("courses")}
              className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-all ${
                currentTab === "courses"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              }`}
            >
              Courses
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Mega Menu Dropdown */}
            {isMegaMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/3 top-full w-[520px] rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl dark:border-gray-800 dark:bg-slate-900 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Development & Cloud</h4>
                  <div className="space-y-1">
                    <button onClick={() => { setCurrentTab("courses"); setIsMegaMenuOpen(false); }} className="flex flex-col items-start text-left p-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 w-full rounded-lg">
                      <span className="text-xs font-semibold text-gray-800 dark:text-slate-200">MERN Stack (AI Integration)</span>
                      <span className="text-[10px] text-gray-400">React 19, Next.js, Node.js, Mongo</span>
                    </button>
                    <button onClick={() => { setCurrentTab("courses"); setIsMegaMenuOpen(false); }} className="flex flex-col items-start text-left p-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 w-full rounded-lg">
                      <span className="text-xs font-semibold text-gray-800 dark:text-slate-200">Java Full Stack Enterprise</span>
                      <span className="text-[10px] text-gray-400">Spring Boot, Hibernate, Microservices</span>
                    </button>
                    <button onClick={() => { setCurrentTab("courses"); setIsMegaMenuOpen(false); }} className="flex flex-col items-start text-left p-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 w-full rounded-lg">
                      <span className="text-xs font-semibold text-gray-800 dark:text-slate-200">Cloud DevOps Architect</span>
                      <span className="text-[10px] text-gray-400">AWS, Terraform, Docker, K8s</span>
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">AI, Testing & Creative</h4>
                  <div className="space-y-1">
                    <button onClick={() => { setCurrentTab("courses"); setIsMegaMenuOpen(false); }} className="flex flex-col items-start text-left p-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 w-full rounded-lg">
                      <span className="text-xs font-semibold text-gray-800 dark:text-slate-200">AI & Prompt Engineering</span>
                      <span className="text-[10px] text-gray-400">Generative AI, Langchain, Python ML</span>
                    </button>
                    <button onClick={() => { setCurrentTab("courses"); setIsMegaMenuOpen(false); }} className="flex flex-col items-start text-left p-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 w-full rounded-lg">
                      <span className="text-xs font-semibold text-gray-800 dark:text-slate-200">SDET Automation Testing</span>
                      <span className="text-[10px] text-gray-400">Selenium, Playwright, E2E Testing</span>
                    </button>
                    <button onClick={() => { setCurrentTab("courses"); setIsMegaMenuOpen(false); }} className="flex flex-col items-start text-left p-1.5 hover:bg-gray-50 dark:hover:bg-slate-800 w-full rounded-lg">
                      <span className="text-xs font-semibold text-gray-800 dark:text-slate-200">UI/UX & Product Design</span>
                      <span className="text-[10px] text-gray-400">Figma, Prototyping, Design Systems</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setCurrentTab("about")}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              currentTab === "about"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => setCurrentTab("ai-hub")}
            className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 transition-all ${
              currentTab === "ai-hub" ? "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700" : ""
            }`}
          >
            <Sparkles className="h-4 w-4 animate-bounce text-cyan-500" />
            AI Learning Hub
          </button>

          <button
            onClick={() => setCurrentTab("playground")}
            className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-all ${
              currentTab === "playground"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            }`}
          >
            Code Editor
          </button>

          <button
            onClick={() => setCurrentTab("contact")}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              currentTab === "contact"
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Search, Wishlist, DarkMode & Access Portal Drops */}
        <div className="flex items-center gap-2">
          {/* Real-time search input */}
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Courses..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className="w-40 xl:w-48 rounded-full border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-4 text-xs outline-none transition-all focus:w-56 focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
            />
            {/* Real-time Search Box Overlay */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-gray-100 bg-white p-2 shadow-2xl dark:border-gray-800 dark:bg-slate-900 z-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-1">Search Results</p>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {searchResults.map((course) => (
                    <div
                      key={course.id}
                      onMouseDown={() => {
                        setCurrentTab("courses");
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer text-left"
                    >
                      <img src={course.image} alt={course.title} className="h-8 w-8 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 dark:text-slate-200 truncate">{course.title}</p>
                        <p className="text-[10px] text-gray-400 truncate">{course.mode} • {course.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={() => setCurrentTab("courses")}
            className="relative p-2 text-gray-500 hover:text-red-500 rounded-lg dark:text-slate-300 transition-colors"
            title="Wishlisted Courses"
          >
            <Heart className={`h-5 w-5 ${wishlistCount > 0 ? "fill-red-500 text-red-500" : ""}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Dark/Light mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 rounded-lg dark:text-slate-300 transition-all cursor-pointer"
            id="theme-toggler"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Portal Switcher (Extremely rich developer interactive element!) */}
          <div className="relative group" id="portal-switcher-container">
            <button 
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 shadow-md cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              <span className="capitalize hidden sm:inline">{userRole === "visitor" ? "Portal Access" : `${userRole} Portal`}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${isRoleDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute right-0 mt-2 w-48 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-2xl dark:border-gray-800 dark:bg-slate-900 ${isRoleDropdownOpen ? "block" : "hidden"} z-50 animate-fadeIn`}>
              <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest px-3 py-1">Simulate Roles</p>
              <button
                onClick={() => { setUserRole("visitor"); setCurrentTab("home"); setIsRoleDropdownOpen(false); }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors cursor-pointer ${userRole === "visitor" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40" : "text-gray-700 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-800"}`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Visitor Site
              </button>
              <button
                onClick={() => { setUserRole("student"); setCurrentTab("lms"); setIsRoleDropdownOpen(false); }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors cursor-pointer ${userRole === "student" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40" : "text-gray-700 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-800"}`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                Student Portal
              </button>
              <button
                onClick={() => { setUserRole("trainer"); setCurrentTab("admin"); setIsRoleDropdownOpen(false); }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors cursor-pointer ${userRole === "trainer" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40" : "text-gray-700 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-800"}`}
              >
                <Phone className="h-3.5 w-3.5" />
                Trainer Hub
              </button>
              <button
                onClick={() => { setUserRole("admin"); setCurrentTab("admin"); setIsRoleDropdownOpen(false); }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors cursor-pointer ${userRole === "admin" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40" : "text-gray-700 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-800"}`}
              >
                <Shield className="h-3.5 w-3.5" />
                Admin Panel
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-1 shadow-inner max-h-[85vh] overflow-y-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Courses..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-4 text-xs outline-none focus:border-blue-500 dark:border-gray-800 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <button
            onClick={() => { setCurrentTab("home"); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl ${currentTab === "home" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" : "text-gray-700 dark:text-slate-200"}`}
          >
            Home Landing
          </button>
          <button
            onClick={() => { setCurrentTab("courses"); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl ${currentTab === "courses" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" : "text-gray-700 dark:text-slate-200"}`}
          >
            Explore Courses
          </button>
          <button
            onClick={() => { setCurrentTab("about"); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl ${currentTab === "about" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" : "text-gray-700 dark:text-slate-200"}`}
          >
            About Medha XL
          </button>
          <button
            onClick={() => { setCurrentTab("ai-hub"); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-1.5 text-purple-600 dark:text-purple-400 ${currentTab === "ai-hub" ? "bg-purple-50 dark:bg-purple-950/40" : ""}`}
          >
            <Sparkles className="h-4 w-4 text-purple-500" />
            AI Learning Hub
          </button>
          <button
            onClick={() => { setCurrentTab("playground"); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl ${currentTab === "playground" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" : "text-gray-700 dark:text-slate-200"}`}
          >
            Online Code Editor
          </button>
          <button
            onClick={() => { setCurrentTab("contact"); setIsMobileMenuOpen(false); }}
            className={`block w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl ${currentTab === "contact" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" : "text-gray-700 dark:text-slate-200"}`}
          >
            Contact Address
          </button>

          {/* Quick roles switcher directly in mobile menu */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-4 mb-2">Simulate Portal Roles</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setUserRole("student"); setCurrentTab("lms"); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 dark:border-gray-800 dark:text-slate-300"
              >
                <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                Student
              </button>
              <button
                onClick={() => { setUserRole("admin"); setCurrentTab("admin"); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 dark:border-gray-800 dark:text-slate-300"
              >
                <Shield className="h-3.5 w-3.5 text-purple-500" />
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
