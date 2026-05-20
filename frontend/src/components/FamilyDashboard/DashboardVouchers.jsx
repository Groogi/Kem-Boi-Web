import React from 'react'

function DashboardVouchers({ myRedemptions }) {
  const pendingVouchers = myRedemptions.filter((red) => red.status === 'pending')

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-center bg-white/40 p-6 rounded-[2rem] border border-white/60">
        <div>
          <h2 className="text-2xl font-bold font-headline text-primary">My Claimed Rewards</h2>
          <p className="text-sm font-medium text-on-surface-variant opacity-70">
            Show these codes to our staff in-store to redeem.
          </p>
        </div>
        <span className="material-symbols-outlined text-primary text-3xl">confirmation_number</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingVouchers.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white/20 rounded-[2rem] border-2 border-dashed border-white/40">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/20 mb-4">
              redeem
            </span>
            <p className="text-on-surface-variant/40 font-bold tracking-widest uppercase text-sm">
              No vouchers claimed yet
            </p>
          </div>
        ) : (
          pendingVouchers.map((red) => (
            <div
              key={red.id}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 flex flex-col relative group overflow-hidden"
            >
              <div className="absolute top-6 right-6">
                <span
                  className={`text-[9px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full border ${red.status === 'used'
                    ? 'bg-red-50 text-red-500 border-red-100'
                    : 'bg-green-50 text-green-600 border-green-100'
                    }`}
                >
                  {red.status}
                </span>
              </div>

              <h4 className="text-xl font-bold font-headline text-on-surface mb-1">
                {red.reward?.name}
              </h4>
              <p className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest mb-8">
                Claimed {new Date(red.created_at).toLocaleDateString('en-AU')}
              </p>

              <div className="bg-[#FBFCF6] border-2 border-dashed border-[#E5E7D9] rounded-2xl p-5 flex flex-col items-center justify-center group-hover:border-primary/30 transition-colors">
                <span className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em] mb-2">
                  Voucher Code
                </span>
                <span className="text-2xl font-black font-headline text-primary tracking-widest selection:bg-primary selection:text-white uppercase">
                  {red.voucher_code}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[#426500]/40">
                <span className="material-symbols-outlined text-sm">info</span>
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                  Show this in-store
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DashboardVouchers
