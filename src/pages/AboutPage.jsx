import React from "react";
import studioImg from "@/assets/studio.jpg";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { STATS, CONTACT } from "@/lib/site-data";

export function AboutPage() {
  const values = [
    {
      num: "01",
      title: "Clarity over decoration",
      body: "We don't add visual noise for flair. Every line, colour token, and interaction serves a functional user goal or commercial objective."
    },
    {
      num: "02",
      title: "Systems not one-offs",
      body: "Whether it's a UI design system or a social creative kit, we build reusable assets that your team can scale without breaking quality."
    },
    {
      num: "03",
      title: "Numbers over opinions",
      body: "Design decisions are anchored on conversion rates, onboarding speed, and brand recall lift — never agency egos or personal taste."
    },
    {
      num: "04",
      title: "Calm delivery",
      body: "Transparent timelines, structured feedback cycles, direct access to senior craftspeople. Zero drama, no missed deadlines."
    }
  ];

  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="About the studio"
        title={<>A SMALL STUDIO THAT BEHAVES <span className="text-[#FF6636]">LIKE YOUR TEAM.</span></>}
        lead="DS-Graphix is an independent creative and digital design practice in Chiplun, Ratnagiri. We operate as a high-density, senior-only unit dedicated to meaningful visual craft."
      />

      {/* Studio Story */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                Our Story
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                BUILT FOR COMPANIES THAT VALUE CRAFT, VELOCITY & DIRECT COMMUNICATION.
              </h2>
              <p className="text-slate-300 font-bold text-base leading-relaxed">
                Founded in Maharashtra, India, DS-Graphix was built as an antidote to bloated traditional agencies where briefs get handed down through layers of account managers.
              </p>
              <p className="text-slate-300 font-bold text-base leading-relaxed">
                We believe the best design happens when founders and product leaders work directly with the designers who execute the work. We keep our team intentionally compact so every project gets senior focus.
              </p>
            </div>

            <div className="brutalist-border overflow-hidden bg-[#2A2A29] aspect-4/3 grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src={studioImg}
                alt="DS-Graphix design studio interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page max-w-4xl">
          <div className="brutalist-border bg-[#2A2A29] p-8 lg:p-14 space-y-6">
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              Founder's Note
            </span>
            <blockquote className="font-display text-2xl sm:text-3xl font-black text-white uppercase leading-snug">
              "Great design isn't about making things pretty. It's about taking complex business problems and rendering them lucid, intuitive, and commercially persuasive."
            </blockquote>
            <div className="pt-6 border-t-2 border-white/20 flex items-center justify-between">
              <div>
                <div className="font-display text-xl font-black text-[#FF6636] uppercase">{CONTACT.person}</div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-1">Founder & Creative Director</div>
              </div>
              <div className="text-xs font-mono font-bold text-[#FF6636] uppercase">Chiplun, MH</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              Studio Values
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              THE STANDARDS WE <span className="text-[#FF6636]">SHIP BY.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.num} className="brutalist-border bg-[#2A2A29] p-8 sm:p-10 space-y-4 hover:bg-white hover:text-[#2A2A29] transition-all duration-300 group">
                <div className="font-display text-2xl font-black text-[#FF6636] group-hover:text-[#2A2A29]">{v.num}</div>
                <h3 className="font-display text-2xl font-black uppercase">{v.title}</h3>
                <p className="text-slate-300 group-hover:text-[#2A2A29] font-bold text-sm leading-relaxed">{v.body}</p>
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
