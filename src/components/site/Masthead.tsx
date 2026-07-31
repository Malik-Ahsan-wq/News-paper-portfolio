import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV, PERSON } from "./data";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export function Masthead() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 80);
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
          <a href="#top" className="mr-auto flex items-center gap-2.5">
            <Logo className="size-8 shrink-0" />
            <span className="hidden font-display text-base font-black uppercase tracking-[0.12em] min-[420px]:inline">
              {PERSON.name}
            </span>
          </a>
          <ul className="hidden flex-wrap items-center justify-center gap-x-6 md:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="eyebrow link-underline text-ink transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-4 flex shrink-0 items-center gap-2">
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

      <div
        className="hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:block"
        style={{ maxHeight: scrolled ? 0 : 200, opacity: scrolled ? 0 : 1 }}
      >
        <div className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-5 text-center">
            <p className="font-display text-4xl font-black uppercase tracking-[0.06em] lg:text-5xl">
              {PERSON.name}
            </p>
          </div>
        </div>
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
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="eyebrow block border-b border-border py-3 text-ink transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
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
