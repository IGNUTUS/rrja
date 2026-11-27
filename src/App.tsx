import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import SiteLayout from './layouts/SiteLayout'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const Credits = lazy(() => import('./pages/Credits'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="shipments" element={<Portfolio />} />
            <Route path="contact" element={<Contact />} />
            <Route path="credits" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
