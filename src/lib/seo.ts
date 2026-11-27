import { useEffect } from 'react'
import { company, siteUrl } from '../data/company'

type SeoInput = {
  title: string
  description: string
  path: string
  image?: string
  jsonLd?: Record<string, unknown>
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Per-page title, description, Open Graph, canonical (when VITE_SITE_URL is set) and optional JSON-LD. */
export function useSeo({ title, description, path, image = '/assets/rrja/backgrounds/hero-night-1600.webp', jsonLd }: SeoInput) {
  useEffect(() => {
    const fullTitle = `${title} | ${company.name}`
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', (siteUrl || '') + image)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (siteUrl) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = siteUrl + path
      setMeta('property', 'og:url', siteUrl + path)
    }

    let script: HTMLScriptElement | null = null
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
    return () => script?.remove()
  }, [title, description, path, image, jsonLd])
}

/**
 * Structured data built ONLY from verified facts. Unverified details (address, phone, hours) are added
 * automatically once their `verified` flag in src/data/company.ts is set to true.
 */
export function organizationJsonLd() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: company.name,
    sameAs: [company.facebook.value],
    areaServed: company.coverage.verified ? company.coverage.value : undefined,
  }
  if (siteUrl) data.url = siteUrl
  if (company.address.verified) {
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.value.line1}, ${company.address.value.line2}`,
      addressLocality: 'Mandaue City',
      addressRegion: 'Cebu',
      addressCountry: 'PH',
    }
  } else {
    data.address = { '@type': 'PostalAddress', addressLocality: 'Mandaue City', addressRegion: 'Cebu', addressCountry: 'PH' }
  }
  if (company.phones.verified) data.telephone = company.phones.value[0].tel
  if (company.email.verified && company.email.value) data.email = company.email.value
  return data
}
