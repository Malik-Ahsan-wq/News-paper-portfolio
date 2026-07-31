import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group inline-flex size-8 items-center justify-center border border-border bg-card text-ink transition-colors duration-300 hover:border-primary hover:text-primary ${className}`}
    >
      <Sun
        aria-hidden
        className="size-4 transition-all duration-300 group-hover:rotate-90 dark:hidden"
      />
      <Moon
        aria-hidden
        className="hidden size-4 transition-all duration-300 group-hover:rotate-[20deg] dark:block"
      />
    </button>
  );
}
