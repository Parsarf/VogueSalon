import { ArtistCard } from "@/components/artists/ArtistCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { artists } from "@/data/artists";

/**
 * Artist discovery is the conversion engine for a salon — people book a person,
 * not a service. Four here, offset so the row never reads as a grid, and a
 * direct route into the full directory.
 */
export function ArtistsPreview() {
  const featured = artists.slice(0, 4);

  return (
    <Section id="artists">
      <div className="gutter">
        <SectionHead
          eyebrow="The team"
          index="III"
          aside={<TextLink href="/artists">All artists</TextLink>}
        >
          <h2 className="display-lg">
            Meet the
            <br />
            <span className="italic-display">artists.</span>
          </h2>
        </SectionHead>

        <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-14 md:mt-28 md:grid-cols-4 md:gap-x-6">
          {featured.map((artist, i) => (
            <ArtistCard
              key={artist.slug}
              artist={artist}
              delay={i * 90}
              // Staggered baselines: every second card hangs lower.
              className={i % 2 === 1 ? "md:mt-20" : ""}
            />
          ))}
        </div>

        <Reveal variant="up" className="mt-20 border-t border-ink/12 pt-8 md:mt-28">
          <p className="max-w-xl text-[0.95rem] leading-[1.85] text-ash">
            Not sure who to see? Tell us what you want and we will match you. Every first visit
            starts with a consultation, whoever you sit with.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
