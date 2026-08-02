import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROJECTS } from "../data";
import { fadeUp, stagger, viewportOnce } from "../motion";
import { ProjectCard } from "./ProjectCard";
import { Lightbox } from "./Lightbox";
import type { Project } from "./types";

type ProjectsProps = {
  projects?: Project[];
};

export function Projects({ projects = PROJECTS }: ProjectsProps) {
  const [active, setActive] = useState<{ project: Project; index: number } | null>(null);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-b border-ink/80 bg-paper-alt"
      aria-labelledby="work-title"
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
        className="relative mx-auto max-w-6xl px-5 py-14"
      >
        <motion.div
          variants={fadeUp}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="eyebrow text-primary">Selected Work</span>
            <h2
              id="work-title"
              className="mt-2 font-display text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl"
            >
              Projects
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">
            A selection of products and experiences designed and built. Click any screenshot to view
            it in fullscreen.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              onImageClick={(imageIndex) => setActive({ project, index: imageIndex })}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {active && (
          <Lightbox
            project={active.project}
            index={active.index}
            onClose={() => setActive(null)}
            onNavigate={(imageIndex) =>
              setActive((current) => (current ? { ...current, index: imageIndex } : current))
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
