import React, { useState, useEffect, useRef } from "react";
import { Project } from "../types";
import { Sparkles, RefreshCw, Smartphone, Sliders, Play, RotateCw, Type, Eye, ShoppingCart, Terminal, MessageSquare, Mic, Volume2 } from "lucide-react";

interface InteractiveSandboxProps {
  project: Project;
}

export default function InteractiveSandbox({ project }: InteractiveSandboxProps) {
  // Common states or setup
  const [resetKey, setResetKey] = useState(0);

  // 1. Aura Skincare State
  const [auraColor, setAuraColor] = useState("#c5b59f"); // warm beige
  const [auraFont, setAuraFont] = useState("font-display"); // serif-display
  const [auraScale, setAuraScale] = useState(1.0);
  const [auraVariant, setAuraVariant] = useState("Nourishing Serum");

  // 2. Novus Quarterly State
  const [novusColumns, setNovusColumns] = useState(3);
  const [novusMargin, setNovusMargin] = useState(24);
  const [novusLineHeight, setNovusLineHeight] = useState(1.6);
  const [novusDropCap, setNovusDropCap] = useState(true);

  // 3. Kinetica Exhibition State
  const [kineticSpeed, setKineticSpeed] = useState(1.5);
  const [kineticFrequency, setKineticFrequency] = useState(4);
  const [kineticColor, setKineticColor] = useState("bg-rose-600 text-white");
  const [kineticText, setKineticText] = useState("KINETICA");

  // 4. Tether App State
  const [tetherTasks, setTetherTasks] = useState([
    { id: 1, text: "Sketch primary container concepts", done: true },
    { id: 2, text: "Consult print master on tactile paper stock", done: false },
    { id: 3, text: "Verify WebGL rendering rate on mobile viewport", done: false }
  ]);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [tetherPhoneDark, setTetherPhoneDark] = useState(true);
  const [tetherCategory, setTetherCategory] = useState("Focus Board");

  // 5. Chronicle Cover State
  const [coverTitle, setCoverTitle] = useState("THE METAMORPHOSIS");
  const [coverGraphic, setCoverGraphic] = useState("circle");
  const [coverFoil, setCoverFoil] = useState("gold"); // gold, silver, charcoal
  const [coverTheme, setCoverTheme] = useState("bg-zinc-100");

  // 6. Vanguard Stamp State
  const [stampPressure, setStampPressure] = useState(4); // 1-10
  const [stampAngle, setStampAngle] = useState(-5);
  const [stampPaper, setStampPaper] = useState("kraft"); // kraft, cream, linen

  // 7. NexCart State
  const [nexCartItems, setNexCartItems] = useState([
    { id: 1, name: "Premium Mech Keyboard", price: 129, qty: 1 },
    { id: 2, name: "Modular Monitor Arm", price: 89, qty: 1 },
    { id: 3, name: "USB-C Travel Hub", price: 45, qty: 2 }
  ]);
  const [nexCoupon, setNexCoupon] = useState("");
  const [nexPaymentStatus, setNexPaymentStatus] = useState<"idle" | "processing" | "success">("idle");
  const [nexLogs, setNexLogs] = useState<string[]>([
    "SYS // INTRUDER SHIELD: STANDBY",
    "SYS // REDIS DISTRIBUTED SESSION: CREATED",
    "SYS // POSTGRES DB CONNECTION: STABLE (Pool: 15/20)"
  ]);

  // 8. Atlas Voice Assistant State
  const [atlasCommand, setAtlasCommand] = useState("Sync my NexCart checkout");
  const [atlasListening, setAtlasListening] = useState(false);
  const [atlasResponse, setAtlasResponse] = useState("Ready. Tap trigger button or select command to test voice assistant pipeline.");
  const [atlasLogs, setAtlasLogs] = useState<string[]>([
    "ATLAS // VOICE ENGINE CORE: ONLINE",
    "ATLAS // LOCAL ACCELEROMETER NOTCH: STANDBY",
    "ATLAS // HIGH-ACCURACY DSP CHIP: ACTIVE"
  ]);

  const handleNexCartQty = (id: number, delta: number) => {
    setNexCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(0, item.qty + delta);
        if (nextQty !== item.qty) {
          setNexLogs(l => [
            `SYS // CART CACHE DEBOUNCER: QUEUED CHANGE (Item #${id} qty -> ${nextQty})`,
            `SYS // REDIS CART HSET: SUCCESS (Cart synced in 2ms)`,
            ...l.slice(0, 5)
          ]);
        }
        return { ...item, qty: nextQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const submitNexPayment = () => {
    if (nexPaymentStatus !== "idle") return;
    setNexPaymentStatus("processing");
    setNexLogs(l => [
      "SYS // CHECKOUT INITIATED: /api/checkout/session",
      "SYS // MEMORY MUTATION: ACQUIRED TRANSACTION COUPLING LOCK",
      ...l
    ]);

    setTimeout(() => {
      setNexLogs(l => [
        "SYS // STRIPE GATEWAY: POSTING Session ID Request...",
        "SYS // DATABASE: CREATING RESERVED RECORD (Status: UNPAID)",
        ...l
      ]);
    }, 600);

    setTimeout(() => {
      setNexLogs(l => [
        "SYS // STRIPE COMPLIANCE: TRANSACTION INITIATION cs_live_04x95f1h",
        "SYS // STRIPE SECURE SECRETS HANDSHAKE: IN FLIGHT",
        ...l
      ]);
    }, 1200);

    setTimeout(() => {
      setNexLogs(l => [
        "SYS // WEBHOOK RECEIVER: stripe.event received: payment_intent.succeeded",
        "SYS // DATABASE: UPGRADING ORDER status -> COMPLETE (Tx Commit OK)",
        "SYS // TELEMETRY: ORDER LOGGED, SHIPPING COUPLING DISPATCHED (ID: SH-38501)",
        ...l
      ]);
      setNexPaymentStatus("success");
    }, 2000);
  };

  const submitAtlasVoice = (customText?: string) => {
    if (atlasListening) return;
    const cmd = customText || atlasCommand;
    if (!cmd.trim()) return;

    setAtlasListening(true);
    setAtlasResponse("");
    setAtlasLogs(l => [
      `ATLAS // MIC WAKE-UP: CAPTURED INTENT: "${cmd}"`,
      "ATLAS // AUDIO CAPTURING: PROCESSING PCM FLOAT ARRAY [44.1kHz]",
      ...l
    ]);

    setTimeout(() => {
      setAtlasLogs(l => [
        "ATLAS // SPEECH RECOGNITION: SPEECH-TO-TEXT COMPLETE",
        `ATLAS // CORE COMMAND MATCHED: ${cmd.toUpperCase().replace(/ /g, "_")}`,
        "ATLAS // AGENT PIPELINE: RESOLVING SEMANTIC PROMPT ON GOOGLE GEMINI",
        ...l
      ]);
    }, 600);

    setTimeout(() => {
      let responseText = `Understood. Processing your instruction: "${cmd}". Command executed successfully.`;
      if (cmd.includes("Sync")) {
        responseText = "Understood. Accessing database pool and synchronizing your current checkout basket items to Stripe payment node secure cache.";
      } else if (cmd.includes("database")) {
        responseText = "Initiating Postgres performance check. Current query pools are active, connection count at 15, query times executing in 8ms.";
      } else if (cmd.includes("architecture")) {
        responseText = "Displaying secure system architectural flow: Client UI built with React/TS maps commands to custom server router; database operations synchronized via Redis memory indexes.";
      }

      setAtlasResponse(responseText);
      setAtlasLogs(l => [
        "ATLAS // AI MODEL INFERENCE: SUCCESS",
        "ATLAS // VOCAL WAVEFORM GENERATOR: SYNTHESIZING MP3 BUFFER",
        "ATLAS // DSP OUTPUT: INJECTING FLUID CANVAS SPECTRUM RIPPLE",
        ...l
      ]);
      setAtlasListening(false);
    }, 1500);
  };

  const handleAddTetherTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTetherTasks([
      ...tetherTasks,
      { id: Date.now(), text: newTaskInput.trim(), done: false }
    ]);
    setNewTaskInput("");
  };

  const toggleTetherTask = (id: number) => {
    setTetherTasks(
      tetherTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
    // Reset specific ones
    if (project.id === "aura-skincare") {
      setAuraColor("#c5b59f");
      setAuraFont("font-display");
      setAuraScale(1.0);
      setAuraVariant("Nourishing Serum");
    } else if (project.id === "novus-quarterly") {
      setNovusColumns(3);
      setNovusMargin(24);
      setNovusLineHeight(1.6);
      setNovusDropCap(true);
    } else if (project.id === "kinetica-exhibition") {
      setKineticSpeed(1.5);
      setKineticFrequency(4);
      setKineticColor("bg-rose-600 text-white");
      setKineticText("KINETICA");
    } else if (project.id === "tether-app") {
      setTetherTasks([
        { id: 1, text: "Sketch primary container concepts", done: true },
        { id: 2, text: "Consult print master on tactile paper stock", done: false },
        { id: 3, text: "Verify WebGL rendering rate on mobile viewport", done: false }
      ]);
      setTetherPhoneDark(true);
      setTetherCategory("Focus Board");
    } else if (project.id === "chronicle-books") {
      setCoverTitle("THE METAMORPHOSIS");
      setCoverGraphic("circle");
      setCoverFoil("gold");
      setCoverTheme("bg-zinc-100");
    } else if (project.id === "vanguard-coffee") {
      setStampPressure(4);
      setStampAngle(-5);
      setStampPaper("kraft");
    } else if (project.id === "nexcart") {
      setNexCartItems([
        { id: 1, name: "Premium Mech Keyboard", price: 129, qty: 1 },
        { id: 2, name: "Modular Monitor Arm", price: 89, qty: 1 },
        { id: 3, name: "USB-C Travel Hub", price: 45, qty: 2 }
      ]);
      setNexCoupon("");
      setNexPaymentStatus("idle");
      setNexLogs([
        "SYS // INTRUDER SHIELD: STANDBY",
        "SYS // REDIS DISTRIBUTED SESSION: CREATED",
        "SYS // POSTGRES DB CONNECTION: STABLE (Pool: 15/20)"
      ]);
    } else if (project.id === "atlas-voice") {
      setAtlasCommand("Sync my NexCart checkout");
      setAtlasListening(false);
      setAtlasResponse("Ready. Tap trigger button or select command to test voice assistant pipeline.");
      setAtlasLogs([
        "ATLAS // VOICE ENGINE CORE: ONLINE",
        "ATLAS // LOCAL ACCELEROMETER NOTCH: STANDBY",
        "ATLAS // HIGH-ACCURACY DSP CHIP: ACTIVE"
      ]);
    }
  };

  return (
    <div className="w-full bg-gray-50/50 dark:bg-[#0d0d0e] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden" id={`sandbox-root-${project.id}`}>
      
      {/* Sandbox Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-[#0d0d0e]/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            Interactive Prototype Sandbox
          </span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 font-mono text-[9px] uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none"
          title="Reset sandbox configurations"
          id={`sandbox-reset-${project.id}`}
        >
          <RefreshCw className="w-3 h-3" />
          Reset Specs
        </button>
      </div>

      {/* Grid container layout splitting configuration controls from simulated physical outcome */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
        
        {/* LEFT COMPONENT: Spec Parameters (Controls) */}
        <div className="md:col-span-5 p-5 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800/80 bg-white/30 dark:bg-[#141415]/40 flex flex-col justify-between">
          <div className="space-y-5">
            <h5 className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
              SYSTEM CONSTRAINTS
            </h5>

            {/* Render customizable settings depending on the project id */}
            {project.id === "aura-skincare" && (
              <div className="space-y-4">
                {/* Bottle Color Select */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Container Coating</span>
                  <div className="flex gap-2">
                    {[
                      { hex: "#c5b59f", label: "Beige" },
                      { hex: "#8c9f8d", label: "Sage" },
                      { hex: "#c28d75", label: "Terra" },
                      { hex: "#1c1c1e", label: "Obsidian" }
                    ].map((item) => (
                      <button
                        key={item.hex}
                        onClick={() => setAuraColor(item.hex)}
                        style={{ backgroundColor: item.hex }}
                        className={`w-6 h-6 rounded-full border focus:outline-none ${
                          auraColor === item.hex ? "ring-2 ring-black dark:ring-white border-white" : "border-gray-200"
                        }`}
                        title={item.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Typography Choice */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Label Typography Type</span>
                  <select
                    value={auraFont}
                    onChange={(e) => setAuraFont(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs text-black dark:text-white rounded-sm focus:outline-none"
                  >
                    <option value="font-display">Space Grotesk (Display Sans)</option>
                    <option value="font-sans">Inter (Minimalist Sans)</option>
                    <option value="font-mono">JetBrains Mono (Technical Mono)</option>
                  </select>
                </div>

                {/* Scaling Factor */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Emblem Layout Scale</span>
                    <span className="font-mono text-[10px]">{auraScale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.75"
                    max="1.3"
                    step="0.05"
                    value={auraScale}
                    onChange={(e) => setAuraScale(parseFloat(e.target.value))}
                    className="w-full accent-black dark:accent-white"
                  />
                </div>

                {/* Product Variant */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Product Line Formula</span>
                  <select
                    value={auraVariant}
                    onChange={(e) => setAuraVariant(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs text-black dark:text-white rounded-sm focus:outline-none"
                  >
                    <option value="Organic Hydration Elixir">Organic Hydration Elixir</option>
                    <option value="Active Botanicals Serum">Active Botanicals Serum</option>
                    <option value="Night Clarifying Fluid">Night Clarifying Fluid</option>
                  </select>
                </div>
              </div>
            )}

            {project.id === "novus-quarterly" && (
              <div className="space-y-4">
                {/* Print column options */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Layout Editorial Columns</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[2, 3, 4, 6].map((col) => (
                      <button
                        key={col}
                        onClick={() => setNovusColumns(col)}
                        className={`py-1 rounded-sm text-xs font-mono border focus:outline-none transition-colors ${
                          novusColumns === col
                            ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                            : "bg-white dark:bg-zinc-900 text-gray-500 border-gray-200 dark:border-zinc-800"
                        }`}
                      >
                        {col} Col
                      </button>
                    ))}
                  </div>
                </div>

                {/* Padding margin space slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Negative Outer Margin</span>
                    <span className="font-mono text-[10px]">{novusMargin}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="36"
                    step="2"
                    value={novusMargin}
                    onChange={(e) => setNovusMargin(parseInt(e.target.value))}
                    className="w-full accent-black dark:accent-white"
                  />
                </div>

                {/* Line Height multiplier slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Body Typographic Leading</span>
                    <span className="font-mono text-[10px]">{novusLineHeight}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.3"
                    max="1.9"
                    step="0.1"
                    value={novusLineHeight}
                    onChange={(e) => setNovusLineHeight(parseFloat(e.target.value))}
                    className="w-full accent-black dark:accent-white"
                  />
                </div>

                {/* Toggle Dropcap checkbox */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none py-1">
                  <input
                    type="checkbox"
                    checked={novusDropCap}
                    onChange={(e) => setNovusDropCap(e.target.checked)}
                    className="rounded border-gray-300 dark:border-zinc-800 accent-black dark:accent-white w-4 h-4 focus:outline-none"
                  />
                  <span className="font-sans text-xs text-gray-600 dark:text-gray-300">
                    Enable Swiss Drop-Capital
                  </span>
                </label>
              </div>
            )}

            {project.id === "kinetica-exhibition" && (
              <div className="space-y-4">
                {/* Custom typography message */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Kinetic Text Core</span>
                  <input
                    type="text"
                    maxLength={14}
                    value={kineticText}
                    onChange={(e) => setKineticText(e.target.value.toUpperCase())}
                    className="w-full px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs text-black dark:text-white rounded-sm focus:outline-none uppercase font-mono"
                  />
                </div>

                {/* Speed coefficient slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Wave Oscillation Rate</span>
                    <span className="font-mono text-[10px]">{kineticSpeed.toFixed(1)}s loop</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="3.0"
                    step="0.2"
                    value={kineticSpeed}
                    onChange={(e) => setKineticSpeed(parseFloat(e.target.value))}
                    className="w-full accent-rose-600 dark:accent-rose-500"
                  />
                </div>

                {/* Wave Density scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Repetition Density</span>
                    <span className="font-mono text-[10px]">{kineticFrequency} stacks</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="1"
                    value={kineticFrequency}
                    onChange={(e) => setKineticFrequency(parseInt(e.target.value))}
                    className="w-full accent-rose-600 dark:accent-rose-500"
                  />
                </div>

                {/* Poster primary theme color options */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Poster Swiss Palette</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { class: "bg-rose-600 text-white border-rose-700", label: "Swiss Red" },
                      { class: "bg-zinc-900 text-yellow-300 border-zinc-950", label: "Cyber" },
                      { class: "bg-emerald-500 text-zinc-950 border-emerald-600", label: "Acid" }
                    ].map((pColor) => (
                      <button
                        key={pColor.label}
                        onClick={() => setKineticColor(pColor.class)}
                        className={`py-1 px-2 rounded-sm text-[10px] font-mono border focus:outline-none truncate ${
                          kineticColor === pColor.class ? "ring-2 ring-black dark:ring-white border-white" : ""
                        }`}
                      >
                        {pColor.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {project.id === "tether-app" && (
              <div className="space-y-4">
                {/* Virtual frame theme toggle */}
                <div className="flex justify-between items-center py-1">
                  <span className="font-sans text-xs text-gray-500">Virtual Viewport Theme</span>
                  <button
                    onClick={() => setTetherPhoneDark(!tetherPhoneDark)}
                    className="px-2.5 py-1 text-[10px] font-mono border border-gray-200 dark:border-zinc-800 rounded-sm hover:border-black dark:hover:border-white focus:outline-none"
                  >
                    Set {tetherPhoneDark ? "Light View" : "Dark View"}
                  </button>
                </div>

                {/* Toggle category navigation */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Active Mobile Tab</span>
                  <div className="grid grid-cols-2 gap-2">
                    {["Focus Board", "Tag Analytics"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setTetherCategory(tab)}
                        className={`py-1 text-[10px] font-mono border rounded-sm focus:outline-none ${
                          tetherCategory === tab
                            ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                            : "bg-white dark:bg-zinc-900 text-gray-500 border-gray-200 dark:border-zinc-800"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive note app simulation input */}
                <form onSubmit={handleAddTetherTask} className="space-y-1.5 pt-1">
                  <span className="block font-sans text-xs text-gray-500">Inject Live Wireframe Data</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add task to preview frame..."
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs rounded-sm focus:outline-none text-black dark:text-white font-sans"
                    />
                    <button
                      type="submit"
                      className="px-3 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 text-xs rounded-sm focus:outline-none font-sans font-medium"
                    >
                      +
                    </button>
                  </div>
                </form>
              </div>
            )}

            {project.id === "chronicle-books" && (
              <div className="space-y-4">
                {/* Title presets */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Select Literature Work</span>
                  <select
                    value={coverTitle}
                    onChange={(e) => setCoverTitle(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs text-black dark:text-white rounded-sm focus:outline-none font-sans"
                  >
                    <option value="THE METAMORPHOSIS">The Metamorphosis — Kafka</option>
                    <option value="NINETEEN EIGHTY-FOUR">Nineteen Eighty-Four — Orwell</option>
                    <option value="TO THE LIGHTHOUSE">To The Lighthouse — Woolf</option>
                  </select>
                </div>

                {/* Abstract graphic choice */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Bookplate Central Metaphor</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "circle", label: "Zen Circle" },
                      { id: "cubes", label: "Cubic Grid" },
                      { id: "cross", label: "Asymmetric X" }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setCoverGraphic(g.id)}
                        className={`py-1 text-[10px] font-mono border rounded-sm focus:outline-none ${
                          coverGraphic === g.id
                            ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                            : "bg-white dark:bg-zinc-900 text-gray-500 border-gray-200 dark:border-zinc-800"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hot foil overlay style */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Tactile Foil Overlay</span>
                  <div className="flex gap-2">
                    {[
                      { id: "gold", color: "bg-amber-400 border-amber-500", label: "Gold Leaf" },
                      { id: "silver", color: "bg-slate-300 border-slate-400", label: "Alloy Silver" },
                      { id: "blind", color: "bg-zinc-800 border-zinc-900", label: "Blind Emboss" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCoverFoil(item.id)}
                        className={`px-2.5 py-1 text-[10px] font-mono rounded-sm border focus:outline-none flex items-center gap-1.5 ${
                          coverFoil === item.id ? "ring-2 ring-black dark:ring-white" : ""
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color} block`} />
                        {item.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cover Board paper stock color */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Cover Paper Board stock</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { theme: "bg-zinc-100 border-zinc-200", label: "Soft Paper" },
                      { theme: "bg-zinc-800 border-zinc-900", label: "Charcoal" },
                      { theme: "bg-amber-950 border-amber-900", label: "Crimson Claret" }
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setCoverTheme(item.theme)}
                        className={`py-1 text-[10px] font-mono border rounded-sm focus:outline-none transition-all truncate ${
                          coverTheme.split(" ")[0] === item.theme.split(" ")[0]
                            ? "border-black dark:border-white font-semibold"
                            : "border-gray-200 dark:border-zinc-800 text-gray-500"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {project.id === "vanguard-coffee" && (
              <div className="space-y-4">
                {/* Stamp pressure bleed slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Stamp Ink Pressure</span>
                    <span className="font-mono text-[10px]">{stampPressure} // 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={stampPressure}
                    onChange={(e) => setStampPressure(parseInt(e.target.value))}
                    className="w-full accent-amber-800 dark:accent-amber-600"
                  />
                </div>

                {/* Rotation align angle */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Asymmetry Stamp Tilt</span>
                    <span className="font-mono text-[10px]">{stampAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="-25"
                    max="25"
                    step="1"
                    value={stampAngle}
                    onChange={(e) => setStampAngle(parseInt(e.target.value))}
                    className="w-full accent-amber-800 dark:accent-amber-600"
                  />
                </div>

                {/* Paper texture base */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Sustainable Paper Base</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "kraft", label: "Raw Kraft" },
                      { id: "cream", label: "Recycled Cream" },
                      { id: "linen", label: "Tactile Grey" }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setStampPaper(p.id)}
                        className={`py-1 text-[10px] font-mono border rounded-sm focus:outline-none ${
                          stampPaper === p.id
                            ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                            : "bg-white dark:bg-zinc-900 text-gray-500 border-gray-200 dark:border-zinc-800"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {project.id === "nexcart" && (
              <div className="space-y-4">
                {/* Simulated E-Commerce Basket Adjuster */}
                <div className="space-y-2">
                  <span className="block font-sans text-xs text-gray-500 font-medium">Simulated Active Cart Items</span>
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 border border-gray-150 dark:border-white/5 p-2 rounded bg-white/20 dark:bg-black/15">
                    {nexCartItems.length === 0 ? (
                      <div className="text-[10px] font-mono text-gray-400 py-3 text-center">Your basket is empty. Reset Specs to load items.</div>
                    ) : (
                      nexCartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 dark:border-white/5 last:border-0">
                          <div className="truncate pr-2">
                            <span className="font-sans font-medium text-black dark:text-white block truncate">{item.name}</span>
                            <span className="font-mono text-[9px] text-gray-400">${item.price} each</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleNexCartQty(item.id, -1)}
                              className="w-5 h-5 rounded bg-gray-200 dark:bg-white/10 text-black dark:text-white flex items-center justify-center font-mono hover:bg-gray-300 dark:hover:bg-white/20 focus:outline-none"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs w-4 text-center text-black dark:text-white font-semibold">{item.qty}</span>
                            <button
                              onClick={() => handleNexCartQty(item.id, 1)}
                              className="w-5 h-5 rounded bg-gray-200 dark:bg-white/10 text-black dark:text-white flex items-center justify-center font-mono hover:bg-gray-300 dark:hover:bg-white/20 focus:outline-none"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Simulated Coupon Field */}
                <div className="space-y-1.5">
                  <span className="block font-sans text-xs text-gray-500">Apply System Coupon Code</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={nexCoupon}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setNexCoupon(val);
                        if (val === "WELCOME10") {
                          setNexLogs(l => ["SYS // COUPON INJECT: WELCOME10 matches (10% discount enabled)", ...l.slice(0, 5)]);
                        }
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs rounded-sm focus:outline-none text-black dark:text-white font-mono"
                    />
                  </div>
                </div>

                {/* Checkout CTA Node */}
                <div className="pt-2">
                  <button
                    onClick={submitNexPayment}
                    disabled={nexCartItems.length === 0 || nexPaymentStatus !== "idle"}
                    className={`w-full py-2.5 text-xs rounded-sm font-sans font-medium flex items-center justify-center gap-2 border shadow-sm transition-all focus:outline-none ${
                      nexPaymentStatus === "success"
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600"
                        : nexPaymentStatus === "processing"
                        ? "bg-amber-500 text-white border-amber-600 cursor-not-allowed"
                        : "bg-accent hover:bg-accent-hover text-zinc-950 border-accent-hover"
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {nexPaymentStatus === "success"
                      ? "Checkout Decoupled Success!"
                      : nexPaymentStatus === "processing"
                      ? "Stripe Pipeline Processing..."
                      : `Dispatch Secure Stripe checkout ($${nexCartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0) - (nexCoupon === "WELCOME10" ? Math.round(nexCartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0) * 0.1) : 0)})`}
                  </button>
                </div>
              </div>
            )}

            {project.id === "atlas-voice" && (
              <div className="space-y-4">
                {/* Quick actions select buttons */}
                <div className="space-y-2">
                  <span className="block font-sans text-xs text-gray-500 font-medium">Preset Voice Intents</span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {[
                      { text: "Sync my NexCart checkout", label: "Trigger Cart Sync Pipeline" },
                      { text: "Run database performance query", label: "Postgres Diagnostic Run" },
                      { text: "Explain system architecture", label: "Dissect Project Architecture" }
                    ].map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setAtlasCommand(btn.text);
                          submitAtlasVoice(btn.text);
                        }}
                        disabled={atlasListening}
                        className={`w-full text-left px-3 py-2 text-xs font-sans rounded-sm border transition-all focus:outline-none flex items-center justify-between group ${
                          atlasCommand === btn.text 
                            ? "bg-accent/10 text-accent border-accent/40" 
                            : "bg-white dark:bg-zinc-900 border-gray-150 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:border-gray-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <span className="truncate">{btn.label}</span>
                        <Play className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom input dispatcher */}
                <div className="space-y-1.5 pt-1">
                  <span className="block font-sans text-xs text-gray-500">Inject Custom Audio Speech Intent</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Turn down query latency..."
                      value={atlasCommand}
                      onChange={(e) => setAtlasCommand(e.target.value)}
                      disabled={atlasListening}
                      className="flex-1 px-2.5 py-1.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs rounded-sm focus:outline-none text-black dark:text-white"
                    />
                    <button
                      onClick={() => submitAtlasVoice()}
                      disabled={atlasListening || !atlasCommand.trim()}
                      className="w-8 h-8 rounded bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 flex items-center justify-center shrink-0 focus:outline-none"
                      title="Dispatch Voice Processing"
                    >
                      <Mic className={`w-4 h-4 ${atlasListening ? "text-rose-500 animate-pulse" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Guidelines info badge */}
          <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex gap-2 items-start mt-4">
            <Sparkles className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <p className="font-sans text-[10px] text-gray-400 dark:text-gray-500 leading-normal font-light">
              This sandbox is generated live directly from the design vector metadata. Shift slider parameters to examine structural boundaries.
            </p>
          </div>
        </div>

        {/* RIGHT COMPONENT: Mock Viewport Outcome */}
        <div className="md:col-span-7 p-6 flex items-center justify-center bg-gray-100/40 dark:bg-black/20 overflow-hidden relative">
          
          {/* Subtle Grid background indicators */}
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-zinc-900 [mask-image:linear-gradient(0deg,transparent,black)] opacity-20 pointer-events-none" />

          {/* 1. Aura Skincare Output */}
          {project.id === "aura-skincare" && (
            <div className="flex flex-col items-center">
              {/* Bottle body wire mockup */}
              <div
                style={{ backgroundColor: auraColor }}
                className="w-36 h-56 rounded-t-3xl rounded-b-lg border border-black/10 shadow-lg relative flex flex-col items-center p-4 pt-12 transition-all duration-500 ease-out"
                id="skincare-bottle-mock"
              >
                {/* Dropper Cap assembly */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-5 h-6 bg-zinc-400 dark:bg-zinc-700 rounded-sm border-b-2 border-black/10" />
                  <div className="w-7 h-1.5 bg-zinc-200 dark:bg-zinc-600 rounded-sm" />
                </div>

                {/* Minimal label plate */}
                <div className="w-full bg-white dark:bg-zinc-900 border border-black/5 rounded-xs p-3 flex flex-col justify-between h-full items-center text-center shadow-xs">
                  <div>
                    <h6 className={`uppercase tracking-widest text-[9px] text-gray-400 ${auraFont}`}>AURA</h6>
                    <p
                      style={{ transform: `scale(${auraScale})` }}
                      className={`text-black dark:text-white font-semibold tracking-tight leading-tight mt-1 transition-transform duration-300 text-[11px] ${auraFont}`}
                    >
                      ORGANIC FLUID
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-100 dark:border-zinc-800 pt-1.5 w-full">
                    <span className="block font-mono text-[6px] text-gray-400 uppercase tracking-widest">
                      {auraVariant}
                    </span>
                    <span className="block font-mono text-[5px] text-gray-500 mt-0.5">
                      1.7 FL. OZ. // 50ML e
                    </span>
                  </div>
                </div>
              </div>

              {/* Status display */}
              <span className="font-mono text-[9px] text-gray-400 mt-4 uppercase">
                Render Outcome: Coating {auraColor} // Scale {auraScale}x
              </span>
            </div>
          )}

          {/* 2. Novus Quarterly Output */}
          {project.id === "novus-quarterly" && (
            <div
              style={{ padding: `${novusMargin}px` }}
              className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg rounded-xs min-h-[300px] transition-all duration-300 flex flex-col justify-between"
              id="editorial-page-mock"
            >
              {/* Header metrics */}
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-2 mb-3">
                <span className="font-mono text-[8px] uppercase tracking-wider text-gray-400">
                  Novus Quarterly // Issue 04
                </span>
                <span className="font-mono text-[8px] text-gray-400">Page 47</span>
              </div>

              {/* Multi Column Container */}
              <div
                style={{
                  columnCount: novusColumns,
                  columnGap: "16px",
                  lineHeight: novusLineHeight,
                }}
                className="font-sans text-[10px] text-gray-600 dark:text-gray-300 text-justify tracking-normal font-light transition-all duration-300"
              >
                {novusDropCap && (
                  <span className="float-left font-display font-bold text-3xl leading-[0.8] text-black dark:text-white mr-1.5 mt-1 border border-black dark:border-white px-1.5 py-0.5">
                    A
                  </span>
                )}
                rchitecture is a form of spatial geometry written on paper before it reaches brick and mortar. The quarterly journal examines grid boundaries and typographical structures that allow empty negative space to flow through contemporary structural pages. By letting blocks of copy align on a strict grid with asymmetric weight, the design honors structural clarity and material honesty.
              </div>

              {/* Grid Guides Line */}
              <div className="mt-4 pt-2 border-t border-dashed border-gray-100 dark:border-zinc-800/60 flex justify-between font-mono text-[7px] text-gray-400">
                <span>GRID: {novusColumns} COLS</span>
                <span>LEADING: {novusLineHeight}x</span>
              </div>
            </div>
          )}

          {/* 3. Kinetica Exhibition Output */}
          {project.id === "kinetica-exhibition" && (
            <div className="w-64 h-80 rounded-sm border border-black/10 shadow-xl overflow-hidden relative" id="kinetic-canvas">
              {/* Animated wave elements */}
              <div className={`absolute inset-0 flex flex-col justify-center p-6 ${kineticColor} transition-colors duration-300`}>
                
                {/* Header info */}
                <div className="absolute top-4 left-6 right-6 flex justify-between font-mono text-[8px] tracking-widest uppercase">
                  <span>MoDA SIGNAGE</span>
                  <span>MUSEUM</span>
                </div>

                {/* Repeating moving letters */}
                <div className="space-y-1.5 select-none relative z-10 mt-4 overflow-hidden">
                  {Array.from({ length: kineticFrequency }).map((_, i) => {
                    // alternate moving left and right
                    const isEven = i % 2 === 0;
                    const duration = kineticSpeed * (1 + i * 0.15);
                    return (
                      <div
                        key={i}
                        style={{
                          animation: `kineticSlide ${duration}s ease-in-out infinite alternate`,
                          transform: `translateX(${isEven ? "-15px" : "15px"})`,
                          fontFamily: "var(--font-display)"
                        }}
                        className="font-display font-extrabold text-2xl md:text-3xl tracking-tight leading-none whitespace-nowrap block"
                      >
                        {kineticText || "KINETICA"}
                      </div>
                    );
                  })}
                </div>

                {/* Standard raw CSS animation injection since Tailwind v4 handles custom class bindings or standard keyframes */}
                <style>{`
                  @keyframes kineticSlide {
                    0% { transform: translateX(-15%); opacity: 0.65; }
                    100% { transform: translateX(10%); opacity: 1; }
                  }
                `}</style>

                {/* Footer specs */}
                <div className="absolute bottom-4 left-6 right-6 border-t border-white/20 dark:border-black/10 pt-2 flex justify-between font-mono text-[7px] opacity-85">
                  <span>SWISS RATIO</span>
                  <span>FREQ: {kineticFrequency}X // {kineticSpeed}S</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. Tether App Output */}
          {project.id === "tether-app" && (
            <div className="relative">
              {/* Phone Container */}
              <div className={`w-64 h-96 rounded-[32px] border-4 border-gray-300 dark:border-zinc-800 shadow-2xl overflow-hidden relative flex flex-col justify-between ${
                tetherPhoneDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"
              } transition-colors duration-300`}>
                
                {/* Speaker top notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-300 dark:bg-zinc-800 rounded-full z-20 flex items-center justify-center">
                  <div className="w-10 h-1 bg-black/40 dark:bg-black/60 rounded-full" />
                </div>

                {/* App UI Workspace Header */}
                <div className="pt-8 px-4 pb-3 border-b border-gray-100 dark:border-zinc-800/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-mono text-[7px] uppercase text-gray-500 tracking-widest">Workspace</span>
                      <h6 className="font-display font-bold text-xs">Tether Flow</h6>
                    </div>
                    <span className="font-mono text-[7px] px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded-xs uppercase tracking-wider scale-90">
                      v1.2.0
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2.5 mt-3 border-t border-gray-100 dark:border-zinc-800/40 pt-2 font-sans text-[8px] text-gray-400">
                    <span className={`${tetherCategory === "Focus Board" ? "text-black dark:text-white font-semibold underline underline-offset-2" : ""}`}>
                      Focus Board
                    </span>
                    <span className={`${tetherCategory === "Tag Analytics" ? "text-black dark:text-white font-semibold underline underline-offset-2" : ""}`}>
                      Analytics
                    </span>
                  </div>
                </div>

                {/* App UI Contents */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {tetherCategory === "Focus Board" ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[7px] uppercase tracking-wider text-gray-400">ACTIVE LOGS ({tetherTasks.length})</span>
                      </div>
                      
                      {tetherTasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTetherTask(task.id)}
                          className="flex items-start gap-2 p-2 rounded-xs border border-gray-100 dark:border-zinc-900 bg-black/[0.02] dark:bg-white/[0.02] cursor-pointer hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
                        >
                          <div className={`w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center shrink-0 mt-0.5 ${
                            task.done ? "bg-emerald-500 border-emerald-500" : ""
                          }`}>
                            {task.done && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                          <span className={`font-sans text-[9px] leading-snug flex-1 ${
                            task.done ? "line-through text-gray-400 dark:text-zinc-600" : ""
                          }`}>
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2.5 pt-1">
                      <span className="font-mono text-[7px] uppercase tracking-wider text-gray-400 block">VISUAL WEIGHT ANALYSIS</span>
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[8px] text-gray-400">
                          <span>Typographical Contrast</span>
                          <span className="font-mono">82%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-[82%] h-full bg-black dark:bg-white" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[8px] text-gray-400">
                          <span>Negative Space Ratio</span>
                          <span className="font-mono">48%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-[48%] h-full bg-black dark:bg-white" />
                        </div>
                      </div>

                      <p className="font-sans text-[8px] text-gray-400 leading-normal pt-1 italic font-light">
                        "White space is the engine of the layout." — Grid System Rules
                      </p>
                    </div>
                  )}
                </div>

                {/* Phone Home visual swipe bar indicator */}
                <div className="h-6 flex justify-center items-center">
                  <div className="w-16 h-1 bg-gray-300 dark:bg-zinc-700 rounded-full" />
                </div>
              </div>
            </div>
          )}

          {/* 5. Chronicle Cover Output */}
          {project.id === "chronicle-books" && (
            <div className="flex flex-col items-center">
              {/* Novel Board layout */}
              <div className={`w-52 h-76 ${coverTheme} rounded-sm border border-black/10 shadow-2xl relative p-5 flex flex-col justify-between transition-colors duration-500`}>
                
                {/* Book Spine border visual */}
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/5 dark:bg-white/5 border-r border-black/5" />

                {/* Literary Series Badge */}
                <div className="pl-2.5">
                  <span className="block font-mono text-[6px] tracking-widest text-gray-400 uppercase">
                    CHRONICLE MODERN CLASSICS
                  </span>
                  <div className="h-[1px] bg-gray-200 dark:bg-zinc-800 w-12 mt-1" />
                </div>

                {/* Abstract Symbol graphic plate */}
                <div className="flex justify-center my-4 pl-2.5">
                  {coverGraphic === "circle" && (
                    <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center p-2">
                      <div className={`w-8 h-8 rounded-full ${
                        coverFoil === "gold" ? "bg-amber-400 shadow-md" : coverFoil === "silver" ? "bg-slate-300 shadow-md" : "bg-zinc-900"
                      } transition-colors duration-300`} />
                    </div>
                  )}

                  {coverGraphic === "cubes" && (
                    <div className="grid grid-cols-2 gap-1.5 w-12 h-12 p-0.5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-xs border ${
                            coverFoil === "gold" ? "bg-amber-400 border-amber-500" : coverFoil === "silver" ? "bg-slate-300 border-slate-400" : "bg-zinc-900 border-zinc-950"
                          } transition-colors duration-300`}
                        />
                      ))}
                    </div>
                  )}

                  {coverGraphic === "cross" && (
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className={`absolute w-12 h-0.5 ${
                        coverFoil === "gold" ? "bg-amber-400" : coverFoil === "silver" ? "bg-slate-300" : "bg-zinc-900"
                      } rotate-45 transition-colors`} />
                      <div className={`absolute w-12 h-0.5 ${
                        coverFoil === "gold" ? "bg-amber-400" : coverFoil === "silver" ? "bg-slate-300" : "bg-zinc-900"
                      } -rotate-45 transition-colors`} />
                    </div>
                  )}
                </div>

                {/* Book Metadata details */}
                <div className="pl-2.5">
                  <h3 className="font-display font-semibold text-[13px] tracking-tight leading-tight text-gray-900 dark:text-zinc-100">
                    {coverTitle}
                  </h3>
                  <span className="block font-mono text-[7px] text-gray-400 mt-1 uppercase">
                    MODERN FICTION // SERIES VOL. I
                  </span>
                </div>
              </div>

              {/* Status footer info */}
              <span className="font-mono text-[9px] text-gray-400 mt-4 uppercase">
                Foil Overlay: {coverFoil.toUpperCase()} LEAF // METAPHOR: {coverGraphic.toUpperCase()}
              </span>
            </div>
          )}

          {/* 6. Vanguard Stamp Output */}
          {project.id === "vanguard-coffee" && (
            <div className="flex flex-col items-center">
              {/* Physical Kraft bag simulation */}
              <div className={`w-52 h-72 rounded-sm shadow-xl p-5 flex flex-col justify-between border relative transition-colors duration-300 ${
                stampPaper === "kraft" ? "bg-[#d2b48c] border-[#c0a078]" : stampPaper === "cream" ? "bg-[#f5f5dc] border-[#e3e3c7]" : "bg-[#dedede] border-[#cccccc]"
              }`}>
                {/* Paper texture visual noise layer */}
                <div className="absolute inset-0 bg-noise pointer-events-none opacity-20 mix-blend-multiply" />

                {/* Bag sealer clip */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-40 h-3.5 bg-zinc-800 border-b border-black rounded-sm shadow-xs" />

                {/* Bag folds indicator */}
                <div className="h-4 border-b border-black/5 flex justify-between px-2 font-mono text-[5px] text-black/20">
                  <span>FOLD</span>
                  <span>FOLD</span>
                </div>

                {/* Stamped visual container with rotation */}
                <div
                  style={{
                    transform: `rotate(${stampAngle}deg)`,
                    transition: "transform 0.4s ease-out"
                  }}
                  className="flex flex-col items-center p-3.5 border-2 border-black/80 rounded-xs text-center my-6 max-w-[140px] mx-auto select-none"
                >
                  <span className="block font-display font-black text-xs tracking-widest text-black mb-1">
                    VANGUARD
                  </span>
                  
                  {/* Stamp pressure bleed simulator applying blur/opacity dynamically based on the state */}
                  <div
                    style={{
                      opacity: 0.5 + stampPressure * 0.05,
                      filter: `blur(${(10 - stampPressure) * 0.15}px)`
                    }}
                    className="font-mono text-[7px] text-black tracking-widest uppercase font-light leading-normal py-1 border-y border-black"
                  >
                    ARTISANAL ROAST
                  </div>

                  <span className="block font-mono text-[6px] text-black/70 mt-1 uppercase">
                    BATCH #22 // TACTILE
                  </span>
                </div>

                {/* Environmental bag certification badges */}
                <div className="flex justify-between items-end">
                  <div className="flex gap-1">
                    <div className="w-4.5 h-4.5 rounded-full border border-black/10 flex items-center justify-center text-[5px] font-mono text-black/30">eco</div>
                    <div className="w-4.5 h-4.5 rounded-full border border-black/10 flex items-center justify-center text-[5px] font-mono text-black/30">100%</div>
                  </div>
                  <span className="font-mono text-[7px] text-black/40">NET WT 12OZ</span>
                </div>
              </div>

              {/* Status details */}
              <span className="font-mono text-[9px] text-gray-400 mt-4 uppercase">
                Stamped Pressure: {stampPressure}/10 // Angle {stampAngle}°
              </span>
            </div>
          )}

          {/* 7. NexCart Output */}
          {project.id === "nexcart" && (
            <div className="w-full max-w-md bg-zinc-950 border border-zinc-850 p-4 rounded-lg shadow-2xl flex flex-col justify-between min-h-[340px]">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60 font-mono text-[8px] text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>NEX_GATEWAY_NODE // ADDR: 127.0.0.1:3000</span>
                </div>
                <span>SSL // SECURE</span>
              </div>

              {/* Live Terminal Log Stream */}
              <div className="flex-1 my-3 bg-black/60 border border-zinc-900 rounded p-3 font-mono text-[10px] text-zinc-300 overflow-y-auto space-y-1.5 min-h-[160px] max-h-[180px] scrollbar-thin">
                <div className="text-zinc-500 text-[9px] border-b border-zinc-900 pb-1 flex justify-between">
                  <span>SYSTEM REAL-TIME STREAM LOGS</span>
                  <span>LINES: {nexLogs.length}</span>
                </div>
                {nexLogs.map((log, idx) => (
                  <div key={idx} className={`leading-normal ${idx === 0 ? "text-accent" : log.includes("SUCCESS") || log.includes("matches") ? "text-emerald-400" : "text-zinc-400"}`}>
                    <span className="text-zinc-600 select-none mr-2">&gt;</span>
                    {log}
                  </div>
                ))}
              </div>

              {/* Order Status Badge & Bill Summary */}
              <div className="border-t border-zinc-900 pt-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <span className="block font-mono text-[7px] uppercase tracking-wider text-zinc-500">Checkout Pipeline State</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-2 h-2 rounded-full ${
                      nexPaymentStatus === "success"
                        ? "bg-emerald-500"
                        : nexPaymentStatus === "processing"
                        ? "bg-amber-500 animate-pulse"
                        : "bg-zinc-600"
                    }`} />
                    <span className="font-mono text-[10px] uppercase font-bold text-zinc-300">
                      {nexPaymentStatus === "success"
                        ? "TX_COMMIT // DELIVERED"
                        : nexPaymentStatus === "processing"
                        ? "TX_IN_FLIGHT // LOCKING"
                        : "BASKET_SESSION_STANDBY"}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block font-mono text-[7px] uppercase tracking-wider text-zinc-500">Decoupled Telemetry</span>
                  <span className="font-mono text-[10px] text-zinc-400 block mt-0.5">
                    {nexPaymentStatus === "success" ? "DISPATCH_ID: SH-38501" : "AWAITING_PAYMENT_INTENT"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 8. Atlas Voice Assistant Output */}
          {project.id === "atlas-voice" && (
            <div className="w-full max-w-md bg-zinc-950 border border-zinc-850 p-4 rounded-lg shadow-2xl flex flex-col justify-between min-h-[340px]">
              {/* Assistant Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60 font-mono text-[8px] text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${atlasListening ? "bg-rose-500 animate-ping" : "bg-accent"}`} />
                  <span>ATLAS // AUDIO MODULE CONTEXT</span>
                </div>
                <span>WAVE: ACTIVE</span>
              </div>

              {/* Animated Waveform Display */}
              <div className="h-20 flex items-center justify-center gap-1 bg-black/40 border border-zinc-900 rounded my-3 overflow-hidden relative">
                {/* Simulated Waveform lines */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const delay = i * 0.05;
                  const duration = atlasListening ? 0.3 + (i % 3) * 0.1 : 1.2 + (i % 2) * 0.4;
                  const height = atlasListening 
                    ? `${25 + Math.sin(i) * 20 + Math.random() * 25}%` 
                    : `${8 + Math.cos(i) * 5}%`;
                  return (
                    <div
                      key={i}
                      style={{
                        height: height,
                        transition: "height 0.15s ease-in-out",
                        animation: atlasListening ? `atlasBounce ${duration}s ease-in-out ${delay}s infinite alternate` : "none"
                      }}
                      className={`w-1 rounded-full ${atlasListening ? "bg-rose-500" : "bg-accent/40"}`}
                    />
                  );
                })}
                <style>{`
                  @keyframes atlasBounce {
                    0% { transform: scaleY(0.4); opacity: 0.6; }
                    100% { transform: scaleY(1.3); opacity: 1; }
                  }
                `}</style>
                <div className="absolute top-2 right-3 font-mono text-[6px] text-zinc-600 uppercase tracking-widest">
                  Live Spectrogram Output
                </div>
              </div>

              {/* Speech Output Box */}
              <div className="flex-1 bg-black/60 border border-zinc-900 rounded p-3 space-y-2 min-h-[100px]">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-1 font-mono text-[7px] text-zinc-600">
                  <span>ATLAS COGNITIVE RESPONSE</span>
                  <span>{atlasListening ? "PROCESSING..." : "IDLE // READY"}</span>
                </div>
                
                {atlasListening ? (
                  <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs animate-pulse py-2">
                    <Volume2 className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>Gemini pipeline synthesizing voice response...</span>
                  </div>
                ) : (
                  <div className="space-y-1.5 py-1">
                    <div className="flex gap-2 items-start">
                      <MessageSquare className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <p className="font-sans text-xs text-zinc-200 leading-normal italic font-light">
                        "{atlasResponse}"
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Small Diagnostics Trace Box */}
              <div className="mt-3 p-2 bg-black border border-zinc-900 rounded font-mono text-[8px] text-zinc-500 space-y-1 max-h-[50px] overflow-y-auto">
                <span className="block text-zinc-600 uppercase border-b border-zinc-950 pb-0.5">DUMP TRACE_LOG</span>
                {atlasLogs.slice(0, 2).map((log, i) => (
                  <div key={i} className="truncate">
                    <span className="text-zinc-700 mr-1">&gt;</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
