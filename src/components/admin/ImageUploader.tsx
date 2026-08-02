import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { uploadProjectImage } from "@/lib/supabase/storage";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
  value: string[];
  onChange: (value: string[]) => void;
  max?: number;
  disabled?: boolean;
};

export function ImageUploader({ value, onChange, max = 3, disabled }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<{ name: string; progress: number } | null>(null);

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (value.length >= max) {
      toast.error(`You can upload up to ${max} images per project.`);
      return;
    }

    setUploading({ name: file.name, progress: 0 });
    try {
      const url = await uploadProjectImage(file, (progress) => {
        setUploading({ name: file.name, progress });
      });
      onChange([...value, url]);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed");
    } finally {
      setUploading(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const slots = Array.from({ length: max });

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {slots.map((_, index) => {
          const url = value[index];
          const isUploadingSlot = index === value.length && uploading;

          if (url) {
            return (
              <div
                key={url}
                className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
              >
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="size-full object-cover"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => onChange(value.filter((existing) => existing !== url))}
                  aria-label="Remove image"
                  className="absolute right-1.5 top-1.5 inline-flex size-7 items-center justify-center rounded-full bg-ink/70 text-paper opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            );
          }

          if (isUploadingSlot && uploading) {
            return (
              <div
                key={`uploading-${index}`}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-2 text-center"
              >
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-primary/20">
                  <span
                    className="block h-full rounded-full bg-primary transition-[width] duration-200"
                    style={{ width: `${uploading.progress}%` }}
                  />
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {uploading.progress}%
                </span>
              </div>
            );
          }

          return (
            <button
              key={`empty-${index}`}
              type="button"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ImagePlus className="size-5" />
              <span className="text-[10px] font-medium">Add image</span>
            </button>
          );
        })}
      </div>

      <p className={cn("text-xs text-muted-foreground", value.length >= max && "text-destructive")}>
        {value.length} of {max} images uploaded
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
    </div>
  );
}
