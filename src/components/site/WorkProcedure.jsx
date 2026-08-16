import React from "react";
import { MessageSquare, PenTool, Monitor, Heart, Search, Lightbulb, Plane, CheckCircle2 } from "lucide-react";
import processFlowPng from "@/assets/process-flow.png";

export function WorkProcedure() {
  const topCards = [
    {
      icon: MessageSquare,
      title: "CLIENT DESIGN CONSULTATION",
      description:
        "Collaborative discovery workshops and deep-dive alignment on commercial objectives.",
      dark: false,
    },
    {
      icon: PenTool,
      title: "PROTOTYPING DESIGN",
      description:
        "High-fidelity interactive prototypes and design system token architecture.",
      dark: true,
    },
    {
      icon: Monitor,
      title: "PROCESSING TO DESIGN",
      description:
        "Developer-ready asset handoffs, complete specification documentation, and production rollout.",
      dark: false,
    },
  ];

  const processSteps = [
    {
      num: "01",
      name: "Empathize",
      icon: Heart,
      bgBadge: "bg-[#4A90E2]",
    },
    {
      num: "02",
      name: "Define",
      icon: Search,
      bgBadge: "bg-[#41B883]",
    },
    {
      num: "03",
      name: "Ideate",
      icon: Lightbulb,
      bgBadge: "bg-[#F5A623]",
    },
    {
      num: "04",
      name: "Prototype",
      icon: Plane,
      bgBadge: "bg-[#FF7A00]",
    },
    {
      num: "05",
      name: "Test",
      icon: CheckCircle2,
      bgBadge: "bg-[#C02C2C]",
    },
  ];

  return (
    <section className="bg-[#2A2A29] text-white py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Title */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF6636]">
            HOW WE WORK
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter">
            OUR WORK <span className="text-[#FF6636]">PROCEDURE</span>
          </h2>
        </div>

        {/* 3 Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className={`p-8 brutalist-border transition-all duration-300 ${
                  card.dark
                    ? "bg-[#FF6636] text-[#2A2A29]"
                    : "bg-[#2A2A29] text-white hover:bg-white hover:text-[#2A2A29]"
                }`}
              >
                <div className="mb-6">
                  <IconComponent
                    className="h-10 w-10"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="font-display text-xl font-black uppercase tracking-wide mb-4">
                  {card.title}
                </h3>
                <p className="text-sm font-bold opacity-90 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom 5-Step Interlocking Circular Diagram */}
        <div className="pt-6">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              THE 5-STAGE DESIGN THINKING PROCESS
            </h3>
            <p className="text-sm font-bold text-slate-300 mt-2 max-w-xl mx-auto">
              Our iterative, human-centered workflow ensuring every pixel is validated against real user needs.
            </p>
          </div>

          {/* Process Flow Image */}
          <div className="brutalist-border bg-white p-4 sm:p-8 rounded-xl shadow-2xl overflow-hidden">
            <img
              src={processFlowPng}
              alt="DS-Graphix 5-Stage Design Thinking Process Diagram"
              className="w-full h-auto object-contain block mx-auto rounded max-w-4xl"
            />
          </div>
        </div>

        {/* Mobile Responsive Process Cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {processSteps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="p-5 brutalist-border bg-[#1E1E1D] flex items-center gap-4 text-white hover:border-[#FF6636] transition-colors"
              >
                <div
                  className={`h-12 w-12 flex items-center justify-center text-white shrink-0 brutalist-border ${step.bgBadge}`}
                >
                  <IconComp className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#FF6636] block uppercase tracking-wider">
                    Stage {step.num}
                  </span>
                  <h4 className="font-display text-lg font-black uppercase tracking-tight">
                    {step.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
