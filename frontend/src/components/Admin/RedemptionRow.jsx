import React, { useState } from 'react'

function RedemptionRow({ red, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false)

  return (
    <tr className="hover:bg-white/60 transition-all group">
      <td className="px-8 py-8">
        <span className="text-[11px] font-bold text-on-surface-variant font-mono">
          {new Date(red.created_at).toLocaleDateString('en-AU')}
        </span>
      </td>
      <td className="px-8 py-6">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-on-surface">
            {red.user?.first_name} {red.user?.last_name}
          </span>
          <span className="text-[10px] font-bold text-[#4A6B10] opacity-40 uppercase tracking-widest leading-none mt-1">
            #{red.user?.account_id}
          </span>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className="text-sm font-medium text-on-surface-variant font-headline">
          {red.reward?.name}
        </span>
      </td>
      <td className="px-8 py-6">
        <div className="flex justify-center">
          <span className="inline-block font-mono whitespace-nowrap bg-[#F2F3EB] px-6 py-4 rounded-[1.5rem] text-[#4A6B10] font-bold tracking-[0.2em] border border-primary/10 text-[14px]">
            {red.voucher_code}
          </span>
        </div>
      </td>
      <td className="px-8 py-6 text-center">
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${red.status === 'used' || red.status === 'fulfilled'
              ? 'bg-red-50 text-red-500 border-red-200'
              : 'bg-[#F2F3EB] text-[#4A6B10] border-[#D1D3C8]'
            }`}
        >
          {red.status}
        </span>
      </td>
      <td className="px-8 py-8 text-right">
        <div className="flex justify-end gap-3">
          {red.status === 'pending' && (
            <button
              onClick={async () => {
                setLoading(true)
                try {
                  await onUpdate(red.id, 'used')
                  await onDelete(red.id)
                } catch (err) {
                  console.error(err)
                } finally {
                  setLoading(false)
                }
              }}
              disabled={loading}
              className="bg-[#426500] text-white font-bold text-[10px] tracking-widest px-6 h-[38px] rounded-full hover:bg-[#4a6b10] transition-all uppercase disabled:opacity-50 flex items-center justify-center whitespace-nowrap shadow-md shadow-[#426500]/10"
            >
              {loading ? 'Confirming...' : 'Confirm & Clear'}
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

export default RedemptionRow
