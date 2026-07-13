import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Github, Linkedin, Code2, Terminal, Database, Server, Cpu, Layers, Activity, Sparkles, CheckCircle2, Cloud, Workflow, RefreshCw, Eye, ExternalLink, ChevronRight, Play, Info } from "lucide-react";
import Header from "./components/Header";
import { PROJECTS } from "./data";
import { Project } from "./types";
import ProjectModal from "./components/ProjectModal";
import ContactSection from "./components/ContactSection";
import AmbientGlowFollower from "./components/AmbientGlowFollower";
import MobileNavigation from "./components/MobileNavigation";
import TiltCard from "./components/TiltCard";
import ChromeAvatar from "./components/ChromeAvatar";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

interface SkillSub {
  name: string;
  rating: number;
  level: string;
  description: string;
}

interface AppliedSolution {
  title: string;
  project: string;
  challenge: string;
  solution: string;
  codeSnippet: string;
}

interface SkillCategory {
  id: string;
  name: string;
  label: string;
  percentage: number;
  description: string;
  tags: string[];
  subskills: SkillSub[];
  applied: AppliedSolution[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Architecture",
    label: "Client-Side Systems",
    percentage: 95,
    description: "Architecting interactive, low-latency client experiences. Specialized in state hydration, fluid physics-based gesture motion, structural layout consistency, and Core Web Vitals optimization.",
    tags: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "motion", "Zustand"],
    subskills: [
      { name: "React, Next.js, Vite & TS", rating: 95, level: "Advanced", description: "App router systems, server component optimization, SSR streaming patterns, and custom reactive hook pipelines." },
      { name: "Tailwind CSS & Motion UI", rating: 98, level: "Expert", description: "Complex visual layouts, custom typography scales, fluid animations, and high-performance layout transformations." },
      { name: "Global Client State Sync", rating: 90, level: "Advanced", description: "Zustand store slices, local broadcast synchronization, transient reactive states, and query caching." }
    ],
    applied: [
      {
        title: "Real-time Broadcast Channel Sync",
        project: "NexCart Platform",
        challenge: "Syncing cart item updates instantly across multiple browser tabs without overloading database write operations.",
        solution: "Engineered a local BroadcastChannel-based event bus that propagates local cart mutations within <2ms across active contexts, eliminating relational write cascades.",
        codeSnippet: `// Local Broadcast Sync Hook
import { useEffect } from "react";
const cartChannel = new BroadcastChannel("nexcart_cart_sync");

export function useCartSync(onSync: (data: any) => void) {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === "CART_MUTATED") {
        onSync(e.data.payload);
      }
    };
    cartChannel.addEventListener("message", handleMessage);
    return () => cartChannel.removeEventListener("message", handleMessage);
  }, [onSync]);
}`
      },
      {
        title: "Offscreen Hardware-Accelerated Waveform",
        project: "Atlas Voice Assistant",
        challenge: "Rendering dynamic 60fps micro-waveforms causing React container re-render drops and extreme CPU spikes (70%+).",
        solution: "Shifted waveform interpolation to an offscreen, requestAnimationFrame-driven canvas context utilizing GPU drawing buffers directly.",
        codeSnippet: `// Hardware-accelerated dynamic waveform render
function drawWave(ctx: CanvasRenderingContext2D, freq: number[]) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "var(--accent)";
  ctx.lineWidth = 3;
  
  freq.forEach((f, i) => {
    const x = (i / freq.length) * ctx.canvas.width;
    const y = (0.5 + Math.sin(i * 0.15) * f) * ctx.canvas.height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}`
      }
    ]
  },
  {
    id: "backend",
    name: "Backend Core Systems",
    label: "Server-Side Architecture",
    percentage: 90,
    description: "Structuring high-concurrency server frameworks, type-safe API contracts, distributed transactions, memory routers, and resilient background task queue pipelines.",
    tags: ["Node.js", "Express", "NestJS", "Go (Golang)", "REST APIs", "WebSockets"],
    subskills: [
      { name: "Node.js & Go Worker Runtimes", rating: 92, level: "Advanced", description: "Clustered application scaling, low-latency microservices, structured logging, and concurrency control." },
      { name: "REST, WebSockets & GraphQL", rating: 90, level: "Advanced", description: "Bi-directional persistent socket streaming, rate limit routing, self-documenting JSON schemas, and API gateways." },
      { name: "Session & Cryptographic Auth", rating: 90, level: "Advanced", description: "Asymmetric JWT signatures, distributed sessions, RBAC permission models, and secure OAuth loops." }
    ],
    applied: [
      {
        title: "Idempotent Transaction Pipeline",
        project: "NexCart Checkout",
        challenge: "Guaranteeing financial transactions and order dispatches run exactly once regardless of double-submits or sudden network connection drops.",
        solution: "Implemented UUID checkout tokens verified against transient Redis SETNX keys acting as a short-lived lock.",
        codeSnippet: `// Distributed Locking with Redis
async function acquireCheckoutLock(idempotencyKey: string, ttl = 5000): Promise<boolean> {
  const lockToken = generateSecureToken();
  const acquired = await redis.set(
    \`lock:checkout:\${idempotencyKey}\`, 
    lockToken, 
    "NX", 
    "PX", 
    ttl
  );
  if (!acquired) {
    throw new Error("Checkout currently in progress. Do not double-submit.");
  }
  return true;
}`
      }
    ]
  },
  {
    id: "database",
    name: "Database & Cache Layer",
    label: "Data Engineering",
    percentage: 88,
    description: "Designing optimized database models, transactional execution integrity, memory-cached query acceleration, structured data caching, and analytical indexation strategies.",
    tags: ["PostgreSQL", "Redis", "MongoDB", "Firestore", "Drizzle ORM", "SQL Tuning"],
    subskills: [
      { name: "SQL Query & Model Optimization", rating: 90, level: "Advanced", description: "Complex multi-table joins, subquery CTE tuning, compound index structures, and strict schema normalization." },
      { name: "In-Memory Caching Strategies", rating: 82, level: "Intermediate", description: "Cache-aside algorithms, automatic TTL expiration, pub-sub messaging, and distributed key tracking." },
      { name: "NoSQL & Real-time Databases", rating: 88, level: "Advanced", description: "Hierarchical collection planning, real-time snapshot listener handlers, and optimized document retrieval paths." }
    ],
    applied: [
      {
        title: "Materialized Product Filter Caching",
        project: "NexCart Database",
        challenge: "Calculating dynamic nested attribute counts (size, price, brands) across catalog structures dropping API response times to >400ms.",
        solution: "Created self-refreshing PostgreSQL materialized views with dedicated indices, bypassing repetitive heavy analytical table scans and reducing latencies to <15ms.",
        codeSnippet: `// PostgreSQL Materialized Filtering Cache
CREATE MATERIALIZED VIEW mv_catalog_filter_cache AS
SELECT p.id, p.price, p.brand_id, array_agg(a.val_name) as attrs
FROM products p
LEFT JOIN product_attributes a ON p.id = a.product_id
GROUP BY p.id;

CREATE UNIQUE INDEX idx_mv_catalog_id ON mv_catalog_filter_cache(id);`
      }
    ]
  },
  {
    id: "devops",
    name: "Infrastructure & Ops",
    label: "Cloud Deployment",
    percentage: 85,
    description: "Deploying production-grade deployments through multi-stage container isolation, resilient serverless automation, load balancers, and streamlined CI/CD software deployment setups.",
    tags: ["Docker", "GCP / Cloud Run", "AWS Serverless", "GitHub Actions", "Nginx", "CI/CD"],
    subskills: [
      { name: "Multi-Stage Docker Containment", rating: 90, level: "Advanced", description: "Tiny alpine and distroless builds, separation of compilation layers, secure runtimes, and fast layering caching." },
      { name: "Serverless Container Scaling", rating: 80, level: "Intermediate", description: "Deploying auto-scaling stateless services, secrets injected at run, VPC connector setup, and edge routing." },
      { name: "Automated GitHub Actions CI/CD", rating: 86, level: "Advanced", description: "Automated build compilation, unit test suites, lint validations, and safe staging-to-prod direct deployments." }
    ],
    applied: [
      {
        title: "Multi-Stage Production Container",
        project: "Production Deployments",
        challenge: "Keeping Docker container images small (<100MB) for ultra-fast startup cold starts while compiling TS on the container.",
        solution: "Engineered a multi-stage pipeline decoupling compile dependencies (node_modules) from the lean runtime container.",
        codeSnippet: `# Multi-stage TS Container Build
FROM node:20-alpine AS compiler
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=compiler /build/dist ./dist
COPY --from=compiler /build/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/server.cjs"]`
      }
    ]
  }
];

