import React from 'react';

function InstagramGrid() {
  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-24 bg-[#f7f7f2]">
      <div className="max-w-[1440px] px-6 md:px-12 mx-auto">
        {/* Header Section */}
        <div className="mb-10 md:mb-14 relative">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-4">
            <h2 className="text-[36px] md:text-[60px] font-bold font-headline text-[#426500] tracking-[-1px] md:tracking-[-1.5px] leading-tight">
              Tag Us On Socials
            </h2>
            <div className="flex gap-4 items-center opacity-80">
              <svg width="36" height="36" className="md:w-[45px] md:h-[45px]" viewBox="0 0 24 24" fill="#5B5C59" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
              <svg width="36" height="36" className="md:w-[45px] md:h-[45px]" viewBox="0 0 24 24" fill="none" stroke="#5B5C59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="6" ry="6"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
          </div>
          <p className="text-[#5B5C59] font-bold text-[22px] md:text-[35px] tracking-tight opacity-60">For Your Chance to be Featured</p>
        </div>

        {/* Masonry Scatter Grid (Images with shadows, no white border padding) */}
        <div className="relative w-full h-[750px] lg:h-[709px] hidden lg:block">
          <div className="absolute left-0 top-0 w-[342px] h-[278px] rounded-[24px] shadow-[15px_20px_45px_rgba(0,0,0,0.15)] overflow-hidden">
            <img src="/socials-holding.png" className="w-full h-full object-cover scale-[1.2]" alt="Social 1" />
          </div>
          <div className="absolute left-0 top-[298px] w-[203px] h-[411px] rounded-[24px] shadow-[15px_20px_45px_rgba(0,0,0,0.15)] overflow-hidden">
            <img src="/socials-dessert.png" className="w-full h-full object-cover scale-[1.2]" alt="Social 2" />
          </div>
          <div className="absolute left-[223px] top-[298px] w-[119px] h-[106px] rounded-[24px] shadow-[15px_20px_45px_rgba(0,0,0,0.15)] overflow-hidden">
            <img src="/socials-dessert.png" className="w-full h-full object-cover scale-[1.2]" alt="Social 3" />
          </div>
          <div className="absolute left-[223px] top-[424px] w-[258px] h-[285px] rounded-[24px] shadow-[15px_20px_45px_rgba(0,0,0,0.15)] overflow-hidden">
            <img src="/socials-swirl-1.png" className="w-full h-full object-cover scale-[1.2]" alt="Social 4" />
          </div>
          <div className="absolute left-[362px] top-[3px] w-[512px] h-[387px] rounded-[24px] shadow-[15px_20px_45px_rgba(0,0,0,0.15)] overflow-hidden">
            <img src="/socials-store-front.png" className="w-full h-full object-cover scale-[1.1]" alt="Social 5" />
          </div>
          <div className="absolute left-[501px] top-[424px] w-[373px] h-[285px] rounded-[24px] shadow-[15px_20px_45px_rgba(0,0,0,0.15)] overflow-hidden">
            <img src="/socials-holding.png" className="w-full h-full object-cover scale-[1.2]" alt="Social 6" />
          </div>
          <div className="absolute left-[894px] top-[3px] w-[435px] h-[301px] rounded-[24px] shadow-[15px_20px_45px_rgba(0,0,0,0.15)] overflow-hidden">
            <img src="/socials-dessert.png" className="w-full h-full object-cover scale-[1.2]" alt="Social 7" />
          </div>
          <div className="absolute left-[897px] top-[324px] w-[432px] h-[385px] rounded-[24px] shadow-[15px_20px_45px_rgba(0,0,0,0.15)] overflow-hidden">
            <img src="/socials-swirl-2.png" className="w-full h-full object-cover scale-[1.2]" alt="Social 8" />
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-4 lg:hidden px-2">
            <div className="rounded-[20px] shadow-lg overflow-hidden h-[240px]">
              <img src="/socials-holding.png" className="w-full h-full object-cover scale-[1.1]" alt="Social 1" />
            </div>
            <div className="rounded-[20px] shadow-lg overflow-hidden h-[280px] -mt-4">
              <img src="/socials-dessert.png" className="w-full h-full object-cover scale-[1.1]" alt="Social 2" />
            </div>
            <div className="rounded-[20px] shadow-lg overflow-hidden h-[180px]">
              <img src="/socials-swirl-1.png" className="w-full h-full object-cover scale-[1.1]" alt="Social 3" />
            </div>
            <div className="rounded-[20px] shadow-lg overflow-hidden h-[220px]">
              <img src="/socials-store-front.png" className="w-full h-full object-cover scale-[1.1]" alt="Social 4" />
            </div>
            <div className="rounded-[20px] shadow-lg overflow-hidden h-[200px] col-span-2 -mt-4">
              <img src="/socials-swirl-2.png" className="w-full h-full object-cover scale-[1.1]" alt="Social 5" />
            </div>
        </div>
      </div>
    </section>
  );
}

export default InstagramGrid;


