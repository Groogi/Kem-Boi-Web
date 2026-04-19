import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 flex items-center px-6 overflow-hidden bg-[#f7f7f2]">
      <div className="max-w-[1440px] px-4 md:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left lg:px-10">
          <h1 className="text-[44px] md:text-5xl lg:text-[80px] font-extrabold text-[#426500] tracking-[-1.2px] md:tracking-[-1.6px] leading-[1.1] md:leading-[80px] mb-6 font-headline">
            Vietnamese <br className="hidden md:block" /> <span className="whitespace-nowrap">Avocado Dessert</span>
          </h1>
          <div className="text-[#426500] text-[22px] md:text-[30px] font-bold tracking-tight mb-10 font-body opacity-80">
            Traditional Reimagined
          </div>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 w-full sm:w-auto">
            <Link to="/login" className="inline-block bg-[#426500] text-[#f7f7f2] px-8 py-3.5 rounded-full font-bold text-[18px] shadow-[10px_10px_25px_rgba(66,101,0,0.1)] hover:bg-[#395800] transition-all hover:-translate-y-0.5 active:scale-95 font-headline text-center">
              Join the Kem Boi Family
            </Link>
            <a href="#story" className="bg-[#EAF5D6] text-[#426500] px-14 py-3.5 rounded-full font-bold text-[18px] hover:bg-[#dcedb9] transition-all active:scale-95 font-headline flex items-center justify-center text-center">
              Our Story
            </a>
          </div>
        </div>
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end mb-8 lg:mb-0 px-4 md:px-0">
          <div className="relative w-full max-w-[462px] aspect-square md:aspect-[462/468] rounded-[30px] md:rounded-[45px] overflow-hidden shadow-[20px_20px_50px_rgba(0,0,0,0.12)]">
            <img
              className="w-full h-full object-cover scale-[1.15] md:scale-[1.25]"
              src="/intro-product-pic.png"
              alt="Vietnamese Avocado Dessert"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;


