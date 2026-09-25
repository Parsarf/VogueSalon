import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

import { BookingProvider } from "@/components/booking/BookingContext";
import { BookingOverlay } from "@/components/booking/BookingOverlay";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBookBar } from "@/components/site/MobileBookBar";
import { PrototypeTag } from "@/components/site/PrototypeTag";
import { formattedAddress, site } from "@/data/site";

/** Didone display face — the masthead voice. */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-bodoni",
});

/** Geometric sans for navigation, labels, UI and body copy. */
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voguelaguna.example"),
  title: {
    default: `${site.name} — Hair, considered differently`,
    template: `%s — Vogue Laguna Beach`,
  },
  description:
    "An independent hair salon on South Coast Highway. Cut, color, texture and extensions by a team in practice since 1988.",
  openGraph: {
    title: `${site.name}`,
    description: "Hair, considered differently. Cut · Color · Texture · Extensions.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: false, follow: false }, // Prototype — keep it out of search.
};

export const viewport: Viewport = {
  themeColor: "#141312",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`}>
      <body className="grain">
        <BookingProvider>
          <a
            href="#main"
            className="label-ui sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[400] focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
          >
            Skip to content
          </a>

          <Header />
          <main id="main">{children}</main>
          <Footer />

          <MobileBookBar />
          <BookingOverlay />
          <PrototypeTag />
        </BookingProvider>

        {/*
          Local business structured data. Harmless in the prototype and correct
          for launch — the values come straight from `site.ts`.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              name: site.name,
              telephone: site.phone.display,
              address: {
                "@type": "PostalAddress",
                streetAddress: formattedAddress,
                addressLocality: site.address.city,
                addressRegion: site.address.state,
                postalCode: site.address.zip,
                addressCountry: "US",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
