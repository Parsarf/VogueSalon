"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { reviews } from "@/data/reviews";
import { getArtist } from "@/data/artists";
import { site } from "@/data/site";

/**
 * Reviews set as pull quotes at display scale. No star rows, no cards — the
 * rating is a single line of small caps at the foot of the section.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  const artist = review.artist ? getArtist(review.artist) : null;

  const go = (delta: number) =>
    setIndex((i) => (i + delta + reviews.length) % reviews.length);

  return (
    <Section tone="ink" id="reviews">
      <div className="gutter">
        <Reveal variant="fade" className="border-t border-ivory/15 pt-4">
          <span className="eyebrow text-stone">In their words</span>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-10 lg:col-span-9">
            {/* Fixed-ish height keeps the surrounding layout still as quotes change. */}
            <blockquote className="min-h-[34vh] md:min-h-[40vh]">
              <p key={review.id} className="display-md animate-fade-in max-w-4xl">
                <span className="italic-display text-stone">&ldquo;</span>
                {review.pull}
                <span className="italic-display text-stone">&rdquo;</span>
              </p>

              {review.rest && (
                <p
                  key={`${review.id}-rest`}
                  className="animate-fade-in mt-9 max-w-xl text-[0.95rem] leading-[1.85] text-stone"
                >
                  {review.rest}
                </p>
              )}

              <footer key={`${review.id}-f`} className="animate-fade-in mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <cite className="label-ui not-italic">{review.author}</cite>
                {artist && (
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="label-ui link-draw text-stone"
                  >
                    on {artist.firstName}
                  </Link>
                )}
                <span className="eyebrow text-ivory/30">via {review.platform}</span>
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Controls and the rating, on one hairline. */}
        <div className="mt-6 flex items-center justify-between gap-8 border-t border-ivory/15 pt-6">
          <p className="eyebrow text-stone">
            {site.rating.score.toFixed(1)} average · {site.rating.count} reviews ·{" "}
            {site.rating.source}
          </p>

          <div className="flex items-center gap-8">
            <span className="eyebrow tabular-nums text-ivory/35">
              {String(index + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </span>
            <div className="flex gap-5">
              <button
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="label-ui cursor-pointer text-stone transition-colors duration-500 hover:text-ivory"
              >
                ←
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next review"
                className="label-ui cursor-pointer text-stone transition-colors duration-500 hover:text-ivory"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
