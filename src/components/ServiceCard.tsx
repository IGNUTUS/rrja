import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Img from './Img'
import { Pending } from './ui'
import type { Service } from '../data/services'

/** Image-led service card used in the homepage overview. */
export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  return (
    <Link
      to={`/services#${service.slug}`}
      className="group relative flex h-full min-h-[440px] flex-col justify-end overflow-hidden bg-navy-800 text-white"
    >
      <Img
        img={service.image}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="!absolute inset-0 h-full w-full"
        imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/10 transition-colors duration-500 group-hover:via-navy/80" />
      <div className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />

      <div className="relative flex items-start justify-between p-7 pb-0">
        <span className="font-display text-sm font-semibold text-white/50">{String(index + 1).padStart(2, '0')}</span>
        <span className="flex h-12 w-12 items-center justify-center border border-white/20 bg-navy-950/40 text-gold backdrop-blur-sm transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
      <div className="relative mt-auto p-7">
        <h3 className="font-display text-2xl font-bold leading-tight">
          {service.title}
          {service.status === 'pending' && <Pending light label="Service to confirm" />}
        </h3>
        <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-white/70">{service.short}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold">
          Learn more <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
