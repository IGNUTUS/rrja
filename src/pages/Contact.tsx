import type { ReactNode } from 'react'
import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'
import { FacebookIcon, Pending, Reveal } from '../components/ui'
import { images } from '../data/images'
import { company } from '../data/company'
import { organizationJsonLd, useSeo } from '../lib/seo'

const LD = organizationJsonLd()

function InfoBlock({ icon, title, children, pending }: { icon: ReactNode; title: string; children: ReactNode; pending?: boolean }) {
  return (
    <div className="flex gap-5 border-b border-white/10 py-7 first:pt-0 last:border-0">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 text-gold">{icon}</span>
      <div>
        <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/50">
          {title}
          {pending && <Pending light />}
        </h3>
        <div className="mt-2 text-white">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  useSeo({
    title: 'Contact Us',
    description: 'Contact RRJA Customs Brokerage Services in Mandaue City, Cebu. Request a quote or ask about your shipment and customs brokerage requirements.',
    path: '/contact',
    image: '/assets/rrja/cargo/port-cebu-1600.webp',
    jsonLd: LD,
  })

  return (
    <>
      <Hero
        image={images.portCebu}
        eyebrow="Contact us"
        lines={["Let's start the", 'conversation.']}
        intro="Have a shipment or customs brokerage requirement? Reach out by phone or Facebook, or send us an inquiry below."
      />

      <section id="inquiry" className="scroll-mt-16 bg-white">
        <div className="container-x grid lg:grid-cols-12">
          {/* Contact details */}
          <aside className="relative -mx-5 bg-navy px-6 py-16 text-white sm:-mx-8 sm:px-10 lg:col-span-5 lg:mx-0 lg:-mt-12 lg:px-12 lg:py-16">
            <Reveal>
              <p className="eyebrow text-gold">Get in touch</p>
              <h2 className="display-md mt-5">RRJA Customs Brokerage Services</h2>
              <span className="gold-rule mt-6" />
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <InfoBlock icon={<MapPin className="h-5 w-5" />} title="Office" pending={!company.address.verified}>
                <address className="not-italic leading-relaxed text-white/85">
                  {company.address.value.line1}
                  <br />
                  {company.address.value.line2}
                  <br />
                  {company.address.value.line3}
                </address>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold hover:text-gold-300"
                >
                  Open in Google Maps <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </InfoBlock>

              <InfoBlock icon={<Phone className="h-5 w-5" />} title="Call us" pending={!company.phones.verified}>
                <ul className="space-y-1.5">
                  {company.phones.value.map((p) => (
                    <li key={p.tel}>
                      <a href={`tel:${p.tel}`} className="font-display text-lg font-semibold transition-colors hover:text-gold">
                        {p.display}
                      </a>
                      <span className="ml-2 text-sm text-white/45">{p.label}</span>
                    </li>
                  ))}
                </ul>
              </InfoBlock>

              <InfoBlock icon={<Mail className="h-5 w-5" />} title="Email" pending={!company.email.value}>
                {company.email.value ? (
                  <a href={`mailto:${company.email.value}`} className="hover:text-gold">
                    {company.email.value}
                  </a>
                ) : (
                  <span className="text-white/60">Email address coming soon. Please call or message us on Facebook.</span>
                )}
              </InfoBlock>

              <InfoBlock icon={<Clock className="h-5 w-5" />} title="Business hours" pending={!company.hours.verified}>
                <ul className="space-y-1 text-white/85">
                  {company.hours.value.map((h) => (
                    <li key={h.days} className="flex flex-wrap gap-x-3">
                      <span className="text-white/50">{h.days}</span> {h.time}
                    </li>
                  ))}
                </ul>
              </InfoBlock>

              <InfoBlock icon={<FacebookIcon className="h-5 w-5" />} title="Facebook">
                <a href={company.facebook.value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                  RRJA Customs Brokerage Services <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </InfoBlock>
            </Reveal>
          </aside>

          {/* Form */}
          <div className="py-16 lg:col-span-7 lg:py-24 lg:pl-16 xl:pl-20">
            <Reveal>
              <p className="eyebrow text-gold-700">Request a quote</p>
              <h2 className="display-md mt-5 text-navy">Tell us about your shipment</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-ink">
                Share a few details about your cargo and requirements. The more we know, the better we can help.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Location band */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="container-x grid gap-10 py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow text-gold">Visit us</p>
            <p className="mt-4 font-display text-2xl font-bold sm:text-3xl">Tipolo Square, Mandaue City, Cebu</p>
            <p className="mt-2 text-sm text-white/55">
              The exact office location will be pinned once confirmed by RRJA.
              <Pending light />
            </p>
          </div>
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-white/25 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:border-gold hover:text-gold"
          >
            <MapPin className="h-4 w-4" aria-hidden /> Get directions
          </a>
        </div>
      </section>
    </>
  )
}
