import { Images } from "lucide-react";
import type { Project } from "./types";

type FrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  eager?: boolean;
  onImageClick: (index: number) => void;
};

function Frame({ src, alt, width, height, index, eager = false, onImageClick }: FrameProps) {
  return (
    <button
      type="button"
      onClick={() => onImageClick(index)}
      aria-label={`Open ${alt} in fullscreen`}
      className="group/img relative block size-full w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-[1.06] group-hover:scale-[1.03]"
      />
    </button>
  );
}

type ImagePreviewProps = {
  project: Project;
  onImageClick: (index: number) => void;
};

export function ImagePreview({ project, onImageClick }: ImagePreviewProps) {
  const images = project.images.slice(0, 3);
  const count = images.length;

  if (count === 0) return null;

  const overlay = (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-ink/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
      <span className="inline-flex items-center gap-2 rounded-full bg-paper/90 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-paper">
        <Images className="size-3.5" />
        View gallery
      </span>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-t-2xl border-b border-border">
      {count === 1 && (
        <div className="aspect-[16/9]">
          <Frame
            src={images[0]!.src}
            alt={images[0]!.alt}
            width={images[0]!.width}
            height={images[0]!.height}
            index={0}
            eager
            onImageClick={onImageClick}
          />
        </div>
      )}

      {count === 2 && (
        <div className="grid grid-cols-2 gap-0.5">
          {images.map((image, i) => (
            <div key={image.src} className="aspect-[4/3]">
              <Frame
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                index={i}
                eager={i === 0}
                onImageClick={onImageClick}
              />
            </div>
          ))}
        </div>
      )}

      {count >= 3 && (
        <div className="grid grid-cols-[2fr_1fr] gap-0.5">
          <div className="aspect-[4/3]">
            <Frame
              src={images[0]!.src}
              alt={images[0]!.alt}
              width={images[0]!.width}
              height={images[0]!.height}
              index={0}
              eager
              onImageClick={onImageClick}
            />
          </div>
          <div className="grid grid-rows-2 gap-0.5">
            {images.slice(1, 3).map((image, i) => (
              <div key={image.src} className="aspect-[4/3]">
                <Frame
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  index={i + 1}
                  onImageClick={onImageClick}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {overlay}

      <span className="absolute right-2 top-2 z-10 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-paper backdrop-blur-sm">
        {count} {count === 1 ? "photo" : "photos"}
      </span>
    </div>
  );
}
