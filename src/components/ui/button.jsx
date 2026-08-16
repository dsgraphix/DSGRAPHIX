import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const variantStyles = {
  default: "bg-[#FF6636] text-[#2A2A29] border-2 border-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A2A29] transition-all duration-200 ease-in-out",
  destructive: "bg-red-600 text-white border-2 border-white font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-200 ease-in-out",
  outline: "border-2 border-white bg-transparent text-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A2A29] transition-all duration-200 ease-in-out",
  secondary: "bg-[#F2F4F8] text-[#2A2A29] border-2 border-[#2A2A29] font-bold uppercase tracking-wider hover:bg-[#FF6636] hover:text-white transition-all duration-200 ease-in-out",
  ghost: "hover:bg-white/10 text-white font-bold uppercase tracking-wider transition-all duration-200 ease-in-out",
  link: "text-[#FF6636] underline-offset-4 hover:underline font-bold uppercase tracking-wider transition-all duration-200 ease-in-out",
  brand: "bg-[#FF6636] text-[#2A2A29] border-2 border-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A2A29] transition-all duration-200 ease-in-out",
  ink: "bg-white text-[#2A2A29] border-2 border-white font-bold uppercase tracking-wider hover:bg-[#FF6636] hover:text-white transition-all duration-200 ease-in-out",
  outlineInk: "border-2 border-white bg-transparent text-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A2A29] transition-all duration-200 ease-in-out",
  outlineLight: "border-2 border-white bg-transparent text-white font-bold uppercase tracking-wider hover:bg-[#FF6636] hover:text-white transition-all duration-200 ease-in-out",
};

const sizeStyles = {
  default: "h-11 min-h-[44px] px-5 py-2.5 text-sm",
  sm: "h-10 min-h-[44px] px-4 py-2 text-xs",
  lg: "h-12 min-h-[48px] px-7 py-3 text-sm",
  xl: "h-14 min-h-[56px] px-8 py-3.5 text-base",
  icon: "h-11 w-11 min-h-[44px] min-w-[44px] p-0 flex items-center justify-center shrink-0",
};

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const combinedClasses = cn(
      "inline-flex flex-row items-center justify-center gap-2.5 whitespace-nowrap shrink-0 rounded-none font-display font-bold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6636] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A2A29] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
      variantStyles[variant] || variantStyles.default,
      sizeStyles[size] || sizeStyles.default,
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        className: cn(combinedClasses, children.props.className),
        ...props
      });
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
