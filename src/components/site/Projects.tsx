import { motion } from "motion/react";
import { PROJECTS } from "./data";
import { fadeUp, stagger, viewportOnce } from "./motion";

type Project = (typeof PROJECTS)[number];

function Card({ project, lead = false }: { project: Project; lead?: boolean }) {
  const external = project.href.startsWith("http");

  return (
    <motion.article
      variants={fadeUp}
      className="group self-start border border-border bg-card p-4 shadow-paper transition-[transform,box-shadow,border-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ink hover:shadow-paper-lift"
    >
      <a
        href={project.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block"
      >
        <div className="overflow-hidden border border-border">
          <img
            src={project.image}
            alt={project.title}
            width={project.width}
            height={project.height}
            loading="lazy"
            className={`w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${
              lead ? "aspect-[3/2]" : "aspect-[4/3]"
            }`}
          />
        </div>
        <p className="eyebrow mt-4 text-primary">{project.category}</p>
        <h3
          className={`mt-2 font-display font-black leading-tight ${
            lead ? "text-3xl sm:text-4xl" : "text-xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{project.excerpt}</p>
        <p className="mt-3 border-t border-border pt-2 text-[13px] italic text-muted-foreground">
          {project.meta}
        </p>
        <span className="eyebrow link-underline mt-4 inline-block text-ink group-hover:text-primary">
          Visit project {external ? "↗" : "→"}
        </span>
      </a>
    </motion.article>
  );
}

export function Projects() {
  const lead = PROJECTS[0]!;
  const rest = PROJECTS.slice(1);

  return (
    <section
      id="projects"
      className="border-b border-ink/80 bg-paper-alt"
      aria-labelledby="work-title"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-6xl px-5 py-14"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 flex items-baseline justify-between border-b border-ink pb-2"
        >
          <h2
            id="work-title"
            className="font-display text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl"
          >
            Working Projects
          </h2>
          <span className="eyebrow text-muted-foreground">Live work · Shipped with care</span>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          <Card project={lead} lead />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 2).map((p) => (
              <Card key={p.title} project={p} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((p) => (
            <Card key={p.title} project={p} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
