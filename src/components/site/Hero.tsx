import { motion } from "motion/react";
import { PERSON, STATS, heroPortrait } from "./data";
import { fadeUp, stagger } from "./motion";
import { useTypewriter } from "./useTypewriter";

const HEADLINE = "Full-Stack & Shopify Developer";

export function Hero() {
  const { typed, done } = useTypewriter(HEADLINE, 22, 300);

  return (
    <section className="border-b border-ink/80" aria-labelledby="hero-headline">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-16"
      >
        <div>
          <motion.div variants={fadeUp} className="mb-5 flex flex-wrap items-center gap-3">
            <span className="eyebrow bg-primary px-2.5 py-1 text-primary-foreground">Featured</span>
            <span className="eyebrow text-muted-foreground">MERN Stack · Next.js · Shopify</span>
          </motion.div>

          <h1
            id="hero-headline"
            className="font-display text-[2.6rem] font-black leading-[1.02] tracking-[-0.015em] sm:text-6xl lg:text-[4.75rem]"
          >
            {typed}
            <span
              aria-hidden="true"
              className="ml-1 inline-block w-[0.5ch] translate-y-[-0.05em] bg-primary align-baseline"
              style={{
                height: "0.85em",
                animation: done ? "caret-blink 1.1s step-end infinite" : "none",
              }}
            />
          </h1>

          <motion.p variants={fadeUp} className="mt-6 font-display text-lg italic text-ink-soft">
            By {PERSON.name} — {PERSON.role}, {PERSON.city}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft"
          >
            A versatile full-stack developer with {PERSON.experience.toLowerCase()} of professional
            experience in MERN stack, Next.js and Shopify — building modern, scalable and
            high-performance web applications and e-commerce solutions, while crafting engaging
            designs and marketing assets with Canva.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#projects"
              className="eyebrow border border-ink bg-ink px-6 py-3 text-paper transition-colors hover:border-primary hover:bg-primary"
            >
              View my work
            </a>
            <a href="#contact" className="eyebrow link-underline text-primary">
              Hire me →
            </a>
          </motion.div>
        </div>

        <motion.figure variants={fadeUp} className="self-start">
          <div className="group border border-ink p-2 shadow-paper">
            <img
              src={heroPortrait}
              alt={`${PERSON.name} at his desk`}
              width={1200}
              height={912}
              className="w-full grayscale transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grayscale-0"
            />
          </div>
          <figcaption className="mt-3 border-t border-border pt-2 text-[13px] italic text-muted-foreground">
            Fig 1. — {PERSON.name} at work, {PERSON.city.split(",")[0]}, 2026.
          </figcaption>
        </motion.figure>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="border-t border-border bg-paper-alt"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 sm:grid-cols-4">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="px-2 py-5 text-center sm:py-6"
            >
              <p className="font-display text-3xl font-black text-primary sm:text-4xl">
                {stat.value}
              </p>
              <p className="eyebrow mt-1 text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
