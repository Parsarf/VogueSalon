import Link from "next/link";
import { cityLine, footerLegal, formattedAddress, navigation, site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="gutter pt-24 pb-10 md:pt-32">
        {/* The wordmark, set oversized and cropped tight to the baseline. */}
        <Reveal variant="fade" className="border-b border-ivory/12 pb-12 md:pb-16">
          <p className="display-lg leading-[0.8]">
            VOGUE
            <br />
            <span className="italic-display text-ivory/45">Laguna Beach</span>
          </p>
        </Reveal>

        <div className="grid gap-12 pt-12 md:grid-cols-12 md:gap-8 md:pt-16">
          <div className="md:col-span-4">
            <h2 className="eyebrow text-stone">Visit</h2>
            <address className="mt-6 text-[0.95rem] leading-[1.9] font-light not-italic">
              {formattedAddress}
              <br />
              {cityLine}
            </address>
            <a href={site.phone.href} className="label-ui link-draw mt-6 inline-block">
              {site.phone.display}
            </a>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-stone">Explore</h2>
            <ul className="mt-6 space-y-3.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw text-[0.95rem] font-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-stone">Follow</h2>
            <ul className="mt-6 space-y-3.5">
              <li>
                <a
                  href={site.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-[0.95rem] font-light"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-[0.95rem] font-light"
                >
                  Yelp
                </a>
              </li>
            </ul>
            <p className="mt-6 text-[0.78rem] font-light text-stone">
              {site.social.instagram.handle}
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="eyebrow text-stone">Hours</h2>
            <ul className="mt-6 space-y-2">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 text-[0.78rem] font-light">
                  <span className="text-stone">{h.day.slice(0, 3)}</span>
                  <span className={h.open === "Closed" ? "text-ivory/35" : ""}>{h.open}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-ivory/12 pt-8 text-[0.72rem] font-light text-stone md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Vogue Salon Laguna Beach</p>
          <ul className="flex gap-8">
            {footerLegal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-draw">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
