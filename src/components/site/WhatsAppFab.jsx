import React from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-data";

export function WhatsAppFab({ message }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 inline-flex items-center gap-3 p-2 pr-5 rounded-full bg-[#FF6636] text-[#2A2A29] border-2 border-white shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A2A29] text-white">
        <MessageCircle className="h-5 w-5 text-[#FF6636] fill-[#FF6636]/20" />
      </div>
      <span className="font-display font-black text-xs md:text-sm uppercase tracking-wider text-[#2A2A29]">
        <span className="md:hidden">WhatsApp</span>
        <span className="hidden md:inline">Chat on WhatsApp</span>
      </span>
    </a>
  );
}
