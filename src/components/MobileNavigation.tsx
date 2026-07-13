import React from "react";
import { motion } from "motion/react";
import { Home, User, Layers, Code2, Mail } from "lucide-react";

interface MobileNavigationProps {
  activeSection: string;
  isDarkMode: boolean;
  onNavClick?: (id: string) => void;
}

export default function MobileNavigation({ activeSection, isDarkMode, onNavClick }: MobileNavigationProps) {
  const currentActive = activeSection || "home";

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Layers },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    if (onNavClick) {
      onNavClick(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const yOffset = id === "home" ? 0 : -80;
      const y = id === "home" 
        ? 0 
        : el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[380px] md:hidden select-none pointer-events-auto">
      {/* 3D Premium Matte Graphite Navigation Bar */}
      <div 
        className="relative bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800/80 rounded-[22px] p-[6px] flex items-center justify-between backdrop-blur-xl shadow-lg dark:shadow-none"
        style={{
          boxShadow: "inset 0 1.5px 0px rgba(255, 255, 255, 0.18), inset 0 3px 6px rgba(255, 255, 255, 0.08), inset 0 -3px 8px rgba(0, 0, 0, 0.9), 0 16px 36px -12px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.02)"
        }}
      >
        {/* Top edge linear glare to match boat controller aesthetic */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        {navItems.map((item, index) => {
          const isActive = currentActive === item.id;
          const IconComponent = item.icon;

          return (
            <React.Fragment key={item.id}>
              {/* Individual Navigation Item */}
              <button
                onClick={() => handleNavClick(item.id)}
                className="relative flex items-center justify-center focus:outline-none cursor-pointer group flex-1 h-[56px]"
                style={{ WebkitTapHighlightColor: "transparent" }}
                id={`mobile-nav-${item.id}`}
                aria-label={`Navigate to ${item.label}`}
              >
                {/* 3D Debossed Active Frame & Chromatic Refraction Ring */}
                {isActive ? (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Shadow Slot / Recessed physical bezel under the button */}
                    <div className="absolute w-[52px] h-[52px] rounded-[18px] bg-black/85 shadow-[inset_0_2.5px_5px_rgba(0,0,0,0.95),0_1px_1px_rgba(255,255,255,0.03)]" />

                    {/* Chromatic aberration liquid metal capsule border */}
                    <motion.div
                      layoutId="liquidMetalCapsule"
                      className="absolute w-[48px] h-[48px] rounded-[16px] p-[2.2px] overflow-hidden flex items-center justify-center"
                      style={{
                        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.85), inset 0 1px 0px rgba(255, 255, 255, 0.45)",
                        willChange: "transform"
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                      }}
                    >
                      {/* Infinite rotating liquid metal conic sheen */}
                      <motion.div
                        className="absolute inset-0 w-[150%] h-[150%] left-[-25%] top-[-25%]"
                        style={{
                          background: "conic-gradient(from 0deg, #ffffff 0%, #cbd5e1 12%, #ffd700 25%, #ff007f 42%, #00f5d4 58%, #00bbf9 72%, #9b5de5 86%, #ffffff 100%)",
                        }}
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3.5,
                          ease: "linear",
                        }}
                      />

                      {/* Dark tactile button cap nested inside the chromatic ring to mask the center */}
                      <div 
                        className="relative w-full h-full rounded-[14px] flex flex-col items-center justify-center overflow-hidden bg-[#141415]"
                        style={{
                          boxShadow: "inset 0 1px 1.5px rgba(255, 255, 255, 0.25), inset 0 -1.5px 2px rgba(0, 0, 0, 0.85), 0 1px 2.5px rgba(0, 0, 0, 0.55)"
                        }}
                      >
                        {/* Elegant diagonal glass reflection line over active icon */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                        
                        <IconComponent className="w-[19px] h-[19px] stroke-[2.25] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  // Clean, high-fidelity inactive icon
                  <div className="flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105">
                    <IconComponent className="w-5 h-5 stroke-[1.8] transition-colors duration-200 text-zinc-500 group-hover:text-zinc-200" />
                  </div>
                )}
              </button>

              {/* Vertical premium dividers between items */}
              {index < navItems.length - 1 && (
                <div 
                  className="w-[1px] h-8 bg-gradient-to-b from-transparent via-zinc-600 self-center pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: (currentActive === item.id || currentActive === navItems[index + 1].id) ? 0.45 : 1.0
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
