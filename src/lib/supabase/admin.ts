import { getSession, signInWithPassword, signOut } from "./auth";

/**
 * Hardcoded admin credentials used to gate the admin dashboard UI.
 *
 * NOTE: These live in client-side code, so anyone can extract them from the
 * page source. This only deters casual visitors — it is not real security.
 * For a production-grade setup, prefer Supabase Auth (email/password) instead.
 */
export const ADMIN_USERNAME = "ahsanmalik";
export const ADMIN_PASSWORD = "Aa@123456";

/**
 * The Supabase account used to perform authenticated writes (insert/update/
 * delete + storage uploads), which the RLS policies require. The app signs in
 * with this account automatically after the admin gate passes.
 */
export const ADMIN_SUPABASE_EMAIL = "ahsanmalikking57@gmail.com";

const AUTH_STORAGE_KEY = "papercut-admin-auth";

export const ADMIN_AUTH_EVENT = "papercut:admin-auth";

export function verifyAdminCredentials(username: string, password: string): boolean {
  return username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setAdminAuthenticated(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function clearAdminAuthenticated(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Ensures a Supabase session for the admin account exists so DB writes and
 * storage uploads work. Throws if the admin cannot be authenticated — callers
 * must treat a failure as "not allowed to log in".
 */
export async function ensureSupabaseSession(): Promise<void> {
  const session = await getSession();
  const currentEmail = session?.user?.email?.toLowerCase();
  if (session && currentEmail === ADMIN_SUPABASE_EMAIL.toLowerCase()) {
    return;
  }
  if (session) {
    await signOut();
  }
  await signInWithPassword(ADMIN_SUPABASE_EMAIL, ADMIN_PASSWORD);
}
