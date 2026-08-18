import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/site-data";

export function ServicesIndexPage() {
  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Services"
        title={<>FOUR DISCIPLINES, <span className="text-[#FF6636]">ONE ACCOUNTABLE TEAM.</span></>}
        lead="We partner with growing businesses to engineer user interfaces, craft brand identity systems, produce campaign creatives, and edit high-impact video."
      />

      <div className="divide-y-2 divide-white">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <section
              key={service.slug}
              className={`section-y ${isEven ? "bg-[#2A2A29]" : "bg-[#252524]"}`}
            >
              <div className="container-page">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}>
                  {/* Text Block */}
                  <div className={`space-y-6 ${isEven ? "" : "lg:col-start-2"}`}>
                    <span className="inline-block px-4 py-1 bg-[#FF6636] text-[#2A2A29] text-xs font-black uppercase tracking-wider">
                      Service #0{index + 1}
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-slate-300 font-bold text-base leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Deliverables checklist */}
                    <div className="pt-2">
                      <h4 className="font-display text-xs font-black uppercase tracking-widest text-[#FF6636] mb-4">
                        Key Deliverables Include:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-bold text-slate-200">
                        {service.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#FF6636] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcome Stats */}
                    <div className="pt-6 grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 border-t-2 border-white/20">
                      {service.outcomes.map((out, idx) => (
                        <div key={idx}>
                          <div className="font-display text-2xl sm:text-3xl font-black text-[#FF6636]">
                            {out.value}
                          </div>
                          <div className="text-xs text-slate-400 font-black uppercase tracking-wider line-clamp-1 mt-1">
                            {out.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Button asChild variant="brand" size="lg">
                        <Link to={service.to}>
                          See Service Details
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Image Block */}
                  <div className={`brutalist-border overflow-hidden bg-[#2A2A29] aspect-4/3 grayscale hover:grayscale-0 transition-all duration-700 ${
                    isEven ? "" : "lg:col-start-1"
                  }`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CTABand />
    </div>
  );
}
