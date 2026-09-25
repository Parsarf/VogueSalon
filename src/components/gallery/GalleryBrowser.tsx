"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { galleryFilters, worksByCategory, type GalleryCategory, type Work } from "@/data/gallery";
import { getArtist } from "@/data/artists";
import { photoSrc } from "@/data/images";

/**
 * Curated masonry. CSS columns rather than a JS layout engine — the intrinsic
 * ratios in the data do the composing, so images keep their own crops instead
 * of being forced into a square grid.
 */
export function GalleryBrowser() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [lightbox, setLightbox] = useState<Work | null>(null);
  const list = worksByCategory(filter);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div className="gutter">
      <Reveal
        variant="fade"
        className="sticky top-[4.5rem] z-40 -mx-[max(1.25rem,5vw)] bg-ivory/92 px-[max(1.25rem,5vw)] py-5 backdrop-blur-md"
      >
        <div className="flex items-baseline justify-between gap-6 border-t border-ink/12 pt-4">
          <div className="rail -mx-1 flex gap-7 overflow-x-auto px-1 md:gap-9">
            {galleryFilters.map((f) => (
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

      <div key={filter} className="mt-12 columns-2 gap-4 md:mt-16 md:columns-3 md:gap-6">
        {list.map((work, i) => {
          const artist = work.artist ? getArtist(work.artist) : null;
          return (
            <Reveal
              key={work.id}
              variant="up"
              delay={(i % 3) * 80}
              className="mb-4 break-inside-avoid md:mb-6"
            >
              <button
                onClick={() => setLightbox(work)}
                className="group block w-full cursor-pointer text-left"
              >
                <span
                  className="zoom-frame relative block bg-bone"
                  style={{ aspectRatio: work.ratio }}
                >
                  <Image
                    src={photoSrc(work.photo, 1000)}
                    alt={work.photo.alt}
                    fill
                    sizes="(max-width: 768px) 48vw, 32vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <span className="label-ui bg-ivory/90 px-5 py-3 text-ink backdrop-blur-sm">
                      View
                    </span>
                  </span>
                </span>

                <span className="mt-3.5 flex items-baseline justify-between gap-3">
                  <span className="text-[0.8rem] font-light text-charcoal">{work.title}</span>
                  {artist && <span className="eyebrow shrink-0 text-ash">{artist.firstName}</span>}
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Lightbox                                                            */}
      {/* ------------------------------------------------------------------ */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          className="animate-fade-in fixed inset-0 z-[250] flex flex-col bg-ink/97 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <div className="flex shrink-0 items-center justify-between gutter py-6">
            <p className="eyebrow text-stone">{lightbox.categories.join(" · ")}</p>
            <button
              onClick={() => setLightbox(null)}
              className="label-ui cursor-pointer text-stone transition-colors duration-500 hover:text-ivory"
            >
              Close ×
            </button>
          </div>

          <div className="animate-sheet-up relative min-h-0 flex-1 gutter">
            <Image
              src={photoSrc(lightbox.photo, 1800, 85)}
              alt={lightbox.photo.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div
            className="flex shrink-0 flex-wrap items-baseline justify-between gap-4 gutter py-7 text-ivory"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="display-sm">{lightbox.title}</p>
            {lightbox.artist && (
              <Link
                href={`/artists/${lightbox.artist}`}
                className="label-ui link-draw text-stone"
              >
                By {getArtist(lightbox.artist)?.name} →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
