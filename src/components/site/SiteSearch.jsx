import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, FileText, Layout } from "lucide-react";
import { NAV, SERVICES } from "@/lib/site-data";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

export function SiteSearch({ variant = "icon" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useModalScrollLock(open);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const additionalPages = [
    { label: "Get a Quote", to: "/quote" },
    { label: "FAQs", to: "/faq" },
    { label: "Careers", to: "/careers" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms of Service", to: "/terms" },
  ];

  const allPages = [...NAV, ...additionalPages];

  const filteredPages = allPages.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredServices = SERVICES.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.short.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (to) => {
    navigate(to);
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      {variant === "full" ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-[#2A2A29] text-slate-300 text-sm brutalist-border hover:border-[#FF6636] transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2 font-bold">
            <Search className="h-4 w-4 text-[#FF6636]" />
            Search services, pages, portfolio...
          </span>
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-[#2A2A29] bg-white brutalist-border">
            ⌘K
          </kbd>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Search site"
          className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center brutalist-border bg-[#2A2A29] text-white hover:bg-white hover:text-[#2A2A29] transition-colors relative cursor-pointer"
        >
          <Search className="h-4 w-4" />
        </button>
      )}

      {open && (
        <div data-lenis-prevent="true" className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#2A2A29]/80 backdrop-blur-sm animate-in fade-in duration-200 overscroll-contain">
          <div
            className="fixed inset-0"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div data-lenis-prevent="true" className="relative w-full max-w-xl bg-[#2A2A29] brutalist-border text-white overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center border-b-2 border-white px-4 py-3">
              <Search className="h-5 w-5 text-[#FF6636] mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder:text-slate-400 text-base font-bold focus:outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close search modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div data-lenis-prevent="true" className="max-h-[60vh] sm:max-h-[65vh] overflow-y-auto overscroll-contain p-3 divide-y-2 divide-white/10">
              {filteredPages.length > 0 && (
                <div className="py-2">
                  <div className="px-3 py-1 font-display text-xs font-black uppercase text-[#FF6636] tracking-widest">
                    Pages
                  </div>
                  {filteredPages.map((page) => (
                    <button
                      key={page.to}
                      onClick={() => handleSelect(page.to)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-white hover:bg-white hover:text-[#2A2A29] transition-colors text-left cursor-pointer"
                    >
                      <Layout className="h-4 w-4 text-[#FF6636]" />
                      <span>{page.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {filteredServices.length > 0 && (
                <div className="py-2">
                  <div className="px-3 py-1 font-display text-xs font-black uppercase text-[#FF6636] tracking-widest">
                    Services
                  </div>
                  {filteredServices.map((service) => (
                    <button
                      key={service.slug}
                      onClick={() => handleSelect(service.to)}
                      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm text-white hover:bg-white hover:text-[#2A2A29] transition-colors text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-[#FF6636]" />
                        <div>
                          <p className="font-display font-black uppercase">{service.title}</p>
                          <p className="text-xs opacity-70 line-clamp-1">{service.short}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {filteredPages.length === 0 && filteredServices.length === 0 && (
                <div className="py-8 text-center text-sm font-bold text-slate-400">
                  No results found for "{query}".
                </div>
              )}
            </div>

            <div className="border-t-2 border-white px-4 py-3 bg-[#2A2A29] flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white text-[#2A2A29] font-mono">ESC</kbd> to close</span>
              <span className="hidden sm:inline">DS-Graphix Site Search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
