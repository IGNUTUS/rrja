import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop, { BackToTop } from '../components/ScrollToTop'

export default function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-screen bg-navy-950" aria-busy="true" aria-label="Loading page" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
