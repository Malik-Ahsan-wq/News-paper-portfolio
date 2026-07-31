import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

export function CountUp({ to, suffix = "", prefix = "", duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setDisplay(`${prefix}${to}${suffix}`);
      return;
    }

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${prefix}${Math.round(eased * to)}${suffix}`);
          if (p < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            setDisplay(`${prefix}${to}${suffix}`);
          }
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [to, suffix, prefix, duration]);

  return <span ref={ref}>{display}</span>;
}
