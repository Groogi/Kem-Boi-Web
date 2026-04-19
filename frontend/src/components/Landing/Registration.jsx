import React from 'react';

function Registration() {
  return (
    <section className="min-h-[882px] flex items-center bg-[#f7f7f2] py-24" id="join">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="flex justify-center lg:justify-end lg:pr-16">
          <div className="w-full max-w-[550px] aspect-square rounded-[50px] overflow-hidden shadow-[25px_25px_70px_rgba(0,0,0,0.1)] border-2 border-white/40">
            <img
              className="w-full h-full object-cover scale-[1.1]"
              src="/join-kembo-pic.png"
              alt="Join the Kem Boi Family"
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-[36px] md:text-[52px] lg:text-[60px] font-bold font-headline text-[#426500] leading-[1.1] md:leading-[1.05] tracking-[-0.8px] md:tracking-[-1.2px] mb-8">
            Join the Kem Boi<br className="hidden md:block" /> Family!
          </h2>
          <ul className="space-y-8 mb-12 text-left">
            <li className="flex items-start gap-5">
              <span className="flex-shrink-0 mt-1">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#426500" />
                  <path d="M8 16.5L13.5 22L24 10.5" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h4 className="font-bold text-[20px] md:text-[22px] text-[#426500] font-['Be Vietnam Pro'] mb-1">Loyalty Rewards</h4>
                <p className="text-[#5B5C59] font-normal text-[16px] md:text-[18px] leading-snug">Every 5th dessert is on us. Forever.</p>
              </div>
            </li>
            <li className="flex items-start gap-5">
              <span className="flex-shrink-0 mt-1">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#426500" />
                  <path d="M8 16.5L13.5 22L24 10.5" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h4 className="font-bold text-[20px] md:text-[22px] text-[#426500] font-['Be Vietnam Pro'] mb-1">Weekly Giveaways</h4>
                <p className="text-[#5B5C59] font-normal text-[16px] md:text-[18px] leading-snug">Win limited edition toppings and custom glassware.</p>
              </div>
            </li>
          </ul>
          <a href="/login" className="inline-block bg-[#426500] text-[#f7f7f2] px-12 py-4 rounded-full font-bold text-[18px] md:text-[20px] shadow-[10px_10px_25px_rgba(66,101,0,0.1)] hover:bg-[#395800] transition-all hover:-translate-y-0.5 active:scale-95 font-['Be Vietnam Pro']">
            Join Free Today
          </a>
        </div>
      </div>
    </section>
  );
}

export default Registration;


