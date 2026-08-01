import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbit 360 | Unified 360° CRM, HRMS & GST Billing Platform",
  description: "Converge intelligent Lead Pipelines, automated HRMS workflows, and GST-compliant Invoicing into a single high-performance cockpit.",
  keywords: ["CRM", "HRMS", "GST Invoicing", "Lead Management", "Orbit 360", "SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070b14] text-slate-100">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
