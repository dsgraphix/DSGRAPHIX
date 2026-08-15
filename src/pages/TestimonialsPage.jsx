import React from "react";
import { Quote } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { TESTIMONIALS, CLIENTS, STATS } from "@/lib/site-data";

export function TestimonialsPage() {
  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Client Words"
        title={<>DIRECT FEEDBACK FROM FOUNDERS <span className="text-[#FF6636]">& MARKETING LEADERS.</span></>}
        lead="Read how Paylane, Northloop, Aurelle, and Kite Labs partnered with DS-Graphix to launch products, refine identities, and scale campaign content."
      />

      {/* Testimonials Grid */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="brutalist-border bg-[#2A2A29] p-8 lg:p-10 flex flex-col justify-between hover:bg-white hover:text-[#2A2A29] transition-all duration-300 group"
              >
                <Quote className="h-12 w-12 text-[#FF6636] group-hover:text-[#2A2A29] mb-6" />
                <p className="font-display text-xl lg:text-2xl font-black uppercase leading-snug mb-8">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t-2 border-white/20 group-hover:border-[#2A2A29]/20 flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-black uppercase text-[#FF6636] group-hover:text-[#2A2A29]">{t.name}</div>
                    <div className="text-xs font-bold text-slate-300 group-hover:text-[#2A2A29] uppercase tracking-wider">{t.role}</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FF6636] uppercase">Verified Client</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Logos/Word Grid */}
      <section className="bg-[#2A2A29] py-20 border-b-2 border-white">
        <div className="container-page space-y-6">
          <div className="text-center">
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              Brands We've Built With
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {CLIENTS.map((c) => (
              <div
                key={c}
                className="brutalist-border bg-[#2A2A29] p-6 flex items-center justify-center font-display text-xl font-black uppercase text-white hover:bg-[#FF6636] hover:text-[#2A2A29] transition-colors"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS Strip */}
      <section className="bg-[#2A2A29] py-16 border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="brutalist-border p-6 text-center hover:bg-white hover:text-[#2A2A29] transition-colors group">
                <div className="font-display text-4xl lg:text-6xl font-black text-[#FF6636] group-hover:text-[#2A2A29]">{s.value}</div>
                <div className="text-xs font-black uppercase tracking-wider opacity-80 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
