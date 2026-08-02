import { motion } from "motion/react";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { EDUCATION, EXPERIENCE, PERSON } from "./data";
import { fadeUp, stagger, viewportOnce } from "./motion";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-b border-ink/80 bg-paper-alt"
      aria-labelledby="career-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,var(--primary),transparent_70%)] opacity-[0.05]"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeUp}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="eyebrow text-primary">Career</span>
            <h2
              id="career-title"
              className="mt-2 font-display text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl"
            >
              The Career
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">
            Professional experience and education — full-stack engineering, Shopify development and
            production deployment across companies and freelance engagements.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative border-l-2 border-ink/80 pl-6 sm:pl-8">
            {EXPERIENCE.map((job, i) => (
              <motion.article
                key={`${job.company}-${i}`}
                variants={fadeUp}
                className="group relative mb-8 last:mb-0"
              >
                <span
                  aria-hidden
                  className="absolute -left-[31px] top-6 size-3 rounded-full border-2 border-ink bg-paper transition-colors duration-300 group-hover:bg-primary sm:-left-[37px]"
                />
                <div className="border border-border bg-card p-5 shadow-paper transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-paper-lift sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-black leading-tight text-ink">
                      {job.role}
                    </h3>
                    <span className="eyebrow shrink-0 text-primary">{job.period}</span>
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[15px] font-semibold text-ink">
                    <Briefcase className="size-4 text-primary" aria-hidden />
                    {job.company}
                    <span className="font-normal text-muted-foreground">— {job.location}</span>
                  </p>
                  <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink-soft">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span aria-hidden className="mt-[3px] shrink-0 text-primary">
                          §
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside variants={fadeUp} className="h-fit space-y-6">
            <div className="border border-border bg-card p-6 shadow-paper">
              <div className="flex items-center gap-2 border-b border-ink pb-3">
                <GraduationCap className="size-4 text-primary" aria-hidden />
                <h3 className="eyebrow">Education</h3>
              </div>
              <ul className="mt-4 space-y-4">
                {EDUCATION.map((edu) => (
                  <li
                    key={edu.degree}
                    className="border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-[15px] font-semibold leading-snug text-ink">{edu.degree}</p>
                    <p className="mt-0.5 text-[13px] text-muted-foreground">{edu.school}</p>
                    <p className="eyebrow mt-1.5 text-primary">{edu.period}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden border border-ink bg-ink p-6 text-paper shadow-paper">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10"
              />
              <h3 className="eyebrow text-gold">The Outlook</h3>
              <p className="mt-3 font-display text-xl italic leading-snug">
                Currently available for freelance Shopify stores, full-stack projects and e-commerce
                builds — delivered with precision, on time.
              </p>
              <div className="mt-5 flex items-center gap-2 border-t border-paper/15 pt-4">
                <MapPin className="size-4 shrink-0 text-gold" aria-hidden />
                <p className="eyebrow text-paper">Open to work — based in {PERSON.city}</p>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}
