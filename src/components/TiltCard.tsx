import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  initial?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
  variants?: any;
}

export default function TiltCard({
  children,
  className = "",
  onClick,
  initial,
  whileInView,
  viewport,
  transition,
  variants,
}: TiltCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid 3D tilting - optimized for instant responsiveness
  const springX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  // Map spring outputs to 3D rotational angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

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
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1200,
      }}
      className={`relative group ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 12px 36px -12px rgba(0, 0, 0, 0.95)",
        }}
        className="w-full h-full bg-[#0d0d0e]/95 border border-zinc-800/60 rounded-2xl transition-[background-color,border-color,box-shadow] duration-200 relative overflow-hidden"
      >
        {/* Subtle, premium 3D glare overlay that glides across the card based on mouse direction */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none"
          style={{
            transform: "translate3d(0, 0, 0)",
          }}
        />

        {/* Exact linear glare from the physical top-edge of the navbar container */}
        <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20" />

        {/* Ambient glow follower on hover */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/10 transition-all duration-300" />

        {/* Content container */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
