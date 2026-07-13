import { Project, Experience, SocialLink } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "aura-skincare",
    title: "Aura Skincare",
    category: "Packaging & Brand Identity",
    description: "A modern sustainable cosmetic line focusing on organic shapes and clean typography.",
    detailedDescription: "Brand system and physical container packaging designed for Aura's launch. Built upon a grid structure inspired by natural elements and earthy tone color palettes, the solution presents an eye-catching yet serene retail presence.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80"
    ],
    client: "Aura Organics",
    year: "2025",
    tags: ["Packaging", "Visual Identity", "3D Rendering"],
    deliverables: ["Brand Identity Guideline", "Box & Bottle Packaging", "Web Art Direction"],
    demoType: "branding",
    prototypeUrl: "https://aura-organics.design-demo.studio"
  },
  {
    id: "novus-quarterly",
    title: "Novus Quarterly",
    category: "Editorial & Print Design",
    description: "A custom typographic system and print layout for an independent architecture and design magazine.",
    detailedDescription: "Conceptual layout design and grid structure for Novus' Issue 04. Using asymmetric layouts, oversized serif drop capitals, and deep margins, the publication emphasizes negative space to celebrate contemporary structural forms.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
    ],
    client: "Novus Press",
    year: "2025",
    tags: ["Editorial", "Typography", "Print Layout"],
    deliverables: ["80-page Print Layout", "Custom Type Hierarchy", "Print Specification Consulting"],
    demoType: "editorial",
    prototypeUrl: "https://novus-quarterly.press-demo.studio"
  },
  {
    id: "kinetica-exhibition",
    title: "Kinetica Exhibition",
    category: "Poster & Art Direction",
    description: "An interactive identity and kinetic typography posters for the Museum of Digital Arts.",
    detailedDescription: "Visual guidelines and promotional materials featuring high-contrast geometric vector alignments. Inspired by the Swiss International Typographic Style, the system combines strict grid layouts with fluid, dynamic abstract patterns to express movement.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    ],
    client: "Museum of Digital Arts (MoDA)",
    year: "2024",
    tags: ["Poster Design", "Swiss Design", "Exhibition Identity"],
    deliverables: ["Exhibition Poster Series", "Environmental Signage", "Social Campaign Art"],
    demoType: "kinetic",
    prototypeUrl: "https://kinetica.moda-exhibition.studio"
  },
  {
    id: "tether-app",
    title: "Tether App",
    category: "UI/UX & Web Design",
    description: "A minimalist workspace and note-taking application designed for visual thinkers.",
    detailedDescription: "UX architecture, prototype research, and high-fidelity interface layouts for Tether. Built around a serene monochromatic canvas with responsive structural widgets, the mobile interface lets creative minds capture connections effortlessly.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    ],
    client: "Tether Labs",
    year: "2024",
    tags: ["UI/UX Design", "Mobile App Prototype", "Digital Product"],
    deliverables: ["Interactive Prototypes", "Design System Spec", "Asset Production Kit"],
    demoType: "ui-ux",
    prototypeUrl: "https://tether.workspace-prototype.studio"
  },
  {
    id: "chronicle-books",
    title: "Chronicle Books Series",
    category: "Cover Art & Print",
    description: "A series of classical novel re-jackets combining historical themes with minimalist graphic metaphors.",
    detailedDescription: "Redesigned jacket systems for three modernist literary masterpieces. Each jacket uses a single abstract icon combined with specialized embossing directions to create a memorable, tactile, shelf-worthy physical design.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491841573376-27d370d72419?auto=format&fit=crop&w=800&q=80"
    ],
    client: "Chronicle Publishing",
    year: "2024",
    tags: ["Cover Design", "Illustration", "Book Jacket"],
    deliverables: ["Three Book Cover Jackets", "E-Book Format Assets", "Promotional Bookmarks"],
    demoType: "cover",
    prototypeUrl: "https://chronicle-books.covers-showcase.studio"
  },
  {
    id: "vanguard-coffee",
    title: "Vanguard Coffee Co.",
    category: "Visual Identity",
    description: "Crafting an artisanal identity system featuring hand-printed typography and compostable packaging design.",
    detailedDescription: "Complete branding refresh for Vanguard Coffee. The scope centered on delivering an honest, raw, tactile visual identity including hand-stamped textures, bespoke letterpress assets, and 100% biodegradable packaging.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    ],
    client: "Vanguard Roasters",
    year: "2023",
    tags: ["Visual Identity", "Compostable Design", "Letterpress"],
    deliverables: ["Core Brand System Guide", "Coffee Bag Packaging Labels", "Merchandise Layouts"],
    demoType: "stamp",
    prototypeUrl: "https://vanguard-coffee.identity-spec.studio"
  },
  {
    id: "nexcart",
    title: "NexCart",
    category: "E-Commerce // Web Platform",
    description: "A high-performance full-stack e-commerce system featuring seamless shopping cart sync, dynamic multi-attribute product filters, secure stripe payments, and automated shipping status telemetry.",
    detailedDescription: "NexCart is a complete enterprise-grade e-commerce solution. It coordinates low-latency client-side browsing with bulletproof transaction processing. By optimizing database queries and introducing custom synchronization protocols, NexCart delivers extreme reliability even under sudden traffic peaks.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80"
    ],
    client: "NexCart Technologies",
    year: "2026",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe", "Redis"],
    deliverables: ["Decentralized Cart Sync Protocol", "Materialized Views Filtering Engine", "Secure Stripe Transaction Webhook", "Automated Dispatch Telemetry"],
    demoType: "fullstack",
    prototypeUrl: "https://github.com/harshairugu",
    challenges: [
      {
        title: "Real-time Cart Synchronization across Multiple Devices & Tabs",
        challenge: "Syncing cart items state seamlessly when user operates across multiple windows or devices can cause heavy database write overheads or delayed UI states.",
        solution: "Engineered a decentralized synchronization protocol combining custom broadcast channels (BroadcastChannel API) for instant same-browser cross-tab sync, coupled with optimized Redis-backed server-side cache invalidation on mutations to prevent heavy PostgreSQL write amplification during active browsing."
      },
      {
        title: "Multi-Attribute Complex Product Filtering Latency",
        challenge: "Generating dynamic filters (size, color, brand, price ranges) over catalogs of thousands of records on relational database queries started degrading to >400ms.",
        solution: "Implemented materialized views with predefined category indices and query pagination. Moved the search filter aggregation into memory and structured compound indexes in PostgreSQL, reducing query latency down to <15ms."
      },
      {
        title: "Telemetry & Stripe Checkout Security",
        challenge: "Ensuring user payment workflows and order pipelines are fully secure and do not drop when the browser tab closes mid-transaction.",
        solution: "Utilized standard idempotent transactional database queries coupled with decoupled asynchronous webhook handlers in Node.js listening to Stripe events. This guarantees database state alignment regardless of user browser session disruptions."
      }
    ]
  },
  {
    id: "atlas-voice",
    title: "Atlas Voice Assistant",
    category: "AI Automation // Mobile Client",
    description: "An AI-driven companion interpreting natural language, triggering responsive system operations, and featuring a real-time fluid waveform visualizer built with canvas rendering.",
    detailedDescription: "Atlas Voice Assistant transforms voice commands into system workflows. Designed with a custom waveform visualization, it provides seamless auditory and visual interaction loops while keeping client-side CPU consumption highly optimized.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    ],
    client: "Atlas Intelligence Ltd",
    year: "2025",
    tags: ["React Native", "TypeScript", "Web Speech API", "Node.js", "Framer Motion", "Canvas API"],
    deliverables: ["Low-latency Speech Recognition Pipeline", "Hardware-accelerated Waveform Render", "Context-Aware Sliding Memory Engine", "API Core Dispatch Middleware"],
    demoType: "fullstack",
    prototypeUrl: "https://github.com/harshairugu",
    challenges: [
      {
        title: "Native Audio Stream Latency and Keyword Detection",
        challenge: "High speech-to-text response delays on low-end mobile devices when relying purely on online cloud API processing.",
        solution: "Integrated an ultra-low latency hybrid voice-recognition engine. Utilized light local Web Speech API/native engines for direct local hotword trigger processing, upgrading asynchronously to high-accuracy model calls only for complex command contexts."
      },
      {
        title: "Smooth Canvas Rendering of Live Waveform Visualizer",
        challenge: "Rendering real-time audio frequencies inside a React Native/React web container was causing heavy layout thrashing and CPU utilization (spiking to 70%).",
        solution: "Shifted waveform rendering to an offscreen, requestAnimationFrame-driven HTML5 <canvas> element. Rather than re-rendering React elements on each decibel tick, the audio frequencies directly update a pre-allocated canvas context utilizing native GPU hardware-accelerated drawing."
      },
      {
        title: "Managing Complex Context-Aware Session Memory",
        challenge: "Sustaining persistent conversation context and custom workspace actions dynamically during voice-only workflows without bloating client state memory.",
        solution: "Designed a client-side sliding window session memory mechanism. It retains the last 5 high-context command states locally while asynchronously compressing long-term historical context in an encrypted database log on the server."
      }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "studio-archive",
    role: "Lead Graphic Designer",
    company: "Studio Archive",
    period: "2024 - Present",
    description: "Heading visual direction for international luxury, architectural, and cultural clients. Managing brand development and design systems.",
    highlights: [
      "Directed the complete brand identity refresh for two major independent art museums.",
      "Pioneered interactive WebGL design prototypes for client presentations and high-fidelity pitches.",
      "Led the design of 12+ award-winning printed editorial books and design catalogs."
    ]
  },
  {
    id: "format-agency",
    role: "Senior Graphic Designer",
    company: "Format Agency",
    period: "2022 - 2024",
    description: "Developed comprehensive visual identities, physical packaging, and tactile solutions from initial concept to press checks.",
    highlights: [
      "Authored packaging design strategies that boosted retail presence for clean skincare brands by 40%.",
      "Collaborated closely with front-end engineers to implement pixel-perfect digital UI/UX designs.",
      "Curated and art-directed photography setups for luxury design and fashion campaigns."
    ]
  },
  {
    id: "monolith-press",
    role: "Graphic Designer",
    company: "Monolith Press",
    period: "2020 - 2022",
    description: "Specialized in publishing layout, typography curation, poster series design, and book packaging.",
    highlights: [
      "Crafted cover designs and typographic systems for over 25 published books and monographs.",
      "Implemented rigid editorial grids and type hierarchies across multiple monthly magazines.",
      "Facilitated high-fidelity print proofing and prepress processes with regional printers."
    ]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/harshairugu",
    icon: "Github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/harshairugu",
    icon: "Linkedin"
  },
  {
    name: "Instagram",
    url: "https://instagram.com/harsha_irugu",
    icon: "Instagram"
  }
];
