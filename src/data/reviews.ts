/**
 * REVIEWS
 *
 * The entries marked `source: "vagaro"` are real verified reviews from the
 * Laguna Beach location's Vagaro profile, attributed as Vagaro displays them
 * (first name, last initial). Entries marked `source: "placeholder"` are
 * prototype copy written to fill out the layout and must be removed or replaced
 * with real reviews before launch.
 */

export type Review = {
  id: string;
  /** The oversized pull quote. */
  pull: string;
  /** The remainder of the review, if any. */
  rest?: string;
  author: string;
  /** Artist slug, where the review names one. */
  artist?: string;
  platform: "Vagaro" | "Google" | "Yelp";
  source: "vagaro" | "placeholder";
};

export const reviews: Review[] = [
  {
    id: "r1",
    pull: "Simply the best.",
    author: "Ellen A.",
    artist: "eddie-becovic",
    platform: "Vagaro",
    source: "vagaro",
  },
  {
    id: "r2",
    pull: "Top notch work, and detail toward service.",
    rest: "Kyle sees myself, my husband and my son. He's excellent at all our services. I always enjoy my time with him.",
    author: "Molly G.",
    artist: "kyle-pogue",
    platform: "Vagaro",
    source: "vagaro",
  },
  {
    id: "r3",
    pull: "Very professional, and gave me a fabulous style.",
    author: "April A.",
    platform: "Vagaro",
    source: "vagaro",
  },
  {
    id: "r4",
    pull: "The first colorist who asked how I actually live.",
    rest: "Prototype copy. Replace with a real review before launch.",
    author: "Demo Client",
    platform: "Google",
    source: "placeholder",
  },
  {
    id: "r5",
    pull: "It grew out better than most cuts go in.",
    rest: "Prototype copy. Replace with a real review before launch.",
    author: "Demo Client",
    platform: "Google",
    source: "placeholder",
  },
];
