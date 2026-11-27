/**
 * Official RRJA logo: the client-supplied transparent version (27 Nov 2026).
 * Master file: /public/assets/rrja/logo/rrja-logo-transparent.png (trimmed WebP copies at 96px and 192px high).
 * The earlier white-background master is kept as rrja-logo-original.png (used for the social share image).
 *
 * The artwork is never recoloured. On dark backgrounds (`onDark`) a soft white edge reinforces the logo's own
 * light outline, which is thin at navbar size.
 */
type Props = {
  onDark?: boolean
  /** Tailwind height classes for the image (width follows the 3.27:1 aspect ratio) */
  sizeClass?: string
  className?: string
}

const RATIO = 2158 / 660
const HEIGHT = 48

export default function Logo({ onDark = false, sizeClass = 'h-11 sm:h-14', className = '' }: Props) {
  return (
    <img
      src="/assets/rrja/logo/rrja-logo-96.webp"
      srcSet="/assets/rrja/logo/rrja-logo-96.webp 1x, /assets/rrja/logo/rrja-logo-192.webp 2x"
      alt="RRJA Customs Brokerage Services"
      width={Math.round(HEIGHT * RATIO)}
      height={HEIGHT}
      className={`${sizeClass} w-auto transition-[filter] duration-500 ${
        onDark ? '[filter:drop-shadow(0_0_0.6px_rgba(255,255,255,0.9))_drop-shadow(0_0_10px_rgba(255,255,255,0.18))]' : ''
      } ${className}`}
      decoding="async"
    />
  )
}
