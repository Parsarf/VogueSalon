import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { getWork, socialWorkIds } from "@/data/gallery";
import { photoSrc } from "@/data/images";
import { site } from "@/data/site";
import { getArtist } from "@/data/artists";

/**
 * A mocked social rail — not a live embed. Real feeds are slow, off-brand and
 * unpredictable; production should pull the images and render them in this
 * layout rather than dropping in a widget.
 */
export function FromTheChair() {
  const posts = socialWorkIds.map(getWork);

  return (
    <Section className="overflow-hidden" id="social">
      <div className="gutter">
        <SectionHead
          eyebrow="Latest work"
          index="IV"
          aside={
            <TextLink href={site.social.instagram.url} external>
              {site.social.instagram.handle}
            </TextLink>
          }
        >
          <h2 className="display-lg">
            From the
            <br />
            <span className="italic-display">chair.</span>
          </h2>
        </SectionHead>
      </div>

      {/* Full-bleed rail — swipes on touch, scrolls on trackpad. */}
      <Reveal variant="fade" className="mt-16 md:mt-24">
        <div className="rail overflow-x-auto pb-2">
          <ul className="flex w-max gap-3 px-[max(1.25rem,5vw)] md:gap-4">
            {posts.map((post) => {
              const artist = post.artist ? getArtist(post.artist) : null;
              return (
                <li key={post.id} className="w-[64vw] shrink-0 sm:w-[38vw] lg:w-[23vw]">
                  <div className="zoom-frame relative aspect-4/5">
                    <Image
                      src={photoSrc(post.photo, 800)}
                      alt={post.photo.alt}
                      fill
                      sizes="(max-width: 640px) 64vw, 24vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3.5 flex items-baseline justify-between gap-3">
                    <span className="truncate text-[0.8rem] font-light text-charcoal">
                      {post.title}
                    </span>
                    {artist && <span className="eyebrow shrink-0 text-ash">{artist.firstName}</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>

      <div className="gutter">
        <Reveal variant="fade" className="mt-10">
          <p className="text-[0.75rem] font-light text-ash">
            Mocked feed. Production will pull and cache real posts rather than embed a widget.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
