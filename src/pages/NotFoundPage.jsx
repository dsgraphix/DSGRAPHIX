import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 bg-[#2A2A29] text-white">
      <div className="text-center space-y-6 max-w-md brutalist-border p-10 bg-[#2A2A29]">
        <div className="font-display text-8xl sm:text-9xl font-black text-[#FF6636] tracking-tighter">
          404
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
          PAGE NOT FOUND
        </h1>
        <p className="text-slate-300 font-bold text-sm leading-relaxed">
          The link you followed may be broken or the page has been moved. Let's get you back to familiar territory.
        </p>
        <div className="pt-4">
          <Button asChild variant="brand" size="xl">
            <Link to="/">
              <Home className="h-5 w-5 mr-2" />
              Go Back Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
