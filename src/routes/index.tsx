import { motion } from "motion/react";
import { createFileRoute } from "@tanstack/react-router";
import { Masthead } from "@/components/site/Masthead";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
import { Experience } from "@/components/site/Experience";
import { Projects } from "@/components/site/projects";
import { Contact } from "@/components/site/Contact";
import { EASE } from "@/components/site/motion";
import Compare from "@/components/site/Compare";

const TITLE = "Ahsan Bashir — Full-Stack & Shopify Developer";
const DESC =
  "Full-Stack & Shopify Developer from Faisalabad, Pakistan specializing in MERN stack, Next.js, Shopify stores, REST APIs and Canva design. Building modern, scalable, high-performance web applications and e-commerce solutions.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Ahsan Bashir" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      {
        name: "keywords",
        content:
          "Ahsan Bashir, Full-Stack Developer, Shopify Developer, MERN Stack, Next.js, React, Node.js, E-commerce, Faisalabad, Pakistan",
      },
      { name: "author", content: "Ahsan Bashir" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ahsan Bashir",
          jobTitle: "Full-Stack & Shopify Developer",
          description: DESC,
          email: "mailto:mahsanraza3222@gmail.com",
          telephone: "+92-327-6227156",
          url: "/",
          image: "/favicon.svg",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Faisalabad",
            addressRegion: "Punjab",
            addressCountry: "PK",
          },
          knowsAbout: [
            "MERN Stack",
            "Next.js",
            "Shopify Development",
            "RESTful APIs",
            "Node.js",
            "React.js",
            "MongoDB",
            "Supabase",
            "Tailwind CSS",
            "GSAP Animations",
            "Canva Design",
            "E-commerce Optimization",
          ],
          sameAs: ["https://www.linkedin.com/in/ahsan-bashir", "https://github.com/ahsanbashir"],
          worksFor: [
            { "@type": "Organization", name: "websolave IT Company" },
            { "@type": "Organization", name: "ESCASA IT Company" },
            { "@type": "Organization", name: "InferasoftIT Company" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Ahsan Bashir — Full-Stack & Shopify Developer",
          description: DESC,
          areaServed: { "@type": "City", name: "Faisalabad" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Faisalabad",
            addressCountry: "PK",
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: "mahsanraza3222@gmail.com",
            telephone: "+92-327-6227156",
            contactType: "sales",
          },
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <div aria-hidden className="grain-overlay" />
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Masthead />
        <main>
          <Hero />
          <About />
          <Compare />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </motion.div>
    </>
  );
}
