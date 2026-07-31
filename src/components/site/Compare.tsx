"use client"

import React from "react"
import Image from "next/image"

const Compare = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Outer stage */}
      <div className="relative w-95 h-95">
        {/* Faint dotted outer boundary */}
        <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />

        {/* Scattered dots for depth (static, subtle) */}
        <span className="absolute top-4 left-10 w-1 h-1 rounded-full bg-white/40" />
        <span className="absolute bottom-8 right-6 w-1.5 h-1.5 rounded-full bg-white/30" />
        <span className="absolute top-1/2 -left-2 w-1 h-1 rounded-full bg-white/20" />
        <span className="absolute bottom-2 left-1/3 w-1 h-1 rounded-full bg-white/25" />

        {/* Rotating ring group — moves clockwise like a clock */}
        <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
          <svg
            viewBox="0 0 380 380"
            className="w-full h-full"
            fill="none"
          >
            {/* Outer arc */}
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
            {/* Inner arc, slightly thinner, offset for layered look */}
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

        {/* Static center: profile photo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-67.5 h-67.5 rounded-full overflow-hidden ring-4 ring-black grayscale contrast-110">
            <Image
              src="/profile.jpg"
              alt="Profile photo"
              width={270}
              height={270}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Compare