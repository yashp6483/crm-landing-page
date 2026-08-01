import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Features } from "@/components/sections/Features";
import { Integrations } from "@/components/sections/Integrations";
import { WhyUs } from "@/components/sections/WhyUs";
import { ContactDemo } from "@/components/sections/ContactDemo";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursorGlow } from "@/components/ui/CustomCursorGlow";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden font-sans">
      <ScrollProgress />
      <CustomCursorGlow />
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <Integrations />
      <WhyUs />
      <ContactDemo />
      <Footer />
    </main>
  );
}
