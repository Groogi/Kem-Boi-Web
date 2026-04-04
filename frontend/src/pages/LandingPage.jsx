import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import VisualLayers from "../components/Landing/VisualLayers";
import Registration from "../components/Landing/Registration";
import Locations from "../components/Landing/Locations";
import InstagramGrid from "../components/Landing/InstagramGrid";
import Footer from "../components/Landing/Footer";

function LandingPage() {
  return (
    <>
      <Navbar/>
      <div className="pt-20">
        <Hero/>
        <VisualLayers/>
        <Registration/>
        <Locations/>
        <InstagramGrid/>
      </div>
      <Footer/>
    </>
  );
}

export default LandingPage;
