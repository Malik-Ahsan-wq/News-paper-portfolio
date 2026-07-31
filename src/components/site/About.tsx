import { motion } from "motion/react";
import { fadeUp, stagger, viewportOnce } from "./motion";

export function About() {
  return (
    <section id="about" className="border-b border-ink/80 bg-paper-alt" aria-labelledby="about-title">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-6xl px-5 py-14"
      >
        <motion.div variants={fadeUp} className="mb-8 flex items-baseline justify-between border-b border-ink pb-2">
          <h2 id="about-title" className="font-display text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl">
            The Profile
          </h2>
          <span className="eyebrow text-muted-foreground">Section A · Page 1</span>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <motion.div variants={fadeUp} className="lg:columns-2 lg:gap-10 [&>*]:break-inside-avoid">
            <p className="dropcap text-[1.0625rem] leading-[1.75]">
              For a decade I have worked at the seam between design and engineering, where most products
              quietly fall apart. My work begins with the reader: the analyst scanning a terminal at
              6am, the customer abandoning a form at step nine, the engineer inheriting a codebase at
              midnight. Everything else follows from taking them seriously.
            </p>

            <figure className="my-7 border-y-2 border-ink py-5">
              <blockquote className="font-display text-2xl italic leading-snug">
                “Craft is not decoration. It is the accumulated evidence that somebody was paying
                attention.”
              </blockquote>
            </figure>

            <p className="mt-4 text-[1.0625rem] leading-[1.75]">
              I have led rebuilds at financial institutions, shipped design systems adopted across
              eleven brands, and migrated a decade-old monolith without a single customer-visible
              outage. I write TypeScript most days, Rust when latency demands it, and documentation
              always.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-[1.75]">
              The work I am proudest of tends to be invisible: the query that stopped paging the team,
              the interface nobody had to ask about twice. I take a small number of engagements each
              year and stay until the thing is genuinely finished.
            </p>
          </motion.div>

          <motion.aside variants={fadeUp} className="h-fit border border-ink bg-card p-5 shadow-paper">
            <h3 className="eyebrow border-b border-ink pb-2">Specialties</h3>
            <ul className="mt-3 space-y-2 text-[15px]">
              {[
                "Product engineering, end to end",
                "Design systems & tokens",
                "Performance & Core Web Vitals",
                "Data-dense interfaces",
                "Platform migrations",
                "Team mentoring",
              ].map((item) => (
                <li key={item} className="flex gap-2 border-b border-border pb-2 last:border-0">
                  <span className="text-primary">§</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] italic text-muted-foreground">
              Awarded — Site of the Day, three occasions.
            </p>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}
