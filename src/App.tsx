import { useState, useEffect } from 'react'
import { Navbar } from './components/navbar'
import { Hero } from './components/hero'
import { Features } from './components/features'
import { Showcase } from './components/showcase'
import { TechStack } from './components/tech-stack'
import { DownloadCta } from './components/download-cta'
import { Footer } from './components/footer'
import { FeedbackWidget } from './components/feedback-widget'
import { FeedbackAdmin } from './pages/feedback-admin'
import { FeedbackPublic } from './pages/feedback-public'
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
      <Footer />
      <FeedbackWidget />
    </>
  )
}

export default function App() {
  const hash = useHashRoute()

  if (hash === '#feedback') return <FeedbackPublic />
  if (hash === '#admin/feedback') return <FeedbackAdmin />

  return <LandingPage />
}
