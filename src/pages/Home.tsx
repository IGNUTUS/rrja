import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, ClipboardCheck, Compass, Handshake, MapPinned, ShieldCheck } from 'lucide-react'
import Hero from '../components/Hero'
import Img, { IllustrativeTag } from '../components/Img'
import ServiceCard from '../components/ServiceCard'
import PhilippinesMap from '../components/PhilippinesMap'
import CTASection from '../components/CTASection'
import { Button, Pending, Reveal, SectionHeading, TextLink } from '../components/ui'
import { images } from '../data/images'
import { services } from '../data/services'
import { shipments } from '../data/shipments'
import { company } from '../data/company'
import { organizationJsonLd, useSeo } from '../lib/seo'

const LD = organizationJsonLd()

/** Value propositions: DRAFT, subject to client confirmation. No numeric claims or guarantees. */
const reasons = [
  { icon: ShieldCheck, title: 'Professional Service', text: 'A considered, professional approach to every customs brokerage requirement, whatever the size of the shipment.' },
  { icon: Compass, title: 'Reliable Coordination', text: 'We keep the moving parts of your shipment connected, so you always know where things stand and what comes next.' },
  { icon: ClipboardCheck, title: 'Attention to Documentation', text: 'Customs work runs on paperwork. We take care to review details and flag issues early.' },
  { icon: Handshake, title: 'Customer-Focused Assistance', text: 'Clear answers, direct communication and practical guidance from a team that is easy to reach.' },
  { icon: MapPinned, title: 'Regional Service Coverage', text: 'Based in Mandaue City, Cebu, and supporting businesses across the Visayas and Mindanao.' },
]

