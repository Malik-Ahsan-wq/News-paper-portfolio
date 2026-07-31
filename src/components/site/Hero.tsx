import { motion } from "motion/react";
import { PERSON, heroPortrait } from "./data";
import { fadeUp, stagger, viewportOnce } from "./motion";
import { useTypewriter } from "./useTypewriter";

const HEADLINE = "Code, set in type. Systems built to be read.";

export function Hero() {
  const { typed, done } = useTypewriter(HEADLINE);

  return (
    <section className="border-b border-ink/80" aria-labelledby="hero-headline">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-16"
      >
        <div>
          <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
            <span className="eyebrow bg-primary px-2.5 py-1 text-primary-foreground">Breaking</span>
            <span className="eyebrow text-muted-foreground">Vol. XII — No. 04</span>
          </motion.div>

          <h1
            id="hero-headline"
            className="font-display text-[2.75rem] font-black leading-[0.98] tracking-[-0.015em] sm:text-6xl lg:text-[5.25rem]"
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

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
            Ten years of shipping interfaces and infrastructure for banks, newsrooms and small teams
            who care about the last five percent. Available for select engagements in 2026.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#work"
              className="eyebrow border border-ink bg-ink px-6 py-3 text-paper transition-colors hover:bg-primary hover:border-primary"
            >
              Read the front page
            </a>
            <a href="#contact" className="eyebrow link-underline text-primary">
              Contact the editor →
            </a>
          </motion.div>
        </div>

        <motion.figure variants={fadeUp} className="self-start">
          <div className="border border-ink p-2 shadow-paper">
            <img
              src={heroPortrait}
              alt={`${PERSON.name} working at his desk`}
              width={1200}
              height={912}
              className="w-full grayscale"
            />
          </div>
          <figcaption className="mt-3 border-t border-border pt-2 text-[13px] italic text-muted-foreground">
            Fig 1. — {PERSON.name} at work, {PERSON.city}, 2026.
          </figcaption>
        </motion.figure>
      </motion.div>
      <div aria-hidden className="sr-only">
        {viewportOnce.once ? "" : ""}
      </div>
    </section>
  );
}
