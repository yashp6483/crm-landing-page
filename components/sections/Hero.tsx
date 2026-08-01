"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Zap,
  Users,
  Receipt,
  Kanban,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlowingGradient } from "@/components/ui/GlowingGradient";
import { SITE_CONFIG } from "@/lib/content";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 100]);

  // 3D Perspective Mouse Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // GSAP animation for the Hero Pipeline mockup on load
  useGSAP(
    () => {
      if (!visualRef.current) return;

      const ctx = gsap.context(() => {
        // Pulse background grid glow
        gsap.to(".hero-grid-glow", {
          opacity: 0.9,
          scale: 1.05,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Flowing particle dots along SVG
        const particles = gsap.utils.toArray<SVGCircleElement>(".lead-particle");
        particles.forEach((particle, idx) => {
          gsap.fromTo(
            particle,
            { strokeDashoffset: 300, opacity: 0 },
            {
              strokeDashoffset: 0,
              opacity: 1,
              duration: 2.5,
              delay: idx * 0.4,
              repeat: -1,
              ease: "power2.inOut",
            }
          );
        });

        // Staggered reveal for mockup cards
        gsap.from(".mockup-card", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        });

        // Floating badges micro-bounce
        gsap.to(".floating-stat", {
          y: "-=10",
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.4,
        });
      }, visualRef);

      return () => ctx.revert();
    },
    { scope: visualRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#070b14]"
    >
      {/* Dynamic Background Mesh & Grid */}
      <GlowingGradient position="top-left" className="opacity-30" />
      <GlowingGradient position="top-right" className="opacity-25 bg-indigo-600" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-6"
            >
              <Badge variant="emerald" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Next-Gen 360° Operations Engine
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Run <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Leads</span>,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">People</span>, and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">Billing</span>
              <br />
              <span className="text-slate-200">On One Unified Platform.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
              {SITE_CONFIG.heroSubheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => {
                  const el = document.getElementById("demo");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get a Free Demo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<Play className="w-4 h-4 fill-current text-emerald-400" />}
                onClick={() => {
                  const el = document.getElementById("features");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Features
              </Button>
            </div>

            {/* Quick Proof Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">8 Auto-Connectors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">GST Ready Billing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">HRMS Workflows</span>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Perspective Tilt Column */}
          <motion.div
            style={{ y: yParallax, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative w-full cursor-pointer"
            ref={visualRef}
          >
            {/* Floating Stat Pill (Top Right - Floating Outside Frame) */}
            <div className="floating-stat absolute -top-5 -right-2 sm:-right-4 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-950 border border-emerald-500/40 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl z-30">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-white">Lead Auto-Matched in 0.4s</span>
            </div>

            {/* Floating Stat Pill (Bottom Left - Floating Outside Frame) */}
            <div className="floating-stat absolute -bottom-5 -left-2 sm:-left-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700/80 shadow-2xl backdrop-blur-xl z-30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200 font-semibold">GST Invoices Synced</span>
            </div>

            <motion.div
              style={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              {/* Glowing Ambient Backdrop */}
              <div className="hero-grid-glow absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-cyan-500/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

              {/* Window Bar Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  orbit360.app/dashboard/live-pipeline
                </div>
                <span className="text-xs text-slate-500 font-mono">v4.2 Active</span>
              </div>

              {/* CRM Live Pipeline Overview */}
              <div className="grid grid-cols-3 gap-3 mb-4 relative z-10">
                <div className="mockup-card p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Active Leads</span>
                    <Kanban className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-lg font-bold text-white">1,482</div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3 h-3" /> +24% this week
                  </span>
                </div>

                <div className="mockup-card p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Active Reps</span>
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-lg font-bold text-white">48 Staff</div>
                  <span className="text-[10px] text-cyan-400 font-medium">98.4% Checked-In</span>
                </div>

                <div className="mockup-card p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Billed (GST)</span>
                    <Receipt className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="text-lg font-bold text-white">$142.8K</div>
                  <span className="text-[10px] text-indigo-400 font-medium">Auto Invoiced</span>
                </div>
              </div>

              {/* Visual SVG Lead Stream / Pipeline Path */}
              <div className="mockup-card relative rounded-xl bg-[#090e1a] border border-slate-800/80 p-4 min-h-[220px] flex flex-col justify-between z-10">
                <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Real-Time Inbound Routing
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-mono">
                    STREAM ONLINE
                  </span>
                </div>

                {/* Simulated Visual Lead Inflow Rows */}
                <div className="space-y-2.5">
                  <motion.div
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs transition-colors hover:border-emerald-500/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                        FB
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">Rohit Verma</div>
                        <div className="text-[10px] text-slate-400">FB Ads • Penthouse Inquiry</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Score 94/100
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">Assigned to Rahul</div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs transition-colors hover:border-cyan-500/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                        WA
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">Priya Nair</div>
                        <div className="text-[10px] text-slate-400">WhatsApp • HRMS Demo Request</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                        Score 88/100
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">Assigned to Elena</div>
                    </div>
                  </motion.div>
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
