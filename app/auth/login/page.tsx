"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layers, Mail, Lock, ArrowRight, Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { ButtonRipple } from "@/components/ui/ButtonRipple";
import { useAuth } from "@/lib/auth/AuthContext";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("sarah.jenkins@orbit360.com");
  const [password, setPassword] = useState("Orbit360@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Authenticating credentials...", { id: "auth" });

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      toast.success("Welcome back! Redirecting to Dashboard...", { id: "auth" });
      router.push("/dashboard");
    } else {
      toast.error("Authentication failed. Please check credentials.", { id: "auth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Top Back to Home Navigation Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 backdrop-blur-md transition-all shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Landing Page</span>
        </Link>
      </div>

      {/* Background Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 bg-slate-950/90 border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Layers className="w-6 h-6 text-slate-950" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">Orbit 360</span>
          </Link>
          <h2 className="text-2xl font-black text-white">Sign In to Cockpit</h2>
          <p className="text-xs text-slate-400 mt-1">Access Sales Pipelines, HRMS Telemetry, and GST Invoicing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="sarah.jenkins@orbit360.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <Link href="/auth/forgot-password" className="text-[11px] text-emerald-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <ButtonRipple
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 text-xs font-extrabold uppercase tracking-wider"
          >
            {loading ? "Signing in..." : "Access Cockpit"}
            <ArrowRight className="w-4 h-4" />
          </ButtonRipple>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-emerald-400 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>

        <div className="mt-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Demo Admin Pre-filled. Click &quot;Access Cockpit&quot; to test instantly.</span>
        </div>
      </div>
    </div>
  );
}
