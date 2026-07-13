import React from "react";
import { motion } from "motion/react";
import { Home, User, Layers, Code2, Mail } from "lucide-react";

interface MobileNavigationProps {
  activeSection: string;
  isDarkMode: boolean;
  onNavClick?: (id: string) => void;
}

export default function MobileNavigation({ activeSection, onNavClick }: MobileNavigationProps) {
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
        className="relative bg-[#0d0d0e] border border-zinc-800/60 rounded-[22px] p-[6px] flex items-center justify-between backdrop-blur-xl"
        style={{
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 25px 60px -15px rgba(0, 0, 0, 0.95)"
        }}
      >
        {/* Top edge linear glare to match boat controller aesthetic */}
        <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

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
                    <div className="absolute w-[52px] h-[52px] rounded-[18px] bg-black/80 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.03)]" />

                    {/* Chromatic aberration liquid metal capsule border */}
                    <motion.div
                      layoutId="liquidMetalCapsule"
                      className="absolute w-[48px] h-[48px] rounded-[16px] p-[2.2px] overflow-hidden flex items-center justify-center"
                      style={{
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.8), inset 0 1px 0px rgba(255, 255, 255, 0.4)"
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
                        className="relative w-full h-full rounded-[14px] bg-[#141415] flex flex-col items-center justify-center overflow-hidden"
                        style={{
                          boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 3px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.4)"
                        }}
                      >
                        {/* Elegant diagonal glass reflection line over active icon */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
                        
                        <IconComponent className="w-[19px] h-[19px] text-white stroke-[2.25] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  // Clean, high-fidelity inactive icon
                  <div className="flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105">
                    <IconComponent className="w-5 h-5 text-zinc-500 group-hover:text-zinc-200 stroke-[1.8] transition-colors duration-200" />
                  </div>
                )}
              </button>

              {/* Vertical premium dividers between items */}
              {index < navItems.length - 1 && (
                <div 
                  className="w-[1px] h-8 bg-gradient-to-b from-transparent via-zinc-600 to-transparent self-center pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: (currentActive === item.id || currentActive === navItems[index + 1].id) ? 0.35 : 0.95
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
