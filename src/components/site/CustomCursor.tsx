import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const style = document.createElement("style");
    style.textContent = `
      body, a, button, [role="button"], img, label, select { cursor: none !important; }
      input, textarea, [contenteditable] { cursor: text !important; }
    `;
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest(
        "a, button, [role='button'], input, textarea, select, img, label",
      );
      setHovering(!!target);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      style.remove();
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-ml-5 -mt-5 size-10 rounded-full border-2 border-primary/70 mix-blend-multiply"
          animate={{ scale: hovering ? 1.6 : 1, opacity: visible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101]"
        style={{ x, y }}
      >
        <motion.div
          className="-ml-[3px] -mt-[3px] size-1.5 rounded-full bg-primary"
          animate={{ scale: hovering ? 0.6 : 1, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
