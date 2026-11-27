import { Check } from 'lucide-react'
import Hero from '../components/Hero'
import Img from '../components/Img'
import CTASection from '../components/CTASection'
import { Button, Pending, Reveal } from '../components/ui'
import { images } from '../data/images'
import { services } from '../data/services'
import { useSeo } from '../lib/seo'

export default function Services() {
  useSeo({
    title: 'Customs Brokerage Services',
    description:
      'Customs brokerage, import and export documentation, and cargo coordination support from RRJA Customs Brokerage Services in Mandaue City, Cebu.',
    path: '/services',
    image: '/assets/rrja/backgrounds/aerial-terminal-1600.webp',
  })

  return (
    <>
      <Hero
        image={images.aerialTerminal}
        eyebrow="Our services"
        lines={['Customs brokerage.', 'Made professional.']}
        intro="Support for the customs and documentation side of your shipments, handled with care from first inquiry to cargo release."
      />

      {/* Index */}
      <nav aria-label="Services on this page" className="border-b border-line bg-white">
        <div className="container-x">
          <ol className="-mx-5 flex overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-7">
            {services.map((s, i) => (
              <li key={s.slug} className="shrink-0 border-r border-line first:border-l lg:shrink">
                <a href={`#${s.slug}`} className="group flex h-full flex-col gap-2 px-5 py-6 transition-colors hover:bg-mist">
                  <span className="font-display text-xs font-semibold text-gold-700">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[0.8rem] font-semibold leading-snug text-navy group-hover:text-royal">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Service detail rows */}
      <div className="bg-white">
        {services.map((s, i) => {
          const flip = i % 2 === 1
          return (
            <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="scroll-mt-24 border-b border-line py-20 md:py-28">
              <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal className={`relative lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}>
                  <Img img={s.image} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full" label />
                  <span
                    className="absolute -bottom-6 -right-6 hidden h-24 w-24 items-center justify-center bg-navy text-gold sm:flex"
                    aria-hidden
                  >
                    <s.icon className="h-9 w-9" />
                  </span>
                </Reveal>
                <div className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                  <Reveal>
                    <p className="eyebrow text-gold-700">Service {String(i + 1).padStart(2, '0')}</p>
                    <h2 id={`${s.slug}-title`} className="display-md mt-5 text-navy">
                      {s.title}
                      {s.status === 'pending' && <Pending label="Service to confirm" />}
                    </h2>
                    <span className="gold-rule mt-6" />
                    <p className="mt-6 leading-relaxed text-slate-ink">{s.description}</p>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h3 className="mt-9 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-navy">Key benefits</h3>
                    <ul className="mt-4 space-y-3">
                      {s.benefits.map((b) => (
                        <li key={b} className="flex gap-3 text-ink">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-gold/15 text-gold-700">
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      <Button to={`/contact?service=${s.slug}#inquiry`} variant="navy">
                        Inquire about this service
                      </Button>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <CTASection title="Need assistance with your shipment?" text="Tell us about your cargo and requirements, and our team will get back to you." button="Request a Quote" to="/contact#inquiry" image={images.containerShip2} />
    </>
  )
}
