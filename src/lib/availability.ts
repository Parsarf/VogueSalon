/**
 * FAKE AVAILABILITY — PROTOTYPE ONLY
 *
 * Generates stable, plausible-looking appointment slots from a seed so the
 * booking mockup renders identically on the server and the client. It knows
 * nothing about real bookings and must be deleted when the Vagaro integration
 * lands.
 */

import { site } from "@/data/site";

/** Deterministic 32-bit hash — same input, same slots, every render. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: string) {
  let state = hash(seed);
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 10000) / 10000;
  };
}

export type Day = {
  iso: string;
  weekday: string;
  dayNum: string;
  month: string;
  closed: boolean;
};

/**
 * Local calendar date as YYYY-MM-DD. `toISOString()` would convert to UTC
 * first, which shifts the key to the next day for every afternoon in the
 * Americas — and the labels below are built from local parts.
 */
function localIso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** The next `count` days starting from `from`, flagged against opening hours. */
export function upcomingDays(from: Date, count = 14): Day[] {
  const days: Day[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(from);
    date.setDate(from.getDate() + i);
    const weekdayIndex = date.getDay();
    days.push({
      iso: localIso(date),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      dayNum: String(date.getDate()).padStart(2, "0"),
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      closed: site.hours[weekdayIndex].open === "Closed",
    });
  }
  return days;
}

export type Slot = { time: string; part: "Morning" | "Afternoon" | "Evening" };

const SLOT_TIMES: Slot[] = [
  { time: "9:00 AM", part: "Morning" },
  { time: "9:45 AM", part: "Morning" },
  { time: "10:30 AM", part: "Morning" },
  { time: "11:15 AM", part: "Morning" },
  { time: "12:00 PM", part: "Afternoon" },
  { time: "1:30 PM", part: "Afternoon" },
  { time: "2:15 PM", part: "Afternoon" },
  { time: "3:00 PM", part: "Afternoon" },
  { time: "3:45 PM", part: "Afternoon" },
  { time: "4:30 PM", part: "Evening" },
  { time: "5:15 PM", part: "Evening" },
  { time: "6:00 PM", part: "Evening" },
];

/**
 * Roughly half the grid comes back open, weighted so mornings look busier than
 * late afternoons — which is what a real salon week tends to look like.
 */
export function slotsFor(dayIso: string, artistSlug: string): Slot[] {
  const next = rng(`${dayIso}::${artistSlug}`);
  return SLOT_TIMES.filter((slot, i) => next() > 0.28 + (i < 4 ? 0.22 : 0));
}

export function groupSlots(slots: Slot[]) {
  return (["Morning", "Afternoon", "Evening"] as const)
    .map((part) => ({ part, slots: slots.filter((s) => s.part === part) }))
    .filter((group) => group.slots.length > 0);
}

export function formatDayLong(iso: string): string {
  // Local noon, matching how `localIso` built the key — a bare "YYYY-MM-DD"
  // would be parsed as UTC midnight and render as the previous day.
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
