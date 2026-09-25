import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { artists, getArtist } from "@/data/artists";
import { getCategory, formatPrice, pricingDisclaimers } from "@/data/services";
import { photoSrc } from "@/data/images";
import { Figure } from "@/components/ui/Figure";
import { DisplayLines, Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { BookButton, TextLink } from "@/components/ui/Actions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = getArtist((await params).slug);
  if (!artist) return { title: "Artist" };
  return {
    title: `${artist.name} — ${artist.role}`,
    description: artist.philosophy,
  };
}

export default async function ArtistProfile({ params }: Props) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const index = artists.findIndex((a) => a.slug === slug);
  const next = artists[(index + 1) % artists.length];

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Split masthead — type on the left, the portrait holding the right.   */}
      {/* ------------------------------------------------------------------ */}
      <section
        data-hero-dark
        className="relative grid min-h-[92svh] grid-cols-1 bg-ink text-ivory lg:grid-cols-2"
      >
        <div className="relative order-2 min-h-[60svh] overflow-hidden lg:order-1 lg:min-h-full">
          <Image
            src={photoSrc(artist.portrait, 1400, 84)}
            alt={artist.portrait.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="hero-drift object-cover"
            style={{ objectPosition: artist.portrait.focus ?? "50% 28%" }}
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/60 to-transparent lg:hidden" />
        </div>

        <div className="order-1 flex flex-col justify-end gutter pt-36 pb-16 lg:order-2 lg:justify-center lg:py-32">
          <Reveal variant="fade" delay={120}>
            <Link href="/artists" className="label-ui link-draw text-stone">
              ← All artists
            </Link>
          </Reveal>

          {/* Surname set a size down so long names still fit the column. */}
          <h1 className="mt-10 lg:mt-12">
            <DisplayLines
              lines={[
                <span key="f" className="display-lg block">
                  {artist.firstName}
                </span>,
                <em key="s" className="italic-display display-md block text-stone">
                  {artist.name.split(" ").slice(1).join(" ")}
                </em>,
              ]}
              delay={260}
              stagger={120}
            />
          </h1>

          <Reveal variant="up" delay={620} className="mt-9 border-t border-ivory/20 pt-7">
            <p className="eyebrow text-bronze-lite">{artist.role}</p>
            <p className="display-sm mt-7 max-w-md">
              <span className="italic-display text-stone">&ldquo;</span>
              {artist.philosophy}
              <span className="italic-display text-stone">&rdquo;</span>
            </p>
          </Reveal>

          <Reveal variant="up" delay={760} className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <BookButton
              tone="ivory"
              variant="solid"
              prefill={{ artistSlug: artist.slug }}
            >
              Book with {artist.firstName}
            </BookButton>
            {/* Handle shown, not linked — these are prototype handles. */}
            <span className="label-ui text-stone" title="Instagram link placeholder">
              {artist.instagram}
            </span>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Bio and specialties                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="gutter grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal variant="fade" className="border-t border-ink/12 pt-4">
              <span className="eyebrow text-ash">In practice</span>
            </Reveal>
            <Reveal variant="up" delay={100} className="mt-10">
              <p className="body-lede max-w-xl text-charcoal">{artist.bio}</p>
              {artist.source === "placeholder" && (
                <p className="mt-7 max-w-xl border-l border-bronze/40 pl-5 text-[0.75rem] leading-relaxed font-light text-ash">
                  Prototype biography. Replace with {artist.firstName}&rsquo;s own words before
                  launch — the layout is built for roughly this length.
                </p>
              )}
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal variant="fade" className="border-t border-ink/12 pt-4">
              <span className="eyebrow text-ash">Specialties</span>
            </Reveal>
            <ul className="mt-8">
              {artist.specialties.map((s, i) => (
                <Reveal
                  as="li"
                  key={s}
                  variant="up"
                  delay={i * 80}
                  className="border-b border-ink/10 py-4"
                >
                  <span className="display-sm">{s}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Portfolio                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="bone" className="pt-0 md:pt-0">
        <div className="gutter pt-24 md:pt-32">
          <SectionHead eyebrow="Selected work">
            <h2 className="display-md">
              {artist.firstName}&rsquo;s
              <span className="italic-display"> portfolio</span>
            </h2>
          </SectionHead>

          <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-10 md:mt-24 md:gap-x-6 md:gap-y-0">
            <Figure
              photo={artist.portfolio[0]}
              ratio="2/3"
              width={1000}
              className="col-span-7 md:col-span-4"
              sizes="(max-width: 768px) 58vw, 30vw"
            />
            <Figure
              photo={artist.portfolio[1]}
              ratio="3/4"
              width={900}
              delay={90}
              className="col-span-5 md:col-span-3 md:mt-40"
              sizes="(max-width: 768px) 40vw, 24vw"
            />
            <Figure
              photo={artist.portfolio[2]}
              ratio="4/5"
              width={900}
              delay={40}
              className="col-span-6 col-start-4 md:col-span-3 md:col-start-8 md:-mt-8"
              sizes="(max-width: 768px) 50vw, 24vw"
            />
            <Figure
              photo={artist.portfolio[3]}
              ratio="3/2"
              width={1200}
              delay={130}
              className="col-span-12 md:col-span-9 md:col-start-4 md:mt-16"
              sizes="(max-width: 768px) 92vw, 70vw"
            />
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Services this artist offers                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="gutter">
          <SectionHead eyebrow="Book with" aside={<TextLink href="/services">All services</TextLink>}>
            <h2 className="display-md">
              What {artist.firstName}
              <br />
              <span className="italic-display">offers.</span>
            </h2>
          </SectionHead>

          <div className="mt-16 md:mt-24">
            {artist.offers.map((categoryId) => {
              const category = getCategory(categoryId);
              if (!category) return null;
              return (
                <div key={categoryId} className="mb-16 last:mb-0">
                  <Reveal variant="fade" className="flex items-baseline gap-5 border-t border-ink/12 pt-4">
                    <span className="eyebrow text-bronze">{category.index}</span>
                    <span className="eyebrow text-ash">{category.name}</span>
                  </Reveal>

                  <ul className="mt-6">
                    {category.services.map((service, i) => (
                      <Reveal
                        as="li"
                        key={service.id}
                        variant="up"
                        delay={i * 50}
                        className="group grid grid-cols-12 items-baseline gap-4 border-b border-ink/10 py-6"
                      >
                        <div className="col-span-12 sm:col-span-6">
                          <h3 className="display-sm">{service.name}</h3>
                          <p className="mt-2 text-[0.8rem] font-light text-ash">
                            {service.description} · {service.duration} min
                          </p>
                        </div>
                        <div className="col-span-6 sm:col-span-3 sm:text-right">
                          <span className="label-ui text-ash">{formatPrice(service)}</span>
                        </div>
                        <div className="col-span-6 sm:col-span-3 flex justify-end">
                          <BookButton
                            variant="outline"
                            size="compact"
                            prefill={{ serviceId: service.id, artistSlug: artist.slug }}
                          >
                            Book
                          </BookButton>
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <Reveal variant="fade" className="mt-14 max-w-2xl border-t border-ink/12 pt-6">
            {artist.priceNote && (
              <p className="mb-3 text-[0.8rem] font-light text-charcoal">{artist.priceNote}</p>
            )}
            <p className="text-[0.75rem] leading-relaxed font-light text-ash">
              {pricingDisclaimers[0]}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Next artist                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Link href={`/artists/${next.slug}`} className="group block bg-ink text-ivory">
        <div className="gutter flex flex-col gap-10 py-20 md:flex-row md:items-center md:justify-between md:py-28">
          <div>
            <p className="eyebrow text-stone">Next artist</p>
            <p className="display-md mt-6 transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3">
              {next.name}
            </p>
            <p className="eyebrow mt-5 text-stone">{next.role}</p>
          </div>
          <div className="zoom-frame relative h-56 w-40 shrink-0 md:h-72 md:w-56">
            <Image
              src={photoSrc(next.portrait, 600)}
              alt={next.portrait.alt}
              fill
              sizes="15vw"
              className="object-cover"
              style={{ objectPosition: next.portrait.focus ?? "50% 28%" }}
            />
          </div>
        </div>
      </Link>
    </>
  );
}
