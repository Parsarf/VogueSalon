import Image from "next/image";
import { heroPhoto, photoSrc } from "@/data/images";
import { site } from "@/data/site";
import { BookButton, LinkButton } from "@/components/ui/Actions";
import { DisplayLines, Reveal } from "@/components/ui/Reveal";

/**
 * One cinematic frame, a wordmark at campaign scale, and two actions. Nothing
 * else — the first screen has to read as a fashion campaign, not a homepage.
 *
 * `data-hero-dark` tells the header to run in its light theme while this is on
 * screen.
 */
export function Hero() {
  return (
    <section data-hero-dark className="relative h-[100svh] min-h-[38rem] w-full overflow-hidden bg-ink">
      <Image
        src={photoSrc(heroPhoto, 2200, 84)}
        alt={heroPhoto.alt}
        fill
        priority
        sizes="100vw"
        className="hero-drift object-cover"
        style={{ objectPosition: heroPhoto.focus }}
      />

      {/* Two separate scrims: one to seat the header, one to hold the type.
          The lower one runs heavier on mobile, where the type block is taller
          and reaches further up into the lit part of the frame. */}
      <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-ink/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/5 md:from-ink/80 md:via-ink/15 md:to-transparent" />

      <div className="relative flex h-full flex-col justify-end gutter pb-14 text-ivory md:pb-20">
        <Reveal variant="fade" delay={300}>
          <p className="eyebrow text-ivory/70">
            Est. {site.established} · South Coast Highway
          </p>
        </Reveal>

        <h1 className="mt-7 md:mt-9">
          <span className="sr-only">
            {site.name} — {site.tagline}
          </span>
          <span aria-hidden="true">
            <DisplayLines
              lines={["VOGUE", <span key="l" className="italic-display">Laguna Beach</span>]}
              className="display-xl"
              delay={420}
              stagger={140}
            />
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 border-t border-ivory/20 pt-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <Reveal variant="up" delay={900} className="max-w-md">
            <p className="display-sm">Hair, considered differently.</p>
            <p className="eyebrow mt-5 text-ivory/60">
              Cut · Color · Texture · Extensions
            </p>
          </Reveal>

          <Reveal variant="up" delay={1050} className="flex flex-wrap gap-3">
            <BookButton tone="ivory" variant="solid">
              Book an appointment
            </BookButton>
            <LinkButton href="/artists" tone="ivory" variant="outline">
              Meet the artists
            </LinkButton>
          </Reveal>
        </div>
      </div>

      {/* Scroll hint — a line that fills and empties, nothing more. */}
      <div className="pointer-events-none absolute right-[max(1.25rem,5vw)] bottom-14 hidden h-16 w-px bg-ivory/20 md:block">
        <span className="scroll-hint block h-full w-full bg-ivory/80" />
      </div>
    </section>
  );
}
