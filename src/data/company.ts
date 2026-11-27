/**
 * RRJA company information: the single source of truth for every business detail on the site.
 *
 * `verified: true`  -> seen on a public RRJA source (see README "Research log").
 * `verified: false` -> preliminary research data. It MUST be confirmed by RRJA before launch.
 *                      While VITE_SHOW_PENDING_MARKERS is on, it shows a small "To confirm" marker.
 */
export type Fact<T> = { value: T; verified: boolean; note?: string }

export const company = {
  name: 'RRJA Customs Brokerage Services',
  shortName: 'RRJA',

  /** Verified: the public Facebook page title reads "RRJA Customs Brokerage Services | Mandaue City". */
  city: { value: 'Mandaue City, Cebu, Philippines', verified: true } as Fact<string>,

  address: {
    value: {
      line1: 'Unit 2-1, 2nd Floor, Tipolo Square',
      line2: 'Lopez Jaena Street, Tipolo',
      line3: 'Mandaue City, Cebu, Philippines',
    },
    verified: false,
    note: 'Preliminary research data. Confirm the exact unit and street with RRJA.',
  },

  phones: {
    value: [
      { label: 'Landline', display: '+63 32 265 1255', tel: '+63322651255' },
      { label: 'Mobile', display: '+63 917 655 8850', tel: '+639176558850' },
    ],
    verified: false,
  },

  /** Intentionally empty: never invent an email address. Add one once RRJA supplies it. */
  email: { value: '' as string, verified: false },

  hours: {
    value: [
      { days: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
      { days: 'Saturday – Sunday', time: 'Closed' },
    ],
    verified: false,
  },

  coverage: {
    value: 'Visayas and Mindanao',
    verified: false,
    note: 'Service-area claim from the project brief. Confirm with RRJA.',
  },

  facebook: {
    value: 'https://www.facebook.com/p/RRJA-Customs-Brokerage-Services-100086253742297/',
    verified: true,
  } as Fact<string>,

  /** Google Maps search link (not an exact pin). Swap for a pinned share link once the office location is confirmed. */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Tipolo Square, Lopez Jaena Street, Mandaue City, Cebu'),

  /** Office map pin used on the coverage map (approximate city centre of Mandaue). */
  mapPin: { lat: 10.333, lon: 123.936 },
} as const

export const showPendingMarkers = import.meta.env.VITE_SHOW_PENDING_MARKERS !== 'false'
export const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? ''
