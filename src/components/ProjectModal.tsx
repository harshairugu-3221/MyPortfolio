import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, ListTodo, Tag, ChevronLeft, ChevronRight, Play, ExternalLink, ArrowRight } from "lucide-react";
import InteractiveSandbox from "./InteractiveSandbox";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Reset slide index on project change
  useEffect(() => {
    setActiveSlide(0);
  }, [project]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // lock scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // unlock scroll
    };
  }, [project, onClose]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project) return;
    setActiveSlide((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project) return;
    setActiveSlide((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const handleCtaInquiry = () => {
    onClose();
    // Smooth scroll to contact form
    setTimeout(() => {
      const contactSec = document.querySelector("#contact");
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4 md:p-6" id="project-modal-container">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 dark:bg-black/90 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Container Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl bg-white dark:bg-[#0d0d0e] border border-gray-100 dark:border-zinc-800/80 shadow-2xl rounded-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            id={`modal-body-${project.id}`}
          >
            {/* Modal Sticky Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-800/80 bg-white/90 dark:bg-[#0d0d0e]/95 backdrop-blur-md sticky top-0 z-20">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">
                  {project.category}
                </span>
                <h2 className="font-display font-semibold text-lg md:text-xl text-black dark:text-white leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none"
                aria-label="Close modal"
                id="modal-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10">
              
              {/* SECTION 1: High Fidelity Image Slider */}
              <div className="space-y-3">
                <div className="relative aspect-16/9 w-full overflow-hidden bg-gray-50 dark:bg-zinc-950 border border-gray-100/40 dark:border-white/5 rounded-sm group">
                  {/* Active Slide Image */}
                  <img
                    src={project.images[activeSlide]}
                    alt={`${project.title} showcase slide ${activeSlide + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* Absolute Slider Navigations */}
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 dark:bg-black/85 hover:bg-white dark:hover:bg-black text-black dark:text-white flex items-center justify-center shadow-md border border-gray-100 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 dark:bg-black/85 hover:bg-white dark:hover:bg-black text-black dark:text-white flex items-center justify-center shadow-md border border-gray-100 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Slide number counter overlay */}
                  <div className="absolute bottom-4 right-4 bg-black/70 dark:bg-black/80 px-2.5 py-1 text-[9px] font-mono text-white tracking-widest rounded-xs">
                    {activeSlide + 1} / {project.images.length}
                  </div>
                </div>

                {/* Inline Dot Indicators */}
                <div className="flex justify-center gap-1.5 py-1">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-1.5 rounded-full transition-all focus:outline-none ${
                        activeSlide === idx ? "w-6 bg-black dark:bg-white" : "w-1.5 bg-gray-300 dark:bg-zinc-700"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* SECTION 2: Project Metadata Details Grid & Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-gray-100 dark:border-white/5 pt-8">
                {/* Description Left */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                    Project Overview
                  </h3>
                  <p className="font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                    {project.detailedDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-2 py-0.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400 rounded-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Parameters Sidebar Right */}
                <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-gray-100 lg:dark:border-white/5 lg:pl-8">
                  {/* Meta Table */}
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100 dark:border-white/5">
                    <div className="space-y-1">
                      <span className="block font-mono text-[9px] uppercase text-gray-400">Client Partner</span>
                      <span className="font-sans text-xs font-semibold text-gray-800 dark:text-gray-200">{project.client}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block font-mono text-[9px] uppercase text-gray-400">Chronological Year</span>
                      <span className="font-sans text-xs font-semibold text-gray-800 dark:text-gray-200">{project.year}</span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <ListTodo className="w-3.5 h-3.5" />
                      <span className="font-mono text-[9px] uppercase tracking-wider">Scope Deliverables</span>
                    </div>
                    <ul className="space-y-1.5 pl-5 list-disc text-xs text-gray-600 dark:text-gray-400 font-light">
                      {project.deliverables.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 2.5: Technical Challenges & Solutions */}
              {project.challenges && project.challenges.length > 0 && (
                <div className="border-t border-gray-100 dark:border-white/5 pt-8 space-y-6">
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-base text-black dark:text-white uppercase tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Technical Challenges & Architectural Solutions
                    </h4>
                    <p className="font-sans text-xs text-gray-400 dark:text-gray-500 font-light">
                      A granular post-mortem of specific architectural hurdles encountered during execution and the engineering strategies deployed to solve them.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {project.challenges.map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50/50 dark:bg-[#141415] border border-gray-150 dark:border-zinc-800/60 p-6 rounded-xl space-y-4 relative overflow-hidden group hover:border-gray-200 dark:hover:border-zinc-700 transition-all duration-300"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-60" />
                        
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-[9px] text-zinc-500 bg-gray-150 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-200 dark:border-white/5">
                            0{index + 1}
                          </span>
                          <h5 className="font-sans font-bold text-sm md:text-base text-black dark:text-white group-hover:text-accent transition-colors duration-200">
                            {item.title}
                          </h5>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                          <div className="space-y-2">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-rose-500 dark:text-rose-400 font-bold block">
                              The Hurdle // Challenge
                            </span>
                            <p className="font-sans text-xs text-gray-600 dark:text-zinc-400 leading-relaxed font-light">
                              {item.challenge}
                            </p>
                          </div>
                          <div className="space-y-2 bg-white/70 dark:bg-[#0d0d0e] border border-gray-100 dark:border-zinc-800/40 p-4 rounded-lg">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-bold block">
                              Architectural Resolve // Solution
                            </span>
                            <p className="font-sans text-xs text-gray-800 dark:text-zinc-300 leading-relaxed font-light">
                              {item.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: Live Embedded Sandbox Component */}
              <div className="border-t border-gray-100 dark:border-white/5 pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-base text-black dark:text-white uppercase tracking-tight">
                      Simulation Laboratory
                    </h4>
                    <p className="font-sans text-[11px] text-gray-400 dark:text-gray-500 font-light mt-0.5">
                      Fine-tune variables to experience digital design responsiveness on multiple screens.
                    </p>
                  </div>
                </div>

                {/* Mount the interactive sandbox component */}
                <InteractiveSandbox project={project} />
              </div>

              {/* SECTION 4: Clear Minimalist Call To Actions */}
              <div className="border-t border-gray-100 dark:border-zinc-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-zinc-50/50 dark:bg-[#141415] p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/60">
                <div className="text-center sm:text-left">
                  <span className="block font-mono text-[9px] uppercase text-gray-400">
                    PROJECT SYSTEM CALL
                  </span>
                  <p className="font-sans text-xs font-medium text-gray-800 dark:text-gray-200 mt-0.5">
                    Interested in similar typographic guidelines or identity packages?
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center">
                  {/* External mockup site trigger link */}
                  {project.prototypeUrl && (
                    <a
                      href={project.prototypeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-mono text-[10px] uppercase tracking-wider rounded-sm transition-all focus:outline-none"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Visit Live Spec
                    </a>
                  )}

                  {/* Direct Proposal request anchor */}
                  <button
                    onClick={handleCtaInquiry}
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-mono text-[10px] uppercase tracking-wider rounded-sm transition-all focus:outline-none"
                    id={`modal-cta-inquiry-${project.id}`}
                  >
                    Request Project Quote
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
