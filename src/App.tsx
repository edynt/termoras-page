import { Navbar } from './components/navbar'
import { Hero } from './components/hero'
import { Features } from './components/features'
import { Showcase } from './components/showcase'
import { TechStack } from './components/tech-stack'
import { DownloadCta } from './components/download-cta'
import { Footer } from './components/footer'
import { FeedbackWidget } from './components/feedback-widget'
import { useScrollAnimation } from './hooks/use-scroll-animation'

export default function App() {
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
