import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import VisualLayers from "../components/VisualLayers";
import Registration from "../components/Registration";
import Locations from "../components/Locations";
import InstagramGrid from "../components/InstagramGrid";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <Navbar/>
      <main className="pt-20">
        <Hero/>
        <VisualLayers/>
        <Registration/>
        <Locations/>
        <InstagramGrid/>
      </main>
      <Footer/>
    </>
  );
}

export default LandingPage;
