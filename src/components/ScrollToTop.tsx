import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/** On route change: scroll to the #hash target (waiting for lazy pages to render) or to the top. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    let tries = 0
    const id = decodeURIComponent(hash.slice(1))
    const timer = window.setInterval(() => {
      const el = document.getElementById(id)
      if (el || ++tries > 40) {
        window.clearInterval(timer)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
    return () => window.clearInterval(timer)
  }, [pathname, hash])
  return null
}

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center border border-gold/40 bg-navy text-gold shadow-lg transition-colors hover:bg-gold hover:text-navy sm:bottom-8 sm:right-8"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
