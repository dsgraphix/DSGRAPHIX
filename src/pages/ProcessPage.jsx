import React from "react";
import { CheckCircle2, MessageSquareCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { WorkProcedure } from "@/components/site/WorkProcedure";
import { PROCESS } from "@/lib/site-data";

export function ProcessPage() {
  const whatYouGet = [
    "Written project brief & agreed success criteria",
    "Weekly review calls and async progress walkthroughs",
    "Developer-ready Figma design systems with tokens",
    "Full-resolution export assets in all required formats",
    "Comprehensive brand guidelines and usage rules",
    "Final walkthrough session and asset handoff",
  ];

  const whatWeNeed = [
    "Direct access to key decision-maker (founder/product lead)",
    "Timely feedback within 48 hours during milestone reviews",
    "Clear brand assets, domain access, or reference materials",
    "Honest feedback on initial direction before fine detailing",
  ];

  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="How we work"
        title={<>A TRANSPARENT, STRUCTURED <span className="text-[#FF6636]">DELIVERY PROCESS.</span></>}
        lead="No surprises, no hidden meters. Every project follows a clear 5-step roadmap built to protect your timeline and guarantee commercial quality."
      />

      <WorkProcedure />

      {/* Vertical Timeline */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page max-w-4xl">
          <div className="relative pl-8 sm:pl-12 space-y-10 sm:space-y-12 border-l-4 border-[#FF6636]">
            {PROCESS.map((p) => (
              <div key={p.step} className="relative group">
                <div className="absolute -left-[41px] sm:-left-[55px] top-1.5 h-8 w-8 bg-[#FF6636] text-[#2A2A29] brutalist-border flex items-center justify-center font-display text-xs font-black">
                  {p.step}
                </div>

                <div className="brutalist-border bg-[#2A2A29] p-5 sm:p-8 space-y-3 sm:space-y-4 hover:bg-white hover:text-[#2A2A29] transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl sm:text-2xl font-black uppercase">
                      {p.title}
                    </h3>
                    <span className="font-display text-xs font-black uppercase tracking-widest text-[#FF6636] group-hover:text-[#2A2A29] shrink-0 ml-3">
                      Phase {p.step}
                    </span>
                  </div>
                  <p className="text-slate-300 group-hover:text-[#2A2A29] text-sm sm:text-base font-bold leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expectations Grid */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* What you always get */}
            <div className="brutalist-border bg-[#2A2A29] p-8 lg:p-10 space-y-6">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                Our Commitment
              </span>
              <h3 className="font-display text-3xl font-black uppercase text-white">
                What you always get
              </h3>
              <div className="space-y-4">
                {whatYouGet.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm font-bold text-slate-200">
                    <CheckCircle2 className="h-5 w-5 text-[#FF6636] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What we need from you */}
            <div className="brutalist-border bg-[#2A2A29] p-8 lg:p-10 space-y-6">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                Client Alignment
              </span>
              <h3 className="font-display text-3xl font-black uppercase text-white">
                What we need from you
              </h3>
              <div className="space-y-4">
                {whatWeNeed.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm font-bold text-slate-200">
                    <MessageSquareCheck className="h-5 w-5 text-[#FF6636] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
