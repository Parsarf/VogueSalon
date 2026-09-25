import { Figure, Parallax } from "@/components/ui/Figure";
import { DisplayLines, Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { craftPhotos } from "@/data/images";
import { site } from "@/data/site";

const pillars = [
  {
    n: "01",
    title: "Roots",
    body: "Vogue opened in Newport Beach in 1988, founded on the idea that serious hairdressers do better work in the same room. Laguna carries that forward on its own terms.",
  },
  {
    n: "02",
    title: "Education",
    body: "Sassoon, Wella, Bumble and bumble, New York colour intensives. The training never finished, which is the only reason the work still looks current.",
  },
  {
    n: "03",
    title: "Individuality",
    body: "We do not have a house look. We have a house standard — and then we cut for the person in the chair.",
  },
];

export function Philosophy() {
  return (
    <>
      {/* A single band of process photography, held wide and shallow. */}
      <Parallax strength={0.14} className="h-[50vh] min-h-64 md:h-[70vh]">
        <Figure
          photo={craftPhotos[1]}
          width={2200}
          sizes="100vw"
          className="h-full"
          reveal={false}
          zoom={false}
        />
      </Parallax>

      <Section tone="bone" id="philosophy">
        <div className="gutter">
          <div className="grid gap-16 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Reveal variant="fade" className="border-t border-ink/12 pt-4">
                <span className="eyebrow text-ash">Est. {site.established}</span>
              </Reveal>

              <DisplayLines
                lines={["Craft never", "stops", <em key="c" className="italic-display">evolving.</em>]}
                className="display-lg mt-12 md:mt-16"
                stagger={120}
              />

              <Reveal variant="up" delay={220} className="mt-12">
                <TextLink href="/about">Read the full story</TextLink>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <ul>
                {pillars.map((pillar, i) => (
                  <Reveal
                    as="li"
                    key={pillar.n}
                    variant="up"
                    delay={i * 110}
                    className="border-t border-ink/12 py-9 last:border-b"
                  >
                    <div className="flex gap-8">
                      <span className="eyebrow w-8 shrink-0 pt-1.5 text-bronze">{pillar.n}</span>
                      <div>
                        <h3 className="display-sm">{pillar.title}</h3>
                        <p className="mt-4 max-w-md text-[0.95rem] leading-[1.85] text-ash">
                          {pillar.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal variant="fade" delay={200} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {site.houses.map((house) => (
                  <span key={house} className="eyebrow text-ash">
                    {house}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
