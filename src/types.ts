export interface ProjectChallenge {
  title: string;
  challenge: string;
  solution: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  image: string;
  images: string[];
  client: string;
  year: string;
  tags: string[];
  deliverables: string[];
  demoType: "branding" | "editorial" | "kinetic" | "ui-ux" | "cover" | "stamp" | "fullstack";
  prototypeUrl?: string;
  challenges?: ProjectChallenge[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // lucide icon name
}
