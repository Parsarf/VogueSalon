import { Figure } from "@/components/ui/Figure";
import { DisplayLines, Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { introPhoto } from "@/data/images";

/**
 * The editorial statement. Deliberately short — three sentences of position,
 * not a mission statement. The old brand's values are carried in the substance,
 * not quoted.
 */
export function Intro() {
  return (
    <Section id="intro">
      <div className="gutter">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7 lg:col-span-6">
            <Reveal variant="fade" className="border-t border-ink/12 pt-4">
              <span className="eyebrow text-ash">The salon</span>
            </Reveal>

            <DisplayLines
              lines={["Individual hair,", <em key="a" className="italic-display">considered</em>, "with intention."]}
              className="display-lg mt-12 md:mt-16"
              stagger={120}
            />

            <Reveal variant="up" delay={160} className="mt-12 max-w-lg md:mt-16">
              <p className="body-lede text-charcoal">
                We are a small team of hairdressers on South Coast Highway, working the way the
                craft is supposed to be worked: one head of hair at a time, with the technique to
                back the idea up.
              </p>
              <p className="mt-6 text-[0.95rem] leading-[1.85] text-ash">
                Our education never closed. Our colorists train with the houses whose products we
                carry, our cutters trained in the traditions they still use, and the work that
                leaves this room is built for your texture, your face and the ten minutes you
                actually have in the morning.
              </p>

              <div className="mt-11 flex flex-wrap gap-x-10 gap-y-4">
                <TextLink href="/about">Our story</TextLink>
                <TextLink href="/services">Services &amp; pricing</TextLink>
              </div>
            </Reveal>
          </div>

          {/* Offset column — the image hangs lower than the type it sits beside. */}
          <div className="md:col-span-5 md:col-start-9 lg:col-start-8 lg:col-span-5">
            <Figure
              photo={introPhoto}
              ratio="3/4"
              width={900}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="md:mt-32 lg:mt-44"
              delay={120}
            />
            <Reveal variant="fade" delay={400} className="mt-5">
              <p className="text-[0.75rem] leading-relaxed font-light text-ash">
                Placeholder imagery. Final photography to be shot on location.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
