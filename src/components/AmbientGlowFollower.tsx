import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface AmbientGlowFollowerProps {
  isDarkMode: boolean;
}

export default function AmbientGlowFollower({ isDarkMode }: AmbientGlowFollowerProps) {
  // We start hidden or centered off-screen so there's no initial flash
  const [isVisible, setIsVisible] = useState(false);

  // Core motion values
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Outer glow (larger, slower, more lag/weight)
  const outerX = useSpring(mouseX, { stiffness: 50, damping: 24, mass: 1.2 });
  const outerY = useSpring(mouseY, { stiffness: 50, damping: 24, mass: 1.2 });

  // Inner glow (smaller, tighter trail, faster/lighter)
  const innerX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.7 });
  const innerY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.7 });

  // Center indicator dot (extremely snappy, precise tracker)
  const dotX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.3 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Don't show on touch devices to avoid finger-dragging stutter
      if (e.pointerType === "touch") {
        setIsVisible(false);
        return;
      }
      
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Background Ambient Glow Underlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <motion.div
          className="absolute -left-[175px] -top-[175px] w-[350px] h-[350px] rounded-full"
          style={{
            x: outerX,
            y: outerY,
            background: isDarkMode
              ? "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(255, 255, 255, 0) 70%)"
              : "radial-gradient(circle, rgba(0, 0, 0, 0.035) 0%, rgba(0, 0, 0, 0.01) 40%, rgba(0, 0, 0, 0) 70%)",
            filter: "blur(24px)",
          }}
        />

        <motion.div
          className="absolute -left-[70px] -top-[70px] w-[140px] h-[140px] rounded-full"
          style={{
            x: innerX,
            y: innerY,
            background: isDarkMode
              ? "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.04) 40%, rgba(255, 255, 255, 0) 70%)"
              : "radial-gradient(circle, rgba(0, 0, 0, 0.07) 0%, rgba(0, 0, 0, 0.02) 40%, rgba(0, 0, 0, 0) 70%)",
            filter: "blur(12px)",
            mixBlendMode: isDarkMode ? "screen" : "multiply",
          }}
        />
      </div>

      {/* Foreground Snappy Cursor Dot Tracker */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        <motion.div
          className="absolute -left-[2.8px] -top-[2.8px] w-[5.6px] h-[5.6px] rounded-full"
          style={{
            x: dotX,
            y: dotY,
            background: isDarkMode
              ? "rgba(255, 255, 255, 0.35)"
              : "rgba(0, 0, 0, 0.25)",
            border: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.85)"
              : "1px solid rgba(0, 0, 0, 0.75)",
            boxShadow: isDarkMode
              ? "0 0 10px rgba(255, 255, 255, 0.4)"
              : "0 0 10px rgba(0, 0, 0, 0.15)",
          }}
        />
      </div>
    </>
  );
}
