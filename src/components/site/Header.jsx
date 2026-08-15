import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { SiteSearch } from "./SiteSearch";
import { Button } from "@/components/ui/button";
import { NAV, SERVICES } from "@/lib/site-data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
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

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#2A2A29]/95 backdrop-blur-md border-b-2 border-white text-white ${
        scrolled ? "shadow-2xl" : ""
      }`}
    >
      <div className="container-page h-20 flex items-center justify-between gap-4">
        {/* Left section: Logo + Desktop Nav */}
        <div className="flex items-center gap-8">
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

        {/* Right section: Search, Quote button, Hamburger */}
        <div className="flex items-center gap-4">
          <SiteSearch />

          <Button
            asChild
            variant="brand"
            size="lg"
            className="hidden md:inline-flex whitespace-nowrap px-6"
          >
            <Link to="/quote">
              Get a Quote
            </Link>
          </Button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden flex h-10 w-10 items-center justify-center brutalist-border bg-[#2A2A29] text-white hover:bg-white hover:text-[#2A2A29] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-white bg-[#2A2A29] px-6 py-8 animate-in slide-in-from-top-2 duration-200 text-white">
          <div className="space-y-6">
            <SiteSearch variant="full" />

            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-4 font-display font-bold text-lg uppercase tracking-wider">
              {NAV.map((item) => {
                const isActive =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`transition-colors py-1 ${
                      isActive ? "text-[#FF6636]" : "text-white hover:text-[#FF6636]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 border-t-2 border-white/20">
              <div className="eyebrow mb-4">
                <span className="h-px w-8 bg-[#FF6636]" />
                Services
              </div>
              <div className="grid grid-cols-1 gap-3 pl-2">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    to={service.to}
                    className="font-display text-sm font-bold uppercase text-white hover:text-[#FF6636] flex items-center justify-between"
                  >
                    <span>{service.title}</span>
                    <ArrowRight className="h-4 w-4 text-[#FF6636]" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button asChild variant="brand" size="xl" className="w-full whitespace-nowrap">
                <Link to="/quote">
                  Get a Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
