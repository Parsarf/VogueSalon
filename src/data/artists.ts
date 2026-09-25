import type { Photo } from "./images";

/**
 * THE TEAM
 *
 * Names, and the three bios marked `source: "vagaro"`, come from the Laguna
 * Beach location's live Vagaro profile. Everything else — roles, specialty
 * tags, philosophy lines, portfolios, portraits and Instagram handles — is
 * prototype copy written to demonstrate the layout, and is flagged
 * `source: "placeholder"`.
 *
 * Portraits do NOT depict the named artists. They are stand-ins.
 *
 * Replacing this file with real content is the only step required to make the
 * artists directory and every profile page real.
 */

export type ArtistFilter = "cut" | "color" | "blonde" | "extensions" | "texture";

export const artistFilters: { id: ArtistFilter | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cut", label: "Cut" },
  { id: "color", label: "Color" },
  { id: "blonde", label: "Blonde" },
  { id: "extensions", label: "Extensions" },
  { id: "texture", label: "Texture" },
];

export type Artist = {
  slug: string;
  name: string;
  /** Used for the oversized display treatment on cards and profiles. */
  firstName: string;
  role: string;
  /** Short line under the name in the directory. */
  specialties: string[];
  filters: ArtistFilter[];
  /** One sentence, set large in display type on the profile. */
  philosophy: string;
  bio: string;
  portrait: Photo;
  portfolio: Photo[];
  /** Service category ids from `services.ts`. */
  offers: string[];
  instagram: string;
  /** Provenance of the written copy, so real content is easy to prioritise. */
  source: "vagaro" | "placeholder";
  /** Optional per-artist pricing note shown above the service list. */
  priceNote?: string;
};

