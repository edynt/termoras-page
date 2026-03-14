import { useState, useEffect } from 'react'
import { Navbar } from './components/navbar'
import { Hero } from './components/hero'
import { Features } from './components/features'
import { Showcase } from './components/showcase'
import { TechStack } from './components/tech-stack'
import { DownloadCta } from './components/download-cta'
import { DonateSection } from './components/donate-section'
import { Footer } from './components/footer'
import { FeedbackWidget } from './components/feedback-widget'
import { FeedbackAdmin } from './pages/feedback-admin'
import { FeedbackPublic } from './pages/feedback-public'
import { DonorsPublic } from './pages/donors-public'
import { DonorsAdmin } from './pages/donors-admin'
import { useScrollAnimation } from './hooks/use-scroll-animation'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return hash
}

function LandingPage() {
  useScrollAnimation()
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <TechStack />
      <DownloadCta />
      <DonateSection />
      <Footer />
      <FeedbackWidget />
    </>
  )
}

export default function App() {
  const hash = useHashRoute()

  if (hash === '#feedback') return <FeedbackPublic />
  if (hash === '#admin/feedback') return <FeedbackAdmin />
  if (hash === '#donors') return <DonorsPublic />
  if (hash === '#admin/donors') return <DonorsAdmin />

  return <LandingPage />
}
