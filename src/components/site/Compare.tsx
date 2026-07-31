import { heroPortrait } from "./data";

const Compare = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-5">
      <div className="relative aspect-square w-72 h-72 sm:w-95 sm:h-95">
        <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />

        <span className="absolute top-4 left-10 w-1 h-1 rounded-full bg-white/40" />
        <span className="absolute bottom-8 right-6 w-1.5 h-1.5 rounded-full bg-white/30" />
        <span className="absolute top-1/2 -left-2 w-1 h-1 rounded-full bg-white/20" />
        <span className="absolute bottom-2 left-1/3 w-1 h-1 rounded-full bg-white/25" />

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

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full overflow-hidden ring-4 ring-black grayscale contrast-110">
            <img src={heroPortrait} alt="Profile photo" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
