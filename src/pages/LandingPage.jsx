import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import VisaulLayers from "../components/VisualLayers";
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
      <VisaulLayers/>
      <Registration/>
      <Locations/>
      <InstagramGrid/>
      </main>
      <Footer/>
      {/* Footer */}
    </>
  );
}

export default LandingPage;
