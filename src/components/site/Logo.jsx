import React from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";

export function Logo({ light = false, className = "" }) {
  return (
    <Link
      to="/"
      aria-label="DS-Graphix Home"
      className={`group relative inline-flex items-center gap-2.5 sm:gap-3 select-none shrink-0 ${className}`}
    >
      <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full overflow-hidden bg-white p-0.5 shadow-md flex items-center justify-center border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg shrink-0">
        <img
          src={logoImg}
          alt="DS-Graphix Logo"
          className="h-full w-full object-cover rounded-full"
        />
      </div>
      <span className="font-display font-black text-lg sm:text-2xl tracking-tighter uppercase text-white group-hover:text-[#FF6636] transition-colors whitespace-nowrap">
        DS-GRAPHIX
      </span>
    </Link>
  );
}
