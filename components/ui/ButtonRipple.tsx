"use client";

import React, { useState } from "react";

interface RippleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const ButtonRipple: React.FC<RippleProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    if (onClick) onClick(e);
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:shadow-lg hover:shadow-emerald-500/25 border-none",
    secondary: "bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600",
    danger: "bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold hover:shadow-lg hover:shadow-rose-500/25 border-none",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/60 border-none",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-2xl",
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden inline-flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute bg-white/40 rounded-full animate-ping pointer-events-none"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
