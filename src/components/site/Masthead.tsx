import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV, PERSON } from "./data";
import { ThemeToggle } from "./ThemeToggle";

export function Masthead() {
  const [compressed, setCompressed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [today, setToday] = useState("");

  useEffect(() => {
    const update = () =>
      setToday(
        new Date().toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      );
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setCompressed(window.scrollY > 80);
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
      <div
        className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ maxHeight: compressed ? 0 : 200, opacity: compressed ? 0 : 1 }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2 text-[11px] tracking-[0.14em] text-muted-foreground uppercase font-sans">
            <span>{today}</span>
            <span className="hidden sm:inline">Est. {PERSON.since}</span>
            <span className="italic normal-case tracking-normal font-serif">
              Building digital experiences since {PERSON.since}
            </span>
          </div>
          <h1 className="py-5 text-center font-display text-3xl font-black tracking-[0.06em] uppercase sm:text-5xl lg:text-6xl">
            {PERSON.paper}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <nav
          aria-label="Sections"
          className="flex items-center justify-center gap-x-6 gap-y-1 border-t border-border py-3 transition-all duration-300"
          style={compressed ? { paddingTop: 8, paddingBottom: 8 } : undefined}
        >
          {compressed && (
            <span className="mr-auto hidden font-display text-base font-black uppercase tracking-[0.12em] sm:inline">
              {PERSON.name}
            </span>
          )}
          <ul className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-1 md:flex">
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
          <div className="ml-auto flex items-center gap-2 md:ml-0">
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
