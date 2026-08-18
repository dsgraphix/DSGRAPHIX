import React, { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/button";
import { POSTS } from "@/lib/site-data";

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPost = POSTS[0];
  const remainingPosts = POSTS.slice(1);

  const categories = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

  const filteredPosts =
    selectedCategory === "All"
      ? remainingPosts
      : remainingPosts.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#2A2A29] text-white">
      <PageHero
        eyebrow="Insights"
        title={<>PRACTITIONER NOTES ON DESIGN, <span className="text-[#FF6636]">SYSTEMS & CONVERSION.</span></>}
        lead="Straightforward articles written by our design lead on building scalable design systems, branding strategy, and high-converting video."
      />

      {/* Featured Post Card */}
      <section className="bg-[#2A2A29] py-12 border-b-2 border-white">
        <div className="container-page space-y-4">
          <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
            Featured Article
          </span>

          <div className="brutalist-border bg-[#2A2A29] p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 sm:gap-8 items-center hover:bg-[#FF6636] hover:text-[#2A2A29] transition-all duration-500 group">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-wider text-[#FF6636] group-hover:text-[#2A2A29]">
                <span>{featuredPost.category}</span>
                <span>·</span>
                <span>{featuredPost.date}</span>
                <span>·</span>
                <span>{featuredPost.read}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-slate-300 group-hover:text-[#2A2A29] font-bold text-base leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="pt-2">
                <Button variant="brand" size="lg" className="group-hover:bg-[#2A2A29] group-hover:text-white">
                  Read Article <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            <div className="brutalist-border bg-[#2A2A29] text-white p-8 space-y-4 text-center group-hover:bg-[#2A2A29]">
              <BookOpen className="h-12 w-12 text-[#FF6636] mx-auto" />
              <h4 className="font-display text-xl font-black uppercase">Design Systems Handbook</h4>
              <p className="text-xs font-bold text-slate-300">Download our internal checklist for front-end dev handoffs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Chips */}
      <section className="bg-[#2A2A29] py-8 border-b-2 border-white">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-none font-display text-xs font-black uppercase tracking-wider transition-all brutalist-border ${
                  selectedCategory === cat
                    ? "bg-[#FF6636] text-[#2A2A29]"
                    : "bg-[#2A2A29] text-white hover:bg-white hover:text-[#2A2A29]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-[#2A2A29] section-y border-b-2 border-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="brutalist-border bg-[#2A2A29] p-8 flex flex-col justify-between hover:bg-white hover:text-[#2A2A29] transition-all duration-300 group min-h-[300px]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#FF6636] group-hover:text-[#2A2A29]">
                    <span>{post.category}</span>
                    <span>{post.read}</span>
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm font-bold opacity-80 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t-2 border-white/20 group-hover:border-[#2A2A29]/20 flex items-center justify-between text-xs font-black uppercase tracking-wider">
                  <span className="opacity-60">{post.date}</span>
                  <span className="text-[#FF6636] group-hover:text-[#2A2A29]">Read →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
