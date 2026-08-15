import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const variantStyles = {
  default: "bg-[#FF6636] text-[#2A2A29] border-2 border-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A2A29] transition-colors duration-300",
  destructive: "bg-red-600 text-white border-2 border-white font-bold uppercase tracking-wider hover:bg-red-700 transition-colors",
  outline: "border-2 border-white bg-transparent text-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A2A29] transition-colors duration-300",
  secondary: "bg-[#F2F4F8] text-[#2A2A29] border-2 border-[#2A2A29] font-bold uppercase tracking-wider hover:bg-[#FF6636] hover:text-white transition-colors duration-300",
  ghost: "hover:bg-white/10 text-white font-bold uppercase tracking-wider transition-colors",
  link: "text-[#FF6636] underline-offset-4 hover:underline font-bold uppercase tracking-wider",
  brand: "bg-[#FF6636] text-[#2A2A29] border-2 border-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A2A29] transition-colors duration-300",
  ink: "bg-white text-[#2A2A29] border-2 border-white font-bold uppercase tracking-wider hover:bg-[#FF6636] hover:text-white transition-colors duration-300",
  outlineInk: "border-2 border-white bg-transparent text-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A2A29] transition-colors duration-300",
  outlineLight: "border-2 border-white bg-transparent text-white font-bold uppercase tracking-wider hover:bg-[#FF6636] hover:text-white transition-colors duration-300",
};

const sizeStyles = {
  default: "h-10 px-5 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-12 px-7 text-sm",
  xl: "h-14 px-8 text-base",
  icon: "h-10 w-10 p-0 flex items-center justify-center",
};

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const combinedClasses = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap flex-nowrap shrink-0 rounded-none font-display font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6636] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
      variantStyles[variant] || variantStyles.default,
      sizeStyles[size] || sizeStyles.default,
      className
    );

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
