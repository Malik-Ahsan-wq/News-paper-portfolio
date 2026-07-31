import heroPortrait from "@/assets/hero-portrait.jpg";
import projectLead from "@/assets/project-lead.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export const PERSON = {
  name: "Elias Hart",
  paper: "The Elias Hart Times",
  role: "Full-Stack Developer",
  city: "Lisbon",
  since: 2016,
  email: "hello@eliashart.dev",
};

export { heroPortrait };

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const TICKER = [
  { name: "TypeScript", value: "98%", up: true },
  { name: "React", value: "97%", up: true },
  { name: "Node.js", value: "94%", up: true },
  { name: "PostgreSQL", value: "91%", up: true },
  { name: "Tailwind", value: "96%", up: true },
  { name: "GraphQL", value: "88%", up: false },
  { name: "AWS", value: "85%", up: true },
  { name: "Rust", value: "72%", up: true },
  { name: "Figma", value: "83%", up: false },
];

export const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: ["React & Next-gen SSR", "TypeScript", "Tailwind CSS", "Motion & WebGL", "Accessibility (WCAG 2.2)"],
  },
  {
    title: "Backend",
    items: ["Node.js & Bun", "PostgreSQL / Prisma", "REST & GraphQL APIs", "Event-driven queues", "Auth & RLS"],
  },
  {
    title: "Tools",
    items: ["Git & Trunk-based CI", "Docker", "Vitest & Playwright", "Observability", "Edge deployments"],
  },
  {
    title: "Design",
    items: ["Design systems", "Editorial typography", "Prototyping in Figma", "Motion direction", "Brand craft"],
  },
];

export const PROJECTS = [
  {
    lead: true,
    category: "Technology",
    title: "Rebuilding a trading desk for 40,000 daily analysts",
    excerpt:
      "A real-time market terminal rewritten from the ground up — sub-100ms streams, keyboard-first navigation, and a design system adopted across six product teams.",
    meta: "React · WebSockets · Rust · 9 months",
    image: projectLead,
    width: 1200,
    height: 800,
  },
  {
    category: "Case Study",
    title: "A banking app that people actually finish onboarding in",
    excerpt: "Cut a 14-step signup to four screens, lifting completion from 38% to 81% in one quarter.",
    meta: "React Native · Node · 4 months",
    image: project2,
    width: 800,
    height: 600,
  },
  {
    category: "Infrastructure",
    title: "Zero-downtime migration of a decade-old monolith",
    excerpt: "Strangler-fig rollout across 200 services with no customer-visible interruption.",
    meta: "Go · Postgres · AWS · 12 months",
    image: project3,
    width: 800,
    height: 600,
  },
  {
    category: "Design Systems",
    title: "One component library, eleven brands, zero forks",
    excerpt: "Token-driven theming that let each brand keep its voice while sharing a single codebase.",
    meta: "TypeScript · Storybook · 6 months",
    image: project4,
    width: 800,
    height: 600,
  },
];

export const LETTERS = [
  {
    quote:
      "Elias has the rarest of instincts: he knows which details matter. He shipped a platform our engineers still cite as the standard three years later.",
    name: "Marguerite Vance",
    title: "VP Engineering",
    company: "Northbank Capital",
  },
  {
    quote:
      "He arrived mid-crisis, diagnosed in a week what we had missed in a year, and left us with documentation better than the code we started with.",
    name: "Tomás Ferreira",
    title: "Head of Product",
    company: "Corvid Labs",
  },
  {
    quote:
      "Working with him feels like working with an editor — everything gets tighter, clearer, and somehow also more beautiful.",
    name: "Ada Whitmore",
    title: "Design Director",
    company: "Studio Halden",
  },
];
