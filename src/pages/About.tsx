import { Eye, FileQuestion, HeartHandshake, MapPin, Target } from 'lucide-react'
import Hero from '../components/Hero'
import Img from '../components/Img'
import PhilippinesMap from '../components/PhilippinesMap'
import CTASection from '../components/CTASection'
import { Button, Pending, Reveal, SectionHeading } from '../components/ui'
import { images } from '../data/images'
import { company, showPendingMarkers } from '../data/company'
import { useSeo } from '../lib/seo'

/**
 * Mission, vision and commitment are DRAFT statements written for client review.
 * Replace them with RRJA's own wording once supplied.
 */
const pillars = [
  {
    icon: Target,
    label: 'Our Mission',
    text: 'To give businesses professional, dependable customs brokerage support, handling every shipment with care, accuracy and clear communication.',
  },
  {
    icon: Eye,
    label: 'Our Vision',
    text: 'To be a trusted customs brokerage partner for businesses across the Visayas and Mindanao, known for the quality of our service.',
  },
  {
    icon: HeartHandshake,
    label: 'Our Commitment',
    text: 'To listen, to keep our clients informed, and to treat every shipment, large or small, as important to the business behind it.',
  },
]

/** Facts RRJA must supply. Shown only while VITE_SHOW_PENDING_MARKERS is on. Never fill these with guesses. */
const awaiting = ['Year established and company background', 'Customs broker licence / accreditation details', 'Team introduction and photographs', 'Office photographs']

export default function About() {
  useSeo({
    title: 'About Us',
    description: 'Learn about RRJA Customs Brokerage Services, a customs brokerage business based in Mandaue City, Cebu, Philippines.',
    path: '/about',
    image: '/assets/rrja/backgrounds/aerial-terminal-2-1600.webp',
  })

  return (
    <>
      <Hero
        image={images.aerialTerminal2}
        eyebrow="About RRJA"
        lines={['Built on trust.', 'Driven by service.']}
        intro="A customs brokerage business in Mandaue City, Cebu, supporting businesses with their customs and cargo requirements."
      />

      {/* 1 + 2 — Company introduction / Who we are */}
      <section className="bg-white py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Company introduction" title={<>Who <span className="text-royal">we are</span></>} />
            <Reveal delay={0.1}>
              <p className="lead mt-8 text-slate-ink">
                <strong className="font-semibold text-navy">{company.name}</strong> is a customs brokerage business based in Mandaue City, Cebu, in the
                Philippines.
              </p>
              <p className="mt-5 leading-relaxed text-slate-ink">
                We support importers, exporters and businesses with their customs processing and cargo-related requirements. Our work centres on the
                details that keep shipments moving: preparing and organising documents, understanding what each shipment needs, and coordinating the
                process through to release.
              </p>
              <p className="mt-5 leading-relaxed text-slate-ink">
                Located in Mandaue City, one of Cebu&apos;s key commercial and industrial centres, we are well placed to serve businesses moving cargo
                through the central and southern Philippines.
              </p>
            </Reveal>

            {showPendingMarkers && (
              <Reveal delay={0.15} className="mt-10 border border-dashed border-gold-700/40 bg-mist p-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
                  <FileQuestion className="h-4 w-4" aria-hidden /> Awaiting details from RRJA
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-ink">
                  {awaiting.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span className="mt-2 h-1 w-3 shrink-0 bg-gold" /> {a}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-ink/70">This panel shows only during client review and is hidden when pending markers are switched off.</p>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-5 grid-rows-[auto_auto] gap-4">
              <Img img={images.portCebu2} sizes="(min-width: 1024px) 45vw, 100vw" className="col-span-5 aspect-[16/10]" label />
              <Img img={images.hamburgTerminal} sizes="25vw" className="col-span-3 aspect-[4/3]" />
              <div className="col-span-2 flex flex-col justify-between bg-navy p-5 text-white sm:p-7">
                <MapPin className="h-6 w-6 text-gold" aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">Based in</p>
                  <p className="mt-1 font-display text-lg font-bold leading-tight sm:text-xl">Mandaue City, Cebu</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 + 4 + 5 — Mission / Vision / Commitment */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        <Img img={images.aerialTerminal} className="!absolute inset-0 h-full w-full opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/85 to-navy-950" />
        <div className="container-x relative">
          <SectionHeading
            light
            align="center"
            eyebrow="What drives us"
            title="Purpose & principles"
            intro={
              <>
                The principles behind how we work with every client.
                <Pending light label="Draft wording to approve" />
              </>
            }
          />
          <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.1} className="group bg-navy-950/90 p-9 transition-colors duration-500 hover:bg-navy-800 md:p-11">
                <span className="font-display text-sm font-semibold text-white/35">0{i + 1}</span>
                <p.icon className="mt-8 h-8 w-8 text-gold" aria-hidden />
                <h3 className="mt-6 font-display text-2xl font-bold">{p.label}</h3>
                <span className="mt-5 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                <p className="mt-5 leading-relaxed text-white/70">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Service coverage */}
      <section className="bg-mist py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Service coverage"
              title={
                <>
                  Rooted in Cebu. <span className="text-royal">Serving the south.</span>
                </>
              }
              intro={
                <>
                  From Mandaue City we support businesses across the Visayas and Mindanao.
                  <Pending label="Coverage to confirm" />
                </>
              }
            />
            <Reveal delay={0.1} className="mt-10">
              <Button to="/services" variant="navy">
                Explore our services
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="bg-navy p-6 sm:p-10 lg:col-span-5 lg:col-start-8">
            <PhilippinesMap className="mx-auto h-auto w-full max-w-[420px]" />
          </Reveal>
        </div>
      </section>

      {/* 7 — Contact CTA */}
      <CTASection image={images.davaoCranes} title="Let's talk about your next shipment." />
    </>
  )
}
