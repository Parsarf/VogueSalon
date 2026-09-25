import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { BookButton } from "@/components/ui/Actions";
import { cityLine, formattedAddress, site } from "@/data/site";
import { coastPhotos, interiorPhotos } from "@/data/images";

/**
 * The location block, shared by the homepage and the Visit page. `full` adds
 * the practical detail and the cancellation policy.
 */
export function VisitBlock({ full = false }: { full?: boolean }) {
  return (
    <Section tone="bone" id="visit">
      <div className="gutter">
        <SectionHead eyebrow="Visit" index={full ? undefined : "V"}>
          <h2 className="display-lg">
            1200 South
            <br />
            <span className="italic-display">Coast Highway.</span>
          </h2>
        </SectionHead>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
          {/* Photography */}
          <div className="md:col-span-7">
            <Figure
              photo={coastPhotos[0]}
              ratio="4/3"
              width={1600}
              sizes="(max-width: 768px) 100vw, 55vw"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Figure
                photo={interiorPhotos[0]}
                ratio="1/1"
                width={800}
                delay={80}
                sizes="(max-width: 768px) 46vw, 27vw"
              />
              <Figure
                photo={interiorPhotos[1]}
                ratio="1/1"
                width={800}
                delay={160}
                sizes="(max-width: 768px) 46vw, 27vw"
              />
            </div>
          </div>

          {/* Detail */}
          <div className="md:col-span-4 md:col-start-9">
            <Reveal variant="up">
              <address className="display-sm not-italic">
                {formattedAddress}
                <br />
                {cityLine}
              </address>

              <a
                href={site.phone.href}
                className="label-ui link-draw mt-7 inline-block text-ash"
              >
                {site.phone.display}
              </a>
            </Reveal>

            <MapPlate className="mt-10" />

            <Reveal variant="up" delay={120} className="mt-10">
              <h3 className="eyebrow border-t border-ink/12 pt-4 text-ash">Hours</h3>
              <ul className="mt-5">
                {site.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between gap-6 border-b border-ink/8 py-2.5 text-[0.85rem] font-light"
                  >
                    <span className="text-ash">{h.day}</span>
                    <span className={h.open === "Closed" ? "text-stone" : "text-charcoal"}>
                      {h.open}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {full && (
              <Reveal variant="up" delay={160} className="mt-10">
                <h3 className="eyebrow border-t border-ink/12 pt-4 text-ash">Good to know</h3>
                <dl className="mt-5">
                  {site.visiting.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between gap-6 border-b border-ink/8 py-2.5 text-[0.85rem] font-light"
                    >
                      <dt className="shrink-0 text-ash">{item.label}</dt>
                      <dd className="text-right text-charcoal">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            <Reveal variant="up" delay={200} className="mt-10 flex flex-col gap-3">
              <BookButton variant="solid" className="w-full">
                Book an appointment
              </BookButton>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={site.address.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-ui inline-flex items-center justify-center border border-ink/25 px-4 py-4 transition-colors duration-600 hover:border-ink hover:bg-ink hover:text-ivory"
                >
                  Directions
                </a>
                <a
                  href={site.phone.href}
                  className="label-ui inline-flex items-center justify-center border border-ink/25 px-4 py-4 transition-colors duration-600 hover:border-ink hover:bg-ink hover:text-ivory"
                >
                  Call
                </a>
              </div>
            </Reveal>

            {full && (
              <Reveal variant="fade" delay={240} className="mt-12 border-t border-ink/12 pt-6">
                <h3 className="eyebrow text-ash">Cancellations</h3>
                <p className="mt-4 text-[0.85rem] leading-[1.85] text-ash">
                  {site.cancellationPolicy}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * A drawn stand-in for the map, rather than a screenshot of one. Production
 * should drop an interactive map into this exact frame.
 */
function MapPlate({ className = "" }: { className?: string }) {
  return (
    <Reveal variant="fade" delay={80} className={className}>
      <a
        href={site.address.directions}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-4/3 overflow-hidden border border-ink/12 bg-sand/45"
        aria-label="Open in Google Maps"
      >
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Ocean side */}
          <path d="M0 232 L92 250 L178 238 L268 262 L400 244 L400 300 L0 300 Z" fill="#141312" opacity="0.055" />
          {/* Coast line */}
          <path
            d="M0 232 L92 250 L178 238 L268 262 L400 244"
            fill="none"
            stroke="#141312"
            strokeOpacity="0.28"
            strokeWidth="1"
          />
          {/* South Coast Highway */}
          <path
            d="M-10 196 L104 212 L192 200 L286 224 L410 206"
            fill="none"
            stroke="#9d7c4d"
            strokeWidth="2.25"
            opacity="0.85"
          />
          {/* Cross streets */}
          {[42, 96, 150, 204, 258, 312, 356].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={205 - i * 1.5}
              x2={x - 26}
              y2={48 + i * 6}
              stroke="#141312"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
          ))}
          {[70, 112, 154].map((y) => (
            <path
              key={y}
              d={`M0 ${y} L130 ${y - 12} L268 ${y + 6} L400 ${y - 8}`}
              fill="none"
              stroke="#141312"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          ))}
          {/* The salon */}
          <circle cx="192" cy="200" r="22" fill="#9d7c4d" opacity="0.14" />
          <circle cx="192" cy="200" r="5" fill="#141312" />
        </svg>

        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <span className="label-ui text-ink/70">Laguna Beach</span>
          <span className="label-ui bg-ivory/85 px-3.5 py-2.5 text-ink opacity-0 transition-opacity duration-600 group-hover:opacity-100">
            Open in Maps ↗
          </span>
        </span>
      </a>
      <p className="mt-3 text-[0.72rem] font-light text-ash">
        Map placeholder — production will embed an interactive map here.
      </p>
    </Reveal>
  );
}
