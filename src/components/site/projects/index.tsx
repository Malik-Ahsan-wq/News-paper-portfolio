import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PROJECTS } from "../data";
import { fadeUp, stagger, viewportOnce } from "../motion";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useProjectsQuery } from "@/hooks/useProjects";
import { ProjectsGrid } from "./ProjectsGrid";
import { toUiProject } from "./toUiProject";
import type { Project } from "./types";

type ProjectsProps = {
  projects?: Project[];
};

export function Projects({ projects: staticProjects = PROJECTS }: ProjectsProps) {
  const { data, isLoading } = useProjectsQuery();

  const dbProjects = (data ?? []).map(toUiProject);
  const useLiveData = isSupabaseConfigured && dbProjects.length > 0;
  const projects = useLiveData ? dbProjects : staticProjects;
  const hasMore = projects.length > 4;

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

        <ProjectsGrid
          projects={projects.slice(0, 4)}
          isLoading={isLoading && isSupabaseConfigured}
        />

        {!isLoading && hasMore && (
          <motion.div variants={fadeUp} className="mt-12 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-7 py-3 text-sm font-semibold text-paper transition-colors duration-300 hover:border-primary hover:bg-primary"
            >
              View all projects
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
