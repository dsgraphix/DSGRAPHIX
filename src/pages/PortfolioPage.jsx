import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES } from "@/lib/site-data";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);

  // Lock background scrolling and halt Lenis smooth scroll while project modal is open
  useModalScrollLock(!!selectedCase);

  const categories = ["All", "UI/UX", "Branding", "Graphic", "Video"];

  const filteredCases =
    activeCategory === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === activeCategory);

  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Selected Work"
        title={<>PROJECTS MEASURED IN <span className="text-[#FF6636]">OUTCOMES, NOT AWARDS.</span></>}
        lead="Explore our portfolio of product UI/UX redesigns, brand identity systems, social creative engines, and motion launch films."
      />

      {/* Filter Row */}
      <section className="bg-[#2A2A29] py-8 border-b-2 border-white">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-none font-display text-xs font-black uppercase tracking-wider transition-all brutalist-border ${
                    isActive
                      ? "bg-[#FF6636] text-[#2A2A29]"
                      : "bg-[#2A2A29] text-white hover:bg-white hover:text-[#2A2A29]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((cs) => (
              <div
                key={cs.slug}
                onClick={() => setSelectedCase(cs)}
                className="group cursor-pointer brutalist-border bg-[#2A2A29] hover:bg-[#FF6636] hover:text-[#2A2A29] transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden border-b-2 border-white grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img
                      src={cs.image}
                      alt={cs.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#2A2A29] text-white brutalist-border font-display text-xs font-black uppercase tracking-wider">
                      {cs.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-xs font-black text-[#FF6636] group-hover:text-[#2A2A29] uppercase tracking-wider">
                      Client: {cs.client}
                    </p>
                    <h3 className="font-display text-2xl font-black uppercase leading-tight">
                      {cs.title}
                    </h3>
                    <p className="text-sm font-bold opacity-80 line-clamp-2">
                      {cs.excerpt}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t-2 border-white/20 group-hover:border-[#2A2A29]/20 mt-4 flex items-center justify-between text-xs font-black uppercase tracking-wider">
                  <span className="text-[#FF6636] group-hover:text-[#2A2A29]">{cs.result}</span>
                  <span className="group-hover:underline">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Dialog Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2A29]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedCase(null)}
            aria-hidden="true"
          />
          <div data-lenis-prevent="true" className="relative w-full max-w-3xl max-h-[90vh] bg-[#2A2A29] text-white brutalist-border overflow-y-auto overscroll-contain z-10 p-6 lg:p-10 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-white pb-4">
              <div>
                <span className="px-3 py-1 bg-[#FF6636] text-[#2A2A29] font-display text-xs font-black uppercase tracking-wider">
                  {selectedCase.category}
                </span>
                <span className="ml-4 text-xs font-black text-slate-300 uppercase tracking-wider">
                  Client: {selectedCase.client}
                </span>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 brutalist-border text-white hover:bg-white hover:text-[#2A2A29]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-16/9 brutalist-border overflow-hidden bg-slate-800">
              <img
                src={selectedCase.image}
                alt={selectedCase.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight">
                {selectedCase.title}
              </h2>
              <p className="text-slate-300 text-base font-bold leading-relaxed">
                {selectedCase.excerpt}
              </p>

              <div className="brutalist-border bg-[#FF6636] text-[#2A2A29] p-5 flex items-center gap-4">
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                <div>
                  <div className="text-xs font-black uppercase tracking-wider">Verified Outcome</div>
                  <div className="font-display text-xl font-black">{selectedCase.result}</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button asChild variant="brand" size="xl" className="w-full sm:w-auto">
                <Link to="/quote" onClick={() => setSelectedCase(null)}>
                  Start a Similar Project
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setSelectedCase(null)}
                className="w-full sm:w-auto"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      <CTABand />
    </div>
  );
}
