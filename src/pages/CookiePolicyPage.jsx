import React from "react";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT } from "@/lib/site-data";

export function CookiePolicyPage() {
  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Legal"
        title="COOKIE POLICY"
        lead="Information regarding local storage and analytics cookies on DS-Graphix."
      />

      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page max-w-3xl space-y-10 text-slate-300 leading-relaxed font-bold">
          <p className="text-xs font-mono text-[#FF6636] uppercase tracking-widest">Last updated: August 10, 2026</p>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">1. What Are Cookies</h2>
            <p>
              Cookies are small text files placed on your device to remember preferences, enable interactive elements, and analyze website traffic.
            </p>
          </div>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">2. How We Use Essential Cookies</h2>
            <p>
              DS-Graphix uses minimal essential cookies and browser local storage strictly to remember search modal states, navigation preferences, and form session drafts.
            </p>
          </div>

          <div className="space-y-3 brutalist-border p-6 bg-[#2A2A29]">
            <h2 className="font-display text-2xl font-black uppercase text-white">3. Managing Preferences</h2>
            <p>
              You can adjust your browser settings to disable or clear cookies at any time. For questions regarding website technology, email <a href={`mailto:${CONTACT.email}`} className="text-[#FF6636] font-black underline">{CONTACT.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
