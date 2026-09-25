import Image from "next/image";
import { DisplayLines, Reveal } from "@/components/ui/Reveal";
import { photoSrc, type Photo } from "@/data/images";
import type { ReactNode } from "react";

/**
 * The masthead every inner page opens on: a cropped photographic band with the
 * page title at display scale. Carries `data-hero-dark` so the header keeps its
 * light theme until you scroll past it.
 */
export function PageHeader({
  eyebrow,
  lines,
  photo,
  lede,
  children,
  height = "tall",
}: {
  eyebrow: string;
  lines: ReactNode[];
  photo: Photo;
  lede?: string;
  children?: ReactNode;
  height?: "tall" | "short";
}) {
  return (
    <section
      data-hero-dark
      className={`relative flex items-end overflow-hidden bg-ink ${
        height === "tall" ? "min-h-[78svh]" : "min-h-[58svh]"
      }`}
    >
      <Image
        src={photoSrc(photo, 2000, 82)}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
        style={{ objectPosition: photo.focus ?? "50% 40%" }}
      />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />

      <div className="relative w-full gutter pt-36 pb-14 text-ivory md:pb-20">
        <Reveal variant="fade" delay={150}>
          <p className="eyebrow text-ivory/65">{eyebrow}</p>
        </Reveal>

        <h1 className="mt-7 md:mt-9">
          <DisplayLines lines={lines} className="display-lg" delay={280} stagger={120} />
        </h1>

        {lede && (
          <Reveal variant="up" delay={620} className="mt-10 max-w-lg border-t border-ivory/20 pt-7">
            <p className="body-lede text-ivory/80">{lede}</p>
          </Reveal>
        )}

        {children}
      </div>
    </section>
  );
}
