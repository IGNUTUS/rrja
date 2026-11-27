import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { Button, FacebookIcon } from './ui'
import { company } from '../data/company'
import { navLinks } from '../data/nav'


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // White bar once scrolled. While the (dark) mobile menu is open the header reverts to its over-hero look.
  const solid = scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
        solid ? 'bg-white/97 py-2.5 shadow-[0_10px_40px_-20px_rgba(11,31,58,0.45)] backdrop-blur-md' : 'bg-transparent py-5'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <div className="container-x relative z-50 flex items-center justify-between gap-6">
        <Link to="/" className="shrink-0" aria-label="RRJA Customs Brokerage Services, home">
          {/* Reverse (light) logo over the dark hero and menu; full-colour logo on the white scrolled bar */}
          <Logo variant={solid ? 'color' : 'reverse'} className="drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `group relative py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  solid ? (isActive ? 'text-navy' : 'text-navy/65 hover:text-navy') : isActive ? 'text-white' : 'text-white/75 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-gold transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/contact#inquiry" className="!px-6 !py-3.5">Request a Quote</Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`relative z-50 -mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden ${solid ? 'text-navy' : 'text-white'}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex h-[100dvh] flex-col bg-navy-950 px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05, duration: 0.5 }}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-3xl font-bold uppercase tracking-tight ${isActive ? 'text-gold' : 'text-white'}`
                    }
                  >
                    <span className="font-sans text-xs font-semibold text-white/40">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto space-y-5">
              <Button to="/contact#inquiry" className="w-full">Request a Quote</Button>
              <div className="flex items-center justify-between text-sm text-white/70">
                <a href={`tel:${company.phones.value[0].tel}`} className="inline-flex items-center gap-2 hover:text-gold">
                  <Phone className="h-4 w-4" /> {company.phones.value[0].display}
                </a>
                <a href={company.facebook.value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold" aria-label="RRJA on Facebook">
                  <FacebookIcon /> Facebook
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
