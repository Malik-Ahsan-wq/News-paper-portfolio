type SupabaseLikeError = {
  message?: unknown;
  code?: unknown;
  status?: unknown;
  statusCode?: unknown;
};

/** Detects the PostgREST "row-level security policy" / permission errors. */
export function isPermissionDeniedError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const { message, code } = error as SupabaseLikeError;
  const messageText = typeof message === "string" ? message.toLowerCase() : "";
  const codeText = typeof code === "string" ? code.toLowerCase() : "";
  return (
    codeText === "42501" ||
    codeText === "accessdenied" ||
    messageText.includes("row-level security") ||
    messageText.includes("permission denied") ||
    messageText.includes("new row violates") ||
    (messageText.includes("unauthorized") && codeText !== "")
  );
}

/** Translates a Supabase error into a human-friendly message. */
export function toFriendlyError(error: unknown, fallback = "Something went wrong."): Error {
  if (isPermissionDeniedError(error)) {
    return new Error("You are not authorized to perform this action.");
  }
  if (error instanceof Error) return error;
  return new Error(fallback);
}
