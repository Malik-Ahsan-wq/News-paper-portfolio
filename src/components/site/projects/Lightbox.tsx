import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EASE } from "../motion";
import type { Project } from "./types";

type LightboxProps = {
  project: Project;
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ project, index, onClose, onNavigate }: LightboxProps) {
  const count = project.images.length;
  const image = project.images[index] ?? project.images[0]!;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigate((index - 1 + count) % count);
      if (event.key === "ArrowRight") onNavigate((index + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, index, onClose, onNavigate]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} gallery`}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-4 py-4 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="truncate text-sm font-semibold text-white">{project.name}</span>
          <span className="shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-[11px] tabular-nums text-white/60">
            {index + 1} / {count}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10"
        >
          <X className="size-4" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-20 sm:px-20"
        onClick={(event) => event.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="max-h-full max-w-full rounded-lg object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]"
          />
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate((index - 1 + count) % count)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10 sm:left-5"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate((index + 1) % count)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10 sm:right-5"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div
          className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2"
          onClick={(event) => event.stopPropagation()}
        >
          {project.images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => onNavigate(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  );
}
