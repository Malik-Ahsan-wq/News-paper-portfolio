import { useEffect, useState } from "react";
import { signOut as supabaseSignOut } from "@/lib/supabase/auth";
import { toFriendlyError } from "@/lib/supabase/errors";
import {
  ADMIN_AUTH_EVENT,
  ADMIN_USERNAME,
  clearAdminAuthenticated,
  ensureSupabaseSession,
  isAdminAuthenticated,
  setAdminAuthenticated,
  verifyAdminCredentials,
} from "@/lib/supabase/admin";

export function useAdminSession() {
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sync = () => setAuthenticated(isAdminAuthenticated());
    window.addEventListener(ADMIN_AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    setLoading(false);
    return () => {
      window.removeEventListener(ADMIN_AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (!verifyAdminCredentials(username, password)) return false;
    try {
      await ensureSupabaseSession();
    } catch (error) {
      throw toFriendlyError(error, "Sign-in failed. Please try again.");
    }
    setAdminAuthenticated();
    window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
    return true;
  };

  const logout = async () => {
    clearAdminAuthenticated();
    window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
    try {
      await supabaseSignOut();
    } catch {
      /* ignore */
    }
  };

  return { authenticated, loading, login, logout, adminName: ADMIN_USERNAME };
}
