import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { CONTACT, SERVICES, whatsappLink } from "@/lib/site-data";

function InstagramIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function BehanceIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7v-2h7v2zm1.726 10c0 2.22-1.403 3.864-3.726 3.864-2.583 0-4.004-1.854-4.004-4.236 0-2.617 1.625-4.328 4.02-4.328 2.457 0 3.71 1.701 3.71 4.1 0 .227-.03.498-.03.498h-5.642c.089 1.157.94 1.83 2.012 1.83.847 0 1.49-.379 1.758-.934h1.902zm-5.719-2.072h3.784c-.074-.954-.744-1.577-1.815-1.577-1.103 0-1.865.653-1.969 1.577zm-9.336 5.928h-6.671v-13.712h6.611c2.408 0 4.053 1.127 4.053 3.125 0 1.341-.744 2.37-1.902 2.802 1.517.391 2.457 1.577 2.457 3.255 0 2.386-1.874 4.53-4.548 4.53zm-4.328-11.666v3.256h3.874c1.234 0 2.041-.57 2.041-1.637 0-1.042-.789-1.619-2.041-1.619h-3.874zm0 5.176v3.834h4.082c1.37 0 2.234-.633 2.234-1.897 0-1.314-.894-1.937-2.234-1.937h-4.082z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export function Footer() {
  const socialLinks = [
    { name: "Instagram", href: CONTACT.socials?.instagram || "https://www.instagram.com/dsgra.phix/", icon: InstagramIcon },
    { name: "Behance", href: CONTACT.socials?.behance || "https://www.behance.net/dhananjaychalke", icon: BehanceIcon },
    { name: "LinkedIn", href: CONTACT.socials?.linkedin || "https://www.linkedin.com/in/dhananjay-chalke-a217b629a", icon: LinkedinIcon },
  ];

  return (
    <footer className="bg-[#2A2A29] text-white border-t-2 border-white">
      <div className="container-page section-y">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand info */}
          <div className="space-y-6">
            <h3 className="font-display font-black text-4xl uppercase tracking-tighter text-[#FF6636]">
              DS-Graphix
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              DS-Graphix is a full-service creative & digital design studio based in Chiplun, Ratnagiri, Maharashtra, India. We build high-converting interfaces, distinct brand identities, and platform-native content.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="h-10 w-10 brutalist-border bg-[#2A2A29] text-white flex items-center justify-center hover:bg-[#FF6636] hover:text-[#2A2A29] transition-colors"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Services deep links */}
          <div>
            <h4 className="font-display font-black text-sm uppercase tracking-widest text-[#FF6636] mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-sm font-bold uppercase text-slate-300">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={s.to}
                    className="hover:text-[#FF6636] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{s.title}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF6636]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company links */}
          <div>
            <h4 className="font-display font-black text-sm uppercase tracking-widest text-[#FF6636] mb-6">
              Company
            </h4>
            <ul className="space-y-3 text-sm font-bold uppercase text-slate-300">
              {[
                { label: "About Studio", to: "/about" },
                { label: "Selected Work", to: "/portfolio" },
                { label: "Our Process", to: "/process" },
                { label: "Client Reviews", to: "/testimonials" },
                { label: "Careers & Hiring", to: "/careers" },
                { label: "Frequently Asked Questions", to: "/faq" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-[#FF6636] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact block */}
          <div className="space-y-6">
            <h4 className="font-display font-black text-sm uppercase tracking-widest text-[#FF6636] mb-6">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm font-semibold text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#FF6636] shrink-0 mt-1" />
                <span>{CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#FF6636] shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[#FF6636] transition-colors">
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#FF6636] shrink-0" />
                <a href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`} className="hover:text-[#FF6636] transition-colors">
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[#FF6636] shrink-0" />
                <span>{CONTACT.hours}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 brutalist-border bg-[#2A2A29] text-white font-bold text-xs uppercase hover:bg-[#FF6636] hover:text-[#2A2A29] transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#FF6636] fill-[#FF6636]/20 group-hover:text-[#2A2A29]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t-2 border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          <p>© {new Date().getFullYear()} {CONTACT.company}. All rights reserved. Founded by {CONTACT.person}.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#FF6636] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#FF6636] transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="hover:text-[#FF6636] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
