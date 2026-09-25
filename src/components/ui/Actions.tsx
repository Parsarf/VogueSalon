"use client";

import Link from "next/link";
import { useBooking, type BookingPrefill } from "@/components/booking/BookingContext";

type Tone = "ink" | "ivory";

/**
 * Two button treatments, both hairline-bordered. `solid` is reserved for the
 * single booking action in any given view; everything else is `outline`.
 */
export const buttonClass = (
  variant: "solid" | "outline",
  tone: Tone = "ink",
  extra = "",
  size: "default" | "compact" = "default",
) => {
  // The text-indent compensates for the trailing letter-space on tracked caps,
  // which would otherwise sit the label a hair left of optical centre.
  const base =
    `label-ui inline-flex items-center justify-center border cursor-pointer indent-[0.22em] ${
      size === "compact" ? "px-5 py-3.5" : "px-8 py-4.5"
    } transition-[background-color,color,border-color] duration-600 ease-[cubic-bezier(.16,1,.3,1)]`;

  const tones = {
    solid: {
      ink: "border-ink bg-ink text-ivory hover:bg-bronze hover:border-bronze",
      ivory: "border-ivory bg-ivory text-ink hover:bg-bronze-lite hover:border-bronze-lite",
    },
    outline: {
      ink: "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
      ivory: "border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
    },
  } as const;

  return `${base} ${tones[variant][tone]} ${extra}`;
};

/** Opens the prototype booking overlay, optionally pre-answering a step. */
export function BookButton({
  children = "Book an appointment",
  prefill,
  variant = "solid",
  tone = "ink",
  size = "default",
  className = "",
}: {
  children?: React.ReactNode;
  prefill?: BookingPrefill;
  variant?: "solid" | "outline";
  tone?: Tone;
  size?: "default" | "compact";
  className?: string;
}) {
  const { open } = useBooking();
  return (
    <button onClick={() => open(prefill)} className={buttonClass(variant, tone, className, size)}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  variant = "outline",
  tone = "ink",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  tone?: Tone;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, tone, className)}>
      {children}
    </Link>
  );
}

/** The tracked-caps text link with the draw-in rule. */
export function TextLink({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `label-ui link-draw ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
