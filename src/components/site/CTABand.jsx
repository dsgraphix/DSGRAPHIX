import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-data";

export function CTABand({
  eyebrow = "Start a project",
  title = <>BUILD YOUR <span className="text-[#FF6636] group-hover:text-[#2A2A29] transition-colors">BREAKTHROUGH.</span></>,
  body = "Tell us about your brand, your timeline and your goals. You'll hear back within 48 hours with a clear scope and a fixed price.",
}) {
  return (
    <section className="py-20 lg:py-32 border-t-2 border-white group relative overflow-hidden bg-[#2A2A29] text-white">
      <div className="container-page relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          {/* Left Column */}
          <div className="space-y-6 max-w-3xl">
            <div className="text-[#FF6636] group-hover:text-[#2A2A29] transition-colors font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              {eyebrow}
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-8xl font-black leading-[0.85] tracking-tighter uppercase group-hover:text-[#2A2A29] transition-colors duration-700">
              {title}
            </h2>
            <p className="text-base lg:text-xl text-[#F2F4F8] font-bold leading-relaxed max-w-xl group-hover:text-[#2A2A29] transition-colors">
              {body}
            </p>
          </div>

          {/* Right Column Action */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <Button
              asChild
              variant="brand"
              size="xl"
              className="w-full sm:w-auto group-hover:bg-[#2A2A29] group-hover:text-white group-hover:border-[#2A2A29] hover:!bg-white hover:!text-[#2A2A29] hover:!border-[#2A2A29] transition-all"
            >
              <Link to="/quote">
                Get a Quote
                <ArrowUpRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="w-full sm:w-auto group-hover:bg-[#2A2A29] group-hover:text-white group-hover:border-[#2A2A29] hover:!bg-white hover:!text-[#2A2A29] hover:!border-[#2A2A29] transition-all"
            >
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5 mr-1" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive Background Reveal (Desktop only) */}
      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.9,0,0.1,1)] hidden lg:block pointer-events-none" />
    </section>
  );
}
