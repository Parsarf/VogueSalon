"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

export type RevealVariant = "fade" | "up" | "rise" | "mask" | "mask-side" | "none";

/**
 * Flips `data-revealed` once the element has entered the viewport, and leaves it
 * flipped. Everything visual lives in globals.css so reduced-motion users get
 * the finished state with no JS branch.
 */
export function useInView<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    // Anything already on screen at mount reveals immediately rather than
    // waiting for a scroll that may never come (short pages, deep links).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, options?.threshold, options?.rootMargin]);

  return { ref, inView };
}

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  /** Milliseconds. Used to stagger siblings. */
  delay?: number;
  threshold?: number;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>;

export function Reveal({
  as = "div",
  variant = "up",
  delay = 0,
  threshold,
  className,
  children,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold });

  return createElement(
    as,
    {
      ref,
      className,
      "data-reveal": variant === "none" ? undefined : variant,
      "data-revealed": inView ? "true" : "false",
      style: delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined,
      ...rest,
    },
    children,
  );
}

/**
 * Display type that lifts line by line from behind its own mask. Pass the copy
 * pre-broken so the line breaks stay art-directed rather than left to reflow.
 */
export function DisplayLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 110,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });

  // Rendered as a <span> so it stays valid phrasing content inside <h1>/<h2>.
  return (
    <span
      ref={ref}
      data-revealed={inView ? "true" : "false"}
      className={`block ${className ?? ""}`}
    >
      {lines.map((line, i) => (
        <span key={i} className={`line-mask ${lineClassName ?? ""}`}>
          <span style={{ "--reveal-delay": `${delay + i * stagger}ms` } as React.CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
