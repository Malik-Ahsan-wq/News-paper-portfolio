import { motion } from "motion/react";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { fadeUp } from "../motion";
import { ImagePreview } from "./ImagePreview";
import type { Project } from "./types";

type ProjectCardProps = {
  project: Project;
  onImageClick: (index: number) => void;
};

export function ProjectCard({ project, onImageClick }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-paper transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-paper-lift"
    >
      <ImagePreview project={project} onImageClick={onImageClick} />

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="font-display text-xl font-black leading-tight text-ink">{project.name}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{project.description}</p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted-foreground transition-colors duration-300 group-hover:border-primary/30 group-hover:text-ink"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-4">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper transition-colors duration-300 hover:bg-primary"
            >
              Live Demo
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-ink transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              <FolderGit2 className="size-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
