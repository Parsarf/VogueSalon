/**
 * PLACEHOLDER PHOTOGRAPHY
 *
 * Every image in this prototype is a stand-in sourced from Unsplash. None of it
 * depicts Vogue Salon Laguna Beach, its team, or its work.
 *
 * Each id below has been checked by eye against the alt text, so the alt text
 * is a fair description of what is actually on screen and doubles as an art
 * brief for the real shoot.
 *
 * To go live: shoot the real campaign, put the files on a first-party origin,
 * and swap the `id` values below (plus the ones inside `artists.ts` and
 * `gallery.ts`) for real paths. Nothing else in the codebase needs to change —
 * components only ever consume `Photo` objects through `photoSrc()`.
 */

export type Photo = {
  /** Unsplash photo id today; a first-party path after the real shoot. */
  id: string;
  /** Written as real alt text so the accessibility pass is already done. */
  alt: string;
  /** Optional focal point, as a CSS object-position value. */
  focus?: string;
};

const UNSPLASH = "https://images.unsplash.com/photo-";

/** Builds a sized, format-negotiated URL for a placeholder photo. */
export function photoSrc(photo: Photo, width = 1400, quality = 80): string {
  return `${UNSPLASH}${photo.id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/* -------------------------------------------------------------------------- */
/* Site-level imagery                                                          */
/* -------------------------------------------------------------------------- */

export const heroPhoto: Photo = {
  id: "1618754580230-dc55ba127aa2",
  alt: "Editorial portrait in black and white, hair lifted away from the face",
  focus: "50% 30%",
};

export const heroAlt: Photo = {
  id: "1613915617430-8ab0fd7c6baf",
  alt: "Editorial portrait, hair falling across the face in low contrast light",
  focus: "50% 35%",
};

export const introPhoto: Photo = {
  id: "1560264641-1b5191cc63e2",
  alt: "Close detail of natural curl, warm auburn tones",
};

export const interiorPhotos: Photo[] = [
  { id: "1600948836101-f9ffda59d250", alt: "Styling stations along a dark painted wall" },
  { id: "1600948835780-9c4a8b55cf50", alt: "Round mirror and greenery at the end of the floor" },
  { id: "1634449571010-02389ed0f9b0", alt: "Hair being washed at the shampoo bowl" },
  { id: "1600948836587-02c1842c9140", alt: "The waiting area, empty between appointments" },
  { id: "1637777269308-6a072f24e8a4", alt: "Salon chairs in silhouette" },
];

export const coastPhotos: Photo[] = [
  { id: "1600988718815-1b9983ab0f92", alt: "Laguna Beach coastline at the end of the afternoon" },
  { id: "1610507382472-6f6a0ddc417a", alt: "Cliffs above the Pacific along South Coast Highway" },
  { id: "1615470479605-cc37a627dc0e", alt: "A rocky cove below the bluffs" },
  { id: "1587171024385-b26beda6b0f9", alt: "Coastal headland in afternoon haze" },
];

/** Process photography — hands, tools, the work in progress. */
export const craftPhotos: Photo[] = [
  { id: "1580618672591-eb180b1a973f", alt: "A blow-out being shaped on a round brush" },
  { id: "1633681926022-84c23e8cb2d6", alt: "The length of the salon floor, stations either side" },
  { id: "1595476108010-b4d1f102b1b1", alt: "A client at the shampoo bowl" },
  { id: "1734111719430-fe4a3973f8af", alt: "A brush drawn through freshly dried blonde" },
  { id: "1629397685944-7073f5589754", alt: "Texture being dried into the mid-lengths" },
];

/** The four service pillars, as shown on the homepage and services index. */
export const categoryPhotos: Record<string, Photo> = {
  cut: {
    id: "1533392151650-269f96231f65",
    alt: "Sculptural hair worked into a shape, black and white",
    focus: "50% 35%",
  },
  color: {
    id: "1605980766335-d3a41c7332a1",
    alt: "Balayage falling from a deep root through brightened ends",
  },
  texture: {
    id: "1665923148259-3340e61d3ff2",
    alt: "Tight natural coils in close detail",
  },
  extensions: {
    id: "1715067877702-9a3b0faf4ba3",
    alt: "Long wavy blonde lengths seen from behind",
  },
};
