import { motion } from "motion/react";
import { SKILL_GROUPS, TICKER } from "./data";
import { fadeUp, stagger, viewportOnce } from "./motion";

export function Skills() {
  const items = [...TICKER, ...TICKER];

  return (
    <section id="skills" className="border-b border-ink/80" aria-labelledby="skills-title">
      <div className="group overflow-hidden border-b border-ink bg-ink py-2.5">
        <div
          className="flex w-max gap-10 whitespace-nowrap group-hover:[animation-play-state:paused]"
          style={{ animation: "ticker-scroll 42s linear infinite" }}
        >
          {items.map((s, i) => (
            <span key={`${s.name}-${i}`} className="eyebrow flex items-center gap-2 text-paper">
              {s.name}
              <span className={s.up ? "text-gold" : "text-primary-foreground/60"}>
                {s.up ? "▲" : "▼"} {s.value}
              </span>
            </span>
          ))}
        </div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-6xl px-5 py-14"
      >
        <motion.div variants={fadeUp} className="mb-8 flex items-baseline justify-between border-b border-ink pb-2">
          <h2 id="skills-title" className="font-display text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl">
            The Exchange
          </h2>
          <span className="eyebrow text-muted-foreground">Markets · Daily close</span>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <motion.div key={group.title} variants={fadeUp} className="border-t-2 border-ink pt-4">
              <h3 className="font-display text-xl font-bold">{group.title}</h3>
              <ul className="mt-3 space-y-2 text-[15px] text-ink-soft">
                {group.items.map((item) => (
                  <li key={item} className="border-b border-border pb-2 last:border-0">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
