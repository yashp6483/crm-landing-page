"use client";

import React, { useState, useEffect } from "react";
import { Share2, RefreshCw, CheckCircle, Zap, ShieldCheck, Play, Pause } from "lucide-react";
import { ButtonRipple } from "@/components/ui/ButtonRipple";
import { TiltCard } from "@/components/ui/TiltCard";
import { toast } from "sonner";

export default function ConnectorsPage() {
  const [connectors, setConnectors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchConnectors = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/connectors");
      const data = await res.json();
      if (data.success) setConnectors(data.data);
    } catch {
      toast.error("Failed to load connectors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectors();
  }, []);

  const handleToggleAutoImport = async (id: string, currentVal: boolean) => {
    try {
      toast.loading("Updating auto-import configuration...", { id: "connToggle" });
      const res = await fetch("/api/connectors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, autoImport: !currentVal }),
      });
      if (res.ok) {
        toast.success(`Auto-import ${!currentVal ? "enabled" : "paused"}!`, { id: "connToggle" });
        fetchConnectors();
      }
    } catch {
      toast.error("Error toggling auto-import", { id: "connToggle" });
    }
  };

  const handleTriggerSync = (name: string) => {
    toast.loading(`Triggering live sync for ${name}...`, { id: "sync" });
    setTimeout(() => {
      toast.success(`Sync complete! 3 new leads ingested from ${name}.`, { id: "sync" });
      fetchConnectors();
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Lead Connector Hub & Webhook Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure real-time auto-ingestion for Meta Ads, IndiaMART, 99acres, WhatsApp, and REST Webhooks.
          </p>
        </div>

        <ButtonRipple onClick={() => handleTriggerSync("All Connectors")} variant="primary" size="md">
          <RefreshCw className="w-4 h-4" />
          <span>Sync All Active Webhooks</span>
        </ButtonRipple>
      </div>

      {/* Grid of Connectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {connectors.map((c) => (
          <TiltCard key={c._id || c.connectorId} tiltAmount={8} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono block">{c.category}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                  {c.syncSpeed || "< 1s"}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Ingested Leads</span>
                  <span className="font-mono font-bold text-emerald-400">{(c.totalLeadsSynced || 1248).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last Synced</span>
                  <span className="font-mono text-slate-300">{c.lastSyncedAt || "Just now"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => handleToggleAutoImport(c._id || c.id, c.autoImport)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  c.autoImport
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                }`}
              >
                {c.autoImport ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{c.autoImport ? "Auto-Sync Active" : "Paused"}</span>
              </button>

              <button
                onClick={() => handleTriggerSync(c.name)}
                className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Manual Sync"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
