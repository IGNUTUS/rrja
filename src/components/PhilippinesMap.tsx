import { motion, useReducedMotion } from 'framer-motion'
import { PH_DOTS, PH_GRID } from '../data/phMapDots'
import { company } from '../data/company'

/**
 * Stylised dot-matrix map of the Philippines (Natural Earth data, public domain).
 * Visayas and Mindanao are highlighted. The only pin is the Mandaue City base; no branch offices are implied.
 */
export default function PhilippinesMap({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const S = 10
  const w = PH_GRID.cols * S
  const h = PH_GRID.rows * S
  const pinX = ((company.mapPin.lon - PH_GRID.west) / PH_GRID.step) * S
  const pinY = ((PH_GRID.north - company.mapPin.lat) / PH_GRID.step) * S

  return (
    <svg viewBox={`-20 -10 ${w + 170} ${h + 30}`} className={className} role="img" aria-labelledby="ph-map-title ph-map-desc">
      <title id="ph-map-title">Map of the Philippines highlighting the Visayas and Mindanao</title>
      <desc id="ph-map-desc">Stylised map with the Visayas and Mindanao island groups highlighted in gold, and a marker at Mandaue City, Cebu.</desc>

      <g>
        {PH_DOTS.map(([x, y, g]) => {
          const hl = g !== 'L'
          return hl ? (
            <motion.circle
              key={`${x}-${y}`}
              cx={x * S}
              cy={y * S}
              r={3.1}
              fill={g === 'V' ? '#D6A84F' : '#E6C584'}
              initial={reduce ? false : { opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.3 + (y - 50) * 0.022 }}
            />
          ) : (
            <circle key={`${x}-${y}`} cx={x * S} cy={y * S} r={2.4} fill="rgba(255,255,255,0.22)" />
          )
        })}
      </g>

      {/* Region labels */}
      <g className="font-sans" fontSize="16" fontWeight="600" letterSpacing="4">
        <text x={20} y={170} fill="rgba(255,255,255,0.45)">LUZON</text>
        <text x={470} y={470} fill="#D6A84F">VISAYAS</text>
        <line x1={480} y1={480} x2={480} y2={505} stroke="rgba(214,168,79,0.6)" strokeWidth="1" />
        <text x={430} y={985} fill="#E6C584">MINDANAO</text>
      </g>

      {/* Mandaue City pin */}
      <g transform={`translate(${pinX} ${pinY})`}>
        {!reduce && (
          <motion.circle r={8} fill="none" stroke="#fff" strokeWidth={1.5} animate={{ r: [8, 30], opacity: [0.9, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
        )}
        <circle r={8} fill="#fff" />
        <circle r={3.5} fill="#0B1F3A" />
        <line x1={10} y1={0} x2={70} y2={0} stroke="#fff" strokeWidth={1} />
        <rect x={70} y={-24} width={150} height={50} fill="#0B1F3A" fillOpacity={0.9} />
        <text x={78} y={-4} fill="#fff" fontSize="15" fontWeight="700" className="font-display">MANDAUE CITY</text>
        <text x={78} y={16} fill="rgba(255,255,255,0.6)" fontSize="12" letterSpacing="2">CEBU · BASE</text>
      </g>
    </svg>
  )
}
