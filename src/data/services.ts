import { categoryPhotos } from "./images";
import type { Photo } from "./images";

/**
 * SERVICES & PRICING
 *
 * Prices carried over from the existing voguesalon.com services page. All are
 * starting prices. Durations are prototype estimates for the booking mockup and
 * must be confirmed against the salon's Vagaro configuration before launch.
 */

export type Service = {
  id: string;
  name: string;
  /** `null` where the service is quoted after consultation. */
  priceFrom: number | null;
  /** Shown when `priceFrom` is null. */
  priceLabel?: string;
  /** Minutes. Prototype estimate — see file note. */
  duration: number;
  description: string;
};

export type ServiceCategory = {
  id: string;
  /** Display number in the editorial index, e.g. "01". */
  index: string;
  name: string;
  /** One line under the category headline. */
  summary: string;
  /** Longer editorial paragraph on the services page. */
  intro: string;
  photo: Photo;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "cut",
    index: "01",
    name: "Cut",
    summary: "Shape built around the head you actually have.",
    intro:
      "Every cut begins with a conversation and a dry assessment — how your hair grows, where it breaks, what you are willing to do with it on a Tuesday morning. The shape follows from that.",
    photo: categoryPhotos.cut,
    services: [
      {
        id: "womens-cut",
        name: "Women's Haircut & Style",
        priceFrom: 73,
        duration: 60,
        description: "Consultation, cut and finish.",
      },
      {
        id: "mens-cut",
        name: "Men's & Barbering Haircut",
        priceFrom: 45,
        duration: 45,
        description: "Scissor or clipper work, finished dry.",
      },
      {
        id: "blow-out",
        name: "Blow-out & Style",
        priceFrom: 51,
        duration: 45,
        description: "Wash and finish, no cut.",
      },
      {
        id: "updo",
        name: "Special Occasion Updo",
        priceFrom: 85,
        duration: 75,
        description: "Event styling. Book a trial for weddings.",
      },
    ],
  },
  {
    id: "color",
    index: "02",
    name: "Color",
    summary: "Tone chosen for how it grows out, not just how it goes on.",
    intro:
      "From a root touch-up to a full correction. Our colorists train continuously with Wella and Bumble and bumble, and will tell you honestly what your hair can take and what it cannot.",
    photo: categoryPhotos.color,
    services: [
      {
        id: "root-touch-up",
        name: "Root Touch Up",
        priceFrom: 87,
        duration: 75,
        description: "Regrowth only, to the existing base.",
      },
      {
        id: "toner",
        name: "Toner / Gloss",
        priceFrom: 50,
        duration: 30,
        description: "Refreshes tone and shine between appointments.",
      },
      {
        id: "partial-highlights",
        name: "Partial Highlights",
        priceFrom: 127,
        duration: 105,
        description: "Through the top and sides.",
      },
      {
        id: "full-highlights",
        name: "Full Highlights",
        priceFrom: 148,
        duration: 135,
        description: "All-over foiling, front to nape.",
      },
      {
        id: "base-bump",
        name: "Base Bump",
        priceFrom: 50,
        duration: 45,
        description: "A shift of the base shade, up or down.",
      },
      {
        id: "balayage",
        name: "Balayage",
        priceFrom: 130,
        duration: 150,
        description: "Hand-painted, lived-in dimension.",
      },
      {
        id: "color-correction",
        name: "Color Correction",
        priceFrom: null,
        priceLabel: "Consultation",
        duration: 60,
        description: "Booked only after an in-person assessment.",
      },
      {
        id: "creative-color",
        name: "Creative Coloring",
        priceFrom: null,
        priceLabel: "Consultation",
        duration: 60,
        description: "Fashion tones and editorial work.",
      },
    ],
  },
  {
    id: "texture",
    index: "03",
    name: "Texture & Treatments",
    summary: "Condition first. Everything else depends on it.",
    intro:
      "Smoothing, straightening and repair — plus the express treatments that keep colour-treated hair in the condition it needs to hold the next appointment.",
    photo: categoryPhotos.texture,
    services: [
      {
        id: "keratin",
        name: "Keratin Smoothing Treatment",
        priceFrom: 280,
        duration: 180,
        description: "Reduces frizz and drying time for months.",
      },
      {
        id: "thermal",
        name: "Thermal Straightening",
        priceFrom: null,
        priceLabel: "Consultation",
        duration: 60,
        description: "Assessed on density, length and condition.",
      },
      {
        id: "kerastase",
        name: "Kérastase Express Treatment",
        priceFrom: 40,
        duration: 20,
        description: "Added to any cut or colour appointment.",
      },
    ],
  },
  {
    id: "extensions",
    index: "04",
    name: "Extensions",
    summary: "Length that reads as your own.",
    intro:
      "Hand-tied and tape-in methods, matched on tone and density and cut in to blend. Every extension service begins with a consultation covering upkeep, cost and how long the hair will last.",
    photo: categoryPhotos.extensions,
    services: [
      {
        id: "extensions-consult",
        name: "Extensions Consultation",
        priceFrom: null,
        priceLabel: "Complimentary",
        duration: 30,
        description: "Method, tone match, density and maintenance plan.",
      },
      {
        id: "extensions-application",
        name: "Application & Blend",
        priceFrom: null,
        priceLabel: "Quoted",
        duration: 180,
        description: "Priced after consultation. Hair cost is separate.",
      },
      {
        id: "extensions-move-up",
        name: "Move-Up & Maintenance",
        priceFrom: null,
        priceLabel: "Quoted",
        duration: 120,
        description: "Typically every six to eight weeks.",
      },
    ],
  },
];

/** Carried over verbatim in substance from the existing site's services page. */
export const pricingDisclaimers = [
  "Prices are starting points. They vary with stylist expertise, and with the density, length and condition of your hair.",
  "Chemical services do not include a cut or a blow-out unless stated.",
  "A consultation is required before any colour correction, thermal straightening or extension service.",
];

export const getCategory = (id: string) => serviceCategories.find((c) => c.id === id);

export const allServices: (Service & { categoryId: string; categoryName: string })[] =
  serviceCategories.flatMap((c) =>
    c.services.map((s) => ({ ...s, categoryId: c.id, categoryName: c.name })),
  );

export const formatPrice = (service: Service) =>
  service.priceFrom === null ? (service.priceLabel ?? "Consultation") : `$${service.priceFrom}+`;
