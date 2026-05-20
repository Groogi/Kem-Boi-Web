import React from 'react'

function DashboardRewardDetails({ selectedReward, setActiveTab, user, myRedemptions, handleClaimReward }) {
  if (!selectedReward) return null

  return (
    <div className="animate-fade-in space-y-6 pb-12 mt-4">
      <button
        onClick={() => setActiveTab('rewards')}
        className="flex items-center gap-2 text-primary font-bold hover:underline mb-2 group"
      >
        <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
          arrow_back
        </span>
        Back to Rewards
      </button>

      <div className="w-full bg-[#DFEECA] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-14 shadow-sm flex flex-col border border-white/40 min-h-[400px]">
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <h2 className="font-bold text-primary text-3xl md:text-4xl font-headline mb-1">
              {selectedReward.name}
            </h2>
            <span className="bg-white/50 px-6 py-2 rounded-full font-bold text-primary shadow-sm border border-white/60 whitespace-nowrap">
              {selectedReward.point_cost} PTS
            </span>
          </div>

          <p className="text-on-surface-variant font-medium opacity-80 mb-10 text-lg md:text-xl leading-relaxed max-w-2xl">
            {selectedReward.description || 'No description provided.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 md:mt-12 bg-white/30 p-6 md:p-8 rounded-[2rem] border border-white/40">
            <div>
              <h3 className="font-bold text-primary text-[11px] uppercase tracking-widest mb-4">
                Availability Period:
              </h3>
              <div className="flex items-center gap-4 md:gap-6 text-on-surface font-semibold text-base md:text-lg">
                <div className="flex flex-col">
                  <span className="text-[10px] text-on-surface-variant opacity-60 uppercase font-black tracking-widest mb-0.5">
                    Starts
                  </span>
                  <span className="font-headline text-primary">
                    {selectedReward.start_date
                      ? new Date(selectedReward.start_date).toLocaleDateString('en-AU')
                      : 'TBC'}
                  </span>
                </div>
                <div className="h-8 w-px bg-primary/20 self-end mb-1"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-on-surface-variant opacity-60 uppercase font-black tracking-widest mb-0.5">
                    Ends
                  </span>
                  <span className="font-headline text-primary">
                    {selectedReward.end_date
                      ? new Date(selectedReward.end_date).toLocaleDateString('en-AU')
                      : 'Ongoing'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center md:justify-end">
              <div className="w-full md:w-auto text-left md:text-right bg-white/40 px-6 py-4 rounded-2xl border border-white/60">
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.2em] mb-1 leading-none">
                  Your Balance
                </p>
                <p className="text-2xl font-black font-headline text-primary leading-none">
                  {user?.points_balance || 0} <span className="text-sm">pts</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 pt-8 border-t border-primary/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary/40">event_available</span>
            <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.2em] text-center md:text-left">
              {selectedReward.end_date
                ? `Valid until ${new Date(selectedReward.end_date).toLocaleDateString('en-AU')}`
                : 'Always available'}
            </span>
          </div>
          {(() => {
            const redemptionCount = myRedemptions.filter(
              (r) =>
                r.reward_id === selectedReward.id ||
                (r.reward && r.reward.id === selectedReward.id)
            ).length
            const isLimitReached =
              selectedReward.limit_per_user > 0 &&
              redemptionCount >= selectedReward.limit_per_user
            const isSoldOut =
              selectedReward.total_limit > 0 &&
              selectedReward.redemptions_count >= selectedReward.total_limit

            return (
              <button
                onClick={() => handleClaimReward(selectedReward)}
                disabled={isLimitReached || isSoldOut}
                className={`w-full md:w-auto font-bold py-4 px-14 text-sm tracking-[0.1em] rounded-full transition-all shadow-xl uppercase ${isLimitReached || isSoldOut
                  ? 'bg-on-surface-variant/20 text-on-surface-variant/40 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-[#395800] hover:scale-105 active:scale-95'
                  }`}
              >
                {isSoldOut ? 'Sold Out' : isLimitReached ? 'Limit Reached' : 'Claim Offer'}
              </button>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

export default DashboardRewardDetails
