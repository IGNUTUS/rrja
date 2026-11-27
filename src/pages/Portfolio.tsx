import { Camera } from 'lucide-react'
import Hero from '../components/Hero'
import ShipmentGallery from '../components/ShipmentGallery'
import CTASection from '../components/CTASection'
import { Reveal, SectionHeading } from '../components/ui'
import { images } from '../data/images'
import { shipments } from '../data/shipments'
import { useSeo } from '../lib/seo'

export default function Portfolio() {
  useSeo({
    title: 'Shipment Portfolio',
    description: 'Shipment gallery from RRJA Customs Brokerage Services, Mandaue City, Cebu: heavy equipment, industrial cargo, container shipments and breakbulk.',
    path: '/shipments',
    image: '/assets/rrja/shipments/heavy-equipment-1600.webp',
  })
  const allIllustrative = shipments.every((s) => s.illustrative)

  return (
    <>
      <Hero
        image={images.containerStacks}
        eyebrow="Shipment portfolio"
        lines={['Every shipment', 'tells a story.']}
        intro="Heavy equipment, industrial cargo, containers and breakbulk. Behind every consignment is a business counting on it to arrive."
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="mb-14 grid gap-10 lg:grid-cols-12 lg:items-end">
            <SectionHeading className="lg:col-span-7" eyebrow="Gallery" title={<>Cargo in <span className="text-royal">motion</span></>} />
            {allIllustrative && (
              <Reveal delay={0.1} className="flex gap-4 border-l-2 border-gold bg-mist p-6 lg:col-span-5">
                <Camera className="h-5 w-5 shrink-0 text-gold-700" aria-hidden />
                <p className="text-sm leading-relaxed text-slate-ink">
                  <strong className="font-semibold text-navy">Illustrative photography.</strong> The images in this gallery show typical cargo types and are
                  not RRJA projects. Verified RRJA shipment photographs will replace them once approved for publication.
                </p>
              </Reveal>
            )}
          </div>
          <ShipmentGallery />
        </div>
      </section>

      <CTASection title="Have cargo that needs moving?" text="Tell us what you're shipping and our team will get back to you." button="Request a Quote" to="/contact#inquiry" image={images.bremerhavenCranes} />
    </>
  )
}
