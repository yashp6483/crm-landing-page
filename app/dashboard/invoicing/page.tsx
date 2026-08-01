"use client";

import React, { useState, useEffect } from "react";
import { Receipt, Plus, Download, CreditCard, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { ButtonRipple } from "@/components/ui/ButtonRipple";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function InvoicingPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Form state
  const [clientName, setClientName] = useState("Apex Tech Corp");
  const [clientEmail, setClientEmail] = useState("mchang@apextech.com");
  const [clientGstin, setClientGstin] = useState("07AAAAA0000A1Z5");
  const [taxType, setTaxType] = useState<"INTRA_STATE" | "INTER_STATE">("INTRA_STATE");
  const [itemDesc, setItemDesc] = useState("Orbit 360 Enterprise Software License (100 Reps)");
  const [itemQty, setItemQty] = useState(1);
  const [itemPrice, setItemPrice] = useState(14500);
  const [dueDate, setDueDate] = useState("2026-08-30");

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/invoices");
      const data = await res.json();
      if (data.success) setInvoices(data.data);
    } catch {
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Generate & Download PDF
  const handleDownloadPDF = (invoice: any) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.setTextColor(16, 185, 129); // Emerald
      doc.text("ORBIT 360 TAX INVOICE", 14, 20);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Invoice No: ${invoice.invoiceNumber}`, 14, 28);
      doc.text(`Date: ${invoice.createdAt ? invoice.createdAt.substring(0, 10) : "2026-08-01"}`, 14, 34);
      doc.text(`Due Date: ${invoice.dueDate}`, 14, 40);

      doc.text(`Billed To: ${invoice.clientName}`, 120, 28);
      doc.text(`GSTIN: ${invoice.clientGstin || "N/A"}`, 120, 34);
      doc.text(`Email: ${invoice.clientEmail}`, 120, 40);

      const tableData = (invoice.items || []).map((item: any) => [
        item.description,
        item.hsnCode || "998313",
        item.quantity,
        `$${item.unitPrice}`,
        `$${item.quantity * item.unitPrice}`,
      ]);

      autoTable(doc, {
        startY: 50,
        head: [["Item Description", "HSN Code", "Qty", "Unit Price", "Total Amount"]],
        body: tableData,
        headStyles: { fillColor: [16, 185, 129] },
      });

      const finalY = (doc as any).lastAutoTable.finalY || 80;
      doc.text(`Subtotal: $${invoice.subtotal}`, 140, finalY + 10);
      if (invoice.taxType === "INTER_STATE") {
        doc.text(`IGST (18%): $${invoice.igstAmount}`, 140, finalY + 16);
      } else {
        doc.text(`CGST (9%): $${invoice.cgstAmount}`, 140, finalY + 16);
        doc.text(`SGST (9%): $${invoice.sgstAmount}`, 140, finalY + 22);
      }
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`TOTAL AMOUNT: $${invoice.total}`, 140, finalY + 30);

      doc.save(`${invoice.invoiceNumber}.pdf`);
      toast.success(`Downloaded ${invoice.invoiceNumber}.pdf`);
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  // Submit Invoice Creation
  const handleCreateInvoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.loading("Generating GST-compliant invoice...", { id: "inv" });
      const payload = {
        clientName,
        clientEmail,
        clientGstin,
        taxType,
        items: [{ description: itemDesc, quantity: itemQty, unitPrice: itemPrice, hsnCode: "998313" }],
        dueDate,
      };

      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("GST Invoice generated successfully!", { id: "inv" });
        setShowCreateModal(false);
        fetchInvoices();
      } else {
        toast.error("Failed to create invoice", { id: "inv" });
      }
    } catch {
      toast.error("Network error creating invoice", { id: "inv" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">GST Invoicing & Financial Billing</h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated CGST/SGST/IGST tax calculation, Stripe & Razorpay payment links, and instant PDF generation.
          </p>
        </div>

        <ButtonRipple onClick={() => setShowCreateModal(true)} variant="primary" size="md">
          <Plus className="w-4 h-4" />
          <span>Create GST Invoice</span>
        </ButtonRipple>
      </div>

      {/* Invoice Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Client Details</th>
              <th className="p-4">GSTIN & Tax Type</th>
              <th className="p-4">Subtotal</th>
              <th className="p-4">GST Tax</th>
              <th className="p-4">Total Payable</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {invoices.map((inv) => (
              <tr key={inv._id || inv.invoiceNumber} className="hover:bg-slate-900/60 transition-colors">
                <td className="p-4 font-mono font-bold text-white">{inv.invoiceNumber}</td>
                <td className="p-4">
                  <p className="font-bold text-white">{inv.clientName}</p>
                  <span className="text-[10px] text-slate-400">{inv.clientEmail}</span>
                </td>
                <td className="p-4">
                  <span className="text-[11px] font-mono text-slate-300 block">{inv.clientGstin || "N/A"}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                    {inv.taxType}
                  </span>
                </td>
                <td className="p-4 font-mono">${inv.subtotal}</td>
                <td className="p-4 font-mono text-amber-400 font-bold">
                  ${inv.taxType === "INTER_STATE" ? inv.igstAmount : (inv.cgstAmount + inv.sgstAmount)}
                </td>
                <td className="p-4 font-mono text-emerald-400 font-bold text-sm">${inv.total}</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      inv.status === "PAID"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-right flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleDownloadPDF(inv)}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Download PDF Invoice"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <a
                    href={inv.paymentLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 hover:bg-slate-800 transition-colors"
                    title="Payment Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-black text-white mb-4">Generate GST Tax Invoice</h3>
            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client Email</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client GSTIN</label>
                  <input
                    type="text"
                    required
                    value={clientGstin}
                    onChange={(e) => setClientGstin(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GST Tax Type</label>
                  <select
                    value={taxType}
                    onChange={(e) => setTaxType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="INTRA_STATE">CGST 9% + SGST 9% (Intra-state)</option>
                    <option value="INTER_STATE">IGST 18% (Inter-state)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Line Item Description</label>
                <input
                  type="text"
                  required
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    value={itemQty}
                    onChange={(e) => setItemQty(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Unit Price ($)</label>
                  <input
                    type="number"
                    required
                    value={itemPrice}
                    onChange={(e) => setItemPrice(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <ButtonRipple type="submit" variant="primary" size="md">
                  <span>Generate Invoice</span>
                </ButtonRipple>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
