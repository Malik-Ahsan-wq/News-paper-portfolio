import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lock, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { NAV } from "./data";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export function Masthead() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/80 bg-paper/95 backdrop-blur-sm">
      <div
        className="absolute top-0 left-0 h-[2px] bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-5">
        <nav aria-label="Sections" className="flex items-center gap-x-6 py-3">
          <Link to="/" className="mr-auto flex items-center" aria-label="Go to homepage">
            <Logo className="size-8 shrink-0" />
          </Link>
          <ul className="hidden flex-wrap items-center justify-center gap-x-6 md:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  to="/"
                  hash={item.href.slice(1)}
                  className="eyebrow link-underline text-ink transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-4 flex shrink-0 items-center gap-2">
            <Link
              to="/admin"
              aria-label="Update projects"
              title="Update projects"
              className="inline-flex size-8 items-center justify-center border border-border bg-card text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <Lock className="size-4" />
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-8 items-center justify-center border border-border bg-card text-ink transition-colors hover:border-primary hover:text-primary md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-paper/95 backdrop-blur-sm md:hidden"
          >
            <ul className="mx-auto max-w-6xl space-y-1 px-5 py-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    to="/"
                    hash={item.href.slice(1)}
                    onClick={() => setMenuOpen(false)}
                    className="eyebrow block border-b border-border py-3 text-ink transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-[3px] bg-ink" />
      <div className="mt-[3px] h-px bg-ink" />
    </header>
  );
}
