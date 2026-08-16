import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft brand orange ambient light bleed — hardware-accelerated static gradient glow */}
      <div
        className="absolute -top-40 -left-40 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-[#FF6636]/[0.08] blur-[120px] pointer-events-none transform-gpu"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
      <div
        className="absolute top-1/2 -right-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#FF6636]/[0.05] blur-[140px] pointer-events-none transform-gpu"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
    </div>
  );
}
