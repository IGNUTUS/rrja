import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { showPendingMarkers } from '../data/company'

/* ---------- Reveal on scroll ---------- */
const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay } }),
}

export function Reveal({ children, delay = 0, className = '', as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' | 'section' }) {
  const M = motion[as]
  return (
    <M className={className} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} custom={delay}>
      {children}
    </M>
  )
}

/* ---------- Buttons ---------- */
type BtnProps = { to: string; children: ReactNode; variant?: 'gold' | 'outline-light' | 'outline-dark' | 'navy'; className?: string; external?: boolean }

const btnBase =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300'
const btnVariants = {
  gold: 'bg-gold text-navy hover:text-white',
  navy: 'bg-navy text-white hover:text-navy',
  'outline-light': 'border border-white/40 text-white hover:border-gold hover:text-navy',
  'outline-dark': 'border border-navy/25 text-navy hover:border-navy hover:text-white',
}
const btnFill = {
  gold: 'bg-navy',
  navy: 'bg-gold',
  'outline-light': 'bg-gold',
  'outline-dark': 'bg-navy',
}

export function Button({ to, children, variant = 'gold', className = '', external }: BtnProps) {
  const inner = (
    <>
      <span className={`absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 ${btnFill[variant]}`} aria-hidden />
      <span className="relative">{children}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </>
  )
  const cls = `${btnBase} ${btnVariants[variant]} ${className}`
  if (external)
    return (
      <a href={to} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  )
}

export function TextLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] ${light ? 'text-gold' : 'text-royal'}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  )
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  align = 'left',
  className = '',
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  light?: boolean
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <p className={`eyebrow ${light ? 'text-gold' : 'text-gold-700'} ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 className={`display-lg mt-5 ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {intro && <p className={`lead mt-6 ${light ? 'text-white/70' : 'text-slate-ink'} ${align === 'center' ? 'mx-auto' : ''} max-w-2xl`}>{intro}</p>}
    </Reveal>
  )
}

/* ---------- "To confirm" marker for unverified client details ---------- */
export function Pending({ label = 'To confirm', light = false, title }: { label?: string; light?: boolean; title?: string }) {
  if (!showPendingMarkers) return null
  return (
    <span
      title={title ?? 'Preliminary information. RRJA must confirm it before launch.'}
      className={`ml-2 inline-flex translate-y-[-1px] items-center gap-1 border px-1.5 py-[1px] align-middle font-sans text-[9px] font-semibold uppercase tracking-[0.14em] normal-case ${
        light ? 'border-gold/50 text-gold' : 'border-gold-700/40 text-gold-700'
      }`}
    >
      <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
      <span className="uppercase">{label}</span>
    </span>
  )
}

/* ---------- Facebook glyph (brand icons are not part of lucide) ---------- */
export function FacebookIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.89v2.17H7.92v2.94h2.54V21h3.04Z" />
    </svg>
  )
}
