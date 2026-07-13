import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

export default function ChromeAvatar() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid 3D tilting
  const springX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  // Map spring outputs to 3D rotational angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates to a range of [-0.5, 0.5]
    const relativeX = (event.clientX - rect.left) / width - 0.5;
    const relativeY = (event.clientY - rect.top) / height - 0.5;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Return smoothly to flat rest state
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="w-full flex justify-center md:justify-end items-center py-6">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
        }}
        className="relative w-full max-w-[340px] aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      >
        {/* Soft atmospheric backlight halo */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-zinc-700/10 via-accent/5 to-white/5 blur-3xl opacity-80 pointer-events-none" />

        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[300px] h-[300px] flex items-center justify-center rounded-full bg-black/10 dark:bg-black/40 border border-black/5 dark:border-white/[0.03] backdrop-blur-md shadow-[0_32px_64px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.05)]"
        >
          {/* Top physical edge glare of the glass case */}
          <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          {/* SVG representing the Chrome Profile Icon precisely */}
          <svg
            width="250"
            height="250"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_16px_32px_rgba(0,0,0,0.95)]"
            style={{
              transform: "translateZ(30px)", // creates a depth layer in 3D perspective
            }}
          >
            <defs>
              {/* Complex alternating chrome gradient to simulate high specular metal finish */}
              <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="12%" stopColor="#d1d5db" />
                <stop offset="25%" stopColor="#4b5563" />
                <stop offset="38%" stopColor="#f3f4f6" />
                <stop offset="48%" stopColor="#1e293b" />
                <stop offset="60%" stopColor="#ffffff" />
                <stop offset="72%" stopColor="#9ca3af" />
                <stop offset="85%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#374151" />
              </linearGradient>

              {/* Dark glossy smoked glass gradient fill */}
              <linearGradient id="glassDarkFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e2530" />
                <stop offset="40%" stopColor="#111622" />
                <stop offset="100%" stopColor="#05070a" />
              </linearGradient>

              {/* Subtler inner bevel gradient to bounce light off internal rims */}
              <linearGradient id="innerBevelGradient" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
              </linearGradient>

              {/* Drop shadow blur filter for structural shadows */}
              <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* ====== 1. BACKGROUND CAST SHADOWS ====== */}
            <g opacity="0.85" filter="url(#shadowFilter)">
              {/* Head Shadow */}
              <circle cx="150" cy="95" r="50" fill="#000000" />
              {/* Torso Shadow */}
              <path
                d="M 60,225 C 60,180 95,155 130,150 C 140,154 150,156 160,156 C 170,156 180,154 190,150 C 225,155 260,180 260,225 C 260,233 252,239 242,239 L 78,239 C 68,239 60,233 60,225 Z"
                fill="#000000"
              />
            </g>

            {/* ====== 2. PROFILE HEAD (CIRCLE) ====== */}
            {/* Outer thick chrome outline */}
            <circle
              cx="150"
              cy="95"
              r="50"
              fill="url(#glassDarkFill)"
              stroke="url(#chromeGradient)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Inner elegant bevel ring */}
            <circle
              cx="150"
              cy="95"
              r="44.5"
              stroke="url(#innerBevelGradient)"
              strokeWidth="1.8"
              fill="none"
              opacity="0.95"
            />
            {/* Inner deep hollow shadow */}
            <circle
              cx="150"
              cy="95"
              r="40"
              stroke="#000000"
              strokeWidth="3"
              fill="none"
              opacity="0.7"
            />

            {/* ====== 3. PROFILE TORSO / SHOULDERS ====== */}
            {/* Outer thick chrome outline */}
            <path
              d="M 60,225 C 60,180 95,155 130,150 C 140,154 150,156 160,156 C 170,156 180,154 190,150 C 225,155 260,180 260,225 C 260,233 252,239 242,239 L 78,239 C 68,239 60,233 60,225 Z"
              fill="url(#glassDarkFill)"
              stroke="url(#chromeGradient)"
              strokeWidth="9"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Inner elegant bevel path */}
            <path
              d="M 64.5,224.5 C 64.5,183.5 97,159.5 130.5,154.5 C 140,158 150,159.5 160,159.5 C 170,159.5 180,158 189.5,154.5 C 223,159.5 255.5,183.5 255.5,224.5 C 255.5,230.5 249.5,234.5 241,234.5 L 79,234.5 C 70.5,234.5 64.5,230.5 64.5,224.5 Z"
              stroke="url(#innerBevelGradient)"
              strokeWidth="1.8"
              fill="none"
              opacity="0.95"
            />
            {/* Inner deep hollow shadow */}
            <path
              d="M 69,224 C 69,187 99,164 131,159 C 140,162 150,163 160,163 C 170,163 180,162 189,159 C 221,164 251,187 251,224 L 79,224 Z"
              stroke="#000000"
              strokeWidth="3"
              fill="none"
              opacity="0.7"
            />

            {/* ====== 4. HIGH GLOSS SPECULAR REFLECTIONS ====== */}
            {/* White reflection glint on the head circle (top-left) */}
            <path
              d="M 120,70 A 42 42 0 0 1 165,56"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M 115,75 A 42 42 0 0 1 142,61"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* White reflection glint on the left shoulder slope */}
            <path
              d="M 78,198 C 76,188 88,172 110,163"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            />
            {/* White reflection glint on the right shoulder slope */}
            <path
              d="M 242,198 C 244,188 232,172 210,163"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Center glass reflection nodes */}
            <circle cx="150" cy="85" r="3" fill="#ffffff" opacity="0.25" filter="blur(0.5px)" />
            <circle cx="150" cy="180" r="4" fill="#ffffff" opacity="0.15" filter="blur(1px)" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
