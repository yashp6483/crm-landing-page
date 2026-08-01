"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Send, CheckCircle2, Shield, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/lib/content";

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#050810] border-t border-slate-900 pt-16 pb-12 text-slate-400 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Layers className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Orbit<span className="text-emerald-400">360</span>
              </span>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The 360° Operations Engine unifying Lead Pipelines, automated HRMS workflows, and GST-ready Billing for modern high-growth businesses.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-white block mb-2">
                Subscribe to Product Updates & CRM Insights
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You're subscribed! Thank you.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Links - Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Product Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  Lead Management Pipeline
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  HRMS & Attendance Hub
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  GST Invoicing & Billing
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-emerald-400 transition-colors">
                  8+ Ad & Marketplace Connectors
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-emerald-400 transition-colors">
                  Real-time Telemetry Dashboards
                </a>
              </li>
            </ul>
          </div>

          {/* Connectors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Supported Connectors
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#integrations" className="hover:text-emerald-400 transition-colors">
                  Facebook Lead Ads
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-emerald-400 transition-colors">
                  IndiaMART Lead Connector
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-emerald-400 transition-colors">
                  99acres & Housing.com
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-emerald-400 transition-colors">
                  MagicBricks Webhooks
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-emerald-400 transition-colors">
                  WhatsApp Business API
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Security & SOC2 Compliance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  System Status (99.99%)
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-emerald-400 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Orbit 360 Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> AES-256 Encrypted Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
