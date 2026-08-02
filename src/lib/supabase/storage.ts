import { SUPABASE_ANON_KEY, SUPABASE_URL, supabase } from "./client";

export const STORAGE_BUCKET = "projects";

export function getPublicImageUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
}

export function extractStoragePath(publicUrl: string): string | null {
  const prefix = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/`;
  if (publicUrl.startsWith(prefix)) {
    return publicUrl.slice(prefix.length);
  }
  return null;
}

/**
 * Uploads an image to the `projects` bucket and returns its public URL.
 *
 * The installed Supabase SDK does not expose upload progress, so we mirror its
 * FormData upload with a raw XMLHttpRequest to report real percentage progress.
 */
export async function uploadProjectImage(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<string> {
  const { data } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;

  const extension = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `public/${crypto.randomUUID()}.${extension}`;
  const endpoint = `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${path}`;

  const body = new FormData();
  body.append("cacheControl", "3600");
  body.append("", file);

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    xhr.setRequestHeader("apikey", SUPABASE_ANON_KEY);
    if (accessToken) xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    xhr.setRequestHeader("x-upsert", "true");

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable && event.total > 0) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onerror = () => reject(new Error("Network error while uploading image."));

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(getPublicImageUrl(path));
      } else {
        let message = `Upload failed (${xhr.status}).`;
        try {
          const parsed = JSON.parse(xhr.responseText) as { message?: string; error?: string };
          message = parsed.message || parsed.error || message;
        } catch {
          /* keep default message */
        }
        reject(new Error(message));
      }
    };

    xhr.send(body);
  });
}

/** Deletes an object from the `projects` bucket. No-op for non-bucket URLs. */
export async function deleteProjectImage(publicUrl: string): Promise<void> {
  const path = extractStoragePath(publicUrl);
  if (!path) return;
  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path]);
  if (error) throw error;
}
