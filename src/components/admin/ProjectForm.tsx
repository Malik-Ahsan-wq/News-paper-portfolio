import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getNextDisplayOrder } from "@/lib/supabase/projects";
import { deleteProjectImage } from "@/lib/supabase/storage";
import type { ProjectInput } from "@/lib/supabase/types";
import { useCreateProject, useUpdateProject } from "@/hooks/useProjects";
import { ImageUploader } from "./ImageUploader";
import { TechInput } from "./TechInput";

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(140, "Keep the title under 140 characters"),
  slug: z.string().min(1, "Slug is required"),
  description: z
    .string()
    .min(10, "Description needs at least 10 characters")
    .max(2000, "Keep the description under 2000 characters"),
  tech_stack: z.array(z.string()),
  live_demo_url: z.union([z.string().url("Enter a valid URL"), z.literal("")]),
  github_url: z.union([z.string().url("Enter a valid URL"), z.literal("")]),
  featured: z.boolean(),
  images: z.array(z.string()).min(1, "Add at least 1 image").max(3, "You can add up to 3 images"),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

type ProjectFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    tech_stack: string[];
    live_demo_url: string | null;
    github_url: string | null;
    images: string[];
    featured: boolean;
  } | null;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ProjectForm({ open, onOpenChange, project = null }: ProjectFormProps) {
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();

  const defaultValues = (): ProjectFormValues => ({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    description: project?.description ?? "",
    tech_stack: project?.tech_stack ?? [],
    live_demo_url: project?.live_demo_url ?? "",
    github_url: project?.github_url ?? "",
    featured: project?.featured ?? false,
    images: project?.images ?? [],
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultValues(),
  });

  useEffect(() => {
    reset(defaultValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id, open]);

  const techStack = watch("tech_stack");
  const images = watch("images");

  const onSubmit = async (values: ProjectFormValues) => {
    const input: ProjectInput = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      description: values.description.trim(),
      tech_stack: values.tech_stack,
      live_demo_url: values.live_demo_url || null,
      github_url: values.github_url || null,
      images: values.images,
      featured: values.featured,
    };

    try {
      if (project) {
        const removed = project.images.filter((url) => !values.images.includes(url));
        if (removed.length > 0) {
          try {
            await Promise.all(removed.map((url) => deleteProjectImage(url)));
          } catch {
            /* best-effort storage cleanup */
          }
        }
        await updateMutation.mutateAsync({ id: project.id, input });
        toast.success("Project updated");
      } else {
        const displayOrder = await getNextDisplayOrder();
        await createMutation.mutateAsync({ ...input, display_order: displayOrder });
        toast.success("Project published");
      }
      reset(defaultValues());
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save project");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogDescription>
            {project
              ? "Update the details below. Changes go live immediately."
              : "Fill in the details to publish a new project."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="project-title">Project Name *</Label>
              <Input
                id="project-title"
                placeholder="tools.websolave.com"
                aria-invalid={Boolean(errors.title)}
                {...register("title", {
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    if (!dirtyFields.slug) {
                      setValue("slug", slugify(event.target.value), {
                        shouldDirty: false,
                        shouldValidate: false,
                      });
                    }
                  },
                })}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-slug">Slug *</Label>
              <Input
                id="project-slug"
                placeholder="tools-websolave"
                aria-invalid={Boolean(errors.slug)}
                {...register("slug")}
              />
              {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Description *</Label>
            <Textarea
              id="project-description"
              rows={4}
              placeholder="What does this project do?"
              aria-invalid={Boolean(errors.description)}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Tech Stack</Label>
            <TechInput
              value={techStack}
              onChange={(next) => setValue("tech_stack", next, { shouldDirty: true })}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="project-live">Live Demo URL</Label>
              <Input
                id="project-live"
                type="url"
                placeholder="https://example.com"
                aria-invalid={Boolean(errors.live_demo_url)}
                {...register("live_demo_url")}
              />
              {errors.live_demo_url && (
                <p className="text-xs text-destructive">{errors.live_demo_url.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-github">GitHub URL</Label>
              <Input
                id="project-github"
                type="url"
                placeholder="https://github.com/you/project"
                aria-invalid={Boolean(errors.github_url)}
                {...register("github_url")}
              />
              {errors.github_url && (
                <p className="text-xs text-destructive">{errors.github_url.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Screenshots (up to 3)</Label>
            <ImageUploader
              value={images}
              onChange={(next) => setValue("images", next, { shouldDirty: true })}
              disabled={isSubmitting}
            />
            {errors.images && <p className="text-xs text-destructive">{errors.images.message}</p>}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
            <div>
              <Label htmlFor="project-featured" className="font-medium">
                Featured Project
              </Label>
              <p className="text-xs text-muted-foreground">
                Highlights this project with a Featured badge on the portfolio.
              </p>
            </div>
            <Switch
              id="project-featured"
              checked={watch("featured")}
              onCheckedChange={(checked) => setValue("featured", checked, { shouldDirty: true })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {project ? "Save Changes" : "Publish Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
