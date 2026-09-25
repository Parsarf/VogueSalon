# Vogue Salon Laguna Beach

A modern, high-design website for Vogue Salon's Laguna Beach location. Built with Next.js 15, React 19, and Tailwind CSS 4.

## Features

- **Artist Profiles**: Individual pages for each stylist with portfolios and specialties
- **Service Explorer**: Comprehensive service listings with pricing and descriptions
- **Gallery**: Filterable portfolio showcasing salon work
- **Booking Flow**: Multi-step booking interface (integrates with Vagaro)
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **SEO Ready**: Structured data, meta tags, and sitemap support
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.1
- **Styling**: Tailwind CSS 4.1.13
- **TypeScript**: 5.6.3
- **Fonts**: Bodoni Moda (display) & Jost (sans-serif)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd VogueSalon

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

### Development Commands

```bash
npm run dev      # Start development server on port 4321
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
VogueSalon/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── artists/      # Artist directory & cards
│   │   ├── booking/      # Booking flow components
│   │   ├── gallery/      # Gallery browser
│   │   ├── home/         # Homepage sections
│   │   ├── services/     # Services explorer
│   │   ├── site/         # Layout components (header, footer)
│   │   └── ui/           # Reusable UI components
│   ├── data/             # Content data files
│   │   ├── artists.ts    # Team profiles & portfolios
│   │   ├── services.ts   # Service listings & pricing
│   │   ├── gallery.ts    # Portfolio works
│   │   ├── reviews.ts    # Client testimonials
│   │   ├── images.ts     # Image configuration
│   │   └── site.ts       # Business info & settings
│   └── lib/              # Utilities
├── public/               # Static assets
└── package.json
```

## Content Management

All content is managed through TypeScript files in `/src/data/`:

### Updating Staff (`/src/data/artists.ts`)
- Add/edit artist profiles
- Update bios, specialties, and roles
- Replace placeholder portraits and portfolios

### Updating Services (`/src/data/services.ts`)
- Modify service names, descriptions, and pricing
- Adjust service durations
- Update service categories

### Updating Images (`/src/data/images.ts`)
- Replace Unsplash placeholder IDs with production image paths
- Update the `photoSrc()` function to point to your CDN/hosting

### Updating Business Info (`/src/data/site.ts`)
- Update hours, phone, address
- Modify social media links
- Change booking integration URL

## Deploying to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

No environment variables are currently required for basic deployment. If you add analytics or booking API integration, configure them in the Vercel dashboard under Settings → Environment Variables.

### Custom Domain

1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain (e.g., `voguelaguna.com`)
4. Follow DNS configuration instructions
5. Update `metadataBase` in `/src/app/layout.tsx` with your production URL

## Pre-Launch Checklist

Before going live, ensure you:

- [ ] Replace all placeholder images with real photography
- [ ] Update artist bios and portfolios with real content
- [ ] Verify all business information (hours, phone, address)
- [ ] Set up production domain in Vercel
- [ ] Update `metadataBase` in layout.tsx with production URL
- [ ] Remove `robots: { index: false }` from metadata (line 42 in layout.tsx)
- [ ] Test booking flow integration with Vagaro
- [ ] Verify all links and social media handles
- [ ] Run accessibility and performance audits
- [ ] Test on mobile devices

## Production Optimizations

This site is pre-configured for production with:

- ✅ Automatic code splitting
- ✅ Image optimization (Next.js Image component)
- ✅ Font optimization (Google Fonts)
- ✅ Static generation where possible
- ✅ Structured data for SEO
- ✅ Responsive images with srcset
- ✅ Accessibility features (skip links, ARIA labels)

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Performance

Target metrics (as measured by Lighthouse):

- Performance: 90+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

## License

Proprietary - Vogue Salon Laguna Beach

## Support

For technical issues or questions:
- Contact: (949) 376-7600
- Location: 1200 South Coast Highway, Suite 104B, Laguna Beach, CA 92651

---

Built with ❤️ for Vogue Salon Laguna Beach