export default function Home() {
  useSeo({
    title: 'Customs Brokerage Services in Mandaue City, Cebu',
    description:
      'RRJA Customs Brokerage Services supports importers, exporters and businesses in Cebu, the Visayas and Mindanao with professional customs brokerage and cargo coordination.',
    path: '/',
    jsonLd: LD,
  })

  return (
    <>
      {/* A/B — HERO */}
      <Hero
        size="full"
        image={images.heroNight}
        eyebrow="Customs Brokerage · Mandaue City, Cebu"
        lines={['Connecting businesses.', 'Moving the world.']}
        intro="Professional customs brokerage and cargo coordination services designed to move your business forward."
        actions={
          <>
            <Button to="/contact#inquiry">Request a Quote</Button>
            <Button to="/services" variant="outline-light">
              Discover Our Services
            </Button>
          </>
        }
        footer={
          <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/10 bg-navy-950/40 backdrop-blur-sm md:block">
            <div className="container-x grid grid-cols-[1fr_1fr_1fr_auto] divide-x divide-white/10">
              {[
                ['Based in', 'Mandaue City, Cebu'],
                ['Specialising in', 'Customs Brokerage'],
                ['Serving', 'Visayas & Mindanao'],
              ].map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.7 }}
                  className="py-5 pr-6 [&:not(:first-child)]:pl-6"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">{k}</p>
                  <p className="mt-1 font-display text-[0.95rem] font-semibold text-white">
                    {v}
                    {i === 2 && <Pending light />}
                  </p>
                </motion.div>
              ))}
              <a href="#intro" className="group flex items-center gap-3 pl-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60 hover:text-gold">
                Scroll
                <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
              </a>
            </div>
          </div>
        }
      />

      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-line bg-white py-5" aria-hidden>
        <div className="flex w-max animate-[marquee_45s_linear_infinite] gap-12 whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.3em] text-navy/35 motion-reduce:animate-none">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ['Customs Brokerage', 'Import', 'Export', 'Documentation', 'Cargo Coordination', 'Mandaue City', 'Cebu', 'Visayas', 'Mindanao'].map((w) => (
              <span key={`${k}-${w}`} className="flex items-center gap-12">
                {w} <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              </span>
            )),
          )}
        </div>
      </div>

      {/* C — INTRODUCTION */}
      <section id="intro" className="scroll-mt-20 bg-white py-24 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="relative lg:col-span-6">
            <div className="relative">
              <span className="absolute -left-4 -top-4 hidden h-40 w-40 border-l-2 border-t-2 border-gold sm:block" aria-hidden />
              <Img img={images.portCebu} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5] w-full sm:aspect-[5/6]" label />
              <div className="absolute -bottom-10 -right-4 hidden w-[46%] border-[10px] border-white shadow-2xl sm:block lg:-right-12">
                <Img img={images.gantryCrane} sizes="25vw" className="aspect-[4/5]" />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow text-gold-700">Who we are</p>
              <h2 className="display-lg mt-6 text-navy">
                Beyond clearance.
                <br />
                <span className="text-royal">Built on trust.</span>
              </h2>
              <span className="gold-rule mt-8" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead mt-8 text-slate-ink">
                <strong className="font-semibold text-navy">{company.name}</strong> is a customs brokerage business based in Mandaue City, Cebu. We support
                importers, exporters and businesses with their customs processing and cargo-related requirements.
              </p>
              <p className="mt-5 leading-relaxed text-slate-ink">
                Every shipment comes with documents to prepare, requirements to meet and people waiting on the other end. Our role is to bring care, clarity
                and steady coordination to that process, so you can focus on running your business.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line">
                <div className="bg-white p-5">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-ink/70">Headquarters</dt>
                  <dd className="mt-1 font-display font-semibold text-navy">Mandaue City, Cebu</dd>
                </div>
                <div className="bg-white p-5">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-ink/70">Core service</dt>
                  <dd className="mt-1 font-display font-semibold text-navy">Customs Brokerage</dd>
                </div>
              </dl>
              <div className="mt-10">
                <Button to="/about" variant="outline-dark">
                  Read More
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* D — SERVICES OVERVIEW */}
      <section className="bg-navy-950 py-24 text-white md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              light
              eyebrow="What we do"
              title="Our services"
              intro="From customs brokerage to the coordination of specialised cargo, we help keep your shipments moving."
            />
            <Reveal>
              <TextLink to="/services" light>
                View all services
              </TextLink>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08} className="h-full">
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* E — WHY CHOOSE RRJA */}
      <section className="bg-white py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Why RRJA"
                title={
                  <>
                    Why businesses <span className="text-royal">choose RRJA</span>
                  </>
                }
                intro="Customs brokerage is about more than paperwork. It's about having a partner you can rely on when your cargo is on the line."
              />
              <Reveal delay={0.1} className="mt-10 hidden lg:block">
                <Img img={images.containerTrucks} sizes="40vw" className="aspect-[16/11]" label />
              </Reveal>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.05} className="group border-t border-line py-9 last:border-b">
                <div className="grid grid-cols-[auto_1fr] gap-6 sm:grid-cols-[4rem_auto_1fr] sm:gap-8">
                  <span className="hidden font-display text-sm font-semibold text-gold-700 sm:block">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex h-12 w-12 items-center justify-center bg-mist text-royal transition-colors duration-300 group-hover:bg-navy group-hover:text-gold">
                    <r.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy transition-colors group-hover:text-royal sm:text-2xl">{r.title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-ink">{r.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <p className="mt-6 text-right">
              <Pending label="Value propositions to confirm" />
            </p>
          </ol>
        </div>
      </section>

      {/* F — REGIONAL COVERAGE */}
      <section className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(22,75,131,0.55),transparent_60%)]" aria-hidden />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              light
              eyebrow="Regional coverage"
              title={
                <>
                  Serving businesses across the <span className="text-gold">Visayas</span> and <span className="text-gold">Mindanao</span>
                </>
              }
              intro={
                <>
                  From our base in Mandaue City, Cebu, at the heart of the Visayas, we support businesses throughout the central and southern Philippines.
                  <Pending light label="Coverage to confirm" />
                </>
              }
            />
            <Reveal delay={0.1}>
              <ul className="mt-10 grid grid-cols-2 gap-px bg-white/10">
                {[
                  ['Visayas', 'Central Philippines'],
                  ['Mindanao', 'Southern Philippines'],
                ].map(([t, s]) => (
                  <li key={t} className="bg-navy p-6">
                    <span className="block h-2 w-2 rotate-45 bg-gold" />
                    <p className="mt-4 font-display text-2xl font-bold">{t}</p>
                    <p className="mt-1 text-sm text-white/55">{s}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button to="/contact#inquiry">Talk to our team</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <PhilippinesMap className="mx-auto h-auto w-full max-w-[560px]" />
            <p className="mt-4 text-center text-xs text-white/40">Stylised map. The marker shows our Mandaue City base; no branch offices are implied.</p>
          </Reveal>
        </div>
      </section>

      {/* G — SHIPMENT PORTFOLIO PREVIEW */}
      <section className="bg-mist py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Shipment portfolio"
              title={
                <>
                  Moving cargo.
                  <br />
                  <span className="text-royal">Connecting opportunities.</span>
                </>
              }
            />
            <Reveal>
              <TextLink to="/shipments">Explore the portfolio</TextLink>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            {[shipments[0], shipments[1], shipments[2]].map((s, i) => (
              <Reveal
                key={s.id}
                delay={i * 0.08}
                className={i === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'}
              >
                <Link to="/shipments" className="group relative block h-full min-h-[280px] overflow-hidden bg-navy-800 text-white md:min-h-[300px]">
                  <Img
                    img={s.image}
                    sizes={i === 0 ? '(min-width: 768px) 58vw, 100vw' : '(min-width: 768px) 42vw, 100vw'}
                    className={`!absolute inset-0 h-full w-full`}
                    imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent" />
                  <IllustrativeTag className="!bottom-auto !left-auto right-4 top-4" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">{s.category}</p>
                      <h3 className={`mt-2 font-display font-bold leading-tight ${i === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{s.title}</h3>
                    </div>
                    <ArrowUpRight className="h-6 w-6 shrink-0 text-white/70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-ink">
            Images shown are illustrative cargo photography, not RRJA projects. RRJA shipment photography will be added once approved for publication.
          </p>
        </div>
      </section>

      {/* H — FINAL CTA */}
      <CTASection />
    </>
  )
}
