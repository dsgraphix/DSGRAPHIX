import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, MessageCircle, Mail } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { FAQS, CONTACT, whatsappLink } from "@/lib/site-data";

export function FaqPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <div className="bg-[#2A2A29] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="FAQs"
        title={<>THE QUESTIONS WE GET <span className="text-[#FF6636]">BEFORE EVERY CALL.</span></>}
        lead="Clear, unvarnished answers about costs, timelines, file deliverables, and client collaboration."
      />

      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
            {/* Accordion List */}
            <div className="divide-y-2 divide-white/20 border-y-2 border-white">
              {FAQS.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={idx} className="py-2">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full py-6 flex items-center justify-between text-left font-display text-xl lg:text-2xl font-black uppercase text-white hover:text-[#FF6636] transition-colors group"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`h-6 w-6 text-[#FF6636] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-6 text-slate-300 font-bold text-base lg:text-lg leading-relaxed animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sticky Aside Panel */}
            <div className="sticky top-28 brutalist-border bg-[#2A2A29] p-8 space-y-6">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                Still Unsure?
              </span>
              <h3 className="font-display text-2xl font-black uppercase text-white">
                HAVE A SPECIFIC QUESTION ABOUT YOUR PROJECT?
              </h3>
              <p className="text-sm font-bold text-slate-300 leading-relaxed">
                Book a free 30-minute discovery call directly with Dhananjay Chalke. We'll clarify scope, timelines, and pricing on the spot.
              </p>

              <div className="space-y-4 pt-2">
                <Button asChild variant="brand" size="xl" className="w-full">
                  <Link to="/quote">
                    Get a Fixed Quote
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={whatsappLink()} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4 mr-1 text-[#FF6636]" />
                    Ask on WhatsApp
                  </a>
                </Button>
              </div>

              <div className="pt-4 border-t-2 border-white/20 text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#FF6636]" />
                <span>Or email {CONTACT.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
