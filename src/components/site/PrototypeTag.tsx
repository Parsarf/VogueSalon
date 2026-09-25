"use client";

import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingContext";

/**
 * A quiet, dismissible marker so nobody mistakes this build for the live site.
 * Deliberately small and out of the composition — it should not affect how the
 * design reads in review.
 */
export function PrototypeTag() {
  const [dismissed, setDismissed] = useState(false);
  const [past, setPast] = useState(false);
  const { isOpen } = useBooking();

  // Held back until the hero is behind you — it must not sit in the first
  // impression it is describing.
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || isOpen || !past) return null;

  return (
    <div className="animate-fade-in pointer-events-none fixed right-5 bottom-5 z-[120] hidden lg:block">
      <button
        onClick={() => setDismissed(true)}
        className="label-ui pointer-events-auto cursor-pointer border border-ink/15 bg-ivory/80 px-4 py-2.5 text-[0.58rem] text-ash backdrop-blur-sm transition-colors duration-500 hover:border-ink/35 hover:text-ink"
        title="Dismiss"
      >
        Design prototype · placeholder imagery
      </button>
    </div>
  );
}
