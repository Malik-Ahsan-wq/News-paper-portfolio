import { motion } from "motion/react";
import { EDUCATION, EXPERIENCE, PERSON } from "./data";
import { fadeUp, stagger, viewportOnce } from "./motion";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-b border-ink/80 bg-paper-alt"
      aria-labelledby="career-title"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-6xl px-5 py-14"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 flex items-baseline justify-between border-b border-ink pb-2"
        >
          <h2
            id="career-title"
            className="font-display text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl"
          >
            The Career
          </h2>
          <span className="eyebrow text-muted-foreground">Professional experience & education</span>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative border-l border-ink pl-6 sm:pl-8">
            {EXPERIENCE.map((job, i) => (
              <motion.article
                key={`${job.company}-${i}`}
                variants={fadeUp}
                className="group relative mb-10 last:mb-0"
              >
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[31px] size-[11px] rounded-full border border-ink bg-paper transition-colors duration-300 group-hover:bg-primary sm:-left-[39px]"
                />
                <div className="border border-border bg-card p-5 shadow-paper transition-[transform,box-shadow,border-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:border-ink group-hover:shadow-paper-lift sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-black">{job.role}</h3>
                    <span className="eyebrow text-primary">{job.period}</span>
                  </div>
                  <p className="mt-1 text-[15px] font-medium text-ink">
                    {job.company}
                    <span className="text-muted-foreground"> — {job.location}</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink-soft">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-[3px] text-primary">§</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside variants={fadeUp} className="h-fit space-y-6">
            <div className="border border-ink bg-card p-5 shadow-paper">
              <h3 className="eyebrow border-b border-ink pb-2">Education</h3>
              <ul className="mt-3 space-y-3">
                {EDUCATION.map((edu) => (
                  <li key={edu.degree} className="border-b border-border pb-3 last:border-0">
                    <p className="text-[15px] font-medium">{edu.degree}</p>
                    <p className="mt-0.5 text-[13px] text-muted-foreground">{edu.school}</p>
                    <p className="eyebrow mt-1 text-primary">{edu.period}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-ink bg-ink p-5 text-paper shadow-paper">
              <h3 className="eyebrow text-gold">The Outlook</h3>
              <p className="mt-3 font-display text-xl italic leading-snug">
                Currently available for freelance Shopify stores, full-stack projects and e-commerce
                builds — delivered with precision, on time.
              </p>
              <p className="eyebrow mt-4 text-paper">Open to work — based in {PERSON.city}</p>
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}
