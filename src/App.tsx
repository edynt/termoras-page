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

export default function App() {
  useScrollAnimation()
  const hash = useHashRoute()

  // Admin route
  if (hash === '#admin/feedback') {
    return <FeedbackAdmin />
  }

  // Landing page
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
