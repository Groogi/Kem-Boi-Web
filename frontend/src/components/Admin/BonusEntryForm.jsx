import { useState, useEffect, useCallback, useRef } from 'react'
import { useToast } from '../../context/ToastContext'
import { API_BASE } from '../../api/config'

function BonusEntryForm({ users, onQuickAdd, loading, token }) {
  const [bonusUser, setBonusUser] = useState(null)
  const [quickEmail, setQuickEmail] = useState('')
  const [quickPoints, setQuickPoints] = useState('')
  const [history, setHistory] = useState([])
  const [searchEmail, setSearchEmail] = useState('')
  const [errors, setErrors] = useState({})
  const { showToast } = useToast()

  const searchInputRef = useRef(null)

  useEffect(() => {
    if (bonusUser && !bonusUser.is_new) {
      const updated = users.find((u) => u.id === bonusUser.id)
      if (updated && updated.points_balance !== bonusUser.points_balance) {
        setBonusUser(updated)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  const fetchTransactions = useCallback(
    async (userId, email = null) => {
      try {
        const query = email ? `email=${encodeURIComponent(email)}` : `user_id=${userId}`
        const res = await fetch(`${API_BASE}/transactions?${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          // Sort by created_at descending (newest first)
          const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          setHistory(sorted)

          // If we found a name in any of the pending records, use it for the display
          if (email && sorted.length > 0) {
            const namedRecord = sorted.find(r => r.first_name);
            if (namedRecord) {
              setBonusUser(prev => ({
                ...prev,
                first_name: namedRecord.first_name,
                last_name: namedRecord.last_name
              }));
            }
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
    [token]
  )

  useEffect(() => {
    if (bonusUser) {
      if (bonusUser.is_new) {
        fetchTransactions(null, bonusUser.email)
      } else {
        fetchTransactions(bonusUser.id)
      }
    } else {
      setHistory([])
    }
  }, [bonusUser, fetchTransactions])

  const triggerSearch = (query) => {
    const q = query || searchEmail.trim()
    if (!q) return

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === q.toLowerCase() ||
        (u.account_id && u.account_id.toLowerCase().includes(q.toLowerCase()))
    )

    if (found) {
      setBonusUser(found)
      setSearchEmail('')
      showToast(`Member Found: ${found.first_name || found.email}`, 'success')
    } else if (q.includes('@')) {
      setBonusUser({ email: q, is_new: true })
      setSearchEmail('')
      showToast('Ready to register prospective member', 'success')
    } else {
      showToast('No member found with that email or ID.', 'error')
    }
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      triggerSearch(e.target.value.trim())
    }
  }

  return (
    <div className="animate-fade-in space-y-10">
      <div className="flex flex-col gap-6">
        <h3 className="text-3xl font-bold font-headline text-[#4A6B10]">Add Points</h3>
        <div className="relative max-w-xl flex gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search Email or Member ID"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="w-full bg-[#F2F3EB]/50 border-none rounded-full px-12 py-3.5 shadow-inner font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              onKeyDown={handleSearch}
              ref={searchInputRef}
            />
            <span className="material-symbols-outlined absolute left-4 top-3.5 text-on-surface-variant/40">
              search
            </span>
          </div>
          <button
            onClick={() => triggerSearch()}
            className="bg-primary text-white font-bold px-8 rounded-full shadow-lg shadow-primary/10 hover:bg-primary-dark transition-all active:scale-95 flex items-center gap-2 group whitespace-nowrap"
          >
            <span className="text-xs tracking-widest uppercase">Enter</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
              east
            </span>
          </button>
        </div>
      </div>

      {!bonusUser ? (
        <div className="bg-[#EEF4E4] rounded-[2.5rem] p-10 max-w-xl border border-white/40 shadow-sm animate-fade-in">
          <h4 className="text-xl font-bold font-headline text-primary text-center mb-8">
            Add Points
          </h4>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Email</label>
              <input
                type="text"
                value={quickEmail}
                onChange={(e) => {
                  setQuickEmail(e.target.value)
                  if (errors.email) setErrors({ ...errors, email: false })
                }}
                className={`w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3 shadow-inner font-medium text-on-surface ${errors.email ? 'ring-2 ring-red-500/50' : ''}`}
              />
            </div>
            <div className="flex gap-4 items-end">
              <div className="flex-grow">
                <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Points</label>
                <input
                  type="number"
                  value={quickPoints}
                  onChange={(e) => {
                    setQuickPoints(e.target.value)
                    if (errors.points) setErrors({ ...errors, points: false })
                  }}
                  className={`w-full bg-surface-container-highest border-none rounded-full px-5 py-3 shadow-inner font-bold text-lg ${errors.points ? 'ring-2 ring-red-500/50' : ''}`}
                />
              </div>
              <button
                onClick={() => {
                  const email = quickEmail.trim()
                  const points = String(quickPoints).trim()
                  const newErrors = {}

                  if (!email || !email.includes('@')) newErrors.email = true
                  if (!points || isNaN(points) || Number(points) <= 0) newErrors.points = true

                  if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors)
                    if (newErrors.email) showToast('Please enter a valid email address.', 'error')
                    else showToast('Please enter a valid numeric point amount.', 'error')
                    return
                  }

                  setErrors({})
                  onQuickAdd(email, points)
                }}
                disabled={loading}
                className="bg-primary text-white font-bold py-3.5 px-12 rounded-full text-xs shadow-md border-primary/10 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {loading ? '...' : 'Add Points'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in space-y-10">
          <div className="bg-[#fbfcfa] rounded-[3rem] p-10 md:p-14 border border-[#426500]/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#426500]/[0.02] rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-20 h-20 rounded-full bg-[#EEF4E4] flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[#426500] text-4xl">person</span>
                </div>
                <h4 className="text-4xl font-bold font-headline text-[#1a2a00] mb-2 tracking-tight">
                  {bonusUser.first_name
                    ? `${bonusUser.first_name} ${bonusUser.last_name}`
                    : 'Prospective Member'}
                </h4>
                <p className="text-on-surface-variant/60 font-medium italic text-lg">
                  {bonusUser.email}
                </p>
                {!bonusUser.is_new && (
                  <div className="mt-6 flex gap-2">
                    <span className="bg-[#426500]/10 text-[#426500] px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] uppercase border border-[#426500]/20">
                      Active Member
                    </span>
                    <span className="bg-[#EEF4E4] text-[#4A6B10] px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] uppercase border border-white">
                      Verified
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-[#F2F3EB] rounded-[2.5rem] p-10 flex flex-col items-center min-w-[280px] shadow-inner border border-white/40">
                <span className="text-[10px] font-black text-[#4A6B10]/40 uppercase tracking-[0.3em] mb-2">
                  Total Points
                </span>
                <span className="text-7xl font-bold text-primary font-headline leading-none mb-10 tabular-nums">
                  {bonusUser.points_balance || 0}
                </span>

                <div className="w-full space-y-4">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="000"
                      value={quickPoints}
                      onChange={(e) => {
                        setQuickPoints(e.target.value)
                        if (errors.quickPoints) setErrors({ ...errors, quickPoints: false })
                      }}
                      className={`w-full bg-white/80 border-none text-center font-bold text-2xl py-4 rounded-2xl shadow-inner focus:ring-4 focus:ring-[#426500]/10 transition-all outline-none ${errors.quickPoints ? 'ring-2 ring-red-500/50' : ''}`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
                      PTS
                    </span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={async () => {
                        const points = String(quickPoints).trim()
                        if (!points || isNaN(points) || Number(points) <= 0) {
                          setErrors({ quickPoints: true })
                          showToast('Please enter a valid numeric point amount.', 'error')
                          return
                        }

                        setErrors({})
                        await onQuickAdd(bonusUser.email, points)
                        setQuickPoints('')
                        fetchTransactions(bonusUser.id)
                      }}
                      disabled={loading || !quickPoints}
                      className="flex-1 bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-[#395800] transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-2 group"
                    >
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-12">
                        add_circle
                      </span>
                      <span className="text-xs tracking-widest uppercase">Add</span>
                    </button>
                    <button
                      onClick={async () => {
                        const points = String(quickPoints).trim()
                        if (!points || isNaN(points) || Number(points) <= 0) {
                          setErrors({ quickPoints: true })
                          showToast('Please enter a valid numeric point amount.', 'error')
                          return
                        }

                        setErrors({})
                        await onQuickAdd(bonusUser.email, Number(points) * -1)
                        setQuickPoints('')
                        fetchTransactions(bonusUser.id)
                      }}
                      disabled={loading || !quickPoints}
                      className="flex-1 bg-red-500 text-white font-bold py-4 rounded-full shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-2 group"
                    >
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-rotate-12">
                        remove_circle
                      </span>
                      <span className="text-xs tracking-widest uppercase">Subtract</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#EEF4E4]/40 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm border border-outline-variant/20 relative">
            <div className="flex justify-between items-center mb-8 px-2">
              <h5 className="text-[11px] font-black text-[#4A6B10] uppercase tracking-[0.2em] opacity-60">
                Activity History
              </h5>
              {!bonusUser.is_new && (
                <span className="text-[10px] font-bold text-on-surface-variant/40 italic">
                  Sorted by Recent first
                </span>
              )}
            </div>
            <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-x-auto border border-primary/5 shadow-sm whitespace-nowrap lg:whitespace-normal">
              <table className="w-full text-left">
                <thead className="bg-[#F2F3EB]/30 border-b border-primary/5">
                  <tr>
                    <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80">
                      Points
                    </th>
                    <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80">
                      Expiry Date
                    </th>
                    <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 text-center">
                      Points Balance
                    </th>
                    <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#426500]/5">
                  {history.length > 0 ? (
                    history.map((t, i) => {
                      const isPositive = t.points > 0
                      const date = new Date(t.created_at).toLocaleDateString('en-AU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })

                      let runningBalance = bonusUser.is_new ? 0 : (bonusUser.points_balance || 0)
                      if (!bonusUser.is_new) {
                        for (let j = 0; j < i; j++) {
                          runningBalance -= history[j].points
                        }
                      } else {
                        // For new users, we calculate from zero up
                        runningBalance = history.slice(i).reduce((sum, item) => sum + item.points, 0)
                      }

                      return (
                        <tr key={i}>
                          <td
                            className={`px-8 py-5 text-sm font-bold ${isPositive ? 'text-primary' : 'text-red-500'}`}
                          >
                            {isPositive ? `+${t.points}` : t.points}
                          </td>
                          <td className="px-8 py-5 text-sm font-medium text-on-surface-variant/70 italic">
                            {date}
                          </td>
                          <td className="px-8 py-5 text-sm font-bold text-center text-[#4A6B10] font-headline">
                            {bonusUser.is_new ? (
                              <div className="flex flex-col leading-tight">
                                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">
                                  Pending
                                </span>
                                <span className="text-[12px] font-bold text-on-surface-variant/60">
                                  {runningBalance} pts
                                </span>
                              </div>
                            ) : (
                              `${runningBalance} pts`
                            )}
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span
                              className={`inline-block px-5 py-1 rounded-full text-[9px] font-bold tracking-widest ${bonusUser.is_new ? 'bg-[#D1D3C8] text-white' : isPositive ? 'bg-[#BFE9A2] text-[#304c00]' : 'bg-red-100 text-red-800'}`}
                            >
                              {bonusUser.is_new ? 'EMAIL SENT' : t.transaction_type.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-8 py-10 text-center text-sm font-medium text-on-surface-variant/40 italic"
                      >
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setBonusUser(null)}
              className="flex items-center gap-2 mt-6 text-[#4A6B10] font-bold text-xs group hover:text-[#395800] transition-colors"
            >
              <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
                west
              </span>
              Back to Search
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BonusEntryForm
