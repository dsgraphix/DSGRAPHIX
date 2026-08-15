import React from "react";
import { MessageCircle, Quote } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS, whatsappLink } from "@/lib/site-data";

export function QuotePage() {
  const testimonial = TESTIMONIALS[0];

  const pricingAnchors = [
    { label: "Logo & Brand Identity", price: "From ₹85,000" },
    { label: "Product UI/UX Design", price: "From ₹1,80,000" },
    { label: "Monthly Creative Retainers", price: "From ₹45,000 / mo" },
  ];

  const nextSteps = [
    { step: "1", title: "48-Hour Response", desc: "We review your brief and check timeline alignment." },
    { step: "2", title: "30-Min Discovery Call", desc: "We clarify goals, technical requirements, and deliverables." },
    { step: "3", title: "Fixed-Price Proposal", desc: "You receive a written scope document with zero hidden fees." },
  ];

  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Get a quote"
        title={<>TELL US THE GOAL. WE'LL SEND <span className="text-[#FF6636]">SCOPE, TIMELINE & PRICE.</span></>}
        lead="Fill in the enquiry form below or chat on WhatsApp. Every quote is fixed-price with clear deliverables."
      />

      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-16 items-start">
            {/* Left: Lead Form */}
            <div className="space-y-4">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                Project Details
              </span>
              <LeadForm />
            </div>

            {/* Right: Sticky Reassurance Panel */}
            <div className="sticky top-28 space-y-8">
              {/* What happens next */}
              <div className="brutalist-border bg-[#2A2A29] p-6 lg:p-8 space-y-6">
                <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                  What Happens Next
                </span>
                <div className="space-y-6">
                  {nextSteps.map((s) => (
                    <div key={s.step} className="flex items-start gap-4">
                      <div className="h-8 w-8 bg-[#FF6636] text-[#2A2A29] font-display text-sm font-black flex items-center justify-center shrink-0 brutalist-border">
                        {s.step}
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-black uppercase text-white">{s.title}</h4>
                        <p className="text-xs font-bold text-slate-300 leading-relaxed mt-1">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing-from Anchors */}
              <div className="brutalist-border bg-[#2A2A29] p-6 space-y-4">
                <h4 className="font-display text-sm font-black uppercase tracking-wider text-[#FF6636]">
                  Engagement Starting Points
                </h4>
                <div className="space-y-3 text-sm divide-y-2 divide-white/20">
                  {pricingAnchors.map((p, idx) => (
                    <div key={idx} className="pt-3 flex items-center justify-between font-bold">
                      <span className="text-slate-200">{p.label}</span>
                      <span className="font-display font-black text-[#FF6636]">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className="brutalist-border bg-[#2A2A29] p-6 space-y-4">
                <Quote className="h-8 w-8 text-[#FF6636]" />
                <p className="text-sm font-bold italic text-slate-200 leading-relaxed uppercase">
                  "{testimonial.quote}"
                </p>
                <div className="text-xs font-black uppercase text-white">
                  — {testimonial.name}, <span className="text-[#FF6636]">{testimonial.role}</span>
                </div>
              </div>

              {/* WhatsApp direct CTA */}
              <div className="pt-2">
                <Button asChild variant="outline" size="xl" className="w-full">
                  <a href={whatsappLink("Hi DS-Graphix, I'd like a quick quote for my project.")} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2 text-[#FF6636]" />
                    Chat Directly on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
