import React from 'react';

function VisualLayers() {
  return (
    <div className="bg-[#f7f7f2]">
      {/* Our Products Section */}
      <section className="py-20 md:py-24 bg-[#f7f7f2]" id="products">
        <div className="max-w-[1440px] px-6 md:px-12 mx-auto text-center flex flex-col items-center">
          <h2 className="text-[40px] md:text-[60px] font-bold font-headline text-[#426500] mb-6 tracking-[-0.8px] md:tracking-[-1.2px] leading-tight">Our Products</h2>
          <p className="text-[#5B5C59] max-w-[1050px] mx-auto mb-12 md:mb-16 text-[20px] md:text-[30px] font-normal leading-[1.4] md:leading-[1.5] font-body px-4 text-balance">
            A silky symphony of fresh avocado mousse, artisanal coconut ice cream, and a
            crunch of toasted toppings. Experience the creamy heart of Dalat in every
            spoonful.
          </p>
          
          <div className="flex gap-4 md:gap-10 overflow-hidden items-center justify-center mb-10 w-full">
             <div className="hidden md:block w-[380px] h-[520px] bg-[#D9D9D9] rounded-[40px] opacity-25 flex-shrink-0 blur-[2px]"></div>
             <div className="w-full max-w-[660px] aspect-[4/5] md:h-[580px] bg-[#D9D9D9] rounded-[40px] md:rounded-[50px] shadow-[20px_40px_80px_rgba(0,0,0,0.1)] border-2 border-white/40 flex-shrink-0 z-10 mx-4"></div>
             <div className="hidden md:block w-[380px] h-[520px] bg-[#D9D9D9] rounded-[40px] opacity-25 flex-shrink-0 blur-[2px]"></div>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#426500]"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#D9D9D9]"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#D9D9D9]"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#D9D9D9]"></div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32 bg-[#f7f7f2]" id="story">
        <div className="max-w-[1440px] px-6 md:px-12 mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="lg:w-1/2 flex flex-col items-center">
            <h2 className="text-[40px] md:text-[60px] font-bold font-headline text-[#426500] mb-8 md:mb-10 tracking-[-0.8px] md:tracking-[-1.2px] text-center leading-tight">Our Story</h2>
            <p className="text-[#5B5C59] text-[20px] md:text-[30px] leading-[1.4] md:leading-[1.5] font-normal font-body text-center max-w-xl shrink-0 px-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. <br className="hidden md:block" /><br className="hidden md:block" />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
          </div>
          <div className="lg:w-1/2 w-full aspect-[4/3] max-w-[650px] bg-[#D9D9D9] rounded-[40px] md:rounded-[50px] shadow-[25px_25px_70px_rgba(0,0,0,0.1)] ml-auto border-2 border-white/40"></div>
        </div>
      </section>
    </div>
  )
}

export default VisualLayers


