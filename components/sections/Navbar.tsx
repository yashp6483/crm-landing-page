"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Layers, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/content";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <motion.div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#070b14]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Orbit<span className="text-emerald-400 font-black">360</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-1">
                Unified CRM & HR
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 bg-slate-900/60 border border-slate-800/60 px-6 py-2 rounded-full backdrop-blur-md">
            {SITE_CONFIG.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 hover:scale-105 transform"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/auth/login"
              className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              Sign In
            </a>
            <Link href="/dashboard">
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Launch Cockpit
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {isOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#070b14]/95 border-b border-slate-800 backdrop-blur-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
              {SITE_CONFIG.navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="text-lg font-medium text-slate-200 hover:text-emerald-400 py-1 transition-colors flex items-center justify-between border-b border-slate-900"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </motion.a>
              ))}

              <div className="flex flex-col gap-3 pt-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => {
                    setIsOpen(false);
                    const el = document.getElementById("demo");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Book a Free Demo
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>No credit card required • 14-day free trial</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
