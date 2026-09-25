"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { serviceCategories } from "@/data/services";
import { photoSrc } from "@/data/images";

/**
 * Categories only — no prices on the homepage. On desktop the list drives a
 * single crossfading plate; on mobile each category becomes its own full-width
 * image with the type laid over it.
 */
export function ServicesPreview() {
  const [active, setActive] = useState(0);

  return (
    <Section tone="ink" id="services">
      <div className="gutter">
        <SectionHead
          eyebrow="Services"
          index="II"
          tone="ivory"
          aside={
            <TextLink href="/services" className="text-ivory">
              Full list &amp; pricing
            </TextLink>
          }
        >
          <h2 className="display-lg">
            What we
            <br />
            <span className="italic-display text-stone">do here.</span>
          </h2>
        </SectionHead>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop: hover-driven list                                        */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-20 hidden grid-cols-12 gap-12 md:mt-28 md:grid">
          <ul className="col-span-7" onMouseLeave={() => setActive(0)}>
            {serviceCategories.map((category, i) => {
              const on = active === i;
              return (
                <li key={category.id} className="border-t border-ivory/12 last:border-b">
                  <Link
                    href={`/services#${category.id}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="flex items-center gap-8 py-9 lg:py-11"
                  >
                    <span
                      className={`eyebrow w-8 shrink-0 transition-colors duration-700 ${
                        on ? "text-bronze-lite" : "text-ivory/30"
                      }`}
                    >
                      {category.index}
                    </span>

                    <span
                      className={`display-md transition-[color,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                        on ? "translate-x-3 text-ivory" : "translate-x-0 text-ivory/45"
                      }`}
                    >
                      {category.name}
                    </span>

                    <span
                      className={`ml-auto max-w-56 text-right text-[0.8rem] leading-relaxed font-light transition-opacity duration-700 ${
                        on ? "opacity-100 text-stone" : "opacity-0"
                      }`}
                    >
                      {category.summary}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* The plate. All four images stay mounted and crossfade. */}
          <div className="col-span-5">
            <div className="relative aspect-3/4 overflow-hidden bg-charcoal">
              {serviceCategories.map((category, i) => (
                <Image
                  key={category.id}
                  src={photoSrc(category.photo, 900)}
                  alt={category.photo.alt}
                  fill
                  sizes="40vw"
                  className="object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "scale(1)" : "scale(1.06)",
                  }}
                />
              ))}
            </div>
            <p className="mt-5 text-[0.75rem] font-light text-stone">
              Pricing varies with length, density and condition.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile: image-led stack                                           */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-16 space-y-4 md:hidden">
          {serviceCategories.map((category, i) => (
            <Reveal key={category.id} variant="up" delay={i * 70}>
              <Link
                href={`/services#${category.id}`}
                className="zoom-frame relative block aspect-16/10"
              >
                <Image
                  src={photoSrc(category.photo, 900)}
                  alt={category.photo.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/75 to-ink/5" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <span>
                    <span className="eyebrow block text-bronze-lite">{category.index}</span>
                    <span className="display-sm mt-2.5 block text-ivory">{category.name}</span>
                  </span>
                  <span className="label-ui shrink-0 pb-1 text-ivory/70">View</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
