import { useEffect, useState } from "react";
import { NAV, PERSON } from "./data";

export function Masthead() {
  const [compressed, setCompressed] = useState(false);
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
    const onScroll = () => setCompressed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/80 bg-paper/95 backdrop-blur-sm">
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
          <h1 className="py-5 text-center font-display text-4xl font-black tracking-[0.06em] uppercase sm:text-6xl lg:text-7xl">
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
            <span className="mr-auto font-display text-base font-black uppercase tracking-[0.12em]">
              {PERSON.name}
            </span>
          )}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
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
        </nav>
      </div>
      <div className="h-[3px] bg-ink" />
      <div className="mt-[3px] h-px bg-ink" />
    </header>
  );
}
