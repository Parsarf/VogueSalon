import type { Photo } from "./images";

/**
 * SELECTED WORK
 *
 * Placeholder photography, checked by eye so each caption matches what the
 * image actually shows. None of it is the salon's work, and the artist
 * attributions are illustrative only — they exist to show how credit should
 * read once real portfolio images are loaded.
 */

export type GalleryCategory =
  | "color"
  | "cut"
  | "blonde"
  | "brunette"
  | "texture"
  | "extensions";

export const galleryFilters: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "color", label: "Color" },
  { id: "cut", label: "Cut" },
  { id: "blonde", label: "Blonde" },
  { id: "brunette", label: "Brunette" },
  { id: "texture", label: "Texture" },
  { id: "extensions", label: "Extensions" },
];

export type Work = {
  id: string;
  photo: Photo;
  categories: GalleryCategory[];
  /** Short editorial caption. */
  title: string;
  /** Artist slug from `artists.ts`, or null if uncredited. */
  artist: string | null;
  /** Intrinsic aspect ratio (width / height) — drives the masonry rhythm. */
  ratio: number;
};

export const works: Work[] = [
  {
    id: "w01",
    photo: {
      id: "1554519934-e32b1629d9ee",
      alt: "Long dimensional blonde seen from behind, lit from the side",
    },
    categories: ["color", "blonde"],
    title: "Root shadow, brightened ends",
    artist: "cassandra-olson",
    ratio: 0.75,
  },
  {
    id: "w02",
    photo: {
      id: "1536180838057-b604200e6f36",
      alt: "A dark curled bob finishing at the jaw",
    },
    categories: ["cut", "brunette"],
    title: "A jaw-length shape",
    artist: "eddie-becovic",
    ratio: 0.8,
  },
  {
    id: "w03",
    photo: {
      id: "1665923148259-3340e61d3ff2",
      alt: "Tight natural coils in close detail",
    },
    categories: ["texture"],
    title: "Cut dry, pattern by pattern",
    artist: "halleh-aminiraoufpour",
    ratio: 0.8,
  },
  {
    id: "w04",
    photo: {
      id: "1715067877702-9a3b0faf4ba3",
      alt: "Long wavy blonde lengths seen from behind",
    },
    categories: ["extensions", "blonde"],
    title: "Hand-tied length, blended",
    artist: "sasha-siciliano",
    ratio: 0.67,
  },
  {
    id: "w05",
    photo: {
      id: "1568046738123-300caca6d0ca",
      alt: "Long brown hair with soft movement through the lengths",
    },
    categories: ["brunette", "cut"],
    title: "Weight removed, shape kept",
    artist: "donato-bianchini",
    ratio: 0.75,
  },
  {
    id: "w06",
    photo: {
      id: "1605980766335-d3a41c7332a1",
      alt: "Balayage falling from a deep root through brightened ends",
    },
    categories: ["color", "blonde"],
    title: "Three sessions to get here",
    artist: "cassandra-olson",
    ratio: 0.75,
  },
  {
    id: "w07",
    photo: {
      id: "1641901960200-1e878f0cbf63",
      alt: "Profile in black and white, hair cut close at the nape",
    },
    categories: ["cut"],
    title: "A shape that holds its edge",
    artist: "massimo-santella",
    ratio: 0.8,
  },
  {
    id: "w08",
    photo: {
      id: "1614283233556-f35b0c801ef1",
      alt: "Cool-toned blonde seen in profile",
    },
    categories: ["color", "blonde"],
    title: "Cooled half a level",
    artist: "cassandra-olson",
    ratio: 0.75,
  },
  {
    id: "w09",
    photo: {
      id: "1564141696939-9eb6e957ccfc",
      alt: "Long brunette waves catching afternoon light",
    },
    categories: ["brunette"],
    title: "Finished with almost nothing",
    artist: "donato-bianchini",
    ratio: 1.5,
  },
  {
    id: "w10",
    photo: {
      id: "1579119159780-51419861f69f",
      alt: "A dark curled bob seen from behind",
    },
    categories: ["texture", "brunette"],
    title: "Definition without product weight",
    artist: "halleh-aminiraoufpour",
    ratio: 0.75,
  },
  {
    id: "w11",
    photo: {
      id: "1533661338746-e4e47d30dfd8",
      alt: "Blonde curls falling down the back",
    },
    categories: ["blonde", "extensions"],
    title: "Density through the ends",
    artist: "sasha-siciliano",
    ratio: 0.67,
  },
  {
    id: "w12",
    photo: {
      id: "1606143412458-acc5f86de897",
      alt: "Dark hair with high shine against a plain ground",
    },
    categories: ["brunette", "color"],
    title: "Gloss, and nothing else",
    artist: "eddie-becovic",
    ratio: 0.75,
  },
  {
    id: "w13",
    photo: {
      id: "1657105052497-f996284ffff8",
      alt: "Clipper work through a taper at the temple",
    },
    categories: ["cut"],
    title: "Clean through the taper",
    artist: "kyle-pogue",
    ratio: 0.8,
  },
  {
    id: "w14",
    photo: {
      id: "1629397685944-7073f5589754",
      alt: "Texture being dried into blonde mid-lengths",
    },
    categories: ["blonde", "color"],
    title: "Dried in, not set",
    artist: "jonathan-carino-viens",
    ratio: 0.75,
  },
  {
    id: "w15",
    photo: {
      id: "1612928414075-bc722ade44f1",
      alt: "Curled hair in black and white, close crop",
    },
    categories: ["texture", "brunette"],
    title: "After a smoothing treatment",
    artist: "halleh-aminiraoufpour",
    ratio: 0.75,
  },
  {
    id: "w16",
    photo: {
      id: "1613498382159-0972b7b4c9f1",
      alt: "Natural curl worn full, shoulders back",
    },
    categories: ["texture", "cut"],
    title: "Interior layers only",
    artist: "halleh-aminiraoufpour",
    ratio: 0.67,
  },
  {
    id: "w17",
    photo: {
      id: "1512084747998-038941f49b84",
      alt: "Long blonde lengths, seen from behind",
    },
    categories: ["extensions", "blonde"],
    title: "Match first, cut second",
    artist: "sasha-siciliano",
    ratio: 0.75,
  },
  {
    id: "w18",
    photo: {
      id: "1555894855-3a55cd1e4339",
      alt: "Curls pinned up loosely at the back",
    },
    categories: ["texture"],
    title: "Left to do what it does",
    artist: null,
    ratio: 0.8,
  },
  {
    id: "w19",
    photo: {
      id: "1577746838851-816a43ca8733",
      alt: "Defined curl worn off the shoulder",
    },
    categories: ["texture", "brunette"],
    title: "Pinned for the evening",
    artist: "jonathan-carino-viens",
    ratio: 0.75,
  },
  {
    id: "w20",
    photo: {
      id: "1647140655214-e4a2d914971f",
      alt: "Barbering through the back of a short cut",
    },
    categories: ["cut"],
    title: "Scissor over comb",
    artist: "massimo-santella",
    ratio: 1.33,
  },
  {
    id: "w21",
    photo: {
      id: "1533392151650-269f96231f65",
      alt: "Sculptural hair worked into a shape, black and white",
    },
    categories: ["cut", "brunette"],
    title: "Built, then taken back down",
    artist: "donato-bianchini",
    ratio: 0.67,
  },
  {
    id: "w22",
    photo: {
      id: "1588747020611-6ae361065b72",
      alt: "Blonde lengths with body through the ends",
    },
    categories: ["blonde"],
    title: "Body without a set",
    artist: "jonathan-carino-viens",
    ratio: 0.75,
  },
  {
    id: "w23",
    photo: {
      id: "1635273051937-a0ddef9573b6",
      alt: "A short cut finished dry at the barber chair",
    },
    categories: ["cut"],
    title: "Dry-cut throughout",
    artist: "kyle-pogue",
    ratio: 0.8,
  },
  {
    id: "w24",
    photo: {
      id: "1585598007006-2995ea95e22a",
      alt: "Sunlit blonde, air-dried and finger-shaped",
    },
    categories: ["blonde"],
    title: "Air-dried, then shaped",
    artist: null,
    ratio: 0.67,
  },
];

export const worksByCategory = (filter: GalleryCategory | "all") =>
  filter === "all" ? works : works.filter((w) => w.categories.includes(filter));

/** Homepage "From the chair" rail. */
export const socialWorkIds = ["w06", "w02", "w16", "w13", "w01", "w19", "w04", "w21"];

export const getWork = (id: string) => works.find((w) => w.id === id)!;
