import { motion } from "motion/react";
import { createFileRoute } from "@tanstack/react-router";
import { Masthead } from "@/components/site/Masthead";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { EASE } from "@/components/site/motion";

const TITLE = "Elias Hart — Full-Stack Developer & Editorial Portfolio";
const DESC =
  "The Elias Hart Times: an editorial portfolio of a full-stack developer in Lisbon — product engineering, design systems and platform migrations.";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Elias Hart",
          jobTitle: "Full-Stack Developer",
          address: { "@type": "PostalAddress", addressLocality: "Lisbon" },
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
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
        </main>
      </motion.div>
    </>
  );
}
