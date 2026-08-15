import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { SERVICES, CASE_STUDIES, PROCESS } from "@/lib/site-data";

export function ServiceDetailPage() {
  const { slug } = useParams();

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const categoryMap = {
    "ui-ux-design": "UI/UX",
    "brand-identity": "Branding",
    "graphic-design": "Graphic",
    "video-production": "Video",
  };

  const currentCategory = categoryMap[slug] || "UI/UX";
  const relatedCases = CASE_STUDIES.filter((c) => c.category === currentCategory);
  const otherServices = SERVICES.filter((s) => s.slug !== slug);

  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Service Detail"
        title={<><span className="text-[#FF6636]">{service.title}</span></>}
        lead={service.summary}
      />

      {/* Hero Image */}
      <section className="bg-[#2A2A29] py-12 border-b-2 border-white">
        <div className="container-page">
          <div className="brutalist-border overflow-hidden bg-[#2A2A29] aspect-21/9 max-h-[500px]">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Deliverables Grid (6 items, Kombai Service #01 badges) */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              Deliverables
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
              WHAT YOU RECEIVE WITH <span className="text-[#FF6636]">EVERY ENGAGEMENT.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="brutalist-border bg-[#2A2A29] p-8 flex flex-col justify-between hover:bg-white hover:text-[#2A2A29] transition-all duration-500 group min-h-[220px]"
              >
                <div className="space-y-4">
                  <span className="inline-block px-4 py-1 bg-[#FF6636] text-[#2A2A29] text-xs font-black uppercase tracking-wider">
                    Deliverable #0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase leading-snug group-hover:text-[#2A2A29]">
                    {item}
                  </h3>
                </div>
                <div className="pt-6 mt-6 border-t-2 border-white/20 group-hover:border-[#2A2A29]/20 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF6636] group-hover:text-[#2A2A29]">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Production Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Strip */}
      <section className="bg-[#2A2A29] py-20 border-b-2 border-white">
        <div className="container-page">
          <div className="max-w-xl mb-12 space-y-2">
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              Commercial Impact
            </span>
            <h3 className="font-display text-3xl font-black uppercase text-white tracking-tight">
              Average outcomes achieved for clients:
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {service.outcomes.map((out, idx) => (
              <div key={idx} className="brutalist-border bg-[#2A2A29] p-8 text-center hover:bg-white hover:text-[#2A2A29] transition-all duration-300 group">
                <div className="font-display text-5xl lg:text-7xl font-black text-[#FF6636] group-hover:text-[#2A2A29] tracking-tighter">
                  {out.value}
                </div>
                <div className="text-sm font-black uppercase tracking-wider mt-3 opacity-90">
                  {out.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Condensed Process */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              How We Execute
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              THE {service.title} <span className="text-[#FF6636]">WORKFLOW.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {PROCESS.map((p) => (
              <div key={p.step} className="brutalist-border bg-[#2A2A29] p-6 space-y-3 hover:bg-white hover:text-[#2A2A29] transition-colors group">
                <div className="font-display text-sm font-black text-[#FF6636] group-hover:text-[#2A2A29]">STEP {p.step}</div>
                <div className="font-display text-xl font-black uppercase">{p.title}</div>
                <div className="text-xs font-bold opacity-80 leading-relaxed">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Work */}
      {relatedCases.length > 0 && (
        <section className="bg-[#2A2A29] section-y border-b-2 border-white">
          <div className="container-page">
            <div className="max-w-2xl mb-12 space-y-3">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                Case Studies
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white">
                RECENT {service.title} <span className="text-[#FF6636]">WORK.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedCases.map((cs) => (
                <div key={cs.slug} className="brutalist-border bg-[#2A2A29] p-8 space-y-4 hover:bg-[#FF6636] hover:text-[#2A2A29] transition-all duration-500 group">
                  <div className="aspect-16/9 brutalist-border overflow-hidden bg-slate-800 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs font-black uppercase text-[#FF6636] group-hover:text-[#2A2A29]">{cs.client}</div>
                  <h3 className="font-display text-2xl font-black uppercase leading-snug">{cs.title}</h3>
                  <p className="text-sm font-bold opacity-80">{cs.excerpt}</p>
                  <div className="text-sm font-black text-[#FF6636] group-hover:text-[#2A2A29]">{cs.result}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              Explore Further
            </span>
            <h3 className="font-display text-3xl font-black uppercase text-white">
              OTHER AGENCY DISCIPLINES
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={s.to}
                className="brutalist-border bg-[#2A2A29] p-6 hover:bg-white hover:text-[#2A2A29] transition-colors group space-y-3"
              >
                <div className="font-display text-xl font-black uppercase flex items-center justify-between">
                  <span>{s.title}</span>
                  <ArrowUpRight className="h-5 w-5 text-[#FF6636] group-hover:text-[#2A2A29]" />
                </div>
                <p className="text-xs font-bold opacity-80 line-clamp-2">{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={<>READY TO START YOUR <span className="text-[#FF6636] group-hover:text-[#2A2A29]">{service.title}</span> PROJECT?</>}
        body="Reach out today for a discovery call and a written proposal within 48 hours."
      />
    </div>
  );
}
