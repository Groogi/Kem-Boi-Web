import React from 'react'

function CustomerDirectory({
  searchQuery,
  setSearchQuery,
  filteredUsers,
  setSelectedUser,
  setViewMode,
  getStatusBadge,
}) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="relative max-w-xl">
        <input
          type="text"
          placeholder="Search membership, email, account ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#F2F3EB] border-none rounded-full px-12 py-3.5 shadow-inner focus:ring-2 focus:ring-primary/20 transition-all font-medium text-on-surface-variant"
        />
        <span className="material-symbols-outlined absolute left-4 top-3.5 text-on-surface-variant/80">
          search
        </span>
      </div>

      <div className="bg-[#EEF4E4]/70 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-14 relative border border-white/40 shadow-sm">
        <div className="bg-white/60 backdrop-blur-sm rounded-[1.2rem] md:rounded-[2rem] overflow-x-auto border border-white/20 whitespace-nowrap lg:whitespace-normal">
          <table className="w-full text-left">
            <thead className="bg-[#F2F3EB]/60 border-b border-[#4A6B10]/5">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-[#304c00]">ID</th>
                <th className="px-8 py-5 text-sm font-bold text-[#304c00]">User Name</th>
                <th className="px-8 py-5 text-sm font-bold text-[#304c00]">Email Address</th>
                <th className="px-8 py-5 text-sm font-bold text-[#304c00] text-center">
                  Points Balance
                </th>
                <th className="px-8 py-5 text-sm font-bold text-[#304c00] text-center">Status</th>
                <th className="px-8 py-5 text-sm font-bold text-[#304c00] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0
                ? filteredUsers.map((u, idx) => {
                  const status = getStatusBadge(u.points_balance)
                  return (
                    <tr
                      key={idx}
                      onClick={() => {
                        setSelectedUser(u)
                        setViewMode('user-details')
                      }}
                      className="hover:bg-surface-container-highest/10 cursor-pointer transition-all"
                    >
                      <td className="px-8 py-5 text-[11px] font-black text-[#5C5F57]">
                        #{u.account_id || u.id}
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-on-surface">
                        {u.first_name} {u.last_name}
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-[#5C5F57] italic">
                        {u.email}
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-[#4A6B10] text-center font-headline">
                        {u.points_balance} pts
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span
                          className={`inline-block px-4 py-1 rounded-full text-[9px] font-bold tracking-widest ${status.class}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="bg-[#426500]/10 text-[#426500] font-bold text-[10px] tracking-widest px-6 py-2.5 rounded-full hover:bg-[#426500] hover:text-white transition-all uppercase border border-[#426500]/10">
                          View
                        </span>
                      </td>
                    </tr>
                  )
                })
                : [1, 2, 3, 4, 5].map((idx) => (
                  <tr key={idx} className="opacity-10">
                    <td className="px-8 py-5 text-[10px] font-black">#000</td>
                    <td className="px-8 py-5 text-sm font-bold text-on-surface">Member Name</td>
                    <td className="px-8 py-5 text-sm font-medium italic">member@email.com</td>
                    <td className="px-8 py-5 text-sm font-bold text-center">0 pts</td>
                    <td className="px-8 py-5 text-center">
                      <span className="inline-block px-4 py-1 rounded-full text-[9px] font-bold bg-[#D1D3C8] text-white">
                        BRONZE
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="bg-[#426500]/5 text-[#426500] font-bold text-[10px] px-4 py-1.5 rounded-full uppercase">
                        View
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-end mt-8">
          <button
            onClick={() => setViewMode('add-user')}
            className="w-full sm:w-auto bg-[#426500] text-white font-bold py-3.5 px-10 text-[11px] tracking-widest rounded-full shadow-md shadow-[#426500]/20 hover:bg-[#4a6b10] transition-all uppercase"
          >
            ADD USER
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerDirectory
