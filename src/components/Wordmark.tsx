/**
 * TEMPORARY text-based wordmark. It is NOT the official RRJA logo.
 * Swap this component's contents for the client-supplied logo (e.g. <img src="/assets/rrja/logo/rrja-logo.svg" />)
 * once it is provided. See README > Missing client information.
 */
export default function Wordmark({ light = true, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-3" aria-label="RRJA Customs Brokerage Services">
      <span className="h-9 w-[3px] bg-gold" aria-hidden />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.45rem] font-extrabold tracking-[0.14em] ${light ? 'text-white' : 'text-navy'}`}>RRJA</span>
        {!compact && (
          <span className={`mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.26em] ${light ? 'text-white/65' : 'text-royal'}`}>
            Customs Brokerage Services
          </span>
        )}
      </span>
    </span>
  )
}
