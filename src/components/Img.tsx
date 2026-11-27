import { useState } from 'react'
import { imageSrc, imageSrcSet, type ImageAsset } from '../data/images'

type Props = {
  img: ImageAsset
  sizes?: string
  className?: string
  priority?: boolean
  /** Show a small "Illustrative image" label in the corner */
  label?: boolean
  imgClassName?: string
}

/** Responsive, lazy-loaded WebP image with a navy placeholder while loading. */
export default function Img({ img, sizes = '100vw', className = '', imgClassName = '', priority = false, label = false }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className}`}>
      <img
        src={imageSrc(img, 1600)}
        srcSet={imageSrcSet(img)}
        sizes={sizes}
        alt={img.alt}
        width={img.width}
        height={img.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete && !loaded) setLoaded(true)
        }}
        style={{ objectPosition: img.focus }}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
      {label && img.illustrative && <IllustrativeTag />}
    </div>
  )
}

export function IllustrativeTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute bottom-3 left-3 bg-navy-950/70 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm ${className}`}
    >
      Illustrative image
    </span>
  )
}
