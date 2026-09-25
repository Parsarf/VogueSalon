/**
 * Business facts for Vogue Salon Laguna Beach.
 *
 * Sourced from voguesalon.com and the location's Vagaro profile
 * (vagaro.com/voguesalon4) as of September 2026. Anything marked TO CONFIRM is
 * a prototype placeholder and must be verified with the salon before launch.
 */

export const site = {
  name: "Vogue Salon Laguna Beach",
  shortName: "Vogue Laguna",
  wordmark: { top: "VOGUE", bottom: "LAGUNA BEACH" },
  tagline: "Hair, considered differently.",
  established: 1988,

  address: {
    street: "1200 South Coast Highway",
    suite: "Suite 104B",
    city: "Laguna Beach",
    state: "CA",
    zip: "92651",
    /** Deep link to the location's Google Maps listing. */
    directions: "https://maps.app.goo.gl/DJWm1CGypUkFKCVk7",
  },

  phone: { display: "(949) 376-7600", href: "tel:+19493767600" },

  /** Production booking destination. Not wired up in this prototype. */
  booking: {
    vagaroUrl: "https://www.vagaro.com/voguesalon4",
    note: "Prototype booking UI — production hands off to Vagaro.",
  },

  /** From the Vagaro profile. */
  hours: [
    { day: "Sunday", open: "Closed" },
    { day: "Monday", open: "9:00 — 3:00" },
    { day: "Tuesday", open: "9:00 — 7:00" },
    { day: "Wednesday", open: "9:00 — 7:00" },
    { day: "Thursday", open: "9:00 — 7:00" },
    { day: "Friday", open: "9:00 — 7:00" },
    { day: "Saturday", open: "9:00 — 6:00" },
  ],

  social: {
    // TO CONFIRM: @voguesalonoc is the multi-location account. The independent
    // Laguna Beach brand will need its own handle.
    instagram: { handle: "@voguesalonoc", url: "https://www.instagram.com/voguesalonoc/" },
    yelp: "https://www.yelp.com/biz/vogue-salon-laguna-beach-2",
  },

  /** Retail lines carried, per the existing site. */
  houses: ["Bumble and bumble", "Kérastase"],

  /** Practical detail pulled from the Vagaro listing. */
  visiting: [
    { label: "Parking", value: "Free and metered along South Coast Highway" },
    { label: "Walk-ins", value: "Accepted, subject to availability" },
    { label: "Languages", value: "English · Spanish · Italian · Farsi" },
    { label: "Access", value: "Step-free entry" },
  ],

  /** Verbatim from the Vagaro profile. */
  cancellationPolicy:
    "We kindly ask for 24 hours' notice to cancel or reschedule. Cancellations inside 24 hours are charged 50% of the service; no-shows are charged in full. Thank you for respecting our team's time.",

  rating: { score: 5.0, count: 4, source: "Vagaro" },
} as const;

export const navigation = [
  { label: "Artists", href: "/artists" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Visit", href: "/visit" },
] as const;

export const footerLegal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Accessibility", href: "/accessibility" },
] as const;

export const formattedAddress = `${site.address.street}, ${site.address.suite}`;
export const cityLine = `${site.address.city}, ${site.address.state} ${site.address.zip}`;
