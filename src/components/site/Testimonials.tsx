import { motion } from "motion/react";
import { LETTERS } from "./data";
import { fadeUp, stagger, viewportOnce } from "./motion";

export function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-ink/80" aria-labelledby="letters-title">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-6xl px-5 py-14"
      >
        <motion.div variants={fadeUp} className="mb-8 flex items-baseline justify-between border-b border-ink pb-2">
          <h2 id="letters-title" className="font-display text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl">
            Letters to the Editor
          </h2>
          <span className="eyebrow text-muted-foreground">Opinion · Page 12</span>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {LETTERS.map((letter) => (
            <motion.figure
              key={letter.name}
              variants={fadeUp}
              className="relative overflow-hidden border border-border bg-card p-6 shadow-paper"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 right-2 font-display text-[8rem] leading-none text-ink/[0.05]"
              >
                ”
              </span>
              <blockquote className="relative font-display text-lg italic leading-relaxed">
                {letter.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-3">
                <span className="block font-sans text-sm font-medium uppercase tracking-[0.12em]">
                  {letter.name}
                </span>
                <span className="mt-1 block text-[13px] text-muted-foreground">
                  {letter.title}, {letter.company}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
