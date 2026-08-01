"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { TRUST_LOGOS, SITE_CONFIG } from "@/lib/content";
import { Building2, ShieldCheck, Award, Users2 } from "lucide-react";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";

export const TrustBar: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // GSAP Infinite marquee animation
  useGSAP(
    () => {
      if (!marqueeRef.current) return;
      const marqueeContent = marqueeRef.current.querySelector(".marquee-track");
      if (!marqueeContent) return;

      gsap.to(marqueeContent, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });
    },
    { scope: marqueeRef }
  );

  return (
    <section className="py-14 border-y border-slate-800/80 bg-slate-950/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Trusted by <span className="text-emerald-400 font-bold">500+</span> High-Growth Enterprises, Real Estate Firms & SaaS Teams
        </p>
      </div>

      {/* Infinite Scrolling Logo Marquee Container */}
      <div ref={marqueeRef} className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee-track flex items-center gap-8 w-max">
          {[...TRUST_LOGOS, ...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                {logo.name.charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-200">{logo.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">{logo.industry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Metrics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-10 border-t border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {SITE_CONFIG.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <span className="text-emerald-400">{stat.prefix}</span>
              {stat.value}
              <span className="text-emerald-400">{stat.suffix}</span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
