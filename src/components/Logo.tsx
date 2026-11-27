/**
 * Official RRJA logo (supplied by the client, 2026-11-27).
 * Master file: /public/assets/rrja/logo/rrja-logo-original.png
 *
 * The logo is full-colour artwork on white with navy lettering. To preserve its identity it is never recoloured.
 * On dark backgrounds it sits on a white plate so the navy stays legible.
 */
type Props = {
  /** Tailwind height classes for the image (width follows the 3.05:1 aspect ratio) */
  sizeClass?: string
  /** Render on a white plate (use on dark or photographic backgrounds) */
  plate?: boolean
  className?: string
}

const RATIO = 1888 / 619
const height = 48

export default function Logo({ sizeClass = 'h-9 sm:h-11', plate = false, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center ${plate ? 'bg-white px-3 py-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]' : ''} ${className}`}>
      <img
        src="/assets/rrja/logo/rrja-logo-96.webp"
        srcSet="/assets/rrja/logo/rrja-logo-96.webp 1x, /assets/rrja/logo/rrja-logo-192.webp 2x"
        alt="RRJA Customs Brokerage Services"
        width={Math.round(height * RATIO)}
        height={height}
        className={`${sizeClass} w-auto`}
        decoding="async"
      />
    </span>
  )
}
