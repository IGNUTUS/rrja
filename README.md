# RRJA Customs Brokerage Services: Website

A multi-page corporate website for **RRJA Customs Brokerage Services** (Mandaue City, Cebu), built for client presentation and prepared for production.

Design direction: **Concept 1, Premium International Logistics.** It pairs a dark navy cinematic hero with full-width cargo photography, white editorial sections, deep navy service panels, royal blue accents and restrained gold details. Typography is Manrope for headings and Inter for body text.

> **Status: client review draft.** Several business details are preliminary and are marked **"To confirm"** on the site. See [Missing client information](#missing-client-information) before launch.

---

## Pages

| Route | Page | Highlights |
|---|---|---|
| `/` | Home | Full-screen cinematic hero, intro, service cards, why-choose list, Visayas/Mindanao coverage map, portfolio preview, CTA |
| `/about` | About Us | Company introduction, who we are, mission / vision / commitment (draft), service coverage, CTA |
| `/services` | Services | Index bar plus seven detailed service sections, each with a pre-filled inquiry link |
| `/shipments` | Shipment Portfolio | Filterable editorial gallery with a keyboard-accessible lightbox |
| `/contact` | Contact Us | Contact details, click-to-call, Google Maps link, validated inquiry form |
| `/credits` | Image credits | Required attribution for the CC-licensed photography |
| `*` | 404 | Branded not-found page |

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · React Router · React Hook Form · Lucide icons. Pages other than Home are lazy-loaded.

## Setup & commands

Requires Node 20+.

```bash
npm install
cp .env.example .env      # optional; see Environment variables
npm run dev               # local dev server, http://localhost:5173
npm run build             # type-check + production build into dist/
npm run preview           # serve the production build locally
npm run lint              # oxlint
```

Asset scripts (only needed when photos change):

```bash
node scripts/optimize-images.mjs <folder-of-originals>   # -> public/assets/rrja/<folder>/<id>-{800,1600,2400}.webp
node scripts/build-map.mjs <ne_10m_admin_0_countries.geojson>   # regenerates src/data/phMapDots.ts
```

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_FORM_ENDPOINT` | URL that accepts a JSON `POST` from the contact form (Formspree, Getform, Basin, or your own API). **If empty, the form validates but clearly tells the visitor it is not connected and that nothing was sent.** |
| `VITE_SITE_URL` | Production URL, e.g. `https://www.rrja.com.ph`. Enables canonical URLs and absolute Open Graph image URLs. |
| `VITE_SHOW_PENDING_MARKERS` | `true` (default) shows the small "To confirm" markers and the "Awaiting details" panel on About. Set it to `false` only after RRJA has confirmed everything. |

## Where to edit content

All business content lives in `src/data/`:

- `company.ts`: name, address, phones, email, hours, coverage, Facebook, map link. Each fact has a `verified` flag. Unverified facts show a "To confirm" marker and are left **out** of the structured data (JSON-LD) until verified.
- `services.ts`: services. `status: 'pending'` marks proposed services that RRJA has not confirmed. Delete any service RRJA does not offer.
- `shipments.ts`: gallery items. All are currently `illustrative: true`.
- `images.ts`: image registry, with alt text, credit, licence and source for every photo.
- `nav.ts`: navigation links.

The **official RRJA logo** (supplied by the client on 27 Nov 2026) is rendered by `src/components/Logo.tsx`. The master file is `public/assets/rrja/logo/rrja-logo-original.png`; the site uses trimmed WebP copies (`rrja-logo-96.webp`, `rrja-logo-192.webp`). The logo is never recoloured. On dark backgrounds (over the hero, in the footer) it sits on a white plate, and the navigation bar turns white on scroll so the logo shows as supplied.

## Asset directory

```
public/assets/rrja/
  logo/         official logo: original PNG master, web WebP sizes, 1200x630 social image
  backgrounds/  hero and section backgrounds (WebP, 800/1600/2400 w)
  cargo/        cargo and port photography
  shipments/    gallery photography
  team/ office/ icons/   empty; awaiting RRJA material
```

All photography is **illustrative** stock from Wikimedia Commons (CC0, public domain, CC BY, CC BY-SA). None of it shows RRJA cargo, clients, staff or premises. The site labels it "Illustrative" where context could mislead, and `/credits` gives the attribution the licences require. Two photos are local to the business: the Port of Cebu and the Davao International Container Terminal.

---

## Research log

| Source | Result |
|---|---|
| RRJA Facebook page | Login-walled for automated access. **Verified:** the page exists, titled "RRJA Customs Brokerage Services \| Mandaue City". No logo, photos, services, hours or posts could be retrieved. |
| Web search | No other public listing or website for RRJA was found. |
| thestar.sg | Studied for presentation quality only: transparent-to-solid navigation, full-bleed hero with uppercase headline and dual CTAs, numbered editorial index rows, large photo tiles, structured footer. No layout, branding, content or assets were copied. |

**Verified facts used:** business name; Mandaue City location; Facebook page URL; "customs brokerage" as the core service (from the business name).

## Missing client information

Please obtain these from RRJA before launch:

1. ~~Official logo~~ received 27 Nov 2026 as a PNG. Still useful: a **vector version** (SVG/AI/PDF) for sharper rendering, and confirmation of the brand colours (the logo uses navy and orange; the site's gold accent is provisional).
2. **Exact office address.** The site shows the preliminary *Unit 2-1, 2nd Floor, Tipolo Square, Lopez Jaena St., Tipolo, Mandaue City*. Ideally also a Google Maps share link to replace the search link and enable an embedded map.
3. **Phone numbers:** confirm +63 32 265 1255 (landline) and +63 917 655 8850 (mobile).
4. **Email address.** None is shown; none was invented.
5. **Business hours.** Mon–Fri 9:00 AM–6:00 PM is preliminary. Saturday/Sunday "Closed" is an assumption.
6. **Service list.** Confirm or remove: Import Documentation & Processing, Export Documentation & Processing, Customs Clearance Coordination, LCL Cargo Coordination, Breakbulk Shipment Coordination, Heavy Equipment Shipment Coordination.
7. **Service area:** confirm "Visayas and Mindanao".
8. **Company background:** year established, history, broker licence or accreditation details (only if RRJA wants them published).
9. **Mission, vision and commitment wording.** The current text is a draft for approval.
10. **"Why choose RRJA" points.** The five value propositions are drafts.
11. **Photography:** real shipment, office and team photos, with permission to publish and any customer names or locations cleared.
12. **Production domain**, for the canonical URL, `sitemap.xml` and `robots.txt`.

When an item is confirmed, set its `verified: true` (or `status: 'verified'`) in `src/data/`. Once everything is confirmed, set `VITE_SHOW_PENDING_MARKERS=false`.

## Features requiring backend integration

| Feature | Current state | What is needed |
|---|---|---|
| Contact / quote form | Full client-side validation (required fields, email, phone), honeypot spam field, success/error states. Without an endpoint it shows a "not connected, not sent" notice with direct contact options. | Set `VITE_FORM_ENDPOINT` to a form service or API that accepts JSON and returns 2xx on success. Formspree works as-is. Add CAPTCHA or rate limiting if spam appears. |
| Map | Google Maps search link | After the address is confirmed: a pinned share link, or an embed `<iframe>` on the Contact page |
| Gallery content | Static data file | Optional: a headless CMS if RRJA wants to add shipments themselves |

## SEO

- Unique title, meta description and Open Graph/Twitter tags per page (`src/lib/seo.ts`); default tags in `index.html`.
- Semantic landmarks, one `h1` per page, descriptive alt text on every image.
- `public/sitemap.xml` and `public/robots.txt`: **replace `https://www.example.com`** with the real domain.
- JSON-LD `ProfessionalService` built only from verified facts.
- Note: this is a client-rendered SPA. Google renders JavaScript, but for the best SEO consider pre-rendering the five routes (e.g. `vite-plugin-prerender`) or moving to a static-generation setup later.

## Deployment

The build output in `dist/` is static and can be hosted anywhere.

- **Vercel:** import the repo (framework: Vite) or run `vercel --prod`. `vercel.json` already provides the SPA rewrite and long-term caching for `/assets`.
- **Netlify:** build command `npm run build`, publish directory `dist`, and add a `_redirects` file containing `/* /index.html 200`.
- **Apache / cPanel / XAMPP:** upload the contents of `dist/`. `public/.htaccess` (copied into `dist/`) provides the SPA fallback.

Set the environment variables in the host's dashboard before building.

## Testing summary (27 Nov 2026)

- `tsc -b` type check: pass. `vite build`: pass. `oxlint`: 0 warnings.
- Headless browser (Edge via Puppeteer) on all routes at 1440px and 390px (mobile emulation): no console errors, no failed requests, all images present, no horizontal overflow.
- Contact form: empty submit shows the four required-field errors; an invalid email is rejected; a valid submit without an endpoint shows the "not connected, not sent" notice; `?service=heavy-equipment` pre-selects the shipment type.
- Gallery: category filter works (Breakbulk shows 2 items); lightbox opens, arrow keys navigate, Escape closes and returns focus.
- Mobile menu opens, navigates and closes on route change. `/services#breakbulk` deep links scroll to the section.
- Reduced motion: honoured through `MotionConfig reducedMotion="user"` and a CSS `prefers-reduced-motion` override.
- Not yet tested: real form submission against a live endpoint, physical iOS/Android devices, and Lighthouse on the production host.
