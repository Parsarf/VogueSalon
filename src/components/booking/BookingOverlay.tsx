"use client";

import { useEffect, useMemo, useState } from "react";
import { useBooking } from "./BookingContext";
import { artists, getArtist } from "@/data/artists";
import { allServices, formatPrice, serviceCategories } from "@/data/services";
import { site } from "@/data/site";
import { formatDayLong, groupSlots, slotsFor, upcomingDays } from "@/lib/availability";
import { photoSrc } from "@/data/images";

const STEPS = ["Service", "Artist", "Date & Time", "Confirm"] as const;

/**
 * PROTOTYPE BOOKING FLOW
 *
 * Demonstrates the four-step experience the production site will wrap around
 * Vagaro. It selects, it validates, it summarises — and then it stops. No
 * request is sent, no appointment is held, and no payment is taken.
 */
export function BookingOverlay() {
  const { isOpen, prefill, close } = useBooking();

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | undefined>();
  const [artistSlug, setArtistSlug] = useState<string | undefined>();
  const [dayIso, setDayIso] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [handedOff, setHandedOff] = useState(false);
  const [openCategory, setOpenCategory] = useState<string>(serviceCategories[0].id);

  // Re-seed from the prefill each time the overlay opens, and jump the user
  // past any step the entry point already answered.
  useEffect(() => {
    if (!isOpen) return;
    setServiceId(prefill.serviceId);
    setArtistSlug(prefill.artistSlug);
    setDayIso(undefined);
    setTime(undefined);
    setHandedOff(false);
    setOpenCategory(prefill.categoryId ?? serviceCategories[0].id);
    setStep(prefill.serviceId ? (prefill.artistSlug ? 2 : 1) : 0);
  }, [isOpen, prefill]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const days = useMemo(() => (isOpen ? upcomingDays(new Date(), 14) : []), [isOpen]);

  const service = allServices.find((s) => s.id === serviceId);
  const artist = artistSlug && artistSlug !== "any" ? getArtist(artistSlug) : undefined;

  // Only show artists who actually offer the chosen category.
  const eligibleArtists = service
    ? artists.filter((a) => a.offers.includes(service.categoryId))
    : artists;

  const slots = dayIso && artistSlug ? groupSlots(slotsFor(dayIso, artistSlug)) : [];

  const canAdvance = [!!serviceId, !!artistSlug, !!(dayIso && time), true][step];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
      className="fixed inset-0 z-[300] bg-ink text-ivory animate-fade-in"
    >
      <div className="flex h-full flex-col animate-sheet-up">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                            */}
        {/* ---------------------------------------------------------------- */}
        <header className="flex shrink-0 items-start justify-between gutter pt-6 pb-5 md:pt-9">
          <div>
            <p className="eyebrow text-bronze-lite">Vogue Laguna</p>
            <h2 className="display-sm mt-3 md:mt-4">Book an appointment</h2>
          </div>
          <button
            onClick={close}
            className="label-ui -mt-1 shrink-0 cursor-pointer text-stone transition-colors duration-500 hover:text-ivory"
          >
            Close
            <span className="ml-3 inline-block align-middle text-base leading-none">&times;</span>
          </button>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* Step rail                                                         */}
        {/* ---------------------------------------------------------------- */}
        <nav className="shrink-0 gutter" aria-label="Booking steps">
          <ol className="flex gap-6 border-t border-ivory/12 pt-4 md:gap-12">
            {STEPS.map((label, i) => {
              const state = i === step ? "current" : i < step ? "done" : "todo";
              return (
                <li key={label} className="min-w-0">
                  <button
                    disabled={i > step}
                    onClick={() => setStep(i)}
                    className={`label-ui flex items-baseline gap-2 transition-colors duration-500 ${
                      state === "current"
                        ? "text-ivory"
                        : state === "done"
                          ? "cursor-pointer text-stone hover:text-ivory"
                          : "text-ivory/25"
                    }`}
                  >
                    <span className="tabular-nums">0{i + 1}</span>
                    <span className="hidden truncate sm:inline">{label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* ---------------------------------------------------------------- */}
        {/* Body                                                              */}
        {/* ---------------------------------------------------------------- */}
        <div className="min-h-0 flex-1 overflow-y-auto gutter pt-10 pb-40 md:pt-14">
          <div key={step} className="animate-sheet-up">
            {step === 0 && (
              <StepShell
                index="01"
                title={["Choose", "a service"]}
                note="Starting prices. Final pricing depends on your hair and your artist."
              >
                <div className="space-y-px">
                  {serviceCategories.map((category) => {
                    const expanded = openCategory === category.id;
                    return (
                      <div key={category.id} className="border-t border-ivory/12">
                        <button
                          onClick={() => setOpenCategory(expanded ? "" : category.id)}
                          className="group flex w-full cursor-pointer items-baseline gap-5 py-6 text-left"
                          aria-expanded={expanded}
                        >
                          <span className="eyebrow w-8 shrink-0 text-bronze-lite">
                            {category.index}
                          </span>
                          <span
                            className={`display-sm flex-1 transition-colors duration-500 ${
                              expanded ? "text-ivory" : "text-ivory/55 group-hover:text-ivory"
                            }`}
                          >
                            {category.name}
                          </span>
                          <span className="label-ui shrink-0 text-stone">
                            {expanded ? "—" : "+"}
                          </span>
                        </button>

                        <div
                          className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.62,.05,.01,.99)]"
                          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <ul className="pb-6 md:pl-13">
                              {category.services.map((s) => {
                                const active = serviceId === s.id;
                                return (
                                  <li key={s.id}>
                                    <button
                                      onClick={() => {
                                        setServiceId(s.id);
                                        setArtistSlug(undefined);
                                        setStep(1);
                                      }}
                                      className={`flex w-full cursor-pointer items-baseline justify-between gap-6 border-b py-4 text-left transition-colors duration-400 ${
                                        active
                                          ? "border-bronze-lite/60"
                                          : "border-ivory/8 hover:border-ivory/30"
                                      }`}
                                    >
                                      <span className="min-w-0">
                                        <span
                                          className={`block text-[0.95rem] transition-colors ${
                                            active ? "text-bronze-lite" : "text-ivory"
                                          }`}
                                        >
                                          {s.name}
                                        </span>
                                        <span className="mt-1 block text-[0.8rem] font-light text-stone">
                                          {s.description} · {s.duration} min
                                        </span>
                                      </span>
                                      <span className="label-ui shrink-0 pt-1 text-stone">
                                        {formatPrice(s)}
                                      </span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="border-t border-ivory/12" />
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell
                index="02"
                title={["Choose", "an artist"]}
                note={
                  service
                    ? `Showing artists who offer ${service.categoryName.toLowerCase()}.`
                    : undefined
                }
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                  <button
                    onClick={() => {
                      setArtistSlug("any");
                      setStep(2);
                    }}
                    className={`group cursor-pointer text-left ${
                      artistSlug === "any" ? "opacity-100" : "opacity-80 hover:opacity-100"
                    } transition-opacity duration-500`}
                  >
                    <span
                      className={`flex aspect-3/4 items-center justify-center border transition-colors duration-500 ${
                        artistSlug === "any"
                          ? "border-bronze-lite text-bronze-lite"
                          : "border-ivory/20 text-ivory/50 group-hover:border-ivory/50"
                      }`}
                    >
                      <span className="italic-display text-2xl">Any</span>
                    </span>
                    <span className="label-ui mt-4 block">First available</span>
                    <span className="mt-1.5 block text-[0.8rem] font-light text-stone">
                      Matched to your service
                    </span>
                  </button>

                  {eligibleArtists.map((a) => {
                    const active = artistSlug === a.slug;
                    return (
                      <button
                        key={a.slug}
                        onClick={() => {
                          setArtistSlug(a.slug);
                          setStep(2);
                        }}
                        className="group cursor-pointer text-left"
                      >
                        <span
                          className={`zoom-frame block aspect-3/4 border transition-colors duration-500 ${
                            active ? "border-bronze-lite" : "border-transparent"
                          }`}
                        >
                          {/* Plain img: these are decorative thumbnails inside a
                              modal and never need priority or layout work. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photoSrc(a.portrait, 500)}
                            alt={a.portrait.alt}
                            className="h-full w-full object-cover"
                            style={{ objectPosition: a.portrait.focus ?? "50% 30%" }}
                          />
                        </span>
                        <span
                          className={`label-ui mt-4 block transition-colors duration-500 ${
                            active ? "text-bronze-lite" : "text-ivory"
                          }`}
                        >
                          {a.firstName}
                        </span>
                        <span className="mt-1.5 block text-[0.8rem] font-light text-stone">
                          {a.role}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell
                index="03"
                title={["Choose", "a time"]}
                note="Prototype availability. Live times will come from Vagaro."
              >
                <div className="rail -mx-[max(1.25rem,5vw)] overflow-x-auto px-[max(1.25rem,5vw)] pb-2">
                  <div className="flex gap-2">
                    {days.map((d) => {
                      const active = dayIso === d.iso;
                      return (
                        <button
                          key={d.iso}
                          disabled={d.closed}
                          onClick={() => {
                            setDayIso(d.iso);
                            setTime(undefined);
                          }}
                          className={`w-[4.5rem] shrink-0 border py-4 text-center transition-colors duration-400 ${
                            d.closed
                              ? "cursor-not-allowed border-ivory/8 text-ivory/20"
                              : active
                                ? "cursor-pointer border-bronze-lite bg-bronze-lite/10 text-ivory"
                                : "cursor-pointer border-ivory/15 text-stone hover:border-ivory/45 hover:text-ivory"
                          }`}
                        >
                          <span className="eyebrow block">{d.weekday}</span>
                          <span className="display-sm mt-2.5 block tabular-nums">{d.dayNum}</span>
                          <span className="eyebrow mt-2 block opacity-60">
                            {d.closed ? "Closed" : d.month}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-12">
                  {!dayIso ? (
                    <p className="italic-display text-stone text-xl">Select a day to see times.</p>
                  ) : slots.length === 0 ? (
                    <p className="italic-display text-stone text-xl">
                      Nothing open that day. Try another.
                    </p>
                  ) : (
                    <div className="space-y-10">
                      {slots.map((group) => (
                        <div key={group.part}>
                          <h4 className="eyebrow border-b border-ivory/12 pb-3 text-stone">
                            {group.part}
                          </h4>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {group.slots.map((s) => {
                              const active = time === s.time;
                              return (
                                <button
                                  key={s.time}
                                  onClick={() => setTime(s.time)}
                                  className={`label-ui cursor-pointer border px-5 py-3.5 transition-colors duration-400 ${
                                    active
                                      ? "border-bronze-lite bg-bronze-lite/10 text-ivory"
                                      : "border-ivory/15 text-stone hover:border-ivory/45 hover:text-ivory"
                                  }`}
                                >
                                  {s.time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell index="04" title={["Your", "appointment"]}>
                {handedOff ? (
                  <div className="max-w-xl">
                    <p className="display-sm text-bronze-lite">This is where Vagaro takes over.</p>
                    <p className="body-lede mt-7 text-stone">
                      In production, the selection above is handed to the Laguna Beach booking
                      system, which collects your details and confirms the appointment. Nothing has
                      been booked, held, or charged here — this is a design prototype.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                      <a
                        href={site.booking.vagaroUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label-ui link-draw text-ivory"
                      >
                        View the live Vagaro page ↗
                      </a>
                      <button
                        onClick={close}
                        className="label-ui cursor-pointer text-stone transition-colors duration-500 hover:text-ivory"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <dl className="max-w-2xl divide-y divide-ivory/12 border-y border-ivory/12">
                    <SummaryRow label="Service" value={service?.name ?? "—"} />
                    <SummaryRow
                      label="Artist"
                      value={artist ? `${artist.name} · ${artist.role}` : "First available"}
                    />
                    <SummaryRow label="Date" value={dayIso ? formatDayLong(dayIso) : "—"} />
                    <SummaryRow label="Time" value={time ?? "—"} />
                    <SummaryRow
                      label="From"
                      value={service ? formatPrice(service) : "—"}
                      muted={`${service?.duration ?? 0} minutes`}
                    />
                    <SummaryRow label="Location" value={site.address.street} muted="Laguna Beach" />
                  </dl>
                )}
              </StepShell>
            )}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Action bar                                                        */}
        {/* ---------------------------------------------------------------- */}
        {!handedOff && (
          <div className="shrink-0 border-t border-ivory/12 bg-ink/95 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-6 gutter py-5">
              <div className="min-w-0">
                <p className="eyebrow text-ivory/35">Prototype — not a live booking</p>
                <p className="mt-2 truncate text-[0.8rem] font-light text-stone">
                  {[service?.name, artist?.firstName ?? (artistSlug === "any" ? "Any artist" : null), time]
                    .filter(Boolean)
                    .join("  ·  ") || "Nothing selected yet"}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-6">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="label-ui cursor-pointer text-stone transition-colors duration-500 hover:text-ivory"
                  >
                    Back
                  </button>
                )}
                <button
                  disabled={!canAdvance}
                  onClick={() => (step === 3 ? setHandedOff(true) : setStep((s) => s + 1))}
                  className={`label-ui border px-7 py-4 transition-all duration-500 ${
                    canAdvance
                      ? "cursor-pointer border-ivory bg-ivory text-ink hover:bg-bronze-lite hover:border-bronze-lite"
                      : "cursor-not-allowed border-ivory/15 text-ivory/25"
                  }`}
                >
                  {step === 3 ? "Continue to booking" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function StepShell({
  index,
  title,
  note,
  children,
}: {
  index: string;
  title: [string, string];
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-16">
      <div className="lg:sticky lg:top-4 lg:self-start">
        <p className="eyebrow text-bronze-lite">{index}</p>
        <h3 className="display-md mt-5 text-[clamp(2rem,3.4vw,3.4rem)]">
          {title[0]}
          <br />
          <span className="italic-display whitespace-nowrap">{title[1]}</span>
        </h3>
        {note && <p className="mt-6 max-w-xs text-[0.82rem] font-light text-stone">{note}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-8 py-5">
      <dt className="eyebrow shrink-0 text-stone">{label}</dt>
      <dd className="text-right">
        <span className="display-sm">{value}</span>
        {muted && <span className="mt-1.5 block text-[0.8rem] font-light text-stone">{muted}</span>}
      </dd>
    </div>
  );
}
