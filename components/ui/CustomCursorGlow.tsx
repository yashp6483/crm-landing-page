"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursorGlow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 200, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 175);
      cursorY.set(e.clientY - 175);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none z-30 opacity-40 blur-[90px] bg-gradient-to-tr from-emerald-500/30 via-teal-400/20 to-cyan-500/30 hidden md:block"
    />
  );
};
