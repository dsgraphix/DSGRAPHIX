import React from "react";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT } from "@/lib/site-data";

export function TermsPage() {
  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Legal"
        title="TERMS OF SERVICE"
        lead="Standard operating terms governing client design projects and website usage."
      />

      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page max-w-3xl space-y-10 text-slate-300 leading-relaxed font-bold">
          <p className="text-xs font-mono text-[#FF6636] uppercase tracking-widest">Last updated: August 10, 2026</p>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">1. Engagement Scopes & Estimates</h2>
            <p>
              All design projects begin with a formal written scope and fixed-price quotation. Any alterations to project scope requested by the client after milestone sign-off will be quoted transparently before work commences.
            </p>
          </div>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">2. Ownership & Source Files</h2>
            <p>
              Upon receipt of final payment, full intellectual property rights and raw source files (Figma, AI, PSD, video project files) are transferred to the client. DS-Graphix retains the right to display completed work in studio portfolio cases unless restricted by an NDA.
            </p>
          </div>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">3. Revision Rounds</h2>
            <p>
              Every engagement includes two structured revision rounds per milestone. Additional revision cycles outside original scope requirements are billed at standard studio hourly rates with prior client approval.
            </p>
          </div>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">4. Contact & Disputes</h2>
            <p>
              For legal enquiries or contract clarifications, reach out directly to Dhananjay Chalke at <a href={`mailto:${CONTACT.email}`} className="text-[#FF6636] font-black underline">{CONTACT.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
