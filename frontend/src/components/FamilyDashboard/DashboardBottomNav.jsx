import React from 'react'

function DashboardBottomNav({ activeTab, setActiveTab, handleTabClick }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#fcfdf9]/90 backdrop-blur-md border-t border-outline-variant/10 px-6 py-3 flex justify-around items-center md:hidden z-50">
      <button
        onClick={() => handleTabClick('dashboard')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-primary' : 'text-on-surface-variant/60'}`}
      >
        <span className="material-symbols-outlined text-[24px]">home</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
      </button>

      <button
        onClick={() => handleTabClick('rewards')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'rewards' || activeTab === 'reward-details' ? 'text-primary' : 'text-on-surface-variant/60'}`}
      >
        <span className="material-symbols-outlined text-[24px]">emoji_events</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Rewards</span>
      </button>

      <button
        onClick={() => handleTabClick('vouchers')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'vouchers' ? 'text-primary' : 'text-on-surface-variant/60'}`}
      >
        <span className="material-symbols-outlined text-[24px]">confirmation_number</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Codes</span>
      </button>

      <button
        onClick={() => setActiveTab('edit-account')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'edit-account' ? 'text-primary' : 'text-on-surface-variant/60'}`}
      >
        <span className="material-symbols-outlined text-[24px]">person</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
      </button>
    </div>
  )
}

export default DashboardBottomNav
