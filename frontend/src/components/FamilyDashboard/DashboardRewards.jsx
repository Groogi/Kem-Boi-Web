import React from 'react'

function DashboardRewards({ rewards, myRedemptions, handleClaimReward, setSelectedReward, setActiveTab }) {
  const redeemable = rewards.filter((r) => r.active)
  const upcoming = rewards.filter((r) => !r.active)

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <div>
        <h2 className="text-xl font-bold font-headline text-on-surface mb-6">
          Redeemable Offers:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {redeemable.length === 0 ? (
            <p className="text-on-surface-variant/60 font-medium">
              No rewards available to redeem right now.
            </p>
          ) : (
            redeemable.map((r) => (
              <div
                key={r.id}
                onClick={() => {
                  setSelectedReward(r)
                  setActiveTab('reward-details')
                }}
                className="bg-[#E4ECD5] rounded-[1.5rem] p-6 shadow-sm flex flex-col border border-primary/10 hover:border-[#426500]/40 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-md group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-on-surface text-lg font-headline group-hover:text-primary transition-colors">
                    {r.name}
                  </h3>
                  <span className="material-symbols-outlined text-on-surface-variant/70 text-[26px]">
                    sell
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant font-medium opacity-80 mb-8 flex-grow pr-4">
                  {r.description}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[11px] font-bold text-primary/80">
                    {r.point_cost} PTS
                  </span>
                  {(() => {
                    const redemptionCount = myRedemptions.filter(
                      (red) => red.reward_id === r.id || (red.reward && red.reward.id === r.id)
                    ).length
                    const isReached = r.limit_per_user > 0 && redemptionCount >= r.limit_per_user
                    const isSoldOut = r.total_limit > 0 && r.redemptions_count >= r.total_limit

                    return (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!isReached && !isSoldOut) handleClaimReward(r)
                        }}
                        disabled={isReached || isSoldOut}
                        className={`font-bold py-2 px-8 text-[11px] tracking-wider rounded-full transition-all shadow-sm ${isReached || isSoldOut
                          ? 'bg-[#A8BFA0] text-primary/40 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-[#395800]'
                          }`}
                      >
                        {isSoldOut ? 'SOLD OUT' : isReached ? 'CLAIMED' : 'CLAIM'}
                      </button>
                    )
                  })()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold font-headline text-on-surface mb-6">Upcoming Offers:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {upcoming.length === 0 ? (
            <p className="text-on-surface-variant/60 font-medium">
              No upcoming offers at this time.
            </p>
          ) : (
            upcoming.map((r) => (
              <div
                key={r.id}
                onClick={() => {
                  setSelectedReward(r)
                  setActiveTab('reward-details')
                }}
                className="bg-surface-container-highest/30 rounded-2xl p-6 shadow-sm flex flex-col border border-outline-variant/10 opacity-70 cursor-pointer hover:opacity-100 transition-all hover:bg-white/40"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-on-surface-variant text-lg font-headline">
                    {r.name}
                  </h3>
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-[26px]">
                    cake
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant font-medium opacity-80 mb-8 flex-grow pr-4">
                  {r.description}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                    Starts {r.start_date || 'TBC'}
                  </span>
                  <button
                    disabled
                    className="bg-[#D1D3C8] text-white font-bold py-1.5 px-8 text-xs tracking-wider rounded-full uppercase"
                  >
                    LOCKED
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardRewards
