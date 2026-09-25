"use client";

import { useState } from "react";
import { ArtistCard } from "./ArtistCard";
import { Reveal } from "@/components/ui/Reveal";
import { artistFilters, artistsByFilter, type ArtistFilter } from "@/data/artists";

/**
 * Editorial directory: filters set as a tracked-caps index rather than pills,
 * and a grid whose cards sit on staggered baselines so it reads as a spread.
 */
export function ArtistDirectory() {
  const [filter, setFilter] = useState<ArtistFilter | "all">("all");
  const list = artistsByFilter(filter);

  return (
    <div className="gutter">
      <Reveal
        variant="fade"
        className="sticky top-[4.5rem] z-40 -mx-[max(1.25rem,5vw)] bg-ivory/92 px-[max(1.25rem,5vw)] py-5 backdrop-blur-md"
      >
        <div className="flex items-baseline justify-between gap-6 border-t border-ink/12 pt-4">
          <div className="rail -mx-1 flex gap-7 overflow-x-auto px-1 md:gap-9">
            {artistFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`label-ui link-draw shrink-0 cursor-pointer transition-opacity duration-500 ${
                  filter === f.id ? "link-drawn opacity-100" : "opacity-45 hover:opacity-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="eyebrow hidden shrink-0 tabular-nums text-ash sm:block">
            {String(list.length).padStart(2, "0")}
          </span>
        </div>
      </Reveal>

      {/* `key` on the grid replays the reveal each time the filter changes. */}
      <div
        key={filter}
        className="mt-14 grid grid-cols-2 gap-x-4 gap-y-16 md:mt-20 md:grid-cols-3 md:gap-x-6 md:gap-y-4 lg:gap-x-8"
      >
        {list.map((artist, i) => (
          <ArtistCard
            key={artist.slug}
            artist={artist}
            delay={(i % 3) * 90}
            ratio={i % 3 === 1 ? "4/5" : "3/4"}
            className={
              i % 3 === 1 ? "md:mt-24" : i % 3 === 2 ? "md:mt-12" : "md:mb-24"
            }
          />
        ))}
      </div>

      {list.length === 0 && (
        <p className="italic-display mt-20 text-2xl text-ash">
          No artists listed under that specialty yet.
        </p>
      )}

      <Reveal variant="fade" className="mt-20 border-t border-ink/12 pt-6 md:mt-28">
        <p className="max-w-xl text-[0.75rem] leading-relaxed font-light text-ash">
          Prototype note: the portraits above are stand-ins and do not depict the team. Names,
          and the biographies marked as such, are real; roles, specialty tags and portfolios are
          demonstration copy pending the salon&rsquo;s own photography and words.
        </p>
      </Reveal>
    </div>
  );
}
