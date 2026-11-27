import { Link } from 'react-router-dom'
import { Clock, MapPin, Phone } from 'lucide-react'
import Wordmark from './Wordmark'
import { FacebookIcon, Pending } from './ui'
import { company } from '../data/company'
import { services } from '../data/services'
import { navLinks } from '../data/nav'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 text-white/70">
      <div className="h-[2px] w-full bg-gradient-to-r from-gold via-gold/40 to-transparent" />
      <div className="container-x grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Wordmark />
          <p className="mt-7 max-w-sm text-[0.95rem] leading-relaxed">
            {company.name} is a customs brokerage business based in Mandaue City, Cebu, supporting businesses with their customs processing and
            cargo-related requirements.
          </p>
          <a
            href={company.facebook.value}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 border border-white/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            <FacebookIcon /> Follow on Facebook
          </a>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Explore</h3>
          <ul className="mt-6 space-y-3 text-[0.95rem]">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Services</h3>
          <ul className="mt-6 space-y-3 text-[0.95rem]">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 text-[0.95rem] lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Contact <Pending light />
          </h3>
          <p className="flex gap-3">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
            <span>
              {company.address.value.line1}
              <br />
              {company.address.value.line2}
              <br />
              {company.address.value.line3}
            </span>
          </p>
          <div className="flex gap-3">
            <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
            <ul className="space-y-1">
              {company.phones.value.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="transition-colors hover:text-white">
                    <span className="text-white/45">{p.label}: </span>
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3">
            <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
            <ul className="space-y-1">
              {company.hours.value.map((h) => (
                <li key={h.days}>
                  <span className="text-white/45">{h.days}: </span>
                  {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="flex gap-5">
            <Link to="/credits" className="hover:text-white">
              Image credits
            </Link>
            <span>Mandaue City, Cebu, Philippines</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
