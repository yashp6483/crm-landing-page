"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Kanban,
  Users,
  Receipt,
  ArrowRight,
  Check,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";
import { GlowingGradient } from "@/components/ui/GlowingGradient";
import { FEATURES_DATA } from "@/lib/content";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";

export const Features: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>("lead-management");
  const containerRef = useRef<HTMLDivElement>(null);

  const activeFeature = FEATURES_DATA.find((f) => f.id === activeTabId) || FEATURES_DATA[0];

  // GSAP ScrollTrigger reveal
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".feature-scroll-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Kanban":
        return <Kanban className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />;
      case "Users":
        return <Users className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />;
      case "Receipt":
        return <Receipt className="w-6 h-6 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />;
      default:
        return <Kanban className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="features" ref={containerRef} className="py-24 relative overflow-hidden bg-[#070b14]">
      <GlowingGradient position="center" className="opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Complete 360° Platform"
          badgeVariant="emerald"
          title="Three Core Pillars. Zero Operational Silos."
          subtitle="Everything required to capture revenue, manage people workflows, and issue GST compliant billing in one unified interface."
        />

        {/* Tab Navigation Pill Header */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl gap-2 overflow-x-auto max-w-full">
            {FEATURES_DATA.map((feature) => {
              const isActive = feature.id === activeTabId;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTabId(feature.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-950/50"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent"
                  }`}
                >
                  {renderIcon(feature.iconName)}
                  <span>{feature.title.split("&")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Feature Active Card Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Description Side */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Badge variant="emerald">{activeFeature.badge}</Badge>
              <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {activeFeature.title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                {activeFeature.description}
              </p>

              {/* Bullet Highlights */}
              <div className="space-y-3 pt-2">
                {activeFeature.highlights.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-sm text-slate-200 font-medium">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                {activeFeature.metrics.map((m) => (
                  <div key={m.label} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xl font-bold text-emerald-400">{m.value}</div>
                    <div className="text-xs text-slate-400">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={
                    activeFeature.id === "lead-management"
                      ? "/dashboard/leads"
                      : activeFeature.id === "hrms"
                      ? "/dashboard/hrms"
                      : "/dashboard/invoicing"
                  }
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                  <span>Launch {activeFeature.title.split(" ")[0]} Cockpit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Interactive 3D Tilt Mockup Display */}
            <div className="lg:col-span-7 w-full">
              <TiltCard tiltAmount={8} className="p-6 border-slate-800 bg-slate-950/80 shadow-2xl relative">
                {/* Mock Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">
                    {activeFeature.previewMock.title}
                  </span>
                  <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-mono">
                    LIVE PREVIEW
                  </span>
                </div>

                {/* Render specific interactive mockup per module */}
                {activeFeature.previewMock.type === "kanban" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeFeature.previewMock.data.map((col: any) => (
                      <div
                        key={col.title}
                        className={`p-3 rounded-xl bg-gradient-to-b ${col.color} border border-slate-800 flex flex-col gap-2`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                          <span>{col.title}</span>
                          <span className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px]">
                            {col.count}
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-white">{col.amount}</div>
                        <div className="space-y-1.5 mt-2">
                          <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
                            Enterprise License deal
                          </div>
                          <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
                            High Priority Lead
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeFeature.previewMock.type === "hrms" && (
                  <div className="space-y-3">
                    {activeFeature.previewMock.data.map((emp: any) => (
                      <div
                        key={emp.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white">{emp.name}</div>
                            <div className="text-[10px] text-slate-400">{emp.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                            {emp.status} ({emp.checkedIn})
                          </span>
                          <div className="text-right">
                            <span className="font-bold text-slate-200">{emp.quota}</span>
                            <div className="text-[9px] text-slate-400">Target</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeFeature.previewMock.type === "invoice" && (
                  <div className="space-y-3">
                    {activeFeature.previewMock.data.map((inv: any) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-mono text-[10px]">
                            GST
                          </div>
                          <div>
                            <div className="font-mono text-emerald-400 font-semibold">{inv.id}</div>
                            <div className="font-bold text-white">{inv.client}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-extrabold text-white">{inv.total}</div>
                          <span className="inline-block text-[9px] font-bold text-slate-400">{inv.gst}</span>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-md font-bold text-[10px] ${
                            inv.status === "PAID"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : inv.status.includes("OVERDUE")
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </TiltCard>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3 Module Overview Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {FEATURES_DATA.map((item) => {
            const moduleRoute =
              item.id === "lead-management"
                ? "/dashboard/leads"
                : item.id === "hrms"
                ? "/dashboard/hrms"
                : "/dashboard/invoicing";

            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveTabId(item.id);
                  const el = document.getElementById("features");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="feature-scroll-card cursor-pointer"
              >
                <TiltCard
                  tiltAmount={12}
                  className={`h-full transition-all duration-300 flex flex-col justify-between ${
                    item.id === activeTabId
                      ? "border-emerald-500/50 bg-slate-900/90 shadow-lg shadow-emerald-950/40"
                      : "border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        {renderIcon(item.iconName)}
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        {item.title.split(" ")[0]} {item.title.split(" ")[1]}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.tagline}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTabId(item.id);
                      }}
                      className="text-xs font-semibold text-slate-300 hover:text-white"
                    >
                      Preview Demo
                    </button>
                    <a
                      href={moduleRoute}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center text-xs font-bold text-emerald-400 hover:text-emerald-300 gap-1.5 hover:gap-2 transition-all px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
                    >
                      <span>Explore Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
