import React from "react";
import { Project } from "../types";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  // Motion values to track normalized mouse coordinates relative to the card (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid interpolation
  const springX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  // Map spring outputs to rotational angles (3D tilt)
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  // Map spring outputs to subtle internal content displacement (3D parallax)
  const translateX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from -0.5 to 0.5
    const relativeX = (event.clientX - rect.left) / width - 0.5;
    const relativeY = (event.clientY - rect.top) / height - 0.5;
    
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Reset back to center smoothly
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      id={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.35, delay: index * 0.02, ease: "easeOut" }}
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer flex flex-col focus:outline-none"
      style={{ perspective: 1000 }}
    >
      {/* Visual Canvas Container with 3D rotation */}
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 10px 30px -10px rgba(0, 0, 0, 0.95)",
        }}
        className="relative aspect-4/3 w-full overflow-hidden bg-gray-100 dark:bg-[#0d0d0e]/95 border border-zinc-800/60 rounded-xl transition-[background-color,border-color,box-shadow] duration-200"
      >
        {/* Exact linear glare from physical top-edge of the container (matches the navbar) */}
        <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20" />

        <motion.img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          style={{
            x: translateX,
            y: translateY,
            scale: 1.06, // scale up slightly to cover edges during displacement
          }}
          className="w-full h-full object-cover transition-colors duration-500 ease-out filter grayscale hover:grayscale-0 dark:brightness-95 dark:group-hover:brightness-100"
        />
        
        {/* Subtle Overlay on Hover */}
        <motion.div 
          style={{
            x: useTransform(springX, [-0.5, 0.5], [-4, 4]),
            y: useTransform(springY, [-0.5, 0.5], [-4, 4]),
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-6"
        >
          <div className="w-10 h-10 rounded-full bg-white dark:bg-black flex items-center justify-center text-black dark:text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </motion.div>
      </motion.div>

      {/* Metadata Labels */}
      <div className="mt-4 flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {project.category}
        </span>
        <div className="flex items-center justify-between">
          <h3 className="font-display font-medium text-lg text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
            {project.title}
          </h3>
          <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">
            {project.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
