import { images } from '../data/images'
import { useSeo } from '../lib/seo'

export default function Credits() {
  useSeo({ title: 'Image Credits', description: 'Photography credits and licences for the RRJA Customs Brokerage Services website.', path: '/credits' })
  return (
    <section className="bg-white pb-24 pt-40">
      <div className="container-x max-w-4xl">
        <p className="eyebrow text-gold-700">Credits</p>
        <h1 className="display-md mt-5 text-navy">Image credits</h1>
        <p className="mt-5 leading-relaxed text-slate-ink">
          Photography on this website is illustrative and sourced from Wikimedia Commons under the licences listed below. Images do not depict RRJA
          shipments, clients, staff or premises unless stated otherwise. Some photos have been cropped and resized.
        </p>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {Object.values(images).map((img) => (
            <li key={img.id} className="grid gap-1 py-4 text-sm sm:grid-cols-[1fr_auto] sm:gap-6">
              <span className="text-ink">{img.alt}</span>
              <span className="text-slate-ink">
                {img.credit} ·{' '}
                <a href={img.source} target="_blank" rel="noopener noreferrer" className="text-royal underline-offset-4 hover:underline">
                  {img.license}
                </a>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-slate-ink/70">Map data: Natural Earth (public domain).</p>
      </div>
    </section>
  )
}
