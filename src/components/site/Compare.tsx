import { heroPortrait } from "./data";

/** Small square/plus marker that orbits the portrait at a fixed radius. */
type OrbitNodeProps = {
  radius: number;
  size: number;
  duration: number;
  reverse?: boolean;
  delay?: number;
  variant?: "dot" | "plus" | "square";
};

const OrbitNode = ({
  radius,
  size,
  duration,
  reverse = false,
  delay = 0,
  variant = "dot",
}: OrbitNodeProps) => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center will-change-transform"
      style={{
        animation: `${reverse ? "spin-reverse" : "spin"} ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="absolute flex items-center justify-center"
        style={{ top: `calc(50% - ${radius}px)` }}
      >
        {variant === "dot" && (
          <span
            className="block rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]"
            style={{ width: size, height: size }}
          />
        )}
        {variant === "square" && (
          <span
            className="block border border-white/80 bg-white/10"
            style={{ width: size, height: size }}
          />
        )}
        {variant === "plus" && (
          <span className="relative block" style={{ width: size, height: size }}>
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/70" />
            <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/70" />
          </span>
        )}
      </div>
    </div>
  );
};

/** Thin radial tick marks around the outer edge, like an instrument dial. */
const TickRing = () => {
  const ticks = Array.from({ length: 36 });
  return (
    <div className="absolute inset-0">
      {ticks.map((_, i) => {
        const angle = (360 / ticks.length) * i;
        const major = i % 9 === 0;
        return (
          <span
            key={i}
            className={`absolute left-1/2 top-0 origin-[50%_50vw] ${
              major ? "h-2.5 bg-white/50" : "h-1.5 bg-white/20"
            } w-px`}
            style={{ transform: `rotate(${angle}deg)` }}
          />
        );
      })}
    </div>
  );
};

/** Corner bracket framing, giving the widget a HUD / instrument feel. */
const CornerBrackets = () => (
  <>
    <span className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-white/40" />
    <span className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-white/40" />
    <span className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-white/40" />
    <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-white/40" />
  </>
);

const Compare = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-5">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.85); opacity: 0.5; }
          70% { transform: scale(1.05); opacity: 0; }
          100% { transform: scale(1.05); opacity: 0; }
        }
      `}</style>

      <div className="group relative aspect-square w-72 h-72 sm:w-[26rem] sm:h-[26rem]">
        {/* Corner HUD brackets */}
        <CornerBrackets />

        {/* Outer dashed boundary */}
        <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />

        {/* Instrument tick ring */}
        <TickRing />

        {/* Concentric guide circles */}
        <div className="absolute inset-6 rounded-full border border-white/10" />
        <div className="absolute inset-14 rounded-full border border-white/5" />

        {/* Radar sweep line */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{ animation: "sweep 6s linear infinite" }}
        >
          <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-top-left bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        </div>

        {/* Primary rotating rings */}
        <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
          <svg viewBox="0 0 380 380" className="w-full h-full" fill="none">
            <circle
              cx="190"
              cy="190"
              r="168"
              stroke="white"
              strokeOpacity="0.9"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="740 1055"
              strokeDashoffset="0"
            />
            <circle
              cx="190"
              cy="190"
              r="152"
              stroke="white"
              strokeOpacity="0.45"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="620 955"
              strokeDashoffset="260"
            />
          </svg>
        </div>

        {/* Orbiting nodes at varying radii / speeds / directions */}
        <OrbitNode radius={175} size={6} duration={10} />
        <OrbitNode radius={175} size={6} duration={10} delay={5} />
        <OrbitNode radius={148} size={10} duration={16} reverse variant="square" />
        <OrbitNode radius={132} size={12} duration={22} variant="plus" />
        <OrbitNode radius={132} size={12} duration={22} delay={11} variant="plus" />

        {/* Pulsing focus ring behind the portrait */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute w-3/4 h-3/4 rounded-full border border-white/40"
            style={{ animation: "pulse-ring 3s ease-out infinite" }}
          />
        </div>

        {/* Static center photo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full overflow-hidden ring-4 ring-black grayscale contrast-110 transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grayscale-0">
            <img src={heroPortrait} alt="Profile photo" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
