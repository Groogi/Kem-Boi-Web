import React from 'react'

function AdminHeader({ activeTab, user }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-14">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary capitalize tracking-[-0.02em]">
        {(() => {
          if (activeTab === 'dashboard') return 'Customer Directory'
          if (activeTab === 'bonus-entry') return 'Staff Service Hub'
          return activeTab.replace('-', ' ')
        })()}
      </h2>

      {/* Hide full profile badge on mobile since it's now in the top-right sticky bar */}
      <div className="hidden md:flex items-center gap-3 bg-white pr-4 pl-1 py-1 rounded-full border border-outline-variant/20 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-[1.2rem]">person</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-primary leading-tight">
            {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : 'Full Name'}
          </span>
          <span className="text-[11px] text-on-surface-variant/60 font-bold uppercase leading-tight tracking-tighter">
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
