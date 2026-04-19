import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Check for background change on scroll
      setIsScrolled(window.scrollY > 20);

      // ScrollSpy logic
      const sections = ["products", "story", "locations"];
      const scrollPosition = window.scrollY + 200; // Better offset for active detection

      let currentSection = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          if (scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkClass = (sectionId) => {
    // Map 'menu' and 'our-products' both to the 'products' section
    const targetSection = (sectionId === 'menu' || sectionId === 'our-products') ? 'products' : sectionId;
    const isActive = activeSection === targetSection;
    
    const baseClass = "transition-all duration-300 pb-1 whitespace-nowrap";
    if (isActive) {
      return `${baseClass} text-[#426500] border-b-2 border-[#426500]`;
    }
    return `${baseClass} text-[#5B5C59] hover:text-[#426500] opacity-80 hover:opacity-100`;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#f7f7f2]/95 backdrop-blur-md py-1 shadow-sm' : 'bg-transparent py-4'}`}>
      {/* Desktop Header */}
      <div className="flex justify-between items-center px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex-shrink-0">
          <Link to="/" onClick={() => window.scrollTo(0,0)}>
             <img src="/logo.png" alt="Kem Boi Logo" className={`transition-all duration-300 w-auto object-contain ${isScrolled ? 'h-16 md:h-20' : 'h-24 md:h-32'}`} />
          </Link>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 font-bold text-[18px] font-headline">
          <a className={getLinkClass("menu")} href="#products">Menu</a>
          <a className={getLinkClass("our-products")} href="#products">Our Products</a>
          <a className={getLinkClass("story")} href="#story">Our Story</a>
          <a className={getLinkClass("locations")} href="#locations">Location</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className={`hidden md:flex bg-[#426500] text-[#f7f7f2] rounded-full font-bold shadow-md hover:bg-[#395800] transition-all hover:-translate-y-0.5 active:scale-95 font-headline ${isScrolled ? 'px-8 py-2 text-[16px]' : 'px-10 py-3 text-[20px]'}`}>
            Log In
          </Link>
          
          {/* Burger Menu for Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#426500] p-2"
          >
            <span className="material-symbols-outlined text-[40px]">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-[#f7f7f2] z-40 transition-transform duration-500 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-headline font-bold text-[#426500]">
           <a onClick={() => setIsOpen(false)} href="#products" className={activeSection === 'products' ? 'border-b-2 border-[#426500]' : ''}>Menu</a>
           <a onClick={() => setIsOpen(false)} href="#products" className={activeSection === 'products' ? 'border-b-2 border-[#426500]' : ''}>Our Products</a>
           <a onClick={() => setIsOpen(false)} href="#story" className={activeSection === 'story' ? 'border-b-2 border-[#426500]' : ''}>Our Story</a>
           <a onClick={() => setIsOpen(false)} href="#locations" className={activeSection === 'locations' ? 'border-b-2 border-[#426500]' : ''}>Location</a>
           <Link onClick={() => setIsOpen(false)} to="/login" className="bg-[#426500] text-[#f7f7f2] px-12 py-4 rounded-full mt-4">
              Log In
           </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
