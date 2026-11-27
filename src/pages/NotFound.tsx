import { Button } from '../components/ui'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you are looking for could not be found.', path: '/404' })
  return (
    <section className="flex min-h-[80vh] items-center bg-navy-950 pt-24 text-white">
      <div className="container-x">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="display-lg mt-6">This page has sailed.</h1>
        <p className="lead mt-6 max-w-lg text-white/70">We couldn&apos;t find the page you were looking for. It may have moved or no longer exists.</p>
        <div className="mt-10">
          <Button to="/">Back to home</Button>
        </div>
      </div>
    </section>
  )
}
