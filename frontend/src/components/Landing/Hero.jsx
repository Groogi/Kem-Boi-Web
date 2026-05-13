import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 flex items-center px-6 overflow-hidden bg-[#fbfcf8]">
      <div className="max-w-[1440px] px-4 md:px-12 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-[54px] md:text-7xl lg:text-[88px] font-bold text-[#426500] tracking-[-0.03em] leading-[1.05] mb-6 font-headline">
            Vietnamese <br className="hidden lg:block" /> Avocado Dessert
          </h1>

          <div className="text-[#395800] text-[24px] md:text-[30px] font-bold tracking-tight mb-14 font-body opacity-90">
            Traditional Reimagined
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 w-full sm:w-auto">
            <Link
              to="/login"
              className="inline-block bg-[#4d7902] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#3d6101] transition-all shadow-xl shadow-[#4d7902]/10 active:scale-95 font-headline text-center"
            >
              Join the Kem Boi Family
            </Link>
            <a
              href="#story"
              className="bg-[#f0f4e8] text-[#4d7902] px-14 py-5 rounded-full font-bold text-xl hover:bg-[#e4ebda] transition-all active:scale-95 font-headline flex items-center justify-center text-center"
            >
              Our Story
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end mb-12 lg:mb-0 relative py-6">
          <div className="relative w-full max-w-[520px] aspect-square rounded-[4rem] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)]">
            <img
              className="w-full h-full object-cover scale-[1.3] object-center transition-transform duration-1000 ease-out hover:scale-[1.38]"
              src="/intro-product-pic.png"
              alt="Vietnamese Avocado Dessert"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full animate-shine pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
