import { supabase } from "./client";
import type { DbProject, ProjectInput } from "./types";

/** Fetches all projects ordered by their manual display order. */
export async function fetchProjects(): Promise<DbProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as DbProject[];
}

export async function getNextDisplayOrder(): Promise<number> {
  const { data, error } = await supabase
    .from("projects")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return (data?.display_order ?? -1) + 1;
}

export async function createProject(input: ProjectInput): Promise<DbProject> {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: input.title,
      slug: input.slug,
      description: input.description,
      tech_stack: input.tech_stack,
      live_demo_url: input.live_demo_url || null,
      github_url: input.github_url || null,
      images: input.images,
      featured: input.featured,
      display_order: input.display_order ?? 0,
    })
    .select()
    .single();

  if (error) throw error;
  return data as DbProject;
}

export async function updateProject(id: string, input: ProjectInput): Promise<DbProject> {
  const { data, error } = await supabase
    .from("projects")
    .update({
      title: input.title,
      slug: input.slug,
      description: input.description,
      tech_stack: input.tech_stack,
      live_demo_url: input.live_demo_url || null,
      github_url: input.github_url || null,
      images: input.images,
      featured: input.featured,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as DbProject;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function setProjectDisplayOrder(id: string, displayOrder: number): Promise<void> {
  const { error } = await supabase
    .from("projects")
    .update({ display_order: displayOrder })
    .eq("id", id);
  if (error) throw error;
}

export async function toggleProjectFeatured(id: string, featured: boolean): Promise<void> {
  const { error } = await supabase.from("projects").update({ featured }).eq("id", id);
  if (error) throw error;
}

export type ReorderUpdate = { id: string; display_order: number };

export async function reorderProjects(updates: ReorderUpdate[]): Promise<void> {
  await Promise.all(
    updates.map((update) => setProjectDisplayOrder(update.id, update.display_order)),
  );
}
