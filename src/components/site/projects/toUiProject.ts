import type { DbProject } from "@/lib/supabase/types";
import type { Project } from "./types";

export function toUiProject(db: DbProject): Project {
  const project: Project = {
    name: db.title,
    description: db.description,
    tech: db.tech_stack,
    featured: db.featured,
    images: db.images.map((src) => ({ src, alt: db.title, width: 1600, height: 1000 })),
  };
  if (db.live_demo_url) project.live = db.live_demo_url;
  if (db.github_url) project.github = db.github_url;
  return project;
}
