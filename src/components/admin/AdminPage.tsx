import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useAdminSession } from "@/hooks/useAdminSession";
import { AdminDashboard } from "./AdminDashboard";
import { AdminLogin } from "./AdminLogin";

function AdminSplash() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-3 text-muted-foreground"
      >
        <Loader2 className="size-6 animate-spin" />
        <p className="text-sm">Loading dashboard…</p>
      </motion.div>
    </div>
  );
}

export function AdminPage() {
  const { authenticated, loading, login, logout, adminName } = useAdminSession();

  if (loading) return <AdminSplash />;
  if (!authenticated) return <AdminLogin onLogin={login} />;
  return <AdminDashboard adminName={adminName} onLogout={logout} />;
}
