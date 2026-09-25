import Link from "next/link";
import { Figure, Parallax } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { getWork, type Work } from "@/data/gallery";
import { getArtist } from "@/data/artists";

/**
 * Six frames in an asymmetric magazine composition. The two columns run at
 * different heights and start at different baselines, so nothing lines up and
 * the eye has to travel — a uniform grid here would make the work read as a
 * feed instead of a portfolio.
 */
export function SelectedWork() {
  const [a, b, c, d, e, f] = ["w04", "w02", "w08", "w21", "w06", "w09"].map(getWork);

  return (
    <Section tone="bone" id="work">
      <div className="gutter">
        <SectionHead
          eyebrow="Selected work"
          index="I"
          aside={<TextLink href="/gallery">View the edit</TextLink>}
        >
          <h2 className="display-lg">
            The edit
            <span className="italic-display text-ash">.</span>
          </h2>
        </SectionHead>

        <div className="mt-20 md:mt-28">
          {/* Two columns, deliberately out of step with one another. */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
            <div className="col-span-2 md:col-span-5">
              <Plate work={a} ratio="2/3" width={1100} />
              <Plate work={d} ratio="4/5" width={1000} delay={80} className="mt-6 md:mt-24" />
            </div>

            <div className="col-span-2 md:col-span-4 md:col-start-8 md:mt-44 lg:mt-56">
              <Plate work={b} ratio="4/5" width={950} delay={120} />
              <Plate work={c} ratio="2/3" width={800} delay={60} className="mt-6 md:mt-20" />
            </div>
          </div>

          {/* A full-bleed band to break the columns, on a shallow parallax. */}
          <Reveal variant="fade" className="mt-16 md:mt-32">
            <Link href="/gallery" className="group block">
              <Parallax strength={0.1} className="h-[52vh] min-h-64 md:h-[76vh]">
                <Figure
                  photo={e.photo}
                  width={2000}
                  sizes="100vw"
                  className="h-full"
                  reveal={false}
                  zoom={false}
                />
              </Parallax>
              <Caption work={e} className="mt-5" />
            </Link>
          </Reveal>

          {/* Closing plate, pushed off the left edge of the column grid. */}
          <div className="grid grid-cols-12 md:gap-x-6">
            <div className="col-span-12 mt-12 md:col-span-7 md:col-start-6 md:mt-24">
              <Plate work={f} ratio="3/2" width={1300} delay={100} />
            </div>
          </div>
        </div>

        <Reveal variant="up" className="mt-24 flex justify-center md:mt-36">
          <Link href="/gallery" className="group flex flex-col items-center gap-5 text-center">
            <span className="display-md transition-colors duration-700 group-hover:text-bronze">
              Explore our work
            </span>
            <span className="h-10 w-px bg-ink/25 transition-[height] duration-700 group-hover:h-16" />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Plate({
  work,
  className = "",
  ratio,
  width,
  delay = 0,
}: {
  work: Work;
  className?: string;
  ratio: string;
  width: number;
  delay?: number;
}) {
  return (
    <Link href="/gallery" className={`group block ${className}`}>
      <Figure
        photo={work.photo}
        ratio={ratio}
        width={width}
        delay={delay}
        sizes="(max-width: 768px) 92vw, 40vw"
      />
      <Caption work={work} className="mt-4" />
    </Link>
  );
}

function Caption({ work, className = "" }: { work: Work; className?: string }) {
  const artist = work.artist ? getArtist(work.artist) : null;
  return (
    <div className={`flex items-baseline justify-between gap-4 ${className}`}>
      <span className="text-[0.82rem] font-light text-charcoal">{work.title}</span>
      {artist && <span className="eyebrow shrink-0 text-ash">{artist.firstName}</span>}
    </div>
  );
}
