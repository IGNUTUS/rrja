import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import Img from './Img'
import { imageSrc, imageSrcSet } from '../data/images'
import { shipmentCategories, shipments, type Shipment } from '../data/shipments'

type Filter = (typeof shipmentCategories)[number]

/** Filterable editorial grid with a keyboard-accessible lightbox. */
export default function ShipmentGallery({ limit, showFilters = true }: { limit?: number; showFilters?: boolean }) {
  const [filter, setFilter] = useState<Filter>('All Shipments')
  const [active, setActive] = useState<number | null>(null)

  const items = useMemo(() => {
    const list = filter === 'All Shipments' ? shipments : shipments.filter((s) => s.category === filter)
    return limit ? list.slice(0, limit) : list
  }, [filter, limit])

  const counts = useMemo(() => {
    const m: Record<string, number> = { 'All Shipments': shipments.length }
    shipments.forEach((s) => (m[s.category] = (m[s.category] ?? 0) + 1))
    return m
  }, [])

  return (
    <div>
      {showFilters && (
        <div role="tablist" aria-label="Filter shipments by category" className="-mx-5 mb-12 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {shipmentCategories.map((c) => {
            const selected = filter === c
            return (
              <button
                key={c}
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(c)}
                disabled={!counts[c]}
                className={`relative shrink-0 border px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                  selected ? 'border-navy bg-navy text-white' : 'border-line text-navy hover:border-navy'
                }`}
              >
                {c}
                <span className={`ml-2 ${selected ? 'text-gold' : 'text-slate-ink/60'}`}>{counts[c] ?? 0}</span>
              </button>
            )
          })}
        </div>
      )}

      <LayoutGroup>
        <motion.ul layout className="grid grid-flow-dense auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[300px] lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((s, i) => (
              <motion.li
                key={s.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`${s.span === 'wide' ? 'sm:col-span-2' : ''} ${s.span === 'tall' ? 'sm:row-span-2' : ''}`}
              >
                <GalleryTile shipment={s} onOpen={() => setActive(i)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <Lightbox items={items} index={active} onClose={() => setActive(null)} onIndex={setActive} />
    </div>
  )
}

function GalleryTile({ shipment, onOpen }: { shipment: Shipment; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block h-full w-full overflow-hidden bg-navy-800 text-left text-white"
      aria-label={`View larger: ${shipment.title}`}
    >
      <Img
        img={shipment.image}
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
        className="!absolute inset-0 h-full w-full"
        imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-white/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <Expand className="h-4 w-4" aria-hidden />
      </span>
      {shipment.illustrative && (
        <span className="absolute left-4 top-4 bg-navy-950/60 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
          Illustrative
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 block translate-y-2 p-6 transition-transform duration-500 group-hover:translate-y-0">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">{shipment.category}</span>
        <span className="mt-2 block font-display text-xl font-bold leading-tight">{shipment.title}</span>
      </span>
    </button>
  )
}

function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Shipment[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const open = index !== null
  const s = open ? items[index] : null

  const go = useCallback(
    (d: number) => {
      if (index === null) return
      onIndex((index + d + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lastFocus.current?.focus()
    }
  }, [open, go, onClose])

  return (
    <AnimatePresence>
      {s && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={s.title}
          className="fixed inset-0 z-[60] flex flex-col bg-navy-950/97 text-white backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button ref={closeRef} onClick={onClose} className="flex h-11 w-11 items-center justify-center hover:text-gold" aria-label="Close">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.img
                key={s.id}
                src={imageSrc(s.image, 1600)}
                srcSet={imageSrcSet(s.image)}
                sizes="90vw"
                alt={s.image.alt}
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>
            {items.length > 1 && (
              <>
                <button onClick={() => go(-1)} className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-navy-950/60 hover:border-gold hover:text-gold sm:left-6" aria-label="Previous image">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => go(1)} className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-navy-950/60 hover:border-gold hover:text-gold sm:right-6" aria-label="Next image">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="container-x grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-end" onClick={(e) => e.stopPropagation()}>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                {s.category} · {s.cargoType}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 max-w-2xl text-sm text-white/65">{s.description}</p>
            </div>
            <p className="text-xs text-white/45 sm:text-right">
              {s.illustrative && <span className="block font-semibold uppercase tracking-[0.14em] text-white/60">Illustrative image, not an RRJA project</span>}
              Photo: {s.image.credit} ·{' '}
              <a href={s.image.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                {s.image.license}
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
