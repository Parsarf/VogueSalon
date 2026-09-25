"use client";

import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingContext";
import { site } from "@/data/site";

/**
 * Most of this salon's traffic will arrive on a phone from Instagram or Google
 * Maps, so booking gets a permanent home at the bottom of the screen. It rises
 * once the hero is behind you and stays for the rest of the session.
 */
export function MobileBookBar() {
  const { open, isOpen } = useBooking();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[130] lg:hidden ${isOpen ? "hidden" : ""}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className={`flex items-stretch gap-px border-t border-ivory/10 bg-ink text-ivory transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
          shown ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={site.phone.href}
          className="label-ui flex flex-1 items-center justify-center border-r border-ivory/12 py-5 text-stone"
        >
          Call
        </a>
        <a
          href={site.address.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="label-ui flex flex-1 items-center justify-center border-r border-ivory/12 py-5 text-stone"
        >
          Directions
        </a>
        <button
          onClick={() => open()}
          className="label-ui flex flex-[1.3] cursor-pointer items-center justify-center bg-ivory py-5 text-ink"
        >
          Book
        </button>
      </div>
    </div>
  );
}
