import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { SiteSearch } from "./SiteSearch";
import { Button } from "@/components/ui/button";
import { NAV, SERVICES, whatsappLink } from "@/lib/site-data";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useModalScrollLock(mobileMenuOpen);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const mobileDrawer = (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[1100] bg-[#2A2A29] text-white flex flex-col animate-in fade-in duration-200"
    >
      {/* Drawer Top Header Bar */}
      <div className="h-20 border-b-2 border-white px-4 sm:px-6 flex items-center justify-between bg-[#2A2A29] shrink-0">
        <div onClick={() => setMobileMenuOpen(false)}>
          <Logo />
        </div>
        <button
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
          className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center brutalist-border bg-[#2A2A29] text-white hover:bg-[#FF6636] hover:text-[#2A2A29] transition-colors cursor-pointer"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div
        data-lenis-prevent="true"
        className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6 space-y-6"
      >
        <div className="max-w-lg mx-auto space-y-6 pb-12">
          {/* Site Search in Mobile Drawer */}
          <div>
            <SiteSearch variant="full" onSelectCallback={() => setMobileMenuOpen(false)} />
          </div>

          {/* Navigation Links */}
          <nav aria-label="Mobile Primary Navigation" className="flex flex-col divide-y-2 divide-white/10 font-display font-black text-xl uppercase tracking-wider">
            {NAV.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-4 transition-colors flex items-center justify-between ${
                    isActive ? "text-[#FF6636]" : "text-white hover:text-[#FF6636]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF6636]" />
                  ) : (
                    <ArrowRight className="h-4 w-4 opacity-40" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Services Quick Links */}
          <div className="pt-4 border-t-2 border-white/20">
            <div className="eyebrow mb-3">
              <span className="h-px w-6 bg-[#FF6636]" />
              Our Services
            </div>
            <div className="grid grid-cols-1 gap-2 pl-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  to={service.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-sm font-bold uppercase text-slate-200 hover:text-[#FF6636] flex items-center justify-between py-2.5 transition-colors border-b border-white/5"
                >
                  <span>{service.title}</span>
                  <ArrowRight className="h-4 w-4 text-[#FF6636]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 space-y-3">
            <Button asChild variant="brand" size="xl" className="w-full">
              <Link to="/quote" onClick={() => setMobileMenuOpen(false)}>
                Get a Project Quote
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5 mr-2 text-[#FF6636]" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#2A2A29]/95 backdrop-blur-md border-b-2 border-white text-white ${
          scrolled ? "shadow-2xl" : ""
        }`}
      >
        <div className="container-page h-20 flex items-center justify-between gap-4">
          {/* Left section: Logo + Desktop Nav */}
          <div className="flex items-center gap-8 min-w-0">
            <Logo />

            <nav aria-label="Primary" className="hidden lg:flex items-center gap-8 font-display text-sm font-bold uppercase tracking-widest">
              {NAV.map((item) => {
                if (item.to === "/services") {
                  return (
                    <div key={item.to} className="relative group">
                      <Link
                        to="/services"
                        className={`inline-flex items-center gap-1.5 transition-colors hover:text-[#FF6636] ${
                          location.pathname.startsWith("/services")
                            ? "text-[#FF6636]"
                            : "text-white"
                        }`}
                      >
                        Services
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 text-[#FF6636]" />
                      </Link>

                      {/* Services Mega Dropdown */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                        <div className="w-80 brutalist-border bg-[#2A2A29] p-3 text-white">
                          {SERVICES.map((service) => (
                            <Link
                              key={service.slug}
                              to={service.to}
                              className="block p-3 hover:bg-white hover:text-[#2A2A29] transition-colors group/item"
                            >
                              <p className="font-display text-sm font-black uppercase tracking-tight group-hover/item:text-[#2A2A29] text-white">
                                {service.title}
                              </p>
                              <p className="text-xs opacity-70 mt-1 line-clamp-1 font-sans normal-case">
                                {service.short}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                const isActive =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`transition-colors hover:text-[#FF6636] ${
                      isActive ? "text-[#FF6636]" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right section: Search & Quote (Desktop only), Hamburger Button (Mobile only) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop Only Tools */}
            <div className="hidden lg:flex items-center gap-4">
              <SiteSearch />
              <Button asChild variant="brand" size="lg" className="px-6 whitespace-nowrap">
                <Link to="/quote">
                  <span>Get a Quote</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Only: Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
              className="lg:hidden flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center brutalist-border bg-[#2A2A29] text-white hover:bg-[#FF6636] hover:text-[#2A2A29] transition-colors cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Render Mobile Navigation Drawer via Portal directly to body */}
      {mounted && mobileMenuOpen && createPortal(mobileDrawer, document.body)}
    </>
  );
}
