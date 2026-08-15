import React from "react";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT } from "@/lib/site-data";

export function PrivacyPolicyPage() {
  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Legal"
        title="PRIVACY POLICY"
        lead="How DS-Graphix collects, uses, and safeguards your personal and project information."
      />

      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page max-w-3xl space-y-10 text-slate-300 leading-relaxed font-bold">
          <p className="text-xs font-mono text-[#FF6636] uppercase tracking-widest">Last updated: August 10, 2026</p>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">1. Information We Collect</h2>
            <p>
              When you submit a quote request, contact form, or communicate with DS-Graphix via WhatsApp or email, we collect personal identifiers including your name, email address, phone number, company name, and project specifications.
            </p>
          </div>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">2. How We Use Your Data</h2>
            <p>
              Your information is used strictly to respond to project enquiries, deliver design services, process invoices, and maintain client communication. We never sell or lease client data to third-party advertisers.
            </p>
          </div>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">3. Intellectual Property & Confidentiality</h2>
            <p>
              All confidential business metrics, user research, and project briefs shared with DS-Graphix during discovery or engagement are kept strictly confidential under standard non-disclosure terms.
            </p>
          </div>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">4. Data Retention & Privacy Requests</h2>
            <p>
              Client records are retained for administrative and tax accounting purposes. You may request the deletion of your personal records at any time by contacting <a href={`mailto:${CONTACT.email}`} className="text-[#FF6636] font-black underline">{CONTACT.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
