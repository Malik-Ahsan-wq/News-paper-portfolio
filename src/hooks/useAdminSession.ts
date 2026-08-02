import { useEffect, useState } from "react";
import { signOut as supabaseSignOut } from "@/lib/supabase/auth";
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

  const login = (username: string, password: string): boolean => {
    if (!verifyAdminCredentials(username, password)) return false;
    setAdminAuthenticated();
    window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
    void ensureSupabaseSession();
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
