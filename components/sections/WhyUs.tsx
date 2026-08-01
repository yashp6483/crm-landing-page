"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Boxes,
  Zap,
  Activity,
  ShieldCheck,
  Clock,
  Headphones,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { GlowingGradient } from "@/components/ui/GlowingGradient";
import { BENEFITS_DATA } from "@/lib/content";

const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = 30;
      const totalSteps = duration / incrementTime;
      const step = (end - start) / totalSteps;

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start * 10) / 10);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const WhyUs: React.FC = () => {
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "Boxes":
        return <Boxes className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />;
      case "Activity":
        return <Activity className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />;
      case "Clock":
        return <Clock className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />;
      case "Headphones":
        return <Headphones className="w-6 h-6 text-teal-400 group-hover:rotate-12 transition-transform duration-300" />;
      default:
        return <Sparkles className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="why-us" className="py-24 relative bg-[#070b14]">
      <GlowingGradient position="top-right" className="opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Unrivaled Performance"
          badgeVariant="emerald"
          title="Why Leading Enterprises Choose Orbit 360"
          subtitle="Designed for speed, built for reliability, and trusted to run revenue & workforce ops at scale."
        />

        {/* Bento Grid Layout with 3D TiltCards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BENEFITS_DATA.map((benefit, idx) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={benefit.colSpan || "lg:col-span-1"}
            >
              <TiltCard
                tiltAmount={12}
                className="h-full p-8 flex flex-col justify-between border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-emerald-500/40 transition-colors">
                      {getBenefitIcon(benefit.iconName)}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>

                {/* Optional Animated Metric Stat inside Bento Card */}
                {benefit.statNumber !== undefined && (
                  <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-baseline gap-3">
                    <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono">
                      <AnimatedCounter
                        value={benefit.statNumber}
                        prefix={benefit.statPrefix}
                        suffix={benefit.statSuffix}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {benefit.statLabel}
                    </span>
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
