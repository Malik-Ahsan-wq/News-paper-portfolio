import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PERSON, PROJECTS } from "../data";
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
      <div className="aspect-[16/10] bg-muted" />
      <div className="space-y-3 p-6">
        <div className="h-6 w-2/3 rounded bg-muted" />
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
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeUp}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {isLoading && isSupabaseConfigured
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : projects
                .slice(0, 4)
                .map((project) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                    onImageClick={(imageIndex) => setActive({ project, index: imageIndex })}
                  />
                ))}
        </div>

        {!isLoading && projects.length > 4 && (
          <motion.div variants={fadeUp} className="mt-12 flex justify-center">
            <a
              href={PERSON.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-7 py-3 text-sm font-semibold text-paper transition-colors duration-300 hover:border-primary hover:bg-primary"
            >
              View all projects
              <ArrowRight className="size-4" />
            </a>
          </motion.div>
        )}
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
