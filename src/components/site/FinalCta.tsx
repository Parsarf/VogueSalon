import Image from "next/image";
import { BookButton } from "@/components/ui/Actions";
import { DisplayLines, Reveal } from "@/components/ui/Reveal";
import { heroAlt, photoSrc } from "@/data/images";
import { site } from "@/data/site";

/**
 * The closing conversion screen. One photograph, one line, one button.
 */
export function FinalCta() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-ink">
      <Image
        src={photoSrc(heroAlt, 2000, 82)}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-45"
        style={{ objectPosition: heroAlt.focus }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/25" />

      <div className="relative w-full gutter py-28 text-ivory md:py-40">
        <Reveal variant="fade" className="border-t border-ivory/20 pt-4">
          <span className="eyebrow text-stone">Appointments</span>
        </Reveal>

        <DisplayLines
          lines={["Ready for", <em key="w" className="italic-display">what&rsquo;s next?</em>]}
          className="display-lg mt-14 md:mt-20"
          stagger={130}
        />

        <Reveal variant="up" delay={280} className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5">
          <BookButton tone="ivory" variant="solid">
            Book your appointment
          </BookButton>
          <a href={site.phone.href} className="label-ui link-draw text-ivory">
            Or call {site.phone.display}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
