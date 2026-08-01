"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Send,
  Loader2,
  Sparkles,
  ShieldCheck,
  Star,
  Building,
  Mail,
  User,
  Phone,
  MessageSquare,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GlowingGradient } from "@/components/ui/GlowingGradient";
import { DEMO_BENEFITS } from "@/lib/content";
import confetti from "canvas-confetti";

export const ContactDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    teamSize: "10-50 employees",
    interest: "Lead Management & CRM",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#06b6d4", "#6366f1"],
      });
    }, 1200);
  };

  return (
    <section id="demo" className="py-24 relative bg-[#070b14]/95 overflow-hidden">
      <GlowingGradient position="bottom-center" className="opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Persuasive Content */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <SectionHeading
              badge="Ready to Scale?"
              badgeVariant="emerald"
              title="Experience Orbit 360 in Action"
              subtitle="See how our unified 360° platform streamlines lead flows, HR operations, and invoicing for your exact team size."
              align="left"
              className="mb-8"
            />

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">4.9/5</span>
              <span className="text-xs text-slate-400">from 450+ verified customer reviews</span>
            </div>

            {/* Demo Benefits List */}
            <div className="space-y-3.5 mb-8">
              {DEMO_BENEFITS.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-200 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Direct Contact Pill */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4 w-full">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Guaranteed Response SLA</h5>
                <p className="text-[11px] text-slate-400">A Senior Product Strategist will contact you within 15 minutes.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Demo Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-2xl relative">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Demo Request Received!</h3>
                    <p className="text-slate-300 text-sm max-w-md">
                      Thank you, <span className="text-emerald-400 font-semibold">{formData.name}</span>. Our CRM specialist will reach out to <span className="text-emerald-400 font-semibold">{formData.email}</span> shortly with your customized preview link.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setStatus("idle")}
                      className="mt-4"
                    >
                      Submit Another Request
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-white mb-2">Book Your Personalized 1-on-1 Demo</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Work Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Work Email *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Company Name *
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="Acme Corp"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Team Size & Module Interest */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Team Size
                        </label>
                        <select
                          value={formData.teamSize}
                          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        >
                          <option value="1-10 employees">1-10 employees</option>
                          <option value="10-50 employees">10-50 employees</option>
                          <option value="50-250 employees">50-250 employees</option>
                          <option value="250+ employees">250+ employees</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Primary Interest
                        </label>
                        <select
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        >
                          <option value="Lead Management & CRM">Lead Management & Pipeline</option>
                          <option value="HRMS Operations">HRMS & Team Workflows</option>
                          <option value="GST Billing & Invoicing">GST Billing & Invoicing</option>
                          <option value="Full 360 Suite">Full 360 Platform Suite</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full justify-center mt-4"
                      icon={
                        status === "loading" ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )
                      }
                    >
                      {status === "loading" ? "Scheduling Demo..." : "Book My Free Demo"}
                    </Button>

                    <p className="text-[11px] text-slate-400 text-center">
                      By submitting this form, you agree to our Terms of Service & Privacy Policy.
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
