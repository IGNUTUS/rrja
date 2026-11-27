import type { ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Img from './Img'
import type { ImageAsset } from '../data/images'

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  image: ImageAsset
  eyebrow: string
  lines: string[]
  intro?: ReactNode
  actions?: ReactNode
  footer?: ReactNode
  size?: 'full' | 'page'
}

/** Cinematic photographic hero: slow zoom, navy overlay, staggered line reveal, light parallax. */
export default function Hero({ image, eyebrow, lines, intro, actions, footer, size = 'page' }: Props) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 160])
  const fade = useTransform(scrollY, [0, 500], [1, reduce ? 1 : 0.2])

  return (
    <section
      className={`relative isolate flex overflow-hidden bg-navy-950 text-white ${
        size === 'full' ? 'min-h-[100svh] items-end pb-20 pt-36 md:pb-40' : 'min-h-[72svh] items-end pb-20 pt-40 md:min-h-[78vh] md:pb-24'
      }`}
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Img img={image} priority className="h-full w-full" imgClassName="animate-kenburns" />
      </motion.div>
      {/* overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy/75 to-navy/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/50" />
      <div className="pointer-events-none absolute inset-y-0 left-[8%] -z-10 hidden w-px bg-white/[0.06] lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-[22%] -z-10 hidden w-px bg-white/[0.06] lg:block" />

      <motion.div style={{ opacity: fade }} className="container-x relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="eyebrow text-gold"
        >
          {eyebrow}
        </motion.p>
        <h1 className={`${size === 'full' ? 'display-xl' : 'display-lg'} mt-6 max-w-5xl`}>
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={`block ${i === lines.length - 1 && lines.length > 1 ? 'text-white/95' : ''}`}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.35 + i * 0.14 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.span
          className="gold-rule mt-8 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease, delay: 0.75 }}
        />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.85 }}
            className="lead mt-7 max-w-xl text-white/75"
          >
            {intro}
          </motion.p>
        )}
        {actions && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            {actions}
          </motion.div>
        )}
      </motion.div>
      {footer}
    </section>
  )
}
