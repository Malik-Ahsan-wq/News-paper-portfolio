import heroPortrait from "@/assets/hero-portrait.png";
import projectLead from "@/assets/project-lead.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import type { Project } from "@/components/site/projects/types";

export const PERSON = {
  name: "Ahsan Bashir",
  paper: "The Ahsan Bashir Times",
  role: "Full-Stack & Shopify Developer",
  city: "Faisalabad, Pakistan",
  email: "mahsanraza3222@gmail.com",
  phone: "+92 327 6227156",
  whatsapp: "923276227156",
  linkedin: "https://www.linkedin.com/in/ahsan-bashir",
  github: "https://github.com/ahsanbashir",
  resume: "/Ahsan M.Bashir Resume.pdf",
  since: 2023,
  experience: "2+ Years",
};

export { heroPortrait };

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const TICKER = [
  { name: "React.js", value: "95%", up: true },
  { name: "Next.js", value: "94%", up: true },
  { name: "Node.js", value: "92%", up: true },
  { name: "MongoDB", value: "90%", up: true },
  { name: "Supabase", value: "91%", up: true },
  { name: "Shopify", value: "89%", up: true },
  { name: "Tailwind CSS", value: "96%", up: true },
  { name: "GSAP", value: "86%", up: true },
  { name: "Express.js", value: "90%", up: true },
  { name: "REST APIs", value: "93%", up: true },
  { name: "Canva", value: "94%", up: true },
  { name: "Auth & JWT", value: "88%", up: true },
];

export const SKILL_GROUPS = [
  {
    title: "Frontend Development",
    items: [
      "React.js & Next.js",
      "Tailwind CSS & Bootstrap",
      "CSS3 & GSAP Animations",
      "Responsive UI/UX",
      "Cross-browser compatibility",
    ],
  },
  {
    title: "Backend Development",
    items: [
      "Node.js & Express.js",
      "RESTful API Development",
      "MongoDB & Supabase SQL",
      "Database Design & Optimization",
      "Job Queues · Bull MQ · Redis",
    ],
  },
  {
    title: "E-commerce & Shopify",
    items: [
      "Shopify Store Development",
      "Theme Customization",
      "Sections / Component Creation",
      "Payment Gateway & Shipping",
      "SEO & Performance Optimization",
    ],
  },
  {
    title: "API & Authentication",
    items: [
      "Postman REST APIs · Thunder Client",
      "JWT · OAuth 2.0",
      "Next Auth · Zod · Drizzle",
      "Supabase Auth · Firebase Auth",
      "JSON & Webhook Integrations",
    ],
  },
  {
    title: "Deployment & DevOps",
    items: [
      "Vercel & Netlify",
      "GitHub Pages & Cloud Hosting",
      "CI / CD Pipelines",
      "Git & GitHub",
      "Production Monitoring",
    ],
  },
  {
    title: "Canva & Design",
    items: [
      "Canva Design & Editing",
      "Social Media Graphics",
      "Marketing Assets",
      "Banner, Poster & Visual Content",
      "Brand Consistency",
    ],
  },
];

export const SOFT_SKILLS = [
  "Problem Solving",
  "Attention to Detail",
  "Effective Communication",
  "Error Handling",
];

export const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "websolave IT Company",
    location: "Canal Road, Faisalabad",
    period: "2024 – 2025",
    points: [
      "Built and maintained full-stack applications using MongoDB, Supabase SQL, Express.js, React.js, and Node.js.",
      "Developed and integrated RESTful APIs for seamless frontend-backend communication.",
      "Implemented secure authentication and authorization with JWT and OAuth.",
      "Collaborated with UI/UX designers to create responsive, user-friendly interfaces.",
      "Optimized database queries, reducing response time by 20%.",
      "Deployed applications using Vercel and Netlify, managed production environments, and implemented CI/CD pipelines.",
    ],
  },
  {
    role: "Front End Developer",
    company: "ESCASA IT Company",
    location: "GM abad, Faisalabad",
    period: "05/2025",
    points: [
      "Developed responsive frontend applications using React.js and Next.js.",
      "Built modern UI components with Tailwind CSS and Bootstrap.",
      "Improved application performance and scalability.",
      "Integrated frontend with backend APIs, enhancing overall user experience.",
      "Managed deployment of frontend applications to Vercel and handled build optimizations.",
    ],
  },
  {
    role: "Shopify & Full Stack Developer (Freelance / Projects)",
    company: "websolaveIT Company",
    location: "GM abad, Faisalabad",
    period: "2025 – Present",
    points: [
      "Developed and customized Shopify stores and themes for clients.",
      "Built custom Shopify sections, product pages, and collection layouts.",
      "Integrated payment gateways, shipping methods, and store settings.",
      "Optimized Shopify stores for performance, SEO, and user engagement.",
      "Managed deployment, store launch, and post-launch support for multiple e-commerce projects.",
      "Created marketing banners, posters, and visual assets using Canva to enhance store branding.",
    ],
  },
  {
    role: "Shopify & Full Stack Developer (Freelance / Projects)",
    company: "Fetchply.com",
    location: "GM abad, Faisalabad",
    period: "11/2025",
    points: [
      "Developed and customized Shopify stores and themes for clients.",
      "Built custom Shopify sections, product pages, and collection layouts.",
      "Integrated payment gateways, shipping methods, and store settings.",
      "Optimized Shopify stores for performance, SEO, and user engagement.",
      "Managed deployment, store launch, and post-launch support for multiple e-commerce projects.",
      "Created marketing banners, posters, and visual assets using Canva to enhance store branding.",
    ],
  },
  {
    role: "Full Stack Developer (Freelance / Projects)",
    company: "InferasoftIT Company",
    location: "USA, Florida, Lakeland City",
    period: "Present",
    points: [
      "Developed and customized web apps for clients, including PWAs and mobile-ready applications.",
      "Built custom web applications with Paddle, Careem.io, and other payment integrations.",
      "Optimized e-commerce stores for performance, SEO, and user engagement.",
      "Managed deployment, store launch, and post-launch support for multiple projects.",
      "Created marketing banners, posters, and visual assets using Canva to enhance branding.",
    ],
  },
];

