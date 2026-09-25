"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { photoSrc, type Photo } from "@/data/images";
import { useInView } from "./Reveal";

type FigureProps = {
  photo: Photo;
  /** CSS aspect-ratio, e.g. "3/4". Omit to fill the parent. */
  ratio?: string;
  /** Source width requested from the image host. */
  width?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Adds the hover push-in. Off for decorative or non-interactive imagery. */
  zoom?: boolean;
  /** Curtain-wipe on entry. Off for above-the-fold imagery. */
  reveal?: boolean;
  delay?: number;
  sizes?: string;
  children?: React.ReactNode;
};

/**
 * The single image primitive for the site: curtain reveal, slow settle out of a
 * push-in, optional hover zoom. Everything photographic goes through here so the
 * motion language stays identical across pages.
 */
export function Figure({
  photo,
  ratio,
  width = 1200,
  priority = false,
  className = "",
  imageClassName = "",
  zoom = true,
  reveal = true,
  delay = 0,
  sizes = "100vw",
  children,
}: FigureProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const revealed = !reveal || inView;

  return (
    <div
      ref={ref}
      className={`relative bg-bone ${zoom ? "zoom-frame" : "overflow-hidden"} ${className}`}
      style={{
        aspectRatio: ratio,
        ...(delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : {}),
      }}
      data-reveal={reveal ? "mask" : undefined}
      data-revealed={revealed ? "true" : "false"}
    >
      <Image
        src={photoSrc(photo, width)}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${reveal ? "img-settle" : ""} ${imageClassName}`}
        style={{ objectPosition: photo.focus ?? "50% 50%" }}
      />
      {children}
    </div>
  );
}

/**
 * Wraps a Figure in a slow vertical drift tied to scroll position. Deliberately
 * shallow — the effect should register as depth, not as movement.
 */
export function Parallax({
  children,
  strength = 0.12,
  className = "",
}: {
  children: React.ReactNode;
  /** Fraction of the element's height it travels across the full pass. */
  strength?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewport) return;

      // -1 when the element is entering from below, +1 once it has left the top.
      const progress = (viewport / 2 - (rect.top + rect.height / 2)) / (viewport / 2 + rect.height / 2);
      setOffset(progress * strength * rect.height);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div ref={hostRef} className={`overflow-hidden ${className}`}>
      <div
        className="h-full w-full will-change-transform"
        style={{ transform: `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.18)` }}
      >
        {children}
      </div>
    </div>
  );
}
