import React from "react";
import { Experience } from "../types";
import { EXPERIENCES } from "../data";
import { motion } from "motion/react";
import { Briefcase, ArrowRight } from "lucide-react";
import TiltCard from "./TiltCard";

export default function ExperienceSection() {
  const skills = [
    { category: "Design Discipline", items: ["Visual Identity", "Typography", "Editorial Layout", "Packaging"] },
    { category: "Expertise & Craft", items: ["Paper Selection", "Prepress Proofing", "Color Systems", "Art Direction"] },
    { category: "Tools & Tech", items: ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop", "WebGL / Shaders"] }
  ];

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-12 md:py-24 relative z-10 px-4 sm:px-6 md:px-12 xl:px-32"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 md:mb-24"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-3">
            02 // Career Track
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-black dark:text-white uppercase tracking-tight">
            Background & Experience
          </h2>
        </motion.div>

        {/* Multi-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Brief summary + Skill Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-10"
          >
            <TiltCard className="shadow-2xl z-10">
              <div className="p-8">
                <p className="font-sans text-sm text-gray-300 leading-relaxed font-light">
                  Bridging classic Swiss modernist principles with state-of-the-art interactive digital formats. My philosophy is rooted in architectural honesty: creating visuals that serve their literal purpose with maximum typographical precision and spacious grids.
                </p>
              </div>
            </TiltCard>

            {/* Skill Matrix */}
            <div className="flex flex-col gap-6">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-gray-400">
                Core Competency Matrix
              </h3>
              
              <div className="space-y-6">
                {skills.map((group) => (
                  <div key={group.category} className="space-y-2.5">
                    <span className="block font-sans text-xs font-medium text-gray-800 dark:text-gray-200">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[10px] px-2.5 py-1 bg-white/40 dark:bg-black/40 border border-gray-100/60 dark:border-white/5 text-gray-500 dark:text-gray-400 rounded-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Timeline Chronology */}
          <div className="lg:col-span-7 flex flex-col gap-10 relative">
            {/* Timeline connection bar */}
            <div className="absolute left-4.5 top-2 bottom-2 w-[1px] bg-gray-100 dark:bg-white/5 pointer-events-none hidden md:block" />

            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                id={`exp-item-${exp.id}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start md:pl-12"
              >
                {/* Timeline anchor */}
                <div className="absolute left-3.5 top-1.5 w-2 h-2 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black ring-4 ring-black/5 dark:ring-white/5 hidden md:block z-10" />

                {/* Left Timeline Side: Dates */}
                <div className="md:w-1/4 shrink-0 mt-0.5">
                  <span className="font-mono text-xs text-gray-400 dark:text-gray-500 block">
                    {exp.period}
                  </span>
                  <span className="font-sans text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase mt-1 block">
                    {exp.company}
                  </span>
                </div>

                {/* Right Timeline Side: Details */}
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-lg text-black dark:text-white mb-2 leading-snug">
                    {exp.role}
                  </h4>
                  <p className="font-sans text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light mb-4">
                    {exp.description}
                  </p>
                  
                  {/* Bullet Highlights */}
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                        <ArrowRight className="w-3 h-3 text-gray-400 mt-1 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
}
