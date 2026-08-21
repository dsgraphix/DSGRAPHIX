import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Quote, ArrowUpRight, MessageCircle, Layers, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroAbstract from "@/assets/hero-abstract.jpg";
import logoImg from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/site/CTABand";
import { WorkProcedure } from "@/components/site/WorkProcedure";
import { SERVICES, CASE_STUDIES as FALLBACK_CASES, PROCESS, STATS, CLIENTS, TESTIMONIALS, whatsappLink } from "@/lib/site-data";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { initScrollReveals, initHeroEntrance, isReducedMotion } from "@/lib/motion";
import { InstagramCarousel } from "@/components/site/InstagramCarousel";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

export function HomePage() {
  const [featuredCases, setFeaturedCases] = useState(() => {
    try {
      const cached = sessionStorage.getItem("dsg_cached_projects");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 4);
        }
      }
    } catch (_) {}
    return FALLBACK_CASES.slice(0, 4);
  });
  const [selectedCase, setSelectedCase] = useState(null);
  const featuredTestimonial = TESTIMONIALS[0];

  // Lock background scroll when case preview modal is open
  useModalScrollLock(!!selectedCase);

  const pageRef = useRef(null);
  const heroContainerRef = useRef(null);
  const heroEyebrowRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const heroLeadRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroImageRef = useRef(null);
  const diagonalStripRef = useRef(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            setFeaturedCases(json.data.slice(0, 4));
            try {
              sessionStorage.setItem("dsg_cached_projects", JSON.stringify(json.data));
            } catch (_) {}
          }
        }
      } catch (err) {
        console.warn("API offline, rendering fallback case studies for homepage.");
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const heroCleanup = initHeroEntrance({
      container: heroContainerRef.current,
      eyebrow: heroEyebrowRef.current,
      headline: heroHeadlineRef.current,
      lead: heroLeadRef.current,
      cta: heroCtaRef.current,
      image: heroImageRef.current,
    });

    const revealCleanup = initScrollReveals(pageRef.current);

    return () => {
      heroCleanup();
      revealCleanup();
    };
  }, []);

  return (
    <div ref={pageRef} className="space-y-0 bg-[#2A2A29] text-white">
      {/* 1. Hero Section */}
      <section ref={heroContainerRef} className="bg-[#2A2A29] min-h-[85vh] pt-8 pb-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden border-b-2 border-white">
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 relative">
              <div ref={heroEyebrowRef} className="inline-flex items-center gap-2 px-3.5 py-1.5 brutalist-border bg-white/5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#FF6636] animate-pulse" />
                <span className="text-[#FF6636] font-bold uppercase tracking-[0.2em] text-xs sm:text-sm">
                  Full-Service Creative & Digital Studio
                </span>
              </div>

              <div>
                <h1 ref={heroHeadlineRef} className="font-display text-[clamp(2.5rem,5.5vw,5.2rem)] font-black leading-[0.95] uppercase tracking-tighter text-white">
                  Design that makes your brand{" "}
                  <span className="text-[#FF6636] block sm:inline">impossible to ignore.</span>
                </h1>
              </div>

              <p ref={heroLeadRef} className="text-sm sm:text-xl text-[#F2F4F8] font-semibold leading-relaxed max-w-xl border-l-4 border-[#FF6636] pl-4 sm:pl-5">
                We engineer digital products, craft brand identity systems, and produce platform-native content for fast-growing companies worldwide.
              </p>

              <div ref={heroCtaRef} className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild variant="brand" size="xl">
                  <Link to="/quote">
                    Get a Quote
                    <ArrowRight className="h-5 w-5 ml-1 shrink-0" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/portfolio">
                    View Selected Work
                  </Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t-2 border-white/20 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs font-black text-slate-300 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#FF6636]" />
                  48-hour response
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#FF6636]" />
                  Fixed-price scopes
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#FF6636]" />
                  Source files included
                </span>
              </div>
            </div>

            {/* Right Graphic Frame Showcase */}
            <div ref={heroImageRef} className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="brutalist-border overflow-hidden bg-[#1E1E1D] p-6 sm:p-8 space-y-6 relative group shadow-2xl">
                {/* Visual Header Banner with Logo Container */}
                <div data-reveal-image className="relative aspect-4/3 rounded bg-white p-6 brutalist-border flex flex-col items-center justify-center shadow-inner overflow-hidden">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden bg-white shadow-xl flex items-center justify-center p-1 border-2 border-[#2A2A29] transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={logoImg}
                      alt="DS-Graphix Studio Logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#2A2A29] text-white font-display text-[11px] font-black uppercase tracking-wider brutalist-border">
                    DS-GRAPHIX STUDIO
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#FF6636] text-[#2A2A29] font-display text-[11px] font-black uppercase tracking-wider brutalist-border">
                    250+ DELIVERED
                  </div>
                </div>

                {/* Outcome Quick Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="brutalist-border p-4 bg-[#2A2A29] text-white">
                    <div className="text-[#FF6636] font-display font-black text-2xl tracking-tighter">+52% LIFT</div>
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-1">Conversion Rate</div>
                  </div>
                  <div className="brutalist-border p-4 bg-[#2A2A29] text-white">
                    <div className="text-white font-display font-black text-2xl tracking-tighter">2X FASTER</div>
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-1">Dev Handoff</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Client Diagonal Marquee Strip */}
      <div className="relative z-20 py-12 md:py-16 overflow-hidden">
        <section
          ref={diagonalStripRef}
          className="diagonal-strip bg-[#FF6636] border-y-4 border-white py-6 md:py-8"
        >
          <div className="flex whitespace-nowrap animate-marquee font-display font-black uppercase text-3xl md:text-6xl text-[#2A2A29]">
            {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, idx) => (
              <span key={`${client}-${idx}`} className="mx-8 flex items-center gap-4">
                <span>{client}</span>
                <span className="text-white">•</span>
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* 3. Stats Grid */}
      <section className="bg-[#2A2A29] py-20 border-b-2 border-white">
        <div className="container-page">
          <div data-reveal-grid className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { target: 250, suffix: "+", label: "Delivered Projects" },
              { target: 99, suffix: "%", label: "Client Satisfaction" },
              { target: 14, suffix: "+", label: "Countries Reached" },
              { target: 5, suffix: ".0★", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} data-reveal-item className="brutalist-border p-6 sm:p-8 bg-[#2A2A29] hover:bg-white hover:text-[#2A2A29] transition-all duration-300 group">
                <div className="font-display text-4xl sm:text-6xl font-black text-[#FF6636] group-hover:text-[#2A2A29] transition-colors tracking-tighter">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold uppercase tracking-wider mt-2 opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services Cluster Overview */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                What We Do
              </span>
              <h2 data-reveal="header" className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.9] uppercase tracking-tighter text-white">
                THE SERVICE <span className="text-[#FF6636]">CLUSTER</span>
              </h2>
            </div>
            <p className="font-bold text-base sm:text-xl text-[#FF6636] max-w-sm italic">
              Tangible commercial outcomes for high-stakes digital products.
            </p>
          </div>

          <div data-reveal-grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={service.slug}
                data-reveal-item
                className="brutalist-border bg-[#2A2A29] p-8 flex flex-col justify-between hover:bg-white hover:text-[#2A2A29] transition-all duration-500 group min-h-[380px]"
              >
                <div className="space-y-6">
                  <span className="inline-block px-4 py-1 bg-[#FF6636] text-[#2A2A29] text-xs font-black uppercase tracking-wider">
                    Service #0{index + 1}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-none group-hover:text-[#2A2A29]">
                    {service.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-300 group-hover:text-[#2A2A29] leading-relaxed">
                    {service.short}
                  </p>
                </div>
                <div className="pt-6 border-t-2 border-white/20 group-hover:border-[#2A2A29]/20">
                  <Link
                    to={service.to}
                    className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#FF6636] group-hover:text-[#2A2A29]"
                  >
                    Explore Service <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Selected Work (Cases Teaser) */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                Selected Work
              </span>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.9] uppercase tracking-tighter text-white">
                PROJECTS MEASURED IN <span className="text-[#FF6636]">OUTCOMES.</span>
              </h2>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/portfolio">
                View All Work
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCases.map((cs) => {
              const caseImages = cs.images && cs.images.length > 0 ? cs.images : (cs.image ? [cs.image] : []);
              const hasMultipleImages = caseImages.length > 1;

              return (
                <div
                  key={cs.id || cs.slug}
                  onClick={() => setSelectedCase(cs)}
                  className="brutalist-border bg-[#2A2A29] hover:bg-[#FF6636] hover:text-[#2A2A29] transition-all duration-300 group overflow-hidden flex flex-col justify-between cursor-pointer select-none"
                >
                  <div>
                    <div className="relative aspect-16/10 overflow-hidden border-b-2 border-white grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img
                        src={cs.image || caseImages[0]}
                        alt={cs.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = '/assets/fintech_app.png';
                        }}
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-[#2A2A29] text-white brutalist-border font-display text-xs font-black uppercase tracking-wider">
                        {cs.category}
                      </span>
                      {hasMultipleImages && (
                        <span className="absolute top-4 right-4 px-2 py-1 bg-[#2A2A29]/90 backdrop-blur-md text-white brutalist-border font-mono text-[11px] font-bold flex items-center gap-1">
                          <Layers className="h-3 w-3 text-[#FF6636]" />
                          {caseImages.length}
                        </span>
                      )}
                    </div>
                    <div className="p-8 space-y-4">
                      <p className="text-xs font-black uppercase tracking-widest text-[#FF6636] group-hover:text-[#2A2A29]">
                        Client: {cs.client}
                      </p>
                      <h3 className="font-display text-2xl font-black uppercase leading-snug">
                        {cs.title}
                      </h3>
                      <p className="text-sm font-bold text-slate-300 group-hover:text-[#2A2A29] line-clamp-2">
                        {cs.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-8 pt-0 flex items-center justify-between text-xs font-black uppercase tracking-wider">
                    <span className="text-[#FF6636] group-hover:text-[#2A2A29] font-display text-sm">{cs.result}</span>
                    <span className="inline-flex items-center gap-1 group-hover:underline">
                      {hasMultipleImages ? `View Gallery (${caseImages.length})` : 'View Details'} <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Detail Dialog Modal with Instagram-Style Carousel */}
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
                className="p-1.5 brutalist-border text-white hover:bg-white hover:text-[#2A2A29] cursor-pointer"
                title="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Instagram-Style Image Carousel */}
            <div className="brutalist-border overflow-hidden bg-black shadow-2xl">
              <InstagramCarousel
                images={selectedCase.images && selectedCase.images.length > 0 ? selectedCase.images : [selectedCase.image]}
                alt={selectedCase.title}
                aspectRatio="aspect-16/9"
                showBadge={true}
              />
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight">
                {selectedCase.title}
              </h2>
              <p className="text-slate-300 text-base font-bold leading-relaxed">
                {selectedCase.excerpt}
              </p>

              {selectedCase.result && (
                <div className="brutalist-border bg-[#FF6636] text-[#2A2A29] p-5 flex items-center gap-4">
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">Verified Outcome</div>
                    <div className="font-display text-xl font-black">{selectedCase.result}</div>
                  </div>
                </div>
              )}
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

      {/* 6. Deliverables & Proof (Kombai Light Panel Contrast Section) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F2F4F8] text-[#2A2A29] border-b-2 border-white">
        <div className="container-page">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-stretch">
            {/* Left Deliverables */}
            <div className="lg:w-1/2 flex flex-col justify-between space-y-12">
              <div>
                <h2 className="font-display text-5xl sm:text-6xl font-black text-[#2A2A29] uppercase tracking-tighter mb-12 italic underline decoration-8 decoration-[#FF6636] underline-offset-8">
                  DELIVERABLES & PROOF
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="border-b-2 border-[#2A2A29]/20 pb-6">
                    <span className="text-xs font-black uppercase text-[#FF6636] block mb-2">
                      01 PRODUCT
                    </span>
                    <h4 className="font-display text-xl font-black text-[#2A2A29] uppercase">
                      Figma Source & Design Tokens
                    </h4>
                  </div>
                  <div className="border-b-2 border-[#2A2A29]/20 pb-6">
                    <span className="text-xs font-black uppercase text-[#FF6636] block mb-2">
                      02 MOTION
                    </span>
                    <h4 className="font-display text-xl font-black text-[#2A2A29] uppercase">
                      Lottie & MP4 Library
                    </h4>
                  </div>
                  <div className="border-b-2 border-[#2A2A29]/20 pb-6">
                    <span className="text-xs font-black uppercase text-[#FF6636] block mb-2">
                      03 BRAND
                    </span>
                    <h4 className="font-display text-xl font-black text-[#2A2A29] uppercase">
                      Complete Guidelines & Assets
                    </h4>
                  </div>
                  <div className="border-b-2 border-[#2A2A29]/20 pb-6">
                    <span className="text-xs font-black uppercase text-[#FF6636] block mb-2">
                      04 CODE
                    </span>
                    <h4 className="font-display text-xl font-black text-[#2A2A29] uppercase">
                      Developer Handoff Support
                    </h4>
                  </div>
                </div>
              </div>

              <div className="bg-[#2A2A29] p-8 text-white brutalist-border">
                <p className="font-display text-xl font-bold uppercase leading-tight">
                  We deliver clean, scalable, and documented assets that your engineering team will actually love.
                </p>
              </div>
            </div>

            {/* Right Proof Card */}
            <div className="lg:w-1/2 bg-[#FF6636] p-10 sm:p-14 brutalist-border flex flex-col justify-between text-[#2A2A29]">
              <div className="space-y-6">
                <span className="block text-xs font-black uppercase tracking-widest text-[#2A2A29]">
                  Case Result // Verified Proof
                </span>
                <div className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-[#2A2A29] leading-none tracking-tighter">
                  +52% LIFT
                </div>
                <p className="text-lg sm:text-2xl font-black text-[#2A2A29] leading-snug">
                  Product UI/UX overhaul for Paylane led to a measurable spike in checkout completion across 400k active users.
                </p>
              </div>
              <div className="pt-10">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-3 text-xl font-black uppercase text-[#2A2A29] hover:gap-6 transition-all italic"
                >
                  VIEW CASE STUDY <ArrowRight className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Work Procedure Section */}
      <WorkProcedure />

      {/* 8. Featured Testimonial Pullquote */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white text-white">
        <div className="container-page max-w-4xl text-center space-y-8">
          <Quote className="h-16 w-16 mx-auto text-[#FF6636]" />
          <blockquote className="font-display text-2xl sm:text-4xl font-black leading-snug uppercase tracking-tight text-white">
            "{featuredTestimonial.quote}"
          </blockquote>
          <div>
            <div className="font-display text-lg font-black uppercase text-[#FF6636]">
              {featuredTestimonial.name}
            </div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-1">
              {featuredTestimonial.role}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTABand */}
      <CTABand />
    </div>
  );
}
