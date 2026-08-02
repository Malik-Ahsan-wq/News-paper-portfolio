import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  fetchProjects,
  reorderProjects,
  toggleProjectFeatured,
  updateProject,
  type ReorderUpdate,
} from "@/lib/supabase/projects";
import type { ProjectInput } from "@/lib/supabase/types";

export const projectsQueryKey = ["projects"] as const;

export function useProjectsQuery() {
  return useQuery({
    queryKey: projectsQueryKey,
    queryFn: fetchProjects,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

function useInvalidateProjects() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: projectsQueryKey });
}

export function useCreateProject() {
  const invalidate = useInvalidateProjects();
  return useMutation({
    mutationFn: createProject,
    onSuccess: invalidate,
  });
}

export function useUpdateProject() {
  const invalidate = useInvalidateProjects();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ProjectInput }) => updateProject(id, input),
    onSuccess: invalidate,
  });
}

export function useDeleteProject() {
  const invalidate = useInvalidateProjects();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: invalidate,
  });
}

export function useToggleProjectFeatured() {
  const invalidate = useInvalidateProjects();
  return useMutation({
    mutationFn: ({ id, featured }: { id: string; featured: boolean }) =>
      toggleProjectFeatured(id, featured),
    onSuccess: invalidate,
  });
}

export function useReorderProjects() {
  const invalidate = useInvalidateProjects();
  return useMutation({
    mutationFn: reorderProjects,
    onSuccess: invalidate,
  });
}

export type { ReorderUpdate };
