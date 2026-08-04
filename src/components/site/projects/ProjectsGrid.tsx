import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fadeUp, stagger, viewportOnce } from "../motion";
import { ProjectCard } from "./ProjectCard";
import { Lightbox } from "./Lightbox";
import type { Project } from "./types";

type ProjectsGridProps = {
  projects: Project[];
  isLoading?: boolean;
};

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

export function ProjectsGrid({ projects, isLoading = false }: ProjectsGridProps) {
  const [active, setActive] = useState<{ project: Project; index: number } | null>(null);

  return (
    <>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:auto-rows-fr"
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : projects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                onImageClick={(imageIndex) => setActive({ project, index: imageIndex })}
              />
            ))}
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
    </>
  );
}