export const EDUCATION = [
  { degree: "Web Development Course", school: "Websolave Company FSD", period: "2023 – 2024" },
  { degree: "Computer Diploma", school: "Chishti College FSD", period: "2023 – 2024" },
  { degree: "Mechanical Diploma", school: "VTI College", period: "2021 – 2022" },
  {
    degree: "ICS (Computer Science)",
    school: "Abu Anees College, Faisalabad",
    period: "2020 – 2021",
  },
];

export const PROJECTS: Project[] = [
  {
    name: "tools.websolave.com",
    description:
      "A full-stack professional project bundling an AI-SEO Analyzer, AI-BIO Builder and AI-QR Code Generator — built to help teams automate content, SEO and branding.",
    tech: ["React", "Node.js", "AI APIs", "Supabase", "Tailwind CSS"],
    live: "https://tools.websolave.com",
    github: "https://github.com/ahsanbashir",
    images: [
      {
        src: projectLead,
        alt: "tools.websolave.com — AI tools suite dashboard",
        width: 1200,
        height: 800,
      },
      {
        src: project2,
        alt: "tools.websolave.com — AI SEO analyzer",
        width: 800,
        height: 600,
      },
      {
        src: project3,
        alt: "tools.websolave.com — AI QR code generator",
        width: 800,
        height: 600,
      },
    ],
  },
  {
    name: "livetawk.com",
    description:
      "A professional live chat system built with the latest full-stack technologies for real-time customer support.",
    tech: ["Next.js", "WebSockets", "Node.js", "MongoDB", "Tailwind CSS"],
    live: "https://livetawk.com",
    github: "https://github.com/ahsanbashir",
    images: [
      {
        src: project2,
        alt: "livetawk.com — live chat inbox",
        width: 800,
        height: 600,
      },
      {
        src: project3,
        alt: "livetawk.com — real-time conversation",
        width: 800,
        height: 600,
      },
      {
        src: project4,
        alt: "livetawk.com — dashboard",
        width: 800,
        height: 600,
      },
    ],
  },
  {
    name: "fetchply.com",
    description:
      "Real-time chatting system with WhatsApp, Slack, WooCommerce, Instagram and Shopify integrations plus an AI realtime chatbot to run your business automatically.",
    tech: ["Node.js", "Integrations", "Chatbot", "Shopify"],
    live: "https://fetchply.com",
    github: "https://github.com/ahsanbashir",
    images: [
      {
        src: project3,
        alt: "fetchply.com — multi-channel chat",
        width: 800,
        height: 600,
      },
      {
        src: project4,
        alt: "fetchply.com — WhatsApp integration",
        width: 800,
        height: 600,
      },
      {
        src: projectLead,
        alt: "fetchply.com — AI chatbot",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    name: "toolv.io",
    description:
      "A full-stack project with all social media app integrations — downloaders, boosters and productivity tools that work perfectly.",
    tech: ["React", "Node.js", "Social APIs", "Redis"],
    live: "https://toolv.io",
    github: "https://github.com/ahsanbashir",
    images: [
      {
        src: project4,
        alt: "toolv.io — social toolkit",
        width: 800,
        height: 600,
      },
      {
        src: projectLead,
        alt: "toolv.io — downloader tool",
        width: 1200,
        height: 800,
      },
      {
        src: project2,
        alt: "toolv.io — productivity tools",
        width: 800,
        height: 600,
      },
    ],
  },
  {
    name: "Cartify Online E-commerce Store",
    description:
      "A professional e-commerce store built with the latest technologies — fast, scalable and conversion-focused.",
    tech: ["Shopify", "Next.js", "React", "Node.js"],
    live: "https://tools.websolave.com",
    github: "https://github.com/ahsanbashir",
    images: [
      {
        src: projectLead,
        alt: "Cartify — storefront",
        width: 1200,
        height: 800,
      },
      {
        src: project4,
        alt: "Cartify — product page",
        width: 800,
        height: 600,
      },
      {
        src: project3,
        alt: "Cartify — cart and checkout",
        width: 800,
        height: 600,
      },
    ],
  },
  {
    name: "brutallbill.com",
    description:
      "A professional invoice generator that is completely free — build, send and manage invoices without any cost.",
    tech: ["React", "Node.js", "PDF", "MongoDB"],
    live: "https://brutallbill.com",
    github: "https://github.com/ahsanbashir",
    images: [
      {
        src: project2,
        alt: "brutallbill.com — invoice editor",
        width: 800,
        height: 600,
      },
      {
        src: projectLead,
        alt: "brutallbill.com — invoice preview",
        width: 1200,
        height: 800,
      },
      {
        src: project4,
        alt: "brutallbill.com — invoice list",
        width: 800,
        height: 600,
      },
    ],
  },
];

export const STATS = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Projects Shipped" },
  { value: 10, suffix: "+", label: "E-commerce Stores" },
  { value: 25, suffix: "+", label: "APIs Integrated" },
];
