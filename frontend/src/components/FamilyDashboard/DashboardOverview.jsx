import React from 'react'

function DashboardOverview({ user, status, moreToGo, currentPunches, setActiveTab }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#DFEECA] rounded-[1.5rem] p-8 md:p-10 shadow-sm border border-white/40">
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-[#4A6B10] mb-2">
          Welcome to your Kem Boi Dashboard, {user?.first_name || 'Kem Boi'}!
        </h2>
        <p className="text-on-surface-variant font-medium opacity-60">
          Your one-stop destination for all your Kem Boi rewards and loyalty points.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold font-headline">Points Balance:</h2>
              <span
                className={`px-5 py-1.5 rounded-full text-[10px] font-bold tracking-widest ${status.class} shadow-lg shadow-black/10 transition-transform active:scale-95`}
              >
                {status.label}
              </span>
            </div>
            <div className="text-6xl md:text-[5.5rem] font-bold font-headline text-center my-8 tracking-tighter text-[#e7eed8] drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
              {user?.points_balance || 0} pt<span className="text-4xl md:text-6xl">s</span>
            </div>
          </div>
          <p className="text-base font-semibold leading-relaxed opacity-90 mt-4 max-w-[280px] relative z-10 italic">
            "Keep sipping, you're only{' '}
            {status.label === 'PLATINUM'
              ? 'mastering the art'
              : status.label === 'GOLD'
                ? '500 pts'
                : 'a few drinks'}{' '}
            away from the next tier!"
          </p>

          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
        </div>

        <div className="bg-primary rounded-[1.5rem] p-8 md:p-10 text-white shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2">Buy 5, Get 1 Free</h2>
            <p className="text-lg font-medium opacity-90 mb-8 font-headline">
              {moreToGo === 0
                ? 'Reward Ready to Claim!'
                : `Only ${moreToGo} more punch${moreToGo > 1 ? 'es' : ''} to go!`}
            </p>

            {/* Punch circles */}
            <div className="flex justify-between items-center gap-3 mb-10">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className={`h-4 lg:h-5 flex-1 rounded-full shadow-inner ${idx <= currentPunches ? 'bg-[#c3e68c]' : 'bg-[#e2ead3]'}`}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              disabled={moreToGo > 0}
              className={`font-bold py-3.5 px-10 rounded-full text-lg tracking-wide transition-all ${moreToGo === 0 ? 'bg-[#c3e68c] text-primary shadow-lg hover:scale-105 active:scale-95' : 'bg-[#d5dfc5] text-primary/40 cursor-not-allowed'}`}
            >
              {moreToGo === 0 ? 'Claim Reward' : 'Claim Offer'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div
          onClick={() => setActiveTab('rewards')}
          className="bg-[#EEF4E4] rounded-3xl p-10 border border-primary/5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold font-headline text-[#4A6B10]">Explore Rewards</h3>
              <span className="material-symbols-outlined text-[#4A6B10] text-3xl group-hover:scale-110 transition-transform">
                workspace_premium
              </span>
            </div>
            <p className="text-on-surface-variant font-medium opacity-60 text-base leading-relaxed max-w-[320px]">
              Browse our catalog of treats and redeem your points for free smoothies, toppings, and
              more.
            </p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('vouchers')}
          className="bg-[#EEF4E4] rounded-3xl p-10 border border-primary/5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold font-headline text-[#4A6B10]">My Vouchers</h3>
              <span className="material-symbols-outlined text-[#4A6B10] text-3xl group-hover:scale-110 transition-transform">
                confirmation_number
              </span>
            </div>
            <p className="text-on-surface-variant font-medium opacity-60 text-base leading-relaxed max-w-[320px]">
              View your activated rewards and show your voucher codes to our staff in-store.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
