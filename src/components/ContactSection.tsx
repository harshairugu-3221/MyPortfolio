import React, { useState } from "react";
import { SOCIAL_LINKS } from "../data";
import { Linkedin, Instagram, Github, Globe, Mail, Check, Loader2, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { SocialLink } from "../types";

interface LiquidMetalLinkProps {
  key?: any;
  social: any;
  getSocialIcon: any;
}

function LiquidMetalLink({ social, getSocialIcon }: LiquidMetalLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-between p-4 border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden transition-all duration-300 bg-white dark:bg-[#060606] shadow-sm cursor-pointer z-10 hover:border-zinc-400 dark:hover:border-zinc-500"
      id={`social-link-${social.name.toLowerCase()}`}
    >
      {/* Liquid Metal Backdrop Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
        {/* Metallic base sheet */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-200 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-200" />
        
        {/* SVG Liquid Ripple Flowing Layer */}
        <svg 
          className="absolute inset-0 w-full h-full scale-[1.12]" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0,0 Q 50,0 100,0 T 100,100 Q 50,100 0,100 Z"
            animate={{
              d: isHovered
                ? [
                    "M 0,0 C 30,15 70,-15 100,0 L 100,100 C 70,85 30,115 0,100 Z",
                    "M 0,0 C 40,-10 60,20 100,0 L 100,100 C 60,110 40,80 0,100 Z",
                    "M 0,0 C 30,15 70,-15 100,0 L 100,100 C 70,85 30,115 0,100 Z"
                  ]
                : "M 0,0 Q 50,0 100,0 T 100,100 Q 50,100 0,100 Z"
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            fill="rgba(255, 255, 255, 0.95)"
            filter="url(#liquid-metal-chrome)"
          />
        </svg>

        {/* Dynamic Sweep Highlight Shine */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none mix-blend-overlay"
          animate={isHovered ? {
            x: ["-100%", "200%"]
          } : { x: "-100%" }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Foreground Content with Transition on Hover to absolute pure contrast black */}
      <div className="relative z-10 flex items-center gap-3 transform group-hover:translate-x-1 transition-transform duration-300 text-zinc-700 dark:text-zinc-300 group-hover:text-black">
        <div className="transition-transform duration-300 group-hover:scale-110">
          {getSocialIcon(social.name)}
        </div>
        <span className="font-sans text-xs font-semibold tracking-wide">
          {social.name}
        </span>
      </div>

      <ArrowUpRight className="relative z-10 w-4 h-4 text-zinc-400 group-hover:text-black group-hover:rotate-45 transition-all duration-300" />
    </a>
  );
}

function LiquidMetalFilter() {
  return (
    <svg className="absolute w-0 h-0 pointer-events-none" width="0" height="0" aria-hidden="true">
      <defs>
        <filter id="liquid-metal-chrome" x="-20%" y="-20%" width="140%" height="140%">
          {/* Turbulence to generate liquid organic displacement map */}
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.015 0.04" 
            numOctaves="3" 
            result="noise" 
          />
          
          {/* Smooth displacement mapping */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="18" 
            xChannelSelector="R" 
            yChannelSelector="G" 
            result="displaced" 
          />
          
          {/* High-contrast glossy specular light */}
          <feSpecularLighting 
            in="displaced" 
            specularExponent="45" 
            specularConstant="1.8" 
            lightingColor="#ffffff" 
            result="specLight"
          >
            <fePointLight x="100" y="-30" z="60" />
          </feSpecularLighting>
          
          {/* Composite specular highlight with source graphic */}
          <feComposite 
            in="specLight" 
            in2="SourceGraphic" 
            operator="in" 
            result="specOut" 
          />
          
          {/* Blend together for the perfect metallic chrome liquid mercury shine */}
          <feArithmetic 
            k1="0.4" 
            k2="0.7" 
            k3="1.3" 
            k4="0" 
            in="SourceGraphic" 
            in2="specOut" 
            result="lit" 
          />
        </filter>
      </defs>
    </svg>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "Branding Project",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError("Please fill out all required fields.");
      return;
    }
    setError("");
    setStatus("submitting");

    // Simulate safe local contact form handler
    setTimeout(() => {
      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", subject: "Branding Project", message: "" });
    }, 1800);
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "github":
        return <Github className="w-4.5 h-4.5" />;
      case "linkedin":
        return <Linkedin className="w-4.5 h-4.5" />;
      case "instagram":
        return <Instagram className="w-4.5 h-4.5" />;
      default:
        return <Globe className="w-4.5 h-4.5" />;
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-12 md:py-24 px-4 sm:px-6 md:px-12 xl:px-32 relative z-10"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 md:mb-20"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-3">
            Reach Out
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-black dark:text-white uppercase tracking-tight">
            CONTACT US
          </h2>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Panel: Text & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between gap-8 md:gap-12"
          >
            <div className="space-y-6">
              
              {/* Direct email display */}
              <div className="pt-4 flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-400">EMAIL</span>
                  <a
                    href="mailto:harshairugu@gmail.com"
                    className="font-sans text-sm font-medium text-gray-900 hover:text-black dark:text-gray-100 dark:hover:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-zinc-700"
                    id="contact-email-link"
                  >
                    harshairugu@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social profiles list */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                FOLLOW
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <LiquidMetalLink
                    key={social.name}
                    social={social}
                    getSocialIcon={getSocialIcon}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Form canvas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 bg-white/40 dark:bg-[#0d0d0e] p-8 md:p-10 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl shadow-sm backdrop-blur-sm relative overflow-hidden"
          >
            
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
                id="contact-success-screen"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6 border border-accent/20 shadow-sm">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-xl text-black dark:text-white uppercase tracking-tight">
                  Brief Received Successfully
                </h3>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400 font-light mt-3 max-w-sm leading-relaxed">
                  Thank you for reaching out. I have cataloged your brief and will review your project details within the next 24 business hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 font-mono text-[10px] uppercase tracking-wider text-gray-400 hover:text-black dark:hover:text-white border-b border-gray-200 dark:border-zinc-700 pb-0.5 focus:outline-none"
                  id="reset-form-btn"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name field */}
                  <div className="space-y-2">
                    <label htmlFor="form-first-name" className="block font-mono text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="form-first-name"
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-[#141415] border border-gray-200 dark:border-zinc-800 focus:border-black dark:focus:border-zinc-500 rounded-xl font-sans text-sm outline-none transition-colors duration-200 text-black dark:text-white"
                    />
                  </div>

                  {/* Last Name field */}
                  <div className="space-y-2">
                    <label htmlFor="form-last-name" className="block font-mono text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="form-last-name"
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-[#141415] border border-gray-200 dark:border-zinc-800 focus:border-black dark:focus:border-zinc-500 rounded-xl font-sans text-sm outline-none transition-colors duration-200 text-black dark:text-white"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label htmlFor="form-email" className="block font-mono text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    disabled={status === "submitting"}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-[#141415] border border-gray-200 dark:border-zinc-800 focus:border-black dark:focus:border-zinc-500 rounded-xl font-sans text-sm outline-none transition-colors duration-200 text-black dark:text-white"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="form-message" className="block font-mono text-[9px] uppercase tracking-wider text-gray-400 font-medium">
                    WRITE A MESSAGE <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message here...."
                    disabled={status === "submitting"}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-[#141415] border border-gray-200 dark:border-zinc-800 focus:border-black dark:focus:border-zinc-500 rounded-xl font-sans text-sm outline-none transition-colors duration-200 text-black dark:text-white resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 font-mono" id="form-error-msg">
                    {error}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-display font-medium text-xs uppercase tracking-wider rounded-sm transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                  id="submit-form-btn"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Dispatching Brief...
                    </>
                  ) : (
                    "SEND MESSAGE"
                  )}
                </button>
              </form>
            )}

          </motion.div>

        </div>
      </div>
      <LiquidMetalFilter />
    </motion.section>
  );
}
