import React, { useState, useEffect } from "react";

import { motion } from "motion/react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  activeSection: string;
  onNavClick?: (id: string) => void;
}

export default function Header({ isDarkMode, toggleTheme, activeSection, onNavClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const currentActive = activeSection || "home";

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (onNavClick) {
      onNavClick(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = id === "home" ? 0 : -90; // perfectly clear the sticky header height
      const y = id === "home" 
        ? 0 
        : element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? "py-4 bg-[#0d0d0e]/95 backdrop-blur-md border-b border-zinc-800/60 text-white"
            : "py-4 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 text-zinc-900 shadow-sm"
          : "py-6 bg-transparent"
      }`}
      style={isScrolled ? {
        boxShadow: isDarkMode 
          ? "inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 10px 30px -10px rgba(0, 0, 0, 0.95)"
          : "0 10px 30px -10px rgba(0, 0, 0, 0.05)"
      } : undefined}
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Exact Graphic Brand Identity from Reference Image */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById("home");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex items-center gap-3.5 select-none cursor-pointer"
          id="header-brand"
          aria-label="Home"
        >
          {/* High-Fidelity geometric 'LH' monogram SVG logo */}
          <div className="flex items-center gap-3">
            <svg
              className={`h-10 w-auto transform group-hover:scale-105 transition-transform duration-300 ${(isDarkMode || !isScrolled) ? "text-white" : "text-zinc-900"}`}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left angled stroke (L shape) */}
              <path
                d="M 15 30 L 25 24.3 L 25 63.7 L 43 74 L 32.5 80 L 15 70 Z"
                fill="currentColor"
                className="transition-colors duration-300"
              />
              {/* Middle & Right unified stroke (H shape with top-left flag/serif) */}
              <path
                d="M 35 81.4 L 50 90 L 55 87.1 L 55 54 L 75 54 L 75 75.7 L 85 70 L 85 30 L 75 24.3 L 75 44 L 55 44 L 55 12.9 L 50 10 L 41 15.1 L 41 25 L 45 25 L 45 75.7 Z"
                fill="currentColor"
                className="transition-colors duration-300"
              />
            </svg>
            
            {/* Solid vibrant Champagne Gold Divider Line */}
            <div className="h-9 w-[3px] bg-accent dark:bg-accent-hover rounded-full" />
          </div>

          {/* Typography block */}
          <div className="flex flex-col justify-center">
            <span className={`font-sans font-bold text-[26px] tracking-wide leading-none ${(isDarkMode || !isScrolled) ? "text-white" : "text-zinc-900"}`}>
              <span className="text-accent dark:text-accent font-extrabold">H</span>ARSHA
            </span>
            <span className={`font-sans text-[8px] tracking-[0.24em] font-extrabold uppercase mt-1.5 leading-none ${(isDarkMode || !isScrolled) ? "text-zinc-400" : "text-zinc-550"}`}>
              Full Stack Developer
            </span>
          </div>
        </a>

        {/* Right side element container: Nav links + Theme toggle */}
        <div className="flex items-center gap-8">
          {/* Navigation Items with matching fluid liquid metal pill capsule indicators */}
          <nav 
            className="hidden md:flex items-center bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800/80 rounded-[22px] p-[5px] relative select-none"
            style={{
              boxShadow: "inset 0 1.5px 0px rgba(255, 255, 255, 0.18), inset 0 3px 6px rgba(255, 255, 255, 0.08), inset 0 -3px 8px rgba(0, 0, 0, 0.9), 0 16px 36px -12px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.02)"
            }}
          >
            {/* Elegant top edge linear glare */}
            <div className="absolute inset-x-5 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            {navItems.map((item, index) => {
              const isActive = currentActive === item.id;

              return (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="relative flex items-center justify-center focus:outline-none cursor-pointer group h-[34px] w-[84px] rounded-[14px]"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {/* The sliding active capsule backdrop */}
                    {isActive && (
                      <motion.div
                        layoutId="desktopLiquidMetalCapsule"
                        className="absolute inset-0 rounded-[16px] p-[1.5px] overflow-hidden flex items-center justify-center z-0 pointer-events-none"
                        style={{
                          boxShadow: "0 6px 14px rgba(0, 0, 0, 0.85), inset 0 1px 0px rgba(255, 255, 255, 0.45)",
                          willChange: "transform"
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 30,
                        }}
                      >
                        {/* Shadow Slot / Recessed physical bezel under the button */}
                        <div className="absolute inset-0.5 rounded-[18px] -z-10 bg-black/85 shadow-[inset_0_2.5px_5px_rgba(0,0,0,0.95),0_1px_1px_rgba(255,255,255,0.03)]" />

                        {/* Infinite rotating liquid metal conic sheen */}
                        <motion.div
                          className="absolute inset-0 w-[140%] h-[140%] left-[-20%] top-[-20%] -z-10"
                          style={{
                            background: "conic-gradient(from 0deg, #ffffff 0%, #cbd5e1 12%, #ffd700 25%, #ff007f 42%, #00f5d4 58%, #00bbf9 72%, #9b5de5 86%, #ffffff 100%)",
                            willChange: "transform",
                            transform: "translate3d(0,0,0)"
                          }}
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            repeat: Infinity,
                            duration: 3.5,
                            ease: "linear",
                          }}
                        />

                        {/* Dark tactile button cap nested inside the chromatic ring */}
                        <div 
                          className="relative w-full h-full rounded-[14px] -z-10 bg-[#141415]"
                          style={{
                            boxShadow: "inset 0 1px 1.5px rgba(255, 255, 255, 0.25), inset 0 -1.5px 2px rgba(0, 0, 0, 0.85), 0 1px 2.5px rgba(0, 0, 0, 0.55)"
                          }}
                        >
                          {/* Glass reflections */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
                          <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation Item Label */}
                    <span 
                      className={`relative z-10 font-sans text-[12px] font-semibold tracking-wide transition-colors duration-300 ${
                        isActive 
                          ? (isDarkMode || !isScrolled)
                            ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" 
                            : "text-zinc-950 font-bold"
                          : (isDarkMode || !isScrolled)
                            ? "text-zinc-400 group-hover:text-zinc-200"
                            : "text-zinc-550 group-hover:text-zinc-900"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>

                  {/* Vertical dividers */}
                  {index < navItems.length - 1 && (
                    <div 
                      className={`w-[1px] h-7 bg-gradient-to-b from-transparent self-center pointer-events-none transition-opacity duration-300 ${(isDarkMode || !isScrolled) ? "via-zinc-600" : "via-zinc-300"}`}
                      style={{
                        opacity: (currentActive === item.id || currentActive === navItems[index + 1].id) ? 0.45 : 1.0
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </nav>


        </div>
      </div>
    </header>
  );
}
