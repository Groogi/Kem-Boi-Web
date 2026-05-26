import React from 'react'
import { Link } from 'react-router-dom'

function Registration() {
  return (
    <section className="min-h-[800px] flex items-center bg-[#fbfcf8] py-24" id="join">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[620px] aspect-[4/3.5] rounded-[3.5rem] overflow-hidden shadow-[0_32px_80px_rgba(45,47,44,0.1)]">
            <img
              className="w-full h-full object-cover scale-[1.4] transition-transform duration-1000 ease-out hover:scale-[1.45]"
              src="/join-kembo-pic.png"
              alt="Join the Kem Boi Family"
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold font-headline text-[#426500] leading-[1] tracking-[-0.03em] mb-12">
            Join the Kem Boi Family!
          </h2>
          <ul className="space-y-10 mb-14 text-left w-full max-w-lg">
            <li className="flex items-start gap-6">
              <span className="flex-shrink-0 mt-1">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#426500"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-5" />
                </svg>
              </span>
              <div>
                <h3 className="font-bold text-[24px] text-[#426500] font-headline mb-2 leading-none">
                  Loyalty Rewards
                </h3>
                <p className="text-[#63665e] font-medium text-[17px] leading-relaxed">
                  Every 5th dessert is on us. Forever.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-6">
              <span className="flex-shrink-0 mt-1">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#426500"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-5" />
                </svg>
              </span>
              <div>
                <h3 className="font-bold text-[24px] text-[#426500] font-headline mb-2 leading-none">
                  Exclusive Rewards
                </h3>
                <p className="text-[#63665e] font-medium text-[17px] leading-relaxed">
                  Win limited edition toppings and custom glassware through our point system.
                </p>
              </div>
            </li>
          </ul>
          <Link
            to="/login"
            state={{ mode: 'signup' }}
            className="inline-block bg-[#4d7902] text-white px-14 py-5 rounded-full font-bold text-xl hover:bg-[#3d6101] transition-all shadow-xl shadow-[#4d7902]/10 active:scale-95 font-headline"
          >
            Join Free Today
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Registration
