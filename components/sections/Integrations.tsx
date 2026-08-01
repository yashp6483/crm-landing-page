"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  ShoppingBag,
  Building,
  Home,
  Layers,
  Search,
  MessageCircle,
  Code2,
  Zap,
  CheckCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { CONNECTORS_DATA, ConnectorItem } from "@/lib/content";
import { useGSAP } from "@/lib/gsap";
import gsap from "gsap";

export const Integrations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeConnector, setActiveConnector] = useState<ConnectorItem>(CONNECTORS_DATA[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const categories = ["All", "Social Ads", "Real Estate", "B2B Marketplace", "Messaging", "Developer API"];

  const filteredConnectors = CONNECTORS_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Ensure activeConnector stays valid when filter changes
  React.useEffect(() => {
    if (filteredConnectors.length > 0 && !filteredConnectors.some((item) => item.id === activeConnector.id)) {
      setActiveConnector(filteredConnectors[0]);
    }
  }, [selectedCategory, searchQuery, filteredConnectors, activeConnector.id]);

  // GSAP animation for flowing lead particles into central CRM node
  useGSAP(
    () => {
      if (!svgRef.current) return;

      const particles = gsap.utils.toArray<SVGCircleElement>(".stream-dot");
      particles.forEach((dot, index) => {
        gsap.to(dot, {
          strokeDashoffset: 0,
          duration: 2 + (index % 3) * 0.4,
          repeat: -1,
          ease: "linear",
        });
      });
    },
    { scope: svgRef }
  );

  const getConnectorIcon = (type: string) => {
    switch (type) {
      case "facebook":
        return <Share2 className="w-5 h-5" />;
      case "shopping-bag":
        return <ShoppingBag className="w-5 h-5" />;
      case "building":
        return <Building className="w-5 h-5" />;
      case "home":
        return <Home className="w-5 h-5" />;
      case "layers":
        return <Layers className="w-5 h-5" />;
      case "search":
        return <Search className="w-5 h-5" />;
      case "message-circle":
        return <MessageCircle className="w-5 h-5" />;
      case "code":
        return <Code2 className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <section id="integrations" ref={containerRef} className="py-24 relative overflow-hidden bg-[#070b14]/90 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Zero Lead Leakage"
          badgeVariant="cyan"
          title="Leads Flow In Automatically — From Everywhere You Advertise"
          subtitle="Plug in Meta Ads, IndiaMART, Real Estate portals, WhatsApp, and custom APIs. Leads land in rep buckets in < 1 second."
        />

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto max-w-full scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25"
                      : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Filter Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter connectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Orbit Graphic & Flow Visualizer */}
        <div className="relative mb-16 p-8 rounded-3xl bg-slate-950/90 border border-slate-800/80 shadow-2xl backdrop-blur-2xl overflow-hidden">
          
          {/* Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Central Hub Node with 3D Pulse */}
          <div className="flex flex-col items-center justify-center text-center relative z-20 my-8">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-[2px] shadow-2xl shadow-emerald-500/40 flex items-center justify-center relative group cursor-pointer"
            >
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Layers className="w-10 h-10 text-emerald-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <span className="absolute -top-3 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                CRM Central Core
              </span>
            </motion.div>
            <h4 className="text-xl font-extrabold text-white mt-4">Orbit 360 Auto-Distributor</h4>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              AI scoring, duplicate deduplication, round-robin assignment & instant WhatsApp alert trigger.
            </p>
          </div>

          {/* SVG Animated Connecting Lines */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M 100,100 Q 300,150 500,200"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 6"
              className="stream-dot"
            />
            <path
              d="M 900,100 Q 700,150 500,200"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 6"
              className="stream-dot"
            />
          </svg>

          {/* Grid of Filtered Connector Cards with TiltCard 3D motion */}
          {filteredConnectors.length > 0 ? (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-20 mt-8">
              <AnimatePresence>
                {filteredConnectors.map((item) => {
                  const isSelected = activeConnector?.id === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setActiveConnector(item)}
                      onClick={() => setActiveConnector(item)}
                      className="cursor-pointer"
                    >
                      <TiltCard
                        tiltAmount={12}
                        className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                          isSelected
                            ? "bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                            : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${item.color}20`, color: item.color }}
                          >
                            {getConnectorIcon(item.iconType)}
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                            {item.syncSpeed}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">{item.name}</h5>
                          <span className="text-[11px] text-slate-400 block mt-0.5">{item.category}</span>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-12 relative z-20">
              <p className="text-slate-400 text-sm">No connectors found matching &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs text-emerald-400 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>

        {/* Selected Connector Detail Card */}
        {activeConnector && filteredConnectors.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeConnector.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <TiltCard tiltAmount={6} className="p-6 border-slate-800 bg-slate-900/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{ backgroundColor: `${activeConnector.color}25`, color: activeConnector.color }}
                  >
                    {getConnectorIcon(activeConnector.iconType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-extrabold text-white">{activeConnector.name}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {activeConnector.badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{activeConnector.description}</p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-4 py-2 rounded-xl">
                  <CheckCircle className="w-4 h-4" />
                  <span>Instant Auto Sync</span>
                </div>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        )}

      </div>
    </section>
  );
};
