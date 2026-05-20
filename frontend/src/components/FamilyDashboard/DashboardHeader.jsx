import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function DashboardHeader({ activeTab, setActiveTab, handleTabClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header
      className={`hidden md:flex justify-between items-center py-6 md:py-8 mb-6 border-outline-variant/10 gap-4 md:gap-10 ${activeTab === 'edit-account' ? 'border-b-0' : 'border-b'}`}
    >
      <div
        onClick={() => setActiveTab('dashboard')}
        className="text-2xl md:text-3xl font-headline font-bold text-primary whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
      >
        Kem Boi
      </div>

      {activeTab !== 'edit-account' && (
        <>
          <nav className="hidden md:flex items-center gap-10 lg:gap-14 ml-10">
            <button
              onClick={() => handleTabClick('dashboard')}
              className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all pb-2 ${activeTab === 'dashboard' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant/40 hover:text-primary'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleTabClick('rewards')}
              className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all pb-2 ${activeTab === 'rewards' || activeTab === 'reward-details' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant/40 hover:text-primary'}`}
            >
              Rewards
            </button>
            <button
              onClick={() => handleTabClick('vouchers')}
              className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all pb-2 ${activeTab === 'vouchers' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant/40 hover:text-primary'}`}
            >
              Vouchers
            </button>
          </nav>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <div
              onClick={() => setActiveTab('edit-account')}
              className="flex items-center gap-3 bg-white/40 pr-3 md:pr-4 pl-1 py-1 rounded-full border border-white/60 cursor-pointer hover:bg-white/60 transition-colors shadow-sm"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-[#e8ebe3] font-bold">
                <span className="material-symbols-outlined text-[1.1rem] md:text-[1.2rem]">
                  person
                </span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-bold text-primary leading-tight">
                  {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : 'Full Name'}
                </span>
                <span className="text-xs text-on-surface-variant/70 leading-tight capitalize">
                  {user?.role || 'Member'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-white/40 flex items-center justify-center text-primary border border-white/60 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm font-bold text-sm tracking-wide"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </header>
  )
}

export default DashboardHeader
