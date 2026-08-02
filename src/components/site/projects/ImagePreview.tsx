import { Images } from "lucide-react";
import type { Project } from "./types";

type ImagePreviewProps = {
  project: Project;
  onImageClick: (index: number) => void;
};

export function ImagePreview({ project, onImageClick }: ImagePreviewProps) {
  const images = project.images.slice(0, 3);
  const count = images.length;

  if (count === 0) return null;

  const hero = images[0]!;

  return (
    <button
      type="button"
      onClick={() => onImageClick(0)}
      aria-label={`Open ${hero.alt} in fullscreen`}
      className="group/img relative block w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
    >
      <div className="aspect-[16/10]">
        <img
          src={hero.src}
          alt={hero.alt}
          width={hero.width}
          height={hero.height}
          loading="eager"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-[1.05]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-ink/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2 text-sm font-semibold text-ink shadow-paper">
          <Images className="size-4" />
          View gallery
        </span>
      </div>

      <span className="absolute right-3 top-3 z-10 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-paper backdrop-blur-sm">
        {count} {count === 1 ? "photo" : "photos"}
      </span>
    </button>
  );
}
