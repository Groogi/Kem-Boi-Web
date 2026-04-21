import React from 'react'

function VisualLayers() {
  return (
    <div className="bg-[#f7f7f2]">
      {/* Our Products Section */}
      <section className="py-20 md:py-24 bg-[#f7f7f2]" id="products">
        <div className="max-w-[1440px] px-6 md:px-12 mx-auto text-center flex flex-col items-center">
          <h2 className="text-[40px] md:text-[60px] font-bold font-headline text-[#426500] mb-6 tracking-[-0.02em] leading-tight">
            Our Products
          </h2>
          <p className="text-[#5B5D56] max-w-[950px] mx-auto mb-16 text-[20px] md:text-[28px] font-normal leading-[1.6] font-body px-4 text-balance opacity-90">
            A silky symphony of fresh avocado mousse, artisanal coconut ice cream, and a crunch of
            toasted toppings. Experience the creamy heart of Dalat in every spoonful.
          </p>

          <div className="flex gap-4 md:gap-10 overflow-hidden items-center justify-center mb-10 w-full">
            <div className="hidden md:block w-[380px] h-[520px] bg-white/20 backdrop-blur-3xl rounded-[40px] border border-white/30 flex-shrink-0"></div>
            <div className="w-full max-w-[660px] aspect-[4/5] md:h-[580px] bg-white/40 backdrop-blur-[100px] rounded-[40px] md:rounded-[50px] shadow-[0_40px_80px_rgba(66,101,0,0.08)] border-2 border-white/60 flex-shrink-0 z-10 mx-4 flex items-center justify-center">
              <span className="text-[#426500]/20 font-headline font-bold text-xl uppercase tracking-widest">
                Premium Product
              </span>
            </div>
            <div className="hidden md:block w-[380px] h-[520px] bg-white/20 backdrop-blur-3xl rounded-[40px] border border-white/30 flex-shrink-0"></div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <div className="w-2.5 h-2.5 rounded-full bg-[#426500]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#426500]/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#426500]/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#426500]/20"></div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 md:py-40 bg-[#f7f7f2]" id="story">
        <div className="max-w-[1440px] px-6 md:px-12 mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
            <h2 className="text-[44px] md:text-[64px] font-bold font-headline text-[#426500] mb-8 md:mb-10 tracking-[-0.03em] text-center lg:text-left leading-[1.1]">
              Our Story
            </h2>
            <p className="text-[#5B5D56] text-[20px] md:text-[26px] leading-[1.6] font-normal font-body text-center lg:text-left max-w-xl opacity-90">
              Born in the misty highlands of Dalat, Kem Bơ represents the perfect balance between
              natural buttery richness and cool artisanal freshness. <br />
              <br />
              What started as a roadside delicacy has been elevated into an atelier experience,
              bringing the soul of Vietnamese dessert culture to your doorstep.
            </p>
          </div>
          <div className="lg:w-1/2 w-full aspect-[4/3] max-w-[650px] bg-white/40 backdrop-blur-[120px] rounded-[40px] md:rounded-[50px] shadow-[30px_30px_90px_rgba(0,0,0,0.05)] border-2 border-white/60 flex items-center justify-center">
            <span className="text-[#426500]/20 font-headline font-bold text-xl uppercase tracking-widest">
              Heritage Visual
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VisualLayers
