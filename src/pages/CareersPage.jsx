import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { JOBS, CONTACT } from "@/lib/site-data";
import { JobApplyModal } from "@/components/JobApplyModal";

export function CareersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("General Application");

  const handleApplyClick = (roleTitle) => {
    setSelectedRole(roleTitle);
    setModalOpen(true);
  };

  const perks = [
    "Competitive salary & performance bonuses",
    "Senior craft focus — no unnecessary bureaucracy",
    "Direct client interaction & portfolio ownership",
    "Modern workstation & software tooling budget",
    "Generous paid leave & flexible hybrid work options",
  ];

  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Careers"
        title={<>BUILD HIGH-CRAFT DESIGN <span className="text-[#FF6636]">WITH A LEAN TEAM.</span></>}
        lead="We hire self-directed designers and motion editors who care deeply about typography, product utility, and commercial outcomes."
      />

      {/* Culture & Perks */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                Our Culture
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
                AUTONOMY, HIGH STANDARDS & CALM EXECUTION.
              </h2>
              <p className="text-slate-300 font-bold text-base leading-relaxed">
                We're not a factory churning out generic templates. We take on ambitious product and brand challenges where design makes a direct commercial impact.
              </p>
            </div>

            <div className="brutalist-border bg-[#2A2A29] p-8 lg:p-10 space-y-6">
              <h3 className="font-display text-xl font-black uppercase text-white">
                WHAT YOU CAN EXPECT AT DS-GRAPHIX:
              </h3>
              <div className="space-y-4">
                {perks.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm font-bold text-slate-200">
                    <CheckCircle2 className="h-5 w-5 text-[#FF6636] shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              Open Roles
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              CURRENT OPPORTUNITIES
            </h2>
          </div>

          <div className="space-y-6">
            {JOBS.map((job, idx) => (
              <div
                key={idx}
                className="brutalist-border bg-[#2A2A29] p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white hover:text-[#2A2A29] transition-all duration-300 group"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-[#FF6636] text-[#2A2A29] font-display text-xs font-black uppercase tracking-wider">
                      {job.type}
                    </span>
                    <span className="px-3 py-1 brutalist-border bg-[#2A2A29] text-white group-hover:bg-[#2A2A29] group-hover:text-white font-display text-xs font-black uppercase tracking-wider">
                      {job.location}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
                    {job.title}
                  </h3>
                  <p className="text-slate-300 group-hover:text-[#2A2A29] font-bold text-sm leading-relaxed">
                    {job.body}
                  </p>
                </div>

                <div className="shrink-0">
                  <Button
                    variant="brand"
                    size="lg"
                    className="group-hover:bg-[#2A2A29] group-hover:text-white"
                    onClick={() => handleApplyClick(job.title)}
                  >
                    Apply for Role <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Speculative Application Note */}
          <div className="mt-12 brutalist-border bg-[#2A2A29] p-8 text-center space-y-4">
            <h4 className="font-display text-2xl font-black uppercase text-white">DON'T SEE A MATCHING ROLE?</h4>
            <p className="text-slate-300 font-bold text-sm max-w-lg mx-auto">
              We're always interested in meeting exceptional designers, motion artists, and UI engineers. Send us your portfolio directly.
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleApplyClick("Speculative Portfolio Submission")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Submit Your Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <JobApplyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        jobTitle={selectedRole}
      />

      <CTABand />
    </div>
  );
}

