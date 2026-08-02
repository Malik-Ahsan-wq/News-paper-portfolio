import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  ImageOff,
  LogOut,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ensureSupabaseSession } from "@/lib/supabase/admin";
import { deleteProjectImage } from "@/lib/supabase/storage";
import type { DbProject } from "@/lib/supabase/types";
import {
  useDeleteProject,
  useProjectsQuery,
  useReorderProjects,
  useToggleProjectFeatured,
} from "@/hooks/useProjects";
import { ProjectForm } from "./ProjectForm";

type AdminDashboardProps = {
  adminName: string;
  onLogout: () => void;
};

export function AdminDashboard({ adminName, onLogout }: AdminDashboardProps) {
  const { data: projects = [], isLoading } = useProjectsQuery();
  const [formState, setFormState] = useState<{ open: boolean; project: DbProject | null }>({
    open: false,
    project: null,
  });
  const [deleteTarget, setDeleteTarget] = useState<DbProject | null>(null);

  const toggleFeatured = useToggleProjectFeatured();
  const reorder = useReorderProjects();
  const deleteMutation = useDeleteProject();

  const featuredCount = projects.filter((project) => project.featured).length;

  useEffect(() => {
    void ensureSupabaseSession().catch(() => {
      toast.error("Your session expired. Please sign in again.");
      void onLogout();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    void onLogout();
    toast.success("Signed out");
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;

    const next = [...projects];
    const item = next.splice(index, 1)[0];
    if (!item) return;
    next.splice(target, 0, item);

    const updates = next.map((project, i) => ({ id: project.id, display_order: i }));
    reorder.mutate(updates, {
      onSuccess: () => toast.success("Order updated"),
      onError: () => toast.error("Failed to reorder projects"),
    });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      try {
        await Promise.all(deleteTarget.images.map((url) => deleteProjectImage(url)));
      } catch {
        /* best-effort storage cleanup */
      }
      toast.success("Project deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete project");
    }
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Star className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">Projects Admin</p>
              <p className="truncate text-xs text-muted-foreground">{adminName}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ExternalLink className="size-3.5" />
                View site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="size-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-black tracking-tight">Projects</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage the projects shown on your portfolio.
            </p>
          </div>
          <Button onClick={() => setFormState({ open: true, project: null })} className="gap-1.5">
            <Plus className="size-4" />
            Add Project
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-2xl font-bold">{projects.length}</p>
            <p className="text-xs text-muted-foreground">Total projects</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-2xl font-bold">{featuredCount}</p>
            <p className="text-xs text-muted-foreground">Featured</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-2xl font-bold">
              {projects.reduce((total, project) => total + project.images.length, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Screenshots</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-xl border border-border bg-muted/60"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <p className="font-display text-xl font-bold">No projects yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Publish your first project and it will appear instantly on your portfolio.
            </p>
            <Button onClick={() => setFormState({ open: true, project: null })}>
              <Plus className="size-4" />
              Add your first project
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 sm:gap-4 sm:p-4">
                    <div className="flex shrink-0 flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        disabled={index === 0}
                        onClick={() => move(index, -1)}
                        aria-label={`Move ${project.title} up`}
                      >
                        <ArrowUp className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        disabled={index === projects.length - 1}
                        onClick={() => move(index, 1)}
                        aria-label={`Move ${project.title} down`}
                      >
                        <ArrowDown className="size-3.5" />
                      </Button>
                    </div>

                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:size-20">
                      {project.images[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="size-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground">
                          <ImageOff className="size-5" />
                        </div>
                      )}
                      {project.images.length > 1 && (
                        <span className="absolute bottom-1 right-1 rounded bg-ink/70 px-1 text-[10px] font-semibold text-paper">
                          +{project.images.length - 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-semibold">{project.title}</p>
                        {project.featured && (
                          <Badge className="gap-1">
                            <Star className="size-3" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        /{project.slug} · {project.images.length} image
                        {project.images.length === 1 ? "" : "s"}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <div className="hidden items-center gap-2 sm:flex" title="Featured">
                        <Star className="size-4 text-muted-foreground" />
                        <Switch
                          checked={project.featured}
                          onCheckedChange={(checked) =>
                            toggleFeatured.mutate({ id: project.id, featured: checked })
                          }
                          disabled={toggleFeatured.isPending}
                          aria-label={`Toggle featured for ${project.title}`}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setFormState({ open: true, project })}
                        aria-label={`Edit ${project.title}`}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setDeleteTarget(project)}
                        aria-label={`Delete ${project.title}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <ProjectForm
        open={formState.open}
        onOpenChange={(open) => setFormState((current) => ({ ...current, open }))}
        project={formState.project}
      />

      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && (
                <>
                  <strong className="font-semibold text-foreground">{deleteTarget.title}</strong>{" "}
                  will be removed from your portfolio and its images will be deleted from storage.
                  This action cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
