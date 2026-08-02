import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROJECTS } from "../data";
import { fadeUp, stagger, viewportOnce } from "../motion";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useProjectsQuery } from "@/hooks/useProjects";
import type { DbProject } from "@/lib/supabase/types";
import { ProjectCard } from "./ProjectCard";
import { Lightbox } from "./Lightbox";
import type { Project } from "./types";

type ProjectsProps = {
  projects?: Project[];
};

function toUiProject(db: DbProject): Project {
  const project: Project = {
    name: db.title,
    description: db.description,
    tech: db.tech_stack,
    featured: db.featured,
    images: db.images.map((src) => ({ src, alt: db.title, width: 1600, height: 900 })),
  };
  if (db.live_demo_url) project.live = db.live_demo_url;
  if (db.github_url) project.github = db.github_url;
  return project;
}

function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card shadow-paper">
      <div className="aspect-[4/3] bg-muted" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-4/5 rounded bg-muted" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-16 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function Projects({ projects: staticProjects = PROJECTS }: ProjectsProps) {
  const { data, isLoading } = useProjectsQuery();
  const [active, setActive] = useState<{ project: Project; index: number } | null>(null);

  const dbProjects = (data ?? []).map(toUiProject);
  const useLiveData = isSupabaseConfigured && dbProjects.length > 0;
  const projects = useLiveData ? dbProjects : staticProjects;

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
          {isLoading && isSupabaseConfigured
            ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            : projects.map((project) => (
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
