import React from 'react'
import RedemptionRow from './RedemptionRow'

function RedemptionLogs({
  redemptionSearch,
  setRedemptionSearch,
  fetchRedemptions,
  redemptions,
  handleUpdateRedemptionStatus,
  handleDeleteRedemption,
}) {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-5xl font-headline font-bold text-primary capitalize tracking-[-0.03em]">
            Redemption Log
          </h2>
          <p className="text-on-surface-variant font-medium opacity-60 text-lg mt-2">
            Track and verify customer reward claims.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by customer name or ID..."
            value={redemptionSearch}
            onChange={(e) => setRedemptionSearch(e.target.value)}
            className="w-full bg-[#fcfdf2] border-none rounded-full px-12 py-4 shadow-inner focus:ring-4 focus:ring-[#426500]/10 transition-all font-medium text-on-surface-variant outline-none"
          />
          <span className="material-symbols-outlined absolute left-4 top-[18px] text-on-surface-variant/40">
            search
          </span>
        </div>
        <button
          onClick={fetchRedemptions}
          className="bg-[#426500] text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-[#426500]/10 hover:bg-[#395800] transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          <span className="text-sm tracking-widest">REFRESH</span>
        </button>
      </div>

      <div className="bg-[#fcfdf9] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-outline-variant/30">
        <div className="bg-white rounded-[1.2rem] md:rounded-[2rem] overflow-x-auto border border-primary/5 shadow-sm whitespace-nowrap lg:whitespace-normal">
          <table className="w-full text-left">
            <thead className="bg-[#F2F3EB]/30 border-b border-primary/5">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-[11px]">
                  Date
                </th>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-[11px]">
                  Customer
                </th>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-[11px]">
                  Reward
                </th>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-[11px]">
                  Voucher Code
                </th>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-center text-[11px]">
                  Status
                </th>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-right text-[11px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {redemptions
                .filter((red) => red.status === 'pending')
                .filter((red) => {
                  const name =
                    `${red.user?.first_name || ''} ${red.user?.last_name || ''}`.toLowerCase()
                  const accId = String(red.user?.account_id || '').toLowerCase()
                  const query = redemptionSearch.toLowerCase()
                  return name.includes(query) || accId.includes(query)
                }).length > 0 ? (
                redemptions
                  .filter((red) => red.status === 'pending')
                  .filter((red) => {
                    const name =
                      `${red.user?.first_name || ''} ${red.user?.last_name || ''}`.toLowerCase()
                    const accId = String(red.user?.account_id || '').toLowerCase()
                    const query = redemptionSearch.toLowerCase()
                    return name.includes(query) || accId.includes(query)
                  })
                  .map((red, idx) => (
                    <RedemptionRow
                      key={idx}
                      red={red}
                      onUpdate={handleUpdateRedemptionStatus}
                      onDelete={handleDeleteRedemption}
                    />
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-8 py-16 text-center text-sm font-medium text-on-surface-variant/40 italic"
                  >
                    No redemptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RedemptionLogs
