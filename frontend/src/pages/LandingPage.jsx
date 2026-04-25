import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Landing/Navbar'
import Hero from '../components/Landing/Hero'
import VisualLayers from '../components/Landing/VisualLayers'
import Registration from '../components/Landing/Registration'
import Locations from '../components/Landing/Locations'
import InstagramGrid from '../components/Landing/InstagramGrid'
import Footer from '../components/Landing/Footer'
import EmblaCarousel from '../components/Landing/EmblaCarousel'

function LandingPage() {
  const { hash } = useLocation()

  const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [hash])

  return (
    <>
      <Navbar />
      <div>
        <Hero />
        <VisualLayers />
        <Registration />
        <Locations />
        <InstagramGrid />
      </div>
      <Footer />
    </>
  )
}

export default LandingPage
