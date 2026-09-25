"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/ui/Actions";
import { formatPrice, serviceCategories } from "@/data/services";
import { photoSrc } from "@/data/images";

/**
 * Pricing as an editorial index rather than a menu: oversized category type on
 * hairline rules, with the detail expanding underneath. Only one category is
 * open at a time so the page never becomes a wall of numbers.
 */
export function ServicesExplorer() {
  const [open, setOpen] = useState<string>(serviceCategories[0].id);

  return (
    <div className="gutter">
      {serviceCategories.map((category) => {
        const expanded = open === category.id;

        return (
          <section
            key={category.id}
            id={category.id}
            className="border-t border-ink/15 scroll-mt-24 last:border-b"
          >
            <h2>
              <button
                onClick={() => setOpen(expanded ? "" : category.id)}
                aria-expanded={expanded}
                className="group flex w-full cursor-pointer items-center gap-6 py-10 text-left md:gap-10 md:py-14"
              >
                <span
                  className={`eyebrow w-8 shrink-0 transition-colors duration-700 ${
                    expanded ? "text-bronze" : "text-ash"
                  }`}
                >
                  {category.index}
                </span>

                {/* Sized a step under display-lg so "Texture & Treatments"
                    still clears the toggle at narrow desktop widths. */}
                <span
                  className={`display-lg flex-1 text-[clamp(2.2rem,6.4vw,6.25rem)] transition-[color,transform] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                    expanded
                      ? "translate-x-0 text-ink"
                      : "translate-x-0 text-ink/35 group-hover:translate-x-2 group-hover:text-ink"
                  }`}
                >
                  {category.name}
                </span>

                {/* Plus that rotates into a minus. */}
                <span className="relative block h-4 w-4 shrink-0" aria-hidden>
                  <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                  <span
                    className={`absolute top-0 left-1/2 h-full w-px bg-current transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                      expanded ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h2>

            <div
              className="grid transition-[grid-template-rows] duration-[800ms] ease-[cubic-bezier(.62,.05,.01,.99)]"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="grid gap-12 pb-16 md:grid-cols-12 md:gap-8 md:pb-24">
                  {/* Category image and framing copy */}
                  <div className="md:col-span-4 md:pl-14">
                    <div className="zoom-frame relative aspect-3/4">
                      <Image
                        src={photoSrc(category.photo, 900)}
                        alt={category.photo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-6 text-[0.95rem] leading-[1.85] text-ash">
                      {category.intro}
                    </p>
                  </div>

                  {/* The list */}
                  <div className="md:col-span-7 md:col-start-6">
                    <ul>
                      {category.services.map((service) => (
                        <li
                          key={service.id}
                          className="grid grid-cols-12 items-baseline gap-x-4 gap-y-4 border-b border-ink/10 py-7"
                        >
                          <div className="col-span-12 sm:col-span-7">
                            <h3 className="display-sm">{service.name}</h3>
                            <p className="mt-2.5 text-[0.82rem] font-light text-ash">
                              {service.description}
                            </p>
                          </div>

                          <div className="col-span-6 sm:col-span-2 sm:text-right">
                            <span className="label-ui block text-charcoal">
                              {formatPrice(service)}
                            </span>
                            <span className="mt-2 block text-[0.72rem] font-light text-stone sm:text-right">
                              {service.duration} min
                            </span>
                          </div>

                          <div className="col-span-6 sm:col-span-3 flex justify-end">
                            <BookButton
                              variant="outline"
                              size="compact"
                              prefill={{ serviceId: service.id, categoryId: category.id }}
                            >
                              Book
                            </BookButton>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <Reveal variant="fade" className="mt-10">
                      <BookButton prefill={{ categoryId: category.id }}>
                        Book {category.name.toLowerCase()}
                      </BookButton>
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