export const artists: Artist[] = [
  {
    slug: "donato-bianchini",
    name: "Donato Bianchini",
    firstName: "Donato",
    role: "Founder · Creative Director",
    specialties: ["Cutting", "Color", "Highlighting"],
    filters: ["cut", "color", "blonde"],
    philosophy: "Hair should look like it belongs to the person wearing it.",
    bio: "Born in Italy, raised in Switzerland, and at home in California for three decades. Donato opened Vogue in Newport Beach in 1988 with a single idea — gather serious hairdressers and let the craft lead. Thirty years in, he still cuts to the shape of a face, the fall of a texture and the way a person actually lives, working toward hair that moves and a look that never announces its own effort.",
    portrait: {
      id: "1608127010513-2c9fc1638893",
      alt: "Studio portrait against a dark ground",
      focus: "50% 22%",
    },
    portfolio: [
      { id: "1533392151650-269f96231f65", alt: "Sculptural hair worked into a shape, black and white" },
      { id: "1568046738123-300caca6d0ca", alt: "Long brown hair with soft movement through the lengths" },
      { id: "1564141696939-9eb6e957ccfc", alt: "Long brunette waves catching afternoon light" },
      { id: "1641901960200-1e878f0cbf63", alt: "Profile in black and white, hair cut close at the nape" },
    ],
    offers: ["cut", "color"],
    instagram: "@donato.vogue",
    source: "vagaro",
    priceNote: "Creative Director pricing. Consultation included with every first visit.",
  },
  {
    slug: "cassandra-olson",
    name: "Cassandra Olson",
    firstName: "Cassandra",
    role: "Senior Colorist",
    specialties: ["Dimensional Blonde", "Balayage", "Lived-in Color"],
    filters: ["color", "blonde"],
    philosophy: "Great color starts with how you actually live, not how you photograph.",
    bio: "Fifteen years at Vogue have made Cassandra a name people travel for — everything from the quietest balayage to a full reinvention. Her work is backed by advanced education with Wella and Bumble and bumble, where she built her grounding in color theory and technique. She reads a client's lifestyle before she reads their hair, which is why her color grows out as well as it goes on.",
    portrait: {
      id: "1684361436003-aa575b96bc2d",
      alt: "Studio portrait in directional light",
      focus: "50% 28%",
    },
    portfolio: [
      { id: "1605980766335-d3a41c7332a1", alt: "Balayage falling from a deep root through brightened ends" },
      { id: "1554519934-e32b1629d9ee", alt: "Long dimensional blonde seen from behind, lit from the side" },
      { id: "1614283233556-f35b0c801ef1", alt: "Cool-toned blonde seen in profile" },
      { id: "1585598007006-2995ea95e22a", alt: "Sunlit blonde, air-dried and finger-shaped" },
    ],
    offers: ["color", "texture"],
    instagram: "@cassandra.color",
    source: "vagaro",
  },
  {
    slug: "eddie-becovic",
    name: "Eddie Becovic",
    firstName: "Eddie",
    role: "Master Stylist",
    specialties: ["Precision Cutting", "Personalised Color"],
    filters: ["cut", "color"],
    philosophy: "Listen first. The cut is the easy part.",
    bio: "Seventeen years at Vogue, built on Sassoon training and advanced color education in New York. Eddie's work is technical to the millimetre and never looks it — precision cutting paired with color chosen for one head of hair rather than a trend cycle. He keeps clients for decades, which he puts down to asking better questions before he picks anything up.",
    portrait: {
      id: "1558730234-d8b2281b0d00",
      alt: "Studio portrait against a plain ground",
      focus: "50% 25%",
    },
    portfolio: [
      { id: "1536180838057-b604200e6f36", alt: "A dark curled bob finishing at the jaw" },
      { id: "1606143412458-acc5f86de897", alt: "Dark hair with high shine against a plain ground" },
      { id: "1612928414075-bc722ade44f1", alt: "Curled hair in black and white, close crop" },
      { id: "1641901960200-1e878f0cbf63", alt: "Profile in black and white, hair cut close at the nape" },
    ],
    offers: ["cut", "color"],
    instagram: "@eddie.cuts",
    source: "vagaro",
  },
  {
    slug: "massimo-santella",
    name: "Massimo Santella",
    firstName: "Massimo",
    role: "Senior Stylist",
    specialties: ["Editorial Cutting", "Men's Grooming", "Styling"],
    filters: ["cut"],
    philosophy: "A shape has to survive the walk to the car.",
    bio: "Prototype copy — replace with Massimo's own words. Trained in the Italian cutting tradition and drawn to shapes that hold without product: crops, tapers, and long layers cut dry so what you see in the chair is what you get at home.",
    portrait: {
      id: "1581841064838-a470c740e8ee",
      alt: "Studio portrait, low key lighting",
      focus: "50% 26%",
    },
    portfolio: [
      { id: "1647140655214-e4a2d914971f", alt: "Barbering through the back of a short cut" },
      { id: "1635273051937-a0ddef9573b6", alt: "A short cut finished dry at the barber chair" },
      { id: "1657105052497-f996284ffff8", alt: "Clipper work through a taper at the temple" },
      { id: "1533392151650-269f96231f65", alt: "Sculptural hair worked into a shape, black and white" },
    ],
    offers: ["cut"],
    instagram: "@massimo.hair",
    source: "placeholder",
  },
  {
    slug: "kyle-pogue",
    name: "Kyle Pogue",
    firstName: "Kyle",
    role: "Stylist · Barbering",
    specialties: ["Barbering", "Men's Cutting", "Family"],
    filters: ["cut"],
    philosophy: "Consistency is a craft in itself.",
    bio: "Prototype copy — replace with Kyle's own words. Known for a clean, repeatable cut and a chair that whole families book into together. Equally at ease with a scissor-over-comb classic and a modern fade.",
    portrait: {
      id: "1607503873903-c5e95f80d7b9",
      alt: "Studio portrait against a dark ground",
      focus: "50% 24%",
    },
    portfolio: [
      { id: "1657105052497-f996284ffff8", alt: "Clipper work through a taper at the temple" },
      { id: "1647140655214-e4a2d914971f", alt: "Barbering through the back of a short cut" },
      { id: "1635273051937-a0ddef9573b6", alt: "A short cut finished dry at the barber chair" },
      { id: "1641901960200-1e878f0cbf63", alt: "Profile in black and white, hair cut close at the nape" },
    ],
    offers: ["cut"],
    instagram: "@kyle.pogue.hair",
    source: "placeholder",
  },
  {
    slug: "sasha-siciliano",
    name: "Sasha Siciliano",
    firstName: "Sasha",
    role: "Colorist · Extensions",
    specialties: ["Extensions", "Length & Volume", "Blonde"],
    filters: ["extensions", "blonde", "color"],
    philosophy: "Length should be undetectable, or it isn't finished.",
    bio: "Prototype copy — replace with Sasha's own words. Certified across hand-tied and tape-in methods, with a colorist's eye for matching tone through the blend. Every extension appointment starts with a consultation on density, lifestyle and upkeep.",
    portrait: {
      id: "1519744434498-a0de604df9db",
      alt: "Backlit studio portrait",
      focus: "50% 26%",
    },
    portfolio: [
      { id: "1715067877702-9a3b0faf4ba3", alt: "Long wavy blonde lengths seen from behind" },
      { id: "1512084747998-038941f49b84", alt: "Long blonde lengths, seen from behind" },
      { id: "1533661338746-e4e47d30dfd8", alt: "Blonde curls falling down the back" },
      { id: "1588747020611-6ae361065b72", alt: "Blonde lengths with body through the ends" },
    ],
    offers: ["extensions", "color"],
    instagram: "@sasha.extensions",
    source: "placeholder",
  },
  {
    slug: "halleh-aminiraoufpour",
    name: "Halleh Aminiraoufpour",
    firstName: "Halleh",
    role: "Texture Specialist",
    specialties: ["Curl Cutting", "Smoothing", "Treatments"],
    filters: ["texture", "cut"],
    philosophy: "Texture is not a problem to solve.",
    bio: "Prototype copy — replace with Halleh's own words. Cuts curl dry, pattern by pattern, and builds treatment plans that work between appointments rather than only on the day. Fluent in English and Farsi.",
    portrait: {
      id: "1644718847160-52a922094f69",
      alt: "Studio portrait in profile, dark ground",
      focus: "50% 26%",
    },
    portfolio: [
      { id: "1665923148259-3340e61d3ff2", alt: "Tight natural coils in close detail" },
      { id: "1613498382159-0972b7b4c9f1", alt: "Natural curl worn full, shoulders back" },
      { id: "1560264641-1b5191cc63e2", alt: "Close detail of natural curl, warm auburn tones" },
      { id: "1579119159780-51419861f69f", alt: "A dark curled bob seen from behind" },
    ],
    offers: ["texture", "cut"],
    instagram: "@halleh.texture",
    source: "placeholder",
  },
  {
    slug: "jonathan-carino-viens",
    name: "Jonathan Carino-Viens",
    firstName: "Jonathan",
    role: "Stylist",
    specialties: ["Cut & Style", "Blow-outs", "Occasion"],
    filters: ["cut", "color"],
    philosophy: "The finish is where the trust is won.",
    bio: "Prototype copy — replace with Jonathan's own words. A finishing specialist with a following for blow-outs and occasion work, and a growing colour book. Newest to the Laguna floor, longest at the mirror.",
    portrait: {
      id: "1582896911227-c966f6e7fb93",
      alt: "Studio portrait against a neutral ground",
      focus: "50% 24%",
    },
    portfolio: [
      { id: "1629397685944-7073f5589754", alt: "Texture being dried into blonde mid-lengths" },
      { id: "1734111719430-fe4a3973f8af", alt: "A brush drawn through freshly dried blonde" },
      { id: "1577746838851-816a43ca8733", alt: "Defined curl worn off the shoulder" },
      { id: "1580618672591-eb180b1a973f", alt: "A blow-out being shaped on a round brush" },
    ],
    offers: ["cut", "color"],
    instagram: "@jonathan.styles",
    source: "placeholder",
  },
];

export const getArtist = (slug: string) => artists.find((a) => a.slug === slug);

export const artistsByFilter = (filter: ArtistFilter | "all") =>
  filter === "all" ? artists : artists.filter((a) => a.filters.includes(filter));
