import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AdminSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab,
  setViewMode,
  setRewardsKey,
  setLocationMode,
}) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { id: 'dashboard', label: 'Customers', icon: 'group' },
    { id: 'bonus-entry', label: 'Staff Service Hub', icon: 'point_of_sale' },
    { id: 'rewards', label: 'Rewards', icon: 'workspace_premium' },
    { id: 'redemptions', label: 'Rewards History', icon: 'history_edu' },
    { id: 'locations', label: 'Store Locations', icon: 'add_location' },
    { id: 'links', label: 'Website Links', icon: 'ads_click' },
  ]

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`w-64 bg-[#F2F3EB] h-screen fixed left-0 top-0 border-r border-outline-variant/10 flex flex-col p-6 z-[70] transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-10 pl-2">
          <div
            onClick={() => {
              setActiveTab('dashboard')
              setViewMode('list')
            }}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <h1 className="text-3xl font-headline font-bold text-primary leading-tight">Kem Boi</h1>
            <p className="text-[11px] font-bold text-on-surface-variant/60 tracking-widest uppercase mt-[-4px]">
              Admin Dashboard
            </p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setViewMode('list')
                if (item.id === 'rewards') setRewardsKey((k) => k + 1)
                if (item.id === 'locations') setLocationMode('grid')
                setIsSidebarOpen(false)
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-all duration-200 group ${activeTab === item.id
                  ? 'bg-white border-2 border-[#E5E7E1] text-primary shadow-sm shadow-black/5'
                  : 'text-on-surface-variant hover:bg-surface-container-highest/30'
                }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${activeTab === item.id ? 'font-bold' : 'font-light'}`}
              >
                {item.icon}
              </span>
              <span
                className={`text-[15px] ${activeTab === item.id ? 'font-bold text-[#4A6B10]' : 'font-medium'}`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </nav>

        <div
          onClick={() => {
            logout()
            navigate('/')
          }}
          className="mt-auto mb-4 flex items-center justify-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-all duration-200 text-on-surface-variant hover:bg-red-50 hover:text-red-600 border border-outline-variant/10 bg-white"
        >
          <span className="text-[15px] font-bold">Logout</span>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
