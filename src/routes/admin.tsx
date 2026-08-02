import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Projects Admin — Ahsan Bashir" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
