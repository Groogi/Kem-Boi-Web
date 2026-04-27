import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { updateProfile } from '../api/auth'
import { CustomDatePicker, ModernConfirm } from '../components/Common/SharedUI'

function FamilyBonusDashboard() {
  const { user, token, updateUser, logout, refreshProfile } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  // View state: 'dashboard', 'rewards', 'reward-details', 'edit-account'
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [rewards, setRewards] = useState([])
  const [myRedemptions, setMyRedemptions] = useState([])
  const [confirmData, setConfirmData] = useState({ isOpen: false, reward: null })
  const [selectedReward, setSelectedReward] = useState(null)

  const refreshAllData = async () => {
    setLoading(true)
    await Promise.all([refreshProfile(), fetchRewardsData(), fetchMyRedemptionsData()])
    setLoading(false)
  }

  const fetchRewardsData = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch('/api/rewards', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setRewards(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch rewards', err)
    }
  }, [token])

  const fetchMyRedemptionsData = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch('/api/my_redemptions', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setMyRedemptions(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch my redemptions', err)
    }
  }, [token])

  const handleClaimReward = async (reward) => {
    const redemptionCount = myRedemptions.filter(
      (r) => r.reward_id === reward.id || (r.reward && r.reward.id === reward.id)
    ).length
    if (reward.limit_per_user > 0 && redemptionCount >= reward.limit_per_user) {
      showToast(
        `Limit reached: You can only claim this reward ${reward.limit_per_user} time(s).`,
        'error'
      )
      return
    }

    if ((user?.points_balance || 0) < reward.point_cost) {
      showToast(`You need ${reward.point_cost} points to claim this!`, 'error')
      return
    }

    setConfirmData({
      isOpen: true,
      reward,
      message: `Redeem ${reward.point_cost} points for ${reward.name}?`,
    })
    return
  }

  const executeClaimReward = async (reward) => {
    setConfirmData({ isOpen: false, reward: null })
    try {
      const res = await fetch(`/api/rewards/${reward.id}/claim`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        showToast(`Success! Your code is: ${data.redemption.voucher_code}`, 'success')
        updateUser({ ...user, points_balance: data.point_balance })
        setActiveTab('vouchers')
        fetchMyRedemptionsData()
      } else {
        showToast(data.error || 'Failed to claim reward', 'error')
      }
    } catch {
      showToast('Network error', 'error')
    }
  }

  useEffect(() => {
    if (token) {
      refreshProfile()
      fetchRewardsData()
      fetchMyRedemptionsData()
    }
  }, [token])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    refreshAllData()
  }

  const getStatusBadge = (points) => {
    if (points >= 1500) return { label: 'PLATINUM', class: 'bg-[#4A6B10] text-white shadow-md' }
    if (points >= 1000) return { label: 'GOLD', class: 'bg-primary text-white shadow-sm' }
    if (points >= 500) return { label: 'SILVER', class: 'bg-[#DFEECA] text-[#4A6B10]' }
    return { label: 'BRONZE', class: 'bg-[#EEF4E4] text-[#4A6B10]/60' }
  }

  const status = getStatusBadge(user?.points_balance || 0)

  // Form state
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date_of_birth: user?.date_of_birth || '',
  })

  // Punch Card Logic: 1 punch per 200 points, 6 punches = reward
  const POINTS_PER_PUNCH = 200
  const totalPunches = 6
  const currentPunches = Math.floor((user?.points_balance || 0) / POINTS_PER_PUNCH) % totalPunches
  const moreToGo = totalPunches - currentPunches

  const handleSave = async () => {
    setLoading(true)
    setSaveStatus('')
    try {
      const updatedUser = await updateProfile(formData, token)
      updateUser(updatedUser)
      setSaveStatus('success')
      showToast('Profile updated successfully!', 'success')
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (err) {
      console.error(err)
      setSaveStatus('error')
      showToast('Update failed. Please check your network.', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Reusable header navigation
  const renderHeader = () => (
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

  const renderBottomNav = () => (
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

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-[#DFEECA] rounded-[1.5rem] p-8 md:p-10 shadow-sm border border-white/40">
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-[#4A6B10] mb-2">
          Welcome to your Kem Boi Dashboard, {user?.first_name || 'Kem Boi'}!
        </h2>
        <p className="text-on-surface-variant font-medium opacity-60">
          Your one-stop destination for all your Kem Boi rewards and loyalty points.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Points Balance */}
        <div className="bg-primary rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold font-headline">Points Balance:</h2>
              <span
                className={`px-5 py-1.5 rounded-full text-[10px] font-bold tracking-widest ${status.class} shadow-lg shadow-black/10 transition-transform active:scale-95`}
              >
                {status.label}
              </span>
            </div>
            <div className="text-6xl md:text-[5.5rem] font-bold font-headline text-center my-8 tracking-tighter text-[#e7eed8] drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
              {user?.points_balance || 0} pt<span className="text-4xl md:text-6xl">s</span>
            </div>
          </div>
          <p className="text-base font-semibold leading-relaxed opacity-90 mt-4 max-w-[280px] relative z-10 italic">
            "Keep sipping, you're only{' '}
            {status.label === 'PLATINUM'
              ? 'mastering the art'
              : status.label === 'GOLD'
                ? '500 pts'
                : 'a few drinks'}{' '}
            away from the next tier!"
          </p>

          {/* Subtle background decoration */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
        </div>

        {/* Punch Card Tracker */}
        <div className="bg-primary rounded-[1.5rem] p-8 md:p-10 text-white shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2">Buy 5, Get 1 Free</h2>
            <p className="text-lg font-medium opacity-90 mb-8 font-headline">
              {moreToGo === 0
                ? 'Reward Ready to Claim!'
                : `Only ${moreToGo} more punch${moreToGo > 1 ? 'es' : ''} to go!`}
            </p>

            {/* Punch circles */}
            <div className="flex justify-between items-center gap-3 mb-10">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className={`h-4 lg:h-5 flex-1 rounded-full shadow-inner ${idx <= currentPunches ? 'bg-[#c3e68c]' : 'bg-[#e2ead3]'}`}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              disabled={moreToGo > 0}
              className={`font-bold py-3.5 px-10 rounded-full text-lg tracking-wide transition-all ${moreToGo === 0 ? 'bg-[#c3e68c] text-primary shadow-lg hover:scale-105 active:scale-95' : 'bg-[#d5dfc5] text-primary/40 cursor-not-allowed'}`}
            >
              {moreToGo === 0 ? 'Claim Reward' : 'Claim Offer'}
            </button>
          </div>
        </div>
      </div>

      {/* Action Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div
          onClick={() => setActiveTab('rewards')}
          className="bg-[#EEF4E4] rounded-3xl p-10 border border-primary/5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold font-headline text-[#4A6B10]">Explore Rewards</h3>
              <span className="material-symbols-outlined text-[#4A6B10] text-3xl group-hover:scale-110 transition-transform">
                workspace_premium
              </span>
            </div>
            <p className="text-on-surface-variant font-medium opacity-60 text-base leading-relaxed max-w-[320px]">
              Browse our catalog of treats and redeem your points for free smoothies, toppings, and
              more.
            </p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('vouchers')}
          className="bg-[#EEF4E4] rounded-3xl p-10 border border-primary/5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold font-headline text-[#4A6B10]">My Vouchers</h3>
              <span className="material-symbols-outlined text-[#4A6B10] text-3xl group-hover:scale-110 transition-transform">
                confirmation_number
              </span>
            </div>
            <p className="text-on-surface-variant font-medium opacity-60 text-base leading-relaxed max-w-[320px]">
              View your activated rewards and show your voucher codes to our staff in-store.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRewards = () => {
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
                          className={`font-bold py-2 px-8 text-[11px] tracking-wider rounded-full transition-all shadow-sm ${
                            isReached || isSoldOut
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

  const pendingVouchers = myRedemptions.filter((red) => red.status === 'pending')

  const renderMyVouchers = () => (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-center bg-white/40 p-6 rounded-[2rem] border border-white/60">
        <div>
          <h2 className="text-2xl font-bold font-headline text-primary">My Claimed Rewards</h2>
          <p className="text-sm font-medium text-on-surface-variant opacity-70">
            Show these codes to our staff in-store to redeem.
          </p>
        </div>
        <span className="material-symbols-outlined text-primary text-3xl">confirmation_number</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingVouchers.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white/20 rounded-[2rem] border-2 border-dashed border-white/40">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/20 mb-4">
              redeem
            </span>
            <p className="text-on-surface-variant/40 font-bold tracking-widest uppercase text-sm">
              No vouchers claimed yet
            </p>
          </div>
        ) : (
          pendingVouchers.map((red) => (
            <div
              key={red.id}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 flex flex-col relative group overflow-hidden"
            >
              {/* Status Badge */}
              <div className="absolute top-6 right-6">
                <span
                  className={`text-[9px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full border ${
                    red.status === 'used'
                      ? 'bg-red-50 text-red-500 border-red-100'
                      : 'bg-green-50 text-green-600 border-green-100'
                  }`}
                >
                  {red.status}
                </span>
              </div>

              <h4 className="text-xl font-bold font-headline text-on-surface mb-1">
                {red.reward?.name}
              </h4>
              <p className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest mb-8">
                Claimed {new Date(red.created_at).toLocaleDateString('en-AU')}
              </p>

              <div className="bg-[#FBFCF6] border-2 border-dashed border-[#E5E7D9] rounded-2xl p-5 flex flex-col items-center justify-center group-hover:border-primary/30 transition-colors">
                <span className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em] mb-2">
                  Voucher Code
                </span>
                <span className="text-2xl font-black font-headline text-primary tracking-widest selection:bg-primary selection:text-white uppercase">
                  {red.voucher_code}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[#426500]/40">
                <span className="material-symbols-outlined text-sm">info</span>
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                  Show this in-store
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderRewardDetails = () => {
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
                  className={`w-full md:w-auto font-bold py-4 px-14 text-sm tracking-[0.1em] rounded-full transition-all shadow-xl uppercase ${
                    isLimitReached || isSoldOut
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

  const renderEditAccount = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in pb-12 pt-2">
      {/* Left Panel */}
      <div className="col-span-1 flex flex-col h-full">
        <div className="bg-[#fcfdf9] rounded-[1.5rem] p-6 shadow-sm border border-outline-variant/30 flex-grow">
          {/* Profile Box */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-[#426500] flex flex-col justify-center items-center text-white text-3xl font-bold border-4 border-white shadow-sm">
              <span className="material-symbols-outlined text-[2.5rem]">person</span>
            </div>
            <div>
              <h3 className="font-bold text-[#426500] text-2xl font-headline tracking-tight">
                {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : 'Full Name'}
              </h3>
              <p className="text-[13px] font-bold text-on-surface-variant opacity-80">
                {user?.account_id ? `#${user.account_id}` : '#account_ID'}
              </p>
            </div>
          </div>

          {/* Nav selector */}
          <div className="bg-white border-2 border-[#e5e7e1] rounded-full px-5 py-3 flex items-center gap-3 text-[#426500] font-bold shadow-sm cursor-pointer shadow-black/5">
            <span className="material-symbols-outlined font-bold text-xl">account_circle</span>
            <span className="text-base text-[#4a6b10]">Personal Details</span>
          </div>
        </div>

        <div className="text-center pt-3 pb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-[#63665e] font-bold text-[13px] tracking-wide hover:underline hover:text-[#426500] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className="col-span-1 lg:col-span-2 bg-[#fcfdf9] rounded-[1.5rem] p-8 md:p-10 shadow-sm border border-outline-variant/30 flex flex-col h-full min-h-[460px]">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-[#426500] font-headline">Personal Details</h2>
          <span className="border-2 border-[#dbdfd2] bg-[#edf2e6] text-[#4a5440] font-extrabold text-[11px] tracking-widest px-4 py-1.5 rounded-full shadow-inner uppercase">
            {user?.role}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 flex-grow">
          {/* First Name */}
          <div className="col-span-1">
            <label className="block text-[14px] font-bold text-[#63665e] mb-2 ml-[2px]">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full bg-[#dcdcd8] border-none rounded-full px-5 py-3.5 focus:ring-2 focus:ring-[#426500]/40 transition-shadow text-[#555] font-semibold text-sm"
              />
              <span className="material-symbols-outlined absolute right-4 top-3.5 text-on-surface-variant/60 text-[20px] pointer-events-none">
                edit_square
              </span>
            </div>
          </div>

          {/* Last Name */}
          <div className="col-span-1">
            <label className="block text-[14px] font-bold text-[#63665e] mb-2 ml-[2px]">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full bg-[#dcdcd8] border-none rounded-full px-5 py-3.5 focus:ring-2 focus:ring-[#426500]/40 transition-shadow text-[#555] font-semibold text-sm"
              />
              <span className="material-symbols-outlined absolute right-4 top-3.5 text-on-surface-variant/60 text-[20px] pointer-events-none">
                edit_square
              </span>
            </div>
          </div>

          {/* Email Address */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-[14px] font-bold text-[#63665e] mb-2 ml-[2px]">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#dcdcd8] border-none rounded-full px-5 py-3.5 focus:ring-2 focus:ring-[#426500]/40 transition-shadow text-[#555] font-semibold text-sm"
              />
              <span className="material-symbols-outlined absolute right-4 top-3.5 text-on-surface-variant/60 text-[20px] pointer-events-none">
                edit_square
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="col-span-1">
            <label className="block text-[14px] font-bold text-[#63665e] mb-2 ml-[2px]">
              Phone Number(Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#dcdcd8] border-none rounded-full px-5 py-3.5 focus:ring-2 focus:ring-[#426500]/40 transition-shadow text-[#555] font-semibold text-sm"
              />
              <span className="material-symbols-outlined absolute right-4 top-3.5 text-on-surface-variant/60 text-[20px] pointer-events-none">
                edit_square
              </span>
            </div>
          </div>

          {/* D.O.B. */}
          <div className="col-span-1">
            <CustomDatePicker
              label="D.O.B. (Optional)"
              value={formData.date_of_birth}
              onChange={(val) => setFormData({ ...formData, date_of_birth: val })}
              placeholder="Select birthday"
              inputClassName="!bg-[#dcdcd8] !shadow-none !border-transparent hover:!border-[#426500]/20"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-10 pt-4">
          {saveStatus === 'success' && (
            <span className="text-[#426500] font-bold self-center mr-4 animate-fade-in text-sm">
              Profile updated successfully!
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="text-red-600 font-bold self-center mr-4 animate-fade-in text-sm text-center sm:text-right">
              Update failed.
              <br />
              Check required fields.
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full sm:w-auto bg-[#426500] text-white font-bold py-3 px-8 text-[15px] tracking-wide rounded-full shadow-md shadow-[#426500]/30 hover:bg-[#4a6b10] transition-colors hover:-translate-y-0.5 duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="bg-white border-2 border-[#e6e8e2] text-[#426500] font-bold py-2.5 px-8 text-[15px] tracking-wide rounded-full hover:bg-[#f4f5f0] transition-colors shadow-sm shadow-black/5 hover:-translate-y-0.5 duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#EBECE4] font-body text-on-surface selection:bg-[#c7fc79] selection:text-[#304c00]">
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
        {/* Mobile Header (Sticky) */}
        <div className="md:hidden bg-[#EBECE4] border-b border-outline-variant/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <h1
              onClick={() => setActiveTab('dashboard')}
              className="text-2xl font-headline font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity"
            >
              Kem Boi
            </h1>
          </div>

          <div
            onClick={() => setActiveTab('edit-account')}
            className="flex items-center gap-3 bg-white pr-4 pl-1 py-1 rounded-full border border-outline-variant/20 shadow-sm shadow-black/5 cursor-pointer active:scale-95 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[1.1rem]">person</span>
            </div>
            <div className="flex flex-col pr-1">
              <span className="text-[12px] font-bold text-primary leading-tight">
                {user?.first_name ? `${user.first_name}` : 'Member'}
              </span>
              <span className="text-[9px] text-on-surface-variant/60 font-bold uppercase leading-tight tracking-tighter">
                Member
              </span>
            </div>
          </div>
        </div>

        {renderHeader()}

        <main className="mt-4 pb-24 md:pb-0">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'rewards' && renderRewards()}
          {activeTab === 'reward-details' && renderRewardDetails()}
          {activeTab === 'vouchers' && renderMyVouchers()}
          {activeTab === 'edit-account' && renderEditAccount()}
        </main>

        {renderBottomNav()}
      </div>

      <ModernConfirm
        isOpen={confirmData.isOpen}
        title="Redeem Points?"
        message={confirmData.message}
        confirmText="Yes, Redeem Now"
        cancelText="Maybe Later"
        onConfirm={() => executeClaimReward(confirmData.reward)}
        onCancel={() => setConfirmData({ isOpen: false, reward: null })}
      />
    </div>
  )
}

export default FamilyBonusDashboard
