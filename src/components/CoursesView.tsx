import React, { useState } from "react";
import { BookOpen, Star, Clock, UserCheck, Play, Calculator, ArrowRight, Heart, Shuffle, X, Search, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Course, COURSES } from "../types";

interface CoursesViewProps {
  onWishlistToggle: (courseId: string) => void;
  wishlist: string[];
  onEnroll: (course: Course) => void;
}

export default function CoursesView({ onWishlistToggle, wishlist, onEnroll }: CoursesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Course Comparison States
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // EMI Calculator States
  const [selectedEmiCourse, setSelectedEmiCourse] = useState<Course | null>(COURSES[1]); // MERN as default
  const [downPayment, setDownPayment] = useState<number>(10000);
  const [tenure, setTenure] = useState<number>(6); // Default 6 months

  // Categories mapping
  const categories = [
    { id: "all", label: "All Curriculums" },
    { id: "development", label: "Development" },
    { id: "testing", label: "QA & Testing" },
    { id: "data", label: "AI & Data Analytics" },
    { id: "cloud", label: "DevOps & Cloud" },
    { id: "programs", label: "Premium Programs" }
  ];

  // Filtering Logic
  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.trainer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [compareError, setCompareError] = useState(false);

  // Handle Course Comparison select
  const toggleCompare = (courseId: string) => {
    if (compareList.includes(courseId)) {
      setCompareList(compareList.filter(id => id !== courseId));
      setCompareError(false);
    } else {
      if (compareList.length >= 2) {
        setCompareError(true);
        return;
      }
      setCompareError(false);
      setCompareList([...compareList, courseId]);
    }
  };

  // Calculate EMI values
  const coursePrice = selectedEmiCourse ? selectedEmiCourse.price : 0;
  const principalForEmi = Math.max(0, coursePrice - downPayment);
  const monthlyEmi = tenure > 0 ? Math.round(principalForEmi / tenure) : 0;

  return (
    <div className="py-12 bg-gray-50 dark:bg-slate-950/50 text-gray-800 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 font-poppins">Medha XL Syllabus</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins tracking-tight text-gray-900 dark:text-white">
            Explore Industry-Oriented Courses
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-500 dark:text-slate-400">
            Compare curriculums, calculate low-interest monthly EMIs, and select the perfect IT training module.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start w-full lg:w-auto">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all font-poppins ${
                  selectedCategory === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by topic, trainer, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-xs outline-none focus:border-blue-500 focus:bg-white dark:border-gray-800 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        {/* Compare quick trigger bar */}
        {(compareList.length > 0 || compareError) && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-xl shadow-lg transition-all animate-fadeIn">
            <div className="flex items-center gap-3">
              <Shuffle className="h-5 w-5 animate-pulse" />
              <p className="text-xs sm:text-sm font-semibold">
                {compareError ? "You can compare up to 2 courses simultaneously." : `You have selected ${compareList.length} course(s) to compare.`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setCompareList([]); setCompareError(false); }}
                className="text-xs text-blue-100 hover:underline px-2.5 py-1 cursor-pointer"
              >
                Clear Selection
              </button>
              {compareList.length === 2 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="px-4 py-1.5 bg-white text-blue-600 rounded-lg text-xs font-bold hover:bg-opacity-90 shadow cursor-pointer transition-all"
                >
                  Compare Now
                </button>
              )}
            </div>
          </div>
        )}

        {/* Grid of Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isWishlisted = wishlist.includes(course.id);
            const isComparing = compareList.includes(course.id);

            return (
              <div
                key={course.id}
                className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Course Header Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md dark:bg-slate-900/90 text-gray-800 dark:text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    {course.category}
                  </span>

                  {/* Rating Badge */}
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-yellow-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    <Star className="h-3 w-3 fill-slate-950" /> {course.rating}
                  </span>

                  {/* Actions overlaid */}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {/* Wishlist toggle */}
                    <button
                      onClick={() => onWishlistToggle(course.id)}
                      className="p-1.5 bg-white/90 backdrop-blur-md dark:bg-slate-900/90 text-gray-700 dark:text-slate-300 hover:text-red-500 rounded-full shadow hover:scale-105 transition-all"
                      title="Add to Wishlist"
                    >
                      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                    {/* Compare selector */}
                    <button
                      onClick={() => toggleCompare(course.id)}
                      className={`p-1.5 rounded-full shadow hover:scale-105 transition-all ${
                        isComparing
                          ? "bg-cyan-600 text-white"
                          : "bg-white/90 backdrop-blur-md dark:bg-slate-900/90 text-gray-700 dark:text-slate-300 hover:text-cyan-600"
                      }`}
                      title="Compare Course"
                    >
                      <Shuffle className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-slate-400 font-semibold">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                      <span>•</span>
                      <span className="text-blue-600 dark:text-blue-400">{course.mode}</span>
                      <span>•</span>
                      <span className="capitalize px-1.5 py-0.5 bg-gray-100 dark:bg-slate-800 rounded">{course.level}</span>
                    </div>

                    <h3 className="text-base font-bold font-poppins text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>

                    {/* Trainer name */}
                    <p className="text-xs font-bold text-gray-600 dark:text-slate-300">
                      Trainer: <span className="font-normal text-gray-500 dark:text-slate-400">{course.trainer}</span>
                    </p>

                    {/* Course syllabus highlights */}
                    <ul className="space-y-1.5 pt-1">
                      {course.highlights.slice(0, 3).map((high, index) => (
                        <li key={index} className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{high}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Enroll Trigger */}
                  <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Investment</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-blue-600 dark:text-blue-400">₹{course.price.toLocaleString("en-IN")}</span>
                        <span className="text-xs text-gray-400 line-through">₹{course.originalPrice.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="px-3 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all"
                      >
                        Syllabus
                      </button>
                      <button
                        onClick={() => onEnroll(course)}
                        className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:from-blue-700 hover:to-cyan-600 shadow-md"
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* --- EMI / FEE CALCULATOR SECTION (Aesthetic interactive component) --- */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 sm:p-8 grid md:grid-cols-2 gap-8 items-center shadow-lg">
          <div className="space-y-4">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center">
              <Calculator className="h-5.5 w-5.5" />
            </div>
            <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white">0% Interest Flexible EMI Calculator</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              Plan your learning budget beforehand. Medha XL provides zero-cost monthly installments in collaboration with major payment credit channels. Select a course, set your initial contribution, and check monthly payouts instantly.
            </p>
            <div className="bg-gray-50 dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-gray-800/40 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span>Select Course:</span>
                <span className="text-blue-600 dark:text-blue-400">{selectedEmiCourse?.title}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Standard Tuition:</span>
                <span>₹{selectedEmiCourse?.price.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 dark:bg-slate-950/60 p-5 rounded-2xl border border-gray-100 dark:border-gray-800/60">
            {/* Choose Course */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Course</label>
              <select
                value={selectedEmiCourse?.id}
                onChange={(e) => {
                  const item = COURSES.find(c => c.id === e.target.value);
                  if (item) setSelectedEmiCourse(item);
                }}
                className="w-full text-xs font-medium p-2.5 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-slate-900 outline-none"
              >
                {COURSES.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-400 uppercase tracking-wider">Initial Down Payment</span>
                <span className="text-blue-600">₹{downPayment.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="25000"
                step="1000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Tenure Options */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">EMI Tenure (Months)</label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 6, 9].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenure(m)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      tenure === m
                        ? "bg-blue-600 border-blue-600 text-white shadow"
                        : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-slate-900"
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Output Output */}
            <div className="border-t border-gray-200/60 dark:border-gray-800/60 pt-4 mt-2 text-center bg-white dark:bg-slate-900 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Estimated Monthly EMI</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                ₹{monthlyEmi.toLocaleString("en-IN")} <span className="text-xs font-medium text-gray-400">/ month</span>
              </p>
              <p className="text-[9px] text-green-500 font-bold mt-1">✔ 0% Interest • No processing fee applied</p>
            </div>
          </div>
        </div>

      </div>

      {/* --- COURSE DETAILED SYLLABUS MODAL --- */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 dark:bg-slate-900 shadow-2xl border border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Course Summary */}
            <div className="flex gap-4 items-start border-b border-slate-100 dark:border-slate-800 pb-5">
              <img src={selectedCourse.image} alt={selectedCourse.title} className="h-16 w-24 object-cover rounded-xl" />
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 rounded text-[10px] font-bold uppercase font-poppins">{selectedCourse.category}</span>
                <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white">{selectedCourse.title}</h3>
                <p className="text-xs text-gray-500">{selectedCourse.duration} • {selectedCourse.mode} • {selectedCourse.level}</p>
              </div>
            </div>

            {/* Curriculum syllabus modules */}
            <div className="py-5 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Complete Syllabus Modules</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedCourse.syllabus.map((topic, i) => (
                  <div key={i} className="flex gap-2 items-start bg-gray-50 dark:bg-slate-950 p-3 rounded-xl border border-gray-100 dark:border-gray-800/40 text-xs">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold text-[10px]">{i+1}</span>
                    <span className="text-gray-700 dark:text-slate-300 leading-snug">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer triggers */}
            <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800/80 pt-5 mt-4">
              <div>
                <p className="text-[10px] text-gray-400">Tutorship fee</p>
                <p className="text-xl font-black text-gray-950 dark:text-white">₹{selectedCourse.price.toLocaleString("en-IN")}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { onWishlistToggle(selectedCourse.id); setSelectedCourse(null); }}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-xs font-bold rounded-xl"
                >
                  Wishlist
                </button>
                <button
                  onClick={() => { onEnroll(selectedCourse); setSelectedCourse(null); }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-xs font-bold text-white rounded-xl shadow"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- COURSE DUAL COMPARISON MODAL --- */}
      {showCompareModal && compareList.length === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 sm:p-8 dark:bg-slate-900 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowCompareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Shuffle className="h-5 w-5 text-blue-500" /> Syllabus Comparison Matrix
            </h3>

            {(() => {
              const course1 = COURSES.find(c => c.id === compareList[0]);
              const course2 = COURSES.find(c => c.id === compareList[1]);
              if (!course1 || !course2) return null;

              return (
                <div className="grid grid-cols-2 gap-4 divide-x divide-gray-100 dark:divide-gray-800">
                  {/* Course 1 Column */}
                  <div className="pr-4 space-y-4">
                    <img src={course1.image} alt={course1.title} className="h-24 w-full object-cover rounded-xl" />
                    <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">{course1.title}</h4>
                    <div className="space-y-1.5 text-xs text-gray-500">
                      <p><strong>Duration:</strong> {course1.duration}</p>
                      <p><strong>Mode:</strong> {course1.mode}</p>
                      <p><strong>Trainer:</strong> {course1.trainer}</p>
                      <p><strong>Fee Structure:</strong> <span className="font-black text-blue-600">₹{course1.price.toLocaleString("en-IN")}</span></p>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <p className="text-[10px] font-black uppercase text-gray-400">Core Curriculum Topics</p>
                      <ul className="space-y-1">
                        {course1.syllabus.map((topic, index) => (
                          <li key={index} className="text-xs text-gray-600 dark:text-slate-300 flex gap-1.5 items-start">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Course 2 Column */}
                  <div className="pl-4 space-y-4">
                    <img src={course2.image} alt={course2.title} className="h-24 w-full object-cover rounded-xl" />
                    <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">{course2.title}</h4>
                    <div className="space-y-1.5 text-xs text-gray-500">
                      <p><strong>Duration:</strong> {course2.duration}</p>
                      <p><strong>Mode:</strong> {course2.mode}</p>
                      <p><strong>Trainer:</strong> {course2.trainer}</p>
                      <p><strong>Fee Structure:</strong> <span className="font-black text-cyan-600">₹{course2.price.toLocaleString("en-IN")}</span></p>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <p className="text-[10px] font-black uppercase text-gray-400">Core Curriculum Topics</p>
                      <ul className="space-y-1">
                        {course2.syllabus.map((topic, index) => (
                          <li key={index} className="text-xs text-gray-600 dark:text-slate-300 flex gap-1.5 items-start">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex justify-end gap-2 border-t pt-5 mt-6">
              <button
                onClick={() => setCompareList([])}
                className="px-4 py-2 border rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 dark:border-gray-800"
              >
                Reset Compare
              </button>
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
