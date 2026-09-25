import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import type { Artist } from "@/data/artists";

/**
 * The one artist card used on the homepage and across the directory. Hover
 * lifts the name, draws a bronze rule and brings up "View artist" — the
 * movement is small on purpose; the photograph does the work.
 */
export function ArtistCard({
  artist,
  delay = 0,
  ratio = "3/4",
  className = "",
  showSpecialties = true,
}: {
  artist: Artist;
  delay?: number;
  ratio?: string;
  className?: string;
  showSpecialties?: boolean;
}) {
  return (
    <Link href={`/artists/${artist.slug}`} className={`group block ${className}`}>
      <Figure
        photo={artist.portrait}
        ratio={ratio}
        width={1000}
        delay={delay}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
        imageClassName="grayscale-[18%] transition-[filter,transform] duration-[1200ms] group-hover:grayscale-0"
      >
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end p-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <span className="label-ui bg-ivory/92 px-4 py-2.5 text-ink backdrop-blur-sm">
            View artist
          </span>
        </span>
      </Figure>

      <div className="relative mt-5 pb-5">
        <h3 className="display-sm transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-0.5">
          {artist.name}
        </h3>
        <p className="eyebrow mt-3 text-ash">{artist.role}</p>

        {showSpecialties && (
          <p className="mt-4 text-[0.82rem] leading-relaxed font-light text-ash">
            {artist.specialties.join(" · ")}
          </p>
        )}

        {/* Hairline that redraws in bronze on hover. */}
        <span className="absolute inset-x-0 bottom-0 h-px bg-current opacity-10" />
        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-bronze transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
      </div>
    </Link>
  );
}
