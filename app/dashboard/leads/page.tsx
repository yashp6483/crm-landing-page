"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Kanban as KanbanIcon,
  Table as TableIcon,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  User,
  X,
  Building,
  DollarSign,
  Tag,
} from "lucide-react";
import { ButtonRipple } from "@/components/ui/ButtonRipple";
import { TiltCard } from "@/components/ui/TiltCard";
import { toast } from "sonner";

const STAGES = [
  { id: "NEW", title: "New Qualified", color: "border-blue-500/40 text-blue-400 bg-blue-500/10" },
  { id: "QUALIFIED", title: "Qualified", color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10" },
  { id: "DEMO_SCHEDULED", title: "Demo Scheduled", color: "border-purple-500/40 text-purple-400 bg-purple-500/10" },
  { id: "PROPOSAL_SENT", title: "Proposal Sent", color: "border-amber-500/40 text-amber-400 bg-amber-500/10" },
  { id: "NEGOTIATION", title: "Negotiation", color: "border-teal-500/40 text-teal-400 bg-teal-500/10" },
  { id: "WON", title: "Closed Won", color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newLogText, setNewLogText] = useState<string>("");
  const [logType, setLogType] = useState<string>("CALL");

  // Create Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    title: "",
    contactName: "",
    email: "",
    phone: "",
    companyName: "",
    value: 50000,
    priority: "HIGH",
    source: "Facebook Lead Ads",
    assignedToName: "Sarah Jenkins",
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && data.data) {
        setLeads(data.data);
      }
    } catch {
      toast.error("Failed to load leads from database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle Drag & Drop Stage Update
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStage = destination.droppableId;
    const leadToUpdate = leads.find((l) => (l._id || l.id) === draggableId);

    if (!leadToUpdate) return;

    // Optimistic UI Update
    const updatedLeads = leads.map((l) =>
      (l._id || l.id) === draggableId ? { ...l, status: newStage } : l
    );
    setLeads(updatedLeads);

    try {
      const res = await fetch(`/api/leads/${draggableId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStage }),
      });
      if (res.ok) {
        toast.success(`Moved deal to ${newStage.replace("_", " ")}`);
      }
    } catch {
      toast.error("Failed to sync stage update");
      fetchLeads();
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "ALL" || lead.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // Handle Create Lead
  const handleCreateLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.loading("Creating lead...", { id: "createLead" });
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Lead created successfully!", { id: "createLead" });
        setShowCreateModal(false);
        fetchLeads();
      } else {
        toast.error("Error creating lead", { id: "createLead" });
      }
    } catch {
      toast.error("Network error creating lead", { id: "createLead" });
    }
  };

  // Handle Add Activity Log
  const handleAddLog = async () => {
    if (!newLogText || !selectedLead) return;
    const newLog = {
      id: "log-" + Date.now(),
      type: logType,
      content: newLogText,
      author: "Sarah Jenkins",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    const updatedLogs = [...(selectedLead.logs || []), newLog];
    const updatedLead = { ...selectedLead, logs: updatedLogs };

    setSelectedLead(updatedLead);
    setLeads(leads.map((l) => ((l._id || l.id) === (selectedLead._id || selectedLead.id) ? updatedLead : l)));
    setNewLogText("");

    try {
      await fetch(`/api/leads/${selectedLead._id || selectedLead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs: updatedLogs }),
      });
      toast.success("Activity log added");
    } catch {
      toast.error("Failed to save log");
    }
  };

  // Export CSV Helper
  const handleExportCSV = () => {
    const headers = ["Title", "Contact", "Email", "Phone", "Company", "Value", "Status", "Priority", "Source"];
    const rows = filteredLeads.map((l) => [
      `"${l.title}"`,
      `"${l.contactName}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.companyName}"`,
      l.value,
      l.status,
      l.priority,
      `"${l.source}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orbit360_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported leads to CSV!");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Visual Sales Pipeline & CRM</h1>
          <p className="text-xs text-slate-400 mt-1">
            Drag-and-drop deal cards, record calls/notes, and track conversion rates across rep buckets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ButtonRipple onClick={handleExportCSV} variant="secondary" size="md">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </ButtonRipple>
          <ButtonRipple onClick={() => setShowCreateModal(true)} variant="primary" size="md">
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </ButtonRipple>
        </div>
      </div>

      {/* Control Bar: Search, Filters, View Mode Toggle */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          <button
            onClick={() => setViewMode("kanban")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === "kanban" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <KanbanIcon className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === "table" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === "kanban" ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
            {STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter((l) => l.status === stage.id);
              const stageTotal = stageLeads.reduce((sum, l) => sum + (l.value || 0), 0);

              return (
                <div key={stage.id} className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3 min-w-[260px] flex flex-col h-[680px]">
                  {/* Stage Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${stage.color}`}>
                        {stage.title}
                      </span>
                      <span className="text-xs font-bold text-slate-400 font-mono">({stageLeads.length})</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">${stageTotal.toLocaleString()}</span>
                  </div>

                  {/* Droppable Stage Column */}
                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 overflow-y-auto space-y-3 pr-1 transition-colors ${
                          snapshot.isDraggingOver ? "bg-slate-900/40 rounded-xl" : ""
                        }`}
                      >
                        {stageLeads.map((lead, index) => (
                          <Draggable key={lead._id || lead.id} draggableId={lead._id || lead.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => setSelectedLead(lead)}
                                className={`p-4 rounded-xl border bg-slate-900/90 hover:border-emerald-500/60 transition-all cursor-pointer shadow-lg ${
                                  snapshot.isDragging ? "rotate-2 scale-105 border-emerald-400 z-50 shadow-2xl" : "border-slate-800"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                                    {lead.source}
                                  </span>
                                  <span
                                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                      lead.priority === "URGENT"
                                        ? "bg-rose-500/20 text-rose-400"
                                        : lead.priority === "HIGH"
                                        ? "bg-amber-500/20 text-amber-400"
                                        : "bg-slate-800 text-slate-400"
                                    }`}
                                  >
                                    {lead.priority}
                                  </span>
                                </div>

                                <h4 className="text-xs font-extrabold text-white leading-snug mb-1">{lead.title}</h4>
                                <p className="text-[11px] text-slate-400 truncate mb-3">{lead.companyName} • {lead.contactName}</p>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                                  <span className="font-mono font-bold text-emerald-400">${(lead.value || 0).toLocaleString()}</span>
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <User className="w-3 h-3 text-slate-500" />
                                    <span className="text-[10px] truncate max-w-[80px]">{lead.assignedToName?.split(" ")[0]}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      ) : (
        /* Table View */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-4">Deal Title</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Company</th>
                <th className="p-4">Value</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredLeads.map((lead) => (
                <tr key={lead._id || lead.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-4 font-bold text-white">{lead.title}</td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-200">{lead.contactName}</p>
                    <span className="text-[10px] text-slate-400">{lead.email}</span>
                  </td>
                  <td className="p-4">{lead.companyName}</td>
                  <td className="p-4 font-mono font-bold text-emerald-400">${(lead.value || 0).toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 border border-slate-800 text-cyan-400">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-amber-400">
                      {lead.priority}
                    </span>
                  </td>
                  <td className="p-4">{lead.assignedToName}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/20 text-[11px]"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Details Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-slate-950 border-l border-slate-800 h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {selectedLead.source}
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">{selectedLead.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 block">Contact Name</span>
                  <p className="text-xs font-bold text-white">{selectedLead.contactName}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Company Name</span>
                  <p className="text-xs font-bold text-white">{selectedLead.companyName}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Email & Phone</span>
                  <p className="text-xs font-bold text-emerald-400">{selectedLead.email}</p>
                  <p className="text-xs text-slate-300">{selectedLead.phone}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Deal Value</span>
                  <p className="text-sm font-mono font-black text-emerald-400">${(selectedLead.value || 0).toLocaleString()}</p>
                </div>
              </div>

              {/* Omnichannel Communication & Activity Log Stream */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Activity Logs & Omnichannel Timeline</h4>

                {/* Add Log Form */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    {["CALL", "EMAIL", "WHATSAPP", "NOTE"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setLogType(t)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          logType === t
                            ? "bg-emerald-500 text-slate-950"
                            : "bg-slate-950 text-slate-400 border border-slate-800"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Record call summary, email response, or client note..."
                    value={newLogText}
                    onChange={(e) => setNewLogText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <ButtonRipple onClick={handleAddLog} size="sm" className="w-full">
                    <span>Log Activity</span>
                  </ButtonRipple>
                </div>

                {/* Logs Stream */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {(selectedLead.logs || []).map((log: any, idx: number) => (
                    <div key={log.id || idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-emerald-400">{log.type}</span>
                        <span>{log.timestamp} • {log.author}</span>
                      </div>
                      <p className="text-slate-200">{log.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Assigned Rep: {selectedLead.assignedToName}</span>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-bold text-white hover:bg-slate-800"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Lead Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-lg font-black text-white">Create New CRM Deal</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deal Title</label>
                <input
                  type="text"
                  required
                  placeholder="Enterprise CRM Installation"
                  value={newLeadForm.title}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Michael Chang"
                    value={newLeadForm.contactName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Apex Tech Corp"
                    value={newLeadForm.companyName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, companyName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="mchang@apextech.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+1 (555) 234-5678"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deal Value ($)</label>
                  <input
                    type="number"
                    required
                    value={newLeadForm.value}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, value: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Lead Source</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Facebook Lead Ads">Facebook Lead Ads</option>
                    <option value="IndiaMART">IndiaMART</option>
                    <option value="99acres">99acres</option>
                    <option value="WhatsApp Business">WhatsApp Business</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Custom API & Webhooks">Custom API & Webhooks</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <ButtonRipple type="submit" variant="primary" size="md">
                  <span>Create Lead</span>
                </ButtonRipple>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
