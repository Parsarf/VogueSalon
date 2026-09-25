import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * The standing section header: a numbered eyebrow on a hairline rule, with the
 * display headline dropped beneath it. Used on every page so the rhythm is
 * identical throughout.
 */
export function SectionHead({
  eyebrow,
  index,
  children,
  aside,
  tone = "ink",
  className = "",
}: {
  eyebrow: string;
  index?: string;
  children: ReactNode;
  aside?: ReactNode;
  tone?: "ink" | "ivory";
  className?: string;
}) {
  const rule = tone === "ivory" ? "border-ivory/15" : "border-ink/12";
  const muted = tone === "ivory" ? "text-stone" : "text-ash";

  return (
    <div className={className}>
      <Reveal
        variant="fade"
        className={`flex items-baseline justify-between gap-6 border-t ${rule} pt-4`}
      >
        <span className={`eyebrow ${muted}`}>{eyebrow}</span>
        {index && <span className={`eyebrow ${muted} tabular-nums`}>{index}</span>}
      </Reveal>

      <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="min-w-0">{children}</div>
        {aside && <div className="shrink-0 md:pb-3">{aside}</div>}
      </div>
    </div>
  );
}

/** Vertical rhythm. Sections are generous by default — space is the luxury. */
export function Section({
  children,
  className = "",
  tone,
  id,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "bone";
  id?: string;
} & Record<string, unknown>) {
  const ground =
    tone === "ink" ? "bg-ink text-ivory" : tone === "bone" ? "bg-bone text-ink" : "";

  return (
    <section
      id={id}
      className={`scroll-mt-20 py-24 md:py-36 lg:py-44 ${ground} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}
