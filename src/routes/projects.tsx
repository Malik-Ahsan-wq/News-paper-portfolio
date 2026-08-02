import { motion } from "motion/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Masthead } from "@/components/site/Masthead";
import { PROJECTS } from "@/components/site/data";
import { EASE, fadeUp, stagger, viewportOnce } from "@/components/site/motion";
import { ProjectsGrid } from "@/components/site/projects/ProjectsGrid";
import { toUiProject } from "@/components/site/projects/toUiProject";
import { useProjectsQuery } from "@/hooks/useProjects";
import { isSupabaseConfigured } from "@/lib/supabase/client";

const TITLE = "All Projects — Ahsan Bashir";
const DESC =
  "Browse every project built by Ahsan Bashir — full-stack applications, e-commerce stores and developer tools.";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { property: "og:site_name", content: "Ahsan Bashir" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
});

function ProjectsPage() {
  const { data, isLoading } = useProjectsQuery();

  const dbProjects = (data ?? []).map(toUiProject);
  const useLiveData = isSupabaseConfigured && dbProjects.length > 0;
  const projects = useLiveData ? dbProjects : PROJECTS;

  return (
    <>
      <div aria-hidden className="grain-overlay" />
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Masthead />
        <main>
          <section
            className="relative overflow-hidden border-b border-ink/80 bg-paper-alt"
            aria-labelledby="all-projects-title"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,var(--primary),transparent_70%)] opacity-[0.05]"
            />
            <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                viewport={viewportOnce}
              >
                <motion.div variants={fadeUp}>
                  <Link
                    to="/"
                    className="eyebrow inline-flex items-center gap-2 text-primary transition-colors duration-300 hover:text-ink"
                  >
                    <ArrowLeft className="size-3.5" />
                    Back to home
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp} className="mt-8">
                  <span className="eyebrow text-primary">Portfolio</span>
                  <h1
                    id="all-projects-title"
                    className="mt-2 font-display text-4xl font-black uppercase tracking-[0.05em] sm:text-5xl"
                  >
                    All Projects
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
                    Every product and experience I have designed and built — full-stack
                    applications, e-commerce stores and developer tools. Click any screenshot to
                    view it in fullscreen.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="border-b border-ink/80 bg-paper-alt">
            <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
              <ProjectsGrid projects={projects} isLoading={isLoading && isSupabaseConfigured} />
            </div>
          </section>
        </main>
      </motion.div>
    </>
  );
}
