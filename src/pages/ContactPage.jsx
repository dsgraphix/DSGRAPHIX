import React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";
import { CONTACT, whatsappLink } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export function ContactPage() {
  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Contact"
        title={<>LET'S TALK ABOUT YOUR <span className="text-[#FF6636]">NEXT RELEASE.</span></>}
        lead="Reach out via lead enquiry, email, phone, or WhatsApp. We reply within 48 hours with a clear scope and fixed pricing."
      />

      {/* Main Grid */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                  Direct Channels
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
                  SPEAK DIRECTLY WITH THE STUDIO LEAD.
                </h2>
                <p className="text-slate-300 font-bold text-base leading-relaxed">
                  No middle management or account sales reps. Your initial call is directly with Dhananjay Chalke.
                </p>
              </div>

              <div className="space-y-6 divide-y-2 divide-white/20">
                <div className="pt-4 flex items-start gap-4">
                  <div className="h-12 w-12 brutalist-border bg-[#FF6636] text-[#2A2A29] flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#FF6636] uppercase tracking-widest">Email Us</div>
                    <a href={`mailto:${CONTACT.email}`} className="font-display text-xl font-black uppercase text-white hover:text-[#FF6636] transition-colors">
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="pt-6 flex items-start gap-4">
                  <div className="h-12 w-12 brutalist-border bg-[#FF6636] text-[#2A2A29] flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#FF6636] uppercase tracking-widest">Call Directly</div>
                    <a href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`} className="font-display text-xl font-black uppercase text-white hover:text-[#FF6636] transition-colors">
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="pt-6 flex items-start gap-4">
                  <div className="h-12 w-12 brutalist-border bg-[#FF6636] text-[#2A2A29] flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#FF6636] uppercase tracking-widest">Studio Location</div>
                    <div className="font-display text-lg font-black uppercase text-white">{CONTACT.address}</div>
                  </div>
                </div>

                <div className="pt-6 flex items-start gap-4">
                  <div className="h-12 w-12 brutalist-border bg-[#FF6636] text-[#2A2A29] flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#FF6636] uppercase tracking-widest">Working Hours</div>
                    <div className="font-display text-lg font-black uppercase text-white">{CONTACT.hours}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild variant="brand" size="xl" className="w-full sm:w-auto">
                  <a href={whatsappLink()} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Instant Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: LeadForm */}
            <div className="space-y-4">
              <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
                Project Scope Enquiry
              </span>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map (Chiplun, Ratnagiri) */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page space-y-6">
          <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
            Find Us
          </span>
          <div className="brutalist-border overflow-hidden h-96 w-full shadow-2xl rounded-lg">
            <iframe
              title="DS-Graphix Chiplun Ratnagiri Location"
              src="https://maps.google.com/maps?q=Sati%2C%20Chiplun%2C%20Ratnagiri%2C%20Maharashtra%20415604&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