const SectionDivider = () => (
  <div className="w-full flex justify-center pointer-events-none select-none relative py-12">
    {/* Dynamic border line featuring the exact chromatic colors of the active pill capsule border */}
    <div 
      className="w-[85%] max-w-5xl h-[1.5px] opacity-40 dark:opacity-50"
      style={{
        background: "linear-gradient(90deg, transparent 0%, #ffffff 10%, #cbd5e1 20%, #ffd700 35%, #ff007f 50%, #00f5d4 65%, #00bbf9 75%, #9b5de5 88%, transparent 100%)",
      }}
    />
    {/* Subtle central ambient glow matching the chromatic colors */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-8 rounded-full blur-2xl pointer-events-none opacity-20 dark:opacity-25"
      style={{
        background: "linear-gradient(90deg, #ff007f 0%, #00f5d4 50%, #00bbf9 100%)"
      }}
    />
  </div>
);

export default function App() {
  const isDarkMode = true;

  const [showIntro, setShowIntro] = useState(true);
  const [windowHeight, setWindowHeight] = useState(800);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string>("frontend");
  const [selectedAppliedIndex, setSelectedAppliedIndex] = useState<number>(0);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // Measure window height dynamically for perfect scroll offset animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Lock scroll when showIntro is active to ensure the loader remains premium and centered
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showIntro]);

  // Keep intro visible for 4.0 seconds to allow the full staggered "HELLO" reveal and smooth exit
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Force scroll to top and direct to home section on reload (mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Prevent the browser from restoring the scroll position on reload
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      
      // Ensure we are fully scrolled to the top immediately on mount
      window.scrollTo(0, 0);
      
      // Clear hash so it doesn't trigger anchor-scroll behaviors
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []);

  // Mouse position and spring values for interactive liquid ripple in the intro water
  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(200);
  const rippleScale = useMotionValue(0);

  // Smooth springs for liquid inertia and natural flowing currents
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const smoothRippleScale = useSpring(rippleScale, { stiffness: 40, damping: 12 });

  // Top-level transforms to avoid hook conditional rendering errors when the intro is dismissed
  const surfaceScaleVal = useTransform(smoothRippleScale, [0, 1], [0, 4.0]);
  const displacementScaleVal = useTransform(smoothRippleScale, [0, 1], [16, 26]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    rippleScale.set(1); // Activate ripple wave scale
  };

  const handleMouseLeave = () => {
    rippleScale.set(0); // Smoothly decay back to resting state
  };

  const toggleTheme = () => {};

  // HELLO letters array for staggered animations
  const helloLetters = ["H", "E", "L", "L", "O"];

  // Framer Motion Variants for the "HELLO" letters
  const introContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(15px)",
      scale: 1.05,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, x: -15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Staggered entrance animation variants for paragraphs and lists
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.01,
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Scroll tracking for fading/blurring animations
  const { scrollY } = useScroll();

  // The fade out of the Home page starts only when the content reaches the logo section level (approx. 35% of window height scrolled)
  // and finishes by 75% of window height.
  const fadeStart = windowHeight * 0.35;
  const fadeEnd = windowHeight * 0.75;

  const homeOpacity = useTransform(scrollY, [0, fadeStart, fadeEnd], [1, 1, 0]);
  const homeBlurVal = useTransform(scrollY, [0, fadeStart, fadeEnd], [0, 0, 16]);
  const homeBlur = useTransform(homeBlurVal, (v) => `blur(${v}px)`);
  const homeY = useTransform(scrollY, [0, fadeStart, fadeEnd], [0, 0, -60]);

  // Section 2 (About) transitions - only incoming transition from Home
  const s2_in_start = windowHeight * 0.35;
  const s2_in_end = windowHeight * 0.75;

  const aboutOpacity = useTransform(
    scrollY,
    [s2_in_start, s2_in_end],
    [0, 1]
  );
  const aboutBlurVal = useTransform(
    scrollY,
    [s2_in_start, s2_in_end],
    [16, 0]
  );
  const aboutBlur = useTransform(aboutBlurVal, (v) => `blur(${v}px)`);
  const aboutY = useTransform(
    scrollY,
    [s2_in_start, s2_in_end],
    [80, 0]
  );

  // References and hooks for post-home continuous background navigation route
  const postHomeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: postHomeScrollYProgress } = useScroll({
    target: postHomeRef,
    offset: ["start end", "end end"]
  });
  const smoothScrollProgress = useSpring(postHomeScrollYProgress, { stiffness: 80, damping: 25 });
  const dotTopPosition = useTransform(smoothScrollProgress, [0, 1], ["0%", "100%"]);

  const [activeSection, setActiveSection] = useState<string>("");
  const isClickScrolling = useRef(false);
  const targetSection = useRef<string>("");
  const clickScrollTimeout = useRef<any>(null);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    targetSection.current = id;
    isClickScrolling.current = true;
    if (clickScrollTimeout.current) {
      clearTimeout(clickScrollTimeout.current);
    }

    const element = document.getElementById(id);
    if (element) {
      const yOffset = id === "home" ? 0 : -90;
      const y = id === "home" 
        ? 0 
        : element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    // Fallback timeout in case scroll events don't trigger (e.g. already at destination)
    clickScrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
      targetSection.current = "";
    }, 1200);
  };

  useEffect(() => {
    if (showIntro) return;

    let scrollTimeout: any = null;

    const handleScroll = () => {
      if (isClickScrolling.current) {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
          if (targetSection.current) {
            setActiveSection(targetSection.current);
          }
          isClickScrolling.current = false;
          targetSection.current = "";
          if (clickScrollTimeout.current) {
            clearTimeout(clickScrollTimeout.current);
          }
        }, 150); // wait 150ms after the last scroll event to ensure smooth scroll has finished
      } else {
        const sections = ["home", "about", "projects", "skills", "contact"];
        let currentActive = "home";

        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
        if (isAtBottom) {
          currentActive = "contact";
        } else {
          const triggerPoint = 160; // perfectly clears the header offset
          for (let i = sections.length - 1; i >= 0; i--) {
            const id = sections[i];
            if (id === "home") {
              break;
            }
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerPoint) {
                currentActive = id;
                break;
              }
            }
          }
        }

        if (currentActive) {
          setActiveSection((prev) => {
            if (prev !== currentActive) {
              return currentActive;
            }
            return prev;
          });
        }
      }
    };

    // Run once initially to sync active state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickScrollTimeout.current) {
        clearTimeout(clickScrollTimeout.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [showIntro, windowHeight]);

  // Entrance transitions for the fixed sidebar route panel
  const routeOpacity = useTransform(scrollY, [fadeStart, fadeStart + 100], [0, 1]);
  const routeX = useTransform(scrollY, [fadeStart, fadeStart + 100], [-20, 0]);

  return (
    <div className={`relative min-h-screen w-full font-sans ${isDarkMode ? "bg-black text-zinc-100 selection:bg-white selection:text-black" : "bg-white text-zinc-850 selection:bg-black selection:text-white"} transition-colors duration-500`}>
      
      {/* Soft, circular ambient light follower that trails the mouse movement across the screen */}
      <AmbientGlowFollower isDarkMode={isDarkMode} />

      {/* Floating 3D mobile bottom navigation bar */}
      {!showIntro && (
        <MobileNavigation activeSection={activeSection} isDarkMode={isDarkMode} onNavClick={handleNavClick} />
      )}

      {/* Fixed Header placed at root level to prevent CSS transform/filter position containment bug */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="relative z-50"
        >
          <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} activeSection={activeSection} onNavClick={handleNavClick} />
        </motion.div>
      )}

      {/* Main content ALWAYS rendered and hydrated immediately on mount to prevent ref errors */}
      <motion.div
        key="main-app"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(20px)" }}
        animate={showIntro ? { opacity: 0, scale: 0.96, filter: "blur(20px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-screen flex flex-col"
        style={{ pointerEvents: showIntro ? "none" : "auto" }}
      >

            {/* Main Home Page */}
            <motion.main
              id="home"
              style={{
                opacity: homeOpacity,
                filter: homeBlur,
                y: homeY,
              }}
              className="sticky top-0 w-full h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 z-0 overflow-hidden"
            >
              {/* Immersive background video covering only the Home section viewport */}
              <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  src="https://res.cloudinary.com/pjxdjx08/video/upload/v1783567514/1655729275-1655729275-hd-floating-metallic-rings-live-wallpaper-_-screensaver_juqa0b.mp4"
                  className="w-full h-full object-cover opacity-90"
                  style={{
                    imageRendering: "auto",
                  }}
                />
                {/* Subtle elegant dark black overlay */}
                <div className="absolute inset-0 bg-black/35" />
              </div>
              <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto w-full relative z-10 flex flex-col justify-center h-full pt-16">
                {/* Landing Content matched precisely with the Reference Image structure */}
                <div className="space-y-6 md:space-y-8 text-left">
                  
                  {/* Small dynamic indicator badge */}
                  <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[9px] xl:text-[10px] uppercase tracking-wider text-gray-300">
                      Active worldwide 2026
                    </span>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    {/* Name title as requested by reference image */}
                    <h1
                      className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-none"
                      style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}
                    >
                      Hi I'm Sai Harsha
                    </h1>

                    {/* Subtitle in sophisticated gold */}
                    <h2
                      className="font-sans font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-accent tracking-tight"
                      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                    >
                      Mobile & Web Developer
                    </h2>

                    {/* Description body matching the reference image layout precisely */}
                    <p
                      className="font-sans text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed font-light max-w-2xl xl:max-w-3xl"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                    >
                      Developer based in India. I specialize in UI design, web and mobile application development and maintenance.
                    </p>
                  </div>

                  {/* CTA action button styled exactly like the beautiful white pill from the uploaded image */}
                  <div className="pt-4 xl:pt-6 flex flex-col items-start gap-5">
                    <a
                       href="mailto:harshairugu@gmail.com"
                       className="inline-block bg-gradient-to-b from-accent to-accent-light hover:brightness-110 text-zinc-950 px-9 py-3.5 xl:px-12 xl:py-4.5 rounded-full font-bold text-sm xl:text-base tracking-wide transition-all duration-300 shadow-lg shadow-accent/30 hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-accent text-center cursor-pointer"
                    >
                      Get in Touch
                    </a>

                    {/* Shifted LinkedIn and GitHub Links with subtle scale-up on hover */}
                    <div className="flex items-center gap-6 pl-3 pt-1">
                      <motion.a
                        href="https://github.com/harshairugu"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-zinc-400 hover:text-white transition-colors duration-200"
                        aria-label="GitHub"
                      >
                        <Github className="w-5.5 h-5.5" />
                      </motion.a>
                      <motion.a
                        href="https://linkedin.com/in/harshairugu"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-zinc-400 hover:text-white transition-colors duration-200"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5.5 h-5.5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.main>

            {/* Post-Home Container */}
            <div ref={postHomeRef} className="relative w-full bg-white dark:bg-[#131314] text-zinc-800 dark:text-zinc-100 transition-colors duration-500 z-20">
              <SectionDivider />

            {/* About Section with Selected Experience & Core Expertise modules */}
            <motion.section
              id="about"
              style={{
                opacity: aboutOpacity,
                filter: aboutBlur,
                y: aboutY,
              }}
              className="relative w-full min-h-screen flex flex-col justify-center py-12 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 z-10"
            >
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto w-full relative z-10"
              >
                {/* Section Header */}
                <motion.div variants={staggerItem} className="mb-6 md:mb-12 xl:mb-16">
                  <span className="font-mono text-xs xl:text-sm uppercase tracking-widest text-accent font-bold">
                     ABOUT ME
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 xl:gap-24 items-center">
                  {/* Left Column: Headline and Bio Details stacked */}
                  <div className="order-2 md:order-1 md:col-span-7 xl:col-span-8 space-y-6 md:space-y-8">
                    <div className="space-y-4">
                      <motion.h3 variants={staggerItem} className="font-sans font-extrabold text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl tracking-tight text-zinc-900 dark:text-white leading-tight">
                        Architecting robust solutions with clean code & dynamic design.
                      </motion.h3>
                      <motion.p variants={staggerItem} className="font-sans text-sm xl:text-base 2xl:text-lg text-accent/90 font-medium">
                        I believe every interaction should be deliberate, every component optimized, and every line of code structured for scalability.
                      </motion.p>
                    </div>

                    <div className="space-y-4">
                      <motion.p variants={staggerItem} className="font-sans text-base xl:text-lg 2xl:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        As a Full Stack Developer based in India, I specialize in building next-generation web and mobile applications. I bridge the gap between complex backend architectures and flawless user interfaces, ensuring that speed, responsiveness, and aesthetic precision coexist.
                      </motion.p>
                      <motion.p variants={staggerItem} className="font-sans text-base xl:text-lg 2xl:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        With years of experience in system architecture, frontend frameworks, and cloud infrastructures, I build tools that solve real-world problems and leave lasting visual impressions.
                      </motion.p>
                    </div>
                  </div>

                  {/* Right Column: Chrome Avatar Image */}
                  <motion.div 
                    variants={staggerItem} 
                    className="order-1 md:order-2 md:col-span-5 xl:col-span-4 flex justify-center md:justify-end items-center"
                  >
                    <ChromeAvatar />
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>

            <SectionDivider />

            {/* Projects Section */}
            <motion.section
              id="projects"
              className="relative w-full min-h-screen flex flex-col justify-center py-12 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 z-10 scroll-mt-24"
            >
              <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto w-full relative z-10 space-y-8 md:space-y-12 xl:space-y-16">
                <div>
                  <span className="font-mono text-xs xl:text-sm uppercase tracking-widest text-accent font-bold">
                     FEATURED PROJECTS
                  </span>
                </div>

                <div className="relative flex flex-col gap-12 md:gap-36 xl:gap-44 pt-6 md:pt-10">

                  {/* Project 1: NexCart */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 xl:gap-16 items-center relative">
                    {/* Description Fades In on the left */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="col-span-12 md:col-span-5 space-y-4 pr-0 md:pr-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-zinc-500">PROJECT OF TRANSFORMATION</span>
                      </div>
                      <h3 className="font-sans font-extrabold text-2xl md:text-3xl xl:text-4xl text-zinc-900 dark:text-white tracking-tight">
                        NexCart Enterprise
                      </h3>
                      <p className="font-sans text-sm xl:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        A robust, enterprise-grade e-commerce system architected to solve multi-device cart conflicts and high-latency database queries. Designed to maintain lightning-fast response times even during peak traffic loads.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        <span>High-Performance Telemetry Integration</span>
                      </div>
                    </motion.div>

                    {/* Project Card Slides and lights up dynamically when scrolled into view */}
                    <TiltCard 
                      initial={{ opacity: 0.3, scale: 0.96, y: 30 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1.01, 
                        y: 0, 
                      }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => {
                        const proj = PROJECTS.find(p => p.id === "nexcart");
                        if (proj) setSelectedProject(proj);
                      }}
                      className="cursor-pointer col-span-12 md:col-span-6 md:col-start-7 shadow-2xl z-10"
                    >
                      <div className="p-6 md:p-8 xl:p-10 flex flex-col justify-between h-full min-h-[380px] md:min-h-[420px]">
                        <div>
                          <div className="flex justify-between items-start mb-6">
                             <span className="font-mono text-[10px] xl:text-[11px] tracking-widest text-zinc-500 uppercase">E-Commerce // Web Platform</span>
                             <span className="text-zinc-500 font-mono text-[10px] xl:text-[11px] bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-white/5">2026</span>
                          </div>
                          <h4 className="font-sans font-extrabold text-2xl xl:text-3xl 2xl:text-4xl text-zinc-900 dark:text-white mb-3 group-hover:text-accent transition-colors duration-200">NexCart</h4>
                          <p className="font-sans text-sm xl:text-base 2xl:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-6">
                            A high-performance full-stack e-commerce system featuring seamless shopping shopping cart sync, dynamic multi-attribute product filters, secure stripe payments, and automated shipping status telemetry.
                          </p>
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-2 mb-6">
                             {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'].map((tag) => (
                              <span key={tag} className="font-mono text-[9px] xl:text-[10px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/[0.03] px-2 py-1 rounded border border-zinc-200 dark:border-white/5">{tag}</span>
                            ))}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const proj = PROJECTS.find(p => p.id === "nexcart");
                              if (proj) setSelectedProject(proj);
                            }}
                            className="inline-flex items-center gap-2 font-sans text-xs xl:text-sm 2xl:text-base font-bold text-zinc-800 dark:text-accent hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer text-left"
                          >
                            Explore Technical Solutions & Challenges
                            <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                          </button>
                        </div>
                      </div>
                    </TiltCard>
                  </div>

                  {/* Project 2: Atlas Voice Assistant */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 xl:gap-16 items-center relative">
                    {/* Description Fades In on the left */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="col-span-12 md:col-span-5 space-y-4 pr-0 md:pr-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-zinc-500">VOICE & AUDIO AUTOMATION</span>
                      </div>
                      <h3 className="font-sans font-extrabold text-2xl md:text-3xl xl:text-4xl text-zinc-900 dark:text-white tracking-tight">
                        Atlas Intelligent Assistant
                      </h3>
                      <p className="font-sans text-sm xl:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                        A real-time voice recognition assistant integrated with low-latency signal rendering. Designed to minimize browser layout overhead using direct Canvas memory context.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        <span>GPU-Accelerated Waveform Visualization</span>
                      </div>
                    </motion.div>

                    {/* Project Card Slides and lights up dynamically when scrolled into view */}
                    <TiltCard 
                      initial={{ opacity: 0.3, scale: 0.96, y: 30 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1.01, 
                        y: 0, 
                      }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => {
                        const proj = PROJECTS.find(p => p.id === "atlas-voice");
                        if (proj) setSelectedProject(proj);
                      }}
                      className="cursor-pointer col-span-12 md:col-span-6 md:col-start-7 shadow-2xl z-10"
                    >
                      <div className="p-6 md:p-8 xl:p-10 flex flex-col justify-between h-full min-h-[380px] md:min-h-[420px]">
                        <div>
                          <div className="flex justify-between items-start mb-6">
                             <span className="font-mono text-[10px] xl:text-[11px] tracking-widest text-zinc-500 uppercase">AI Automation // Mobile Client</span>
                             <span className="text-zinc-500 font-mono text-[10px] xl:text-[11px] bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-white/5">2025</span>
                          </div>
                          <h4 className="font-sans font-extrabold text-2xl xl:text-3xl 2xl:text-4xl text-zinc-900 dark:text-white mb-3 group-hover:text-accent transition-colors duration-200">Atlas Voice Assistant</h4>
                          <p className="font-sans text-sm xl:text-base 2xl:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-6">
                            An AI-driven companion interpreting natural language, triggering responsive system operations, and featuring a real-time fluid waveform visualizer built with canvas rendering.
                          </p>
                        </div>
                        <div>
                          {/* Immersive Waveform Visualizer simulation that pulses on hover */}
                          <div className="h-4 xl:h-6 flex items-end gap-[3px] xl:gap-[4px] mb-6 px-1 group-hover:opacity-100 opacity-60 transition-opacity duration-300">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                              <span 
                                key={i} 
                                className="w-[3px] xl:w-[4px] bg-accent rounded-full animate-pulse" 
                                style={{ 
                                  height: `${Math.sin(i) * 50 + 60}%`, 
                                  animationDelay: `${i * 80}ms`,
                                  animationDuration: '0.8s'
                                }} 
                              />
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {['React Native', 'TypeScript', 'Web Speech API', 'Node.js', 'Framer Motion'].map((tag) => (
                              <span key={tag} className="font-mono text-[9px] xl:text-[10px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/[0.03] px-2 py-1 rounded border border-zinc-200 dark:border-white/5">{tag}</span>
                            ))}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const proj = PROJECTS.find(p => p.id === "atlas-voice");
                              if (proj) setSelectedProject(proj);
                            }}
                            className="inline-flex items-center gap-2 font-sans text-xs xl:text-sm 2xl:text-base font-bold text-zinc-800 dark:text-accent hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer text-left"
                          >
                            Explore Technical Solutions & Challenges
                            <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                          </button>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Skills Section */}
            <motion.section
              id="skills"
              className="relative w-full min-h-screen flex flex-col justify-center py-12 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 z-10 scroll-mt-24"
            >
              <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto w-full relative z-10 space-y-8 md:space-y-12 xl:space-y-16">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-6 md:space-y-12 xl:space-y-16"
                >
                  <motion.div variants={staggerItem}>
                    <span className="font-mono text-xs xl:text-sm uppercase tracking-widest text-accent font-bold">
                       FULL STACK SKILLS
                     </span>
                  </motion.div>

                  <motion.div variants={staggerItem} className="space-y-6">
                    <h3 className="font-sans font-extrabold text-3xl xl:text-4xl 2xl:text-5xl text-zinc-900 dark:text-white tracking-tight">
                      Technical Capabilities & Tooling
                    </h3>
                    <p className="font-sans text-sm xl:text-base 2xl:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
                      Pragmatic engineering combined with visual detail. Here is a granular breakdown of my full stack proficiency, focusing on modern web ecosystem capabilities.
                    </p>
                  </motion.div>
                </motion.div>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 2xl:gap-10"
                >
                    {/* Frontend Architecture */}
                    <TiltCard 
                      variants={skillCardVariants}
                      className="shadow-2xl z-10"
                    >
                      <div className="p-6 xl:p-8 2xl:p-10">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] xl:text-[10px] tracking-widest text-accent uppercase font-bold">Client Side</span>
                            <h4 className="font-sans font-bold text-lg xl:text-xl 2xl:text-2xl text-zinc-900 dark:text-white">Frontend Architecture</h4>
                          </div>
                          <span className="font-mono text-xs xl:text-sm text-zinc-500 font-semibold bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded border border-zinc-200 dark:border-white/5">95%</span>
                        </div>
                        <p className="font-sans text-xs xl:text-sm 2xl:text-base text-zinc-600 dark:text-zinc-400 mb-6 font-light">
                          Specialized in designing highly reactive interfaces, fluid animations, modular design systems, and SEO-optimized web templates with strict web vitals performance tuning.
                        </p>
                        
                        {/* Skill Sub-categories */}
                        <motion.div 
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                          className="space-y-3"
                        >
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>React, Next.js, Vite & TS</span>
                              <span className="font-mono">Advanced</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[95%] rounded-full" />
                            </div>
                          </motion.div>
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>Tailwind CSS, motion & UI Systems</span>
                              <span className="font-mono">Expert</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[98%] rounded-full" />
                            </div>
                          </motion.div>
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>State Management (Zustand, Redux)</span>
                              <span className="font-mono">Advanced</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[90%] rounded-full" />
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </TiltCard>

                    {/* Backend Architecture */}
                    <TiltCard 
                      variants={skillCardVariants}
                      className="shadow-2xl z-10"
                    >
                      <div className="p-6 xl:p-8 2xl:p-10">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] xl:text-[10px] tracking-widest text-accent uppercase font-bold">Server Side</span>
                            <h4 className="font-sans font-bold text-lg xl:text-xl 2xl:text-2xl text-zinc-900 dark:text-white">Backend Systems</h4>
                          </div>
                          <span className="font-mono text-xs xl:text-sm text-zinc-500 font-semibold bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded border border-zinc-200 dark:border-white/5">90%</span>
                        </div>
                        <p className="font-sans text-xs xl:text-sm 2xl:text-base text-zinc-600 dark:text-zinc-400 mb-6 font-light">
                          Structuring scalable server ecosystems, clean RESTful/GraphQL web service contracts, real-time message brokers, caching nodes, and reliable asynchronous job pipelines.
                        </p>
                        
                        {/* Skill Sub-categories */}
                        <motion.div 
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                          className="space-y-3"
                        >
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>Node.js, Express & NestJS</span>
                              <span className="font-mono">Advanced</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[92%] rounded-full" />
                            </div>
                          </motion.div>
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>Go (Golang) Microservices</span>
                              <span className="font-mono">Intermediate</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[78%] rounded-full" />
                            </div>
                          </motion.div>
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>APIs, Websockets & Authentication</span>
                              <span className="font-mono">Advanced</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[90%] rounded-full" />
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </TiltCard>

                    {/* Databases & Storage */}
                    <TiltCard 
                      variants={skillCardVariants}
                      className="shadow-2xl z-10"
                    >
                      <div className="p-6 xl:p-8 2xl:p-10">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] xl:text-[10px] tracking-widest text-accent uppercase font-bold">Data Management</span>
                            <h4 className="font-sans font-bold text-lg xl:text-xl 2xl:text-2xl text-zinc-900 dark:text-white">Database & Cache Layer</h4>
                          </div>
                          <span className="font-mono text-xs xl:text-sm text-zinc-500 font-semibold bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded border border-zinc-200 dark:border-white/5">88%</span>
                        </div>
                        <p className="font-sans text-xs xl:text-sm 2xl:text-base text-zinc-600 dark:text-zinc-400 mb-6 font-light">
                          Designing transactional relational models, optimized NoSQL storage schemas, database indices, analytical structures, and fast query pipelines with ORMs.
                        </p>
                        
                        {/* Skill Sub-categories */}
                        <motion.div 
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                          className="space-y-3"
                        >
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>PostgreSQL & SQL Query Optimization</span>
                              <span className="font-mono">Advanced</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[90%] rounded-full" />
                            </div>
                          </motion.div>
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>Redis & Memory Caching</span>
                              <span className="font-mono">Intermediate</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[82%] rounded-full" />
                            </div>
                          </motion.div>
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>MongoDB & Firestore (NoSQL)</span>
                              <span className="font-mono">Advanced</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[88%] rounded-full" />
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </TiltCard>

                    {/* Infrastructure & Operations */}
                    <TiltCard 
                      variants={skillCardVariants}
                      className="shadow-2xl z-10"
                    >
                      <div className="p-6 xl:p-8 2xl:p-10">
                        <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] xl:text-[10px] tracking-widest text-accent uppercase font-bold">Cloud Ops</span>
                            <h4 className="font-sans font-bold text-lg xl:text-xl 2xl:text-2xl text-zinc-900 dark:text-white">DevOps & Cloud Deploy</h4>
                          </div>
                          <span className="font-mono text-xs xl:text-sm text-zinc-500 font-semibold bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded border border-zinc-200 dark:border-white/5">85%</span>
                        </div>
                        <p className="font-sans text-xs xl:text-sm 2xl:text-base text-zinc-600 dark:text-zinc-400 mb-6 font-light">
                          Deploying production builds using modern CI/CD orchestration, virtual container setups, load balancers, secure reverse-proxies, and standard serverless infrastructure.
                        </p>
                        
                        {/* Skill Sub-categories */}
                        <motion.div 
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                          className="space-y-3"
                        >
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>Docker Containerization</span>
                              <span className="font-mono">Advanced</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[90%] rounded-full" />
                            </div>
                          </motion.div>
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>GCP & AWS Serverless hosting</span>
                              <span className="font-mono">Intermediate</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[80%] rounded-full" />
                            </div>
                          </motion.div>
                          <motion.div variants={staggerItem}>
                            <div className="flex justify-between text-[11px] xl:text-xs 2xl:text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-1">
                              <span>GitHub Actions & CI/CD automation</span>
                              <span className="font-mono">Advanced</span>
                            </div>
                            <div className="h-1 bg-zinc-250 dark:bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-accent w-[86%] rounded-full" />
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </TiltCard>
                  </motion.div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Contact Section */}
            <div className="scroll-mt-24">
              <ContactSection />
            </div>


          </div>
        </motion.div>

        {/* Intro Loader overlay rendered conditionally on top */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              key="intro-loader"
              variants={introContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex flex-col bg-black overflow-hidden"
            >
              {/* High-fidelity liquid metallic waving background texture replicating the user's reference image */}
              <div 
                className="absolute inset-[-120px] z-0 pointer-events-none opacity-45 liquid-metal-bg"
                style={{
                  filter: "url(#liquid-metal-displace-bg) contrast(1.4) brightness(0.85)",
                }}
              />

              {/* TOP HALF: Metallic "HELLO" Word Container */}
              <div className="h-1/2 w-full flex items-end justify-center pb-[5px] relative z-10 select-none">
                <div className="flex gap-4 md:gap-6">
                  {helloLetters.map((char, idx) => (
                    <motion.span
                      key={idx}
                      variants={letterVariants}
                      className="relative font-display font-black text-6xl md:text-8xl tracking-tighter uppercase select-none"
                    >
                      {/* 3D Volumetric Silver Extrusion Layer */}
                      <span 
                        className="absolute inset-0 select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-700" 
                        style={{
                          textShadow: `
                            1px 1px 0px #ffffff,
                            2px 2px 0px #e2e8f0,
                            3px 3px 0px #cbd5e1,
                            4px 4px 0px #94a3b8,
                            5px 5px 0px #64748b,
                            6px 6px 0px #475569,
                            7px 7px 0px #334155,
                            8px 8px 0px #1e293b,
                            9px 9px 15px rgba(0, 0, 0, 0.95)
                          `,
                          transform: "translate(0, 0)",
                        }}
                      >
                        {char}
                      </span>
                      {/* Front Silver Metallic Layer (Shiny polished chrome with liquid shift) */}
                      <span 
                        className="relative z-10 bg-clip-text text-transparent block drop-shadow-[0_2px_5px_rgba(255,255,255,0.2)] liquid-metal-text"
                        style={{
                          backgroundImage: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 15%, #94a3b8 30%, #334155 45%, #ffffff 55%, #94a3b8 70%, #cbd5e1 85%, #ffffff 100%)",
                        }}
                      >
                        {char}
                      </span>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* WATER LINE: Precise 10px Gap with Water Line Highlight Separator */}
              <div className="w-full h-[10px] flex items-center justify-center relative z-20 select-none">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[0.5px]" />
              </div>

              {/* BOTTOM HALF: Deep Animated Water Pool (Seamless Liquid Flow) */}
              <div 
                className="h-1/2 w-full relative bg-transparent overflow-hidden flex justify-center pt-[5px] select-none cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Inverted Real Water Reflection with flowing wave ripples and gentle swaying movement */}
                <motion.div 
                  className="flex gap-4 md:gap-6 relative overflow-visible origin-top pointer-events-none opacity-45 select-none z-10"
                  animate={{
                    x: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    transform: "scaleY(-0.82) skewX(-1.5deg)",
                    filter: "url(#water-reflection-ripple) blur(0.5px)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1.0) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0) 85%)",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1.0) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0) 85%)",
                  }}
                >
                  {helloLetters.map((char, idx) => (
                    <motion.span
                      key={`ref-${idx}`}
                      variants={letterVariants}
                      className="relative font-display font-black text-6xl md:text-8xl tracking-tighter uppercase select-none"
                    >
                      {/* 3D Volumetric Silver Extrusion Layer */}
                      <span 
                        className="absolute inset-0 select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-700" 
                        style={{
                          textShadow: `
                            1px 1px 0px #ffffff,
                            2px 2px 0px #e2e8f0,
                            3px 3px 0px #cbd5e1,
                            4px 4px 0px #94a3b8,
                            5px 5px 0px #64748b,
                            6px 6px 0px #475569,
                            7px 7px 0px #334155,
                            8px 8px 0px #1e293b,
                            9px 9px 15px rgba(0, 0, 0, 0.95)
                          `,
                          transform: "translate(0, 0)",
                        }}
                      >
                        {char}
                      </span>
                      {/* Front Silver Metallic Layer */}
                      <span 
                        className="relative z-10 bg-clip-text text-transparent block liquid-metal-text"
                        style={{
                          backgroundImage: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 15%, #94a3b8 30%, #334155 45%, #ffffff 55%, #94a3b8 70%, #cbd5e1 85%, #ffffff 100%)",
                        }}
                      >
                        {char}
                      </span>
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Custom SVG Displacement Map simulating natural flowing water currents */}
              <svg className="absolute w-0 h-0" width="0" height="0">
                <defs>
                  <linearGradient id="water-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="water-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
                  </linearGradient>

                  <filter id="water-reflection-ripple" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015 0.055" numOctaves="3" result="wave">
                      <animate 
                        attributeName="baseFrequency" 
                        dur="5s" 
                        values="0.015 0.045; 0.02 0.085; 0.015 0.045" 
                        repeatCount="indefinite" 
                      />
                    </feTurbulence>
                    
                    {/* Subtle, beautiful organic liquid point light disturbance following the mouse with inertia */}
                    <motion.feDiffuseLighting 
                      in="wave" 
                      lightingColor="#ffffff" 
                      surfaceScale={surfaceScaleVal} 
                      result="light"
                    >
                      <motion.fePointLight x={smoothMouseX} y={smoothMouseY} z={35} />
                    </motion.feDiffuseLighting>
                    
                    {/* Composite the base wave map with the light wave map */}
                    <feComposite in="wave" in2="light" operator="arithmetic" k1="0" k2="1.0" k3="0.8" k4="0" result="combinedMap" />

                    <motion.feDisplacementMap 
                      in="SourceGraphic" 
                      in2="combinedMap" 
                      scale={displacementScaleVal} 
                      xChannelSelector="R" 
                      yChannelSelector="G"
                    >
                      <animate 
                        attributeName="scale" 
                        dur="4s" 
                        values="14;22;14" 
                        repeatCount="indefinite" 
                      />
                    </motion.feDisplacementMap>
                  </filter>

                  <filter id="liquid-metal-displace-bg" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.005 0.01" numOctaves="4" result="noise">
                      <animate 
                        attributeName="baseFrequency" 
                        dur="6s" 
                        values="0.005 0.01; 0.008 0.02; 0.005 0.01" 
                        repeatCount="indefinite" 
                      />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
