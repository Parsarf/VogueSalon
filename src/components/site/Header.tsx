"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/data/site";
import { useBooking } from "@/components/booking/BookingContext";

/**
 * The header runs in two themes. It is transparent with ivory type while a
 * `data-hero-dark` region still sits behind it, and resolves to ivory-on-ink
 * type once that region scrolls away. It also retracts on downward scroll so
 * full-bleed photography is never permanently cropped by a bar.
 */
export function Header() {
  const pathname = usePathname();
  const { open } = useBooking();

  const [overHero, setOverHero] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme: follow the dark hero if this page has one.
  useEffect(() => {
    setMenuOpen(false);

    const hero = document.querySelector("[data-hero-dark]");
    if (!hero) {
      setOverHero(false);
      return;
    }

    setOverHero(true);
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-88px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  // Retraction: hide on the way down, return on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 420 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const light = overHero && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[150] transition-[transform,background-color,color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          menuOpen
            ? "bg-transparent text-ivory"
            : light
              ? "bg-transparent text-ivory"
              : "bg-ivory/92 text-ink backdrop-blur-md"
        }`}
      >
        {/* Hairline that only exists once the header has a ground of its own. */}
        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-ink/10 transition-opacity duration-700 ${
            light || menuOpen ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="flex items-center justify-between gutter py-5 md:py-6">
          <Link href="/" className="group shrink-0" aria-label={`${site.name} — home`}>
            <span className="block font-[family-name:var(--font-display)] text-[1.35rem] leading-none tracking-[0.06em] md:text-[1.6rem]">
              VOGUE
            </span>
            <span className="eyebrow mt-1.5 block opacity-70 transition-opacity duration-500 group-hover:opacity-100">
              Laguna Beach
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`label-ui link-draw transition-opacity duration-500 ${
                  pathname.startsWith(item.href) ? "link-drawn opacity-100" : "opacity-65 hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={() => open()}
              className={`label-ui hidden cursor-pointer border px-6 py-3.5 transition-[background-color,color,border-color] duration-600 sm:inline-flex ${
                light
                  ? "border-ivory/45 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink"
                  : "border-ink bg-ink text-ivory hover:border-bronze hover:bg-bronze"
              }`}
            >
              Book
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="label-ui relative z-10 flex cursor-pointer items-center gap-3 lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span className="flex h-3 w-6 flex-col justify-between">
                <span
                  className={`block h-px w-full bg-current transition-transform duration-500 ${
                    menuOpen ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-transform duration-500 ${
                    menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile menu                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div
        className={`fixed inset-0 z-[140] bg-ink text-ivory transition-[opacity,visibility] duration-600 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between gutter pt-32 pb-12">
          <nav aria-label="Mobile">
            <ul>
              {navigation.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-ivory/12">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-5 transition-transform duration-[900ms] ease-[cubic-bezier(.62,.05,.01,.99)]"
                    style={{
                      transform: menuOpen ? "translateY(0)" : "translateY(110%)",
                      transitionDelay: `${menuOpen ? 120 + i * 70 : 0}ms`,
                    }}
                  >
                    <span className="display-md">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="transition-opacity duration-700"
            style={{ opacity: menuOpen ? 1 : 0, transitionDelay: menuOpen ? "520ms" : "0ms" }}
          >
            {/* The bottom bar is behind this overlay, so booking needs its own
                door out of the menu. */}
            <button
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
              className="label-ui mb-9 w-full cursor-pointer border border-ivory bg-ivory py-5 indent-[0.22em] text-ink"
            >
              Book an appointment
            </button>

            <a href={site.phone.href} className="label-ui link-draw">
              {site.phone.display}
            </a>
            <p className="mt-5 text-[0.85rem] leading-relaxed font-light text-stone">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
