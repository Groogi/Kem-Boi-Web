import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { updateProfile } from '../api/auth'
import { ModernConfirm } from '../components/Common/SharedUI'

import DashboardHeader from '../components/FamilyDashboard/DashboardHeader'
import DashboardBottomNav from '../components/FamilyDashboard/DashboardBottomNav'
import DashboardOverview from '../components/FamilyDashboard/DashboardOverview'
import DashboardRewards from '../components/FamilyDashboard/DashboardRewards'
import DashboardVouchers from '../components/FamilyDashboard/DashboardVouchers'
import DashboardRewardDetails from '../components/FamilyDashboard/DashboardRewardDetails'
import DashboardEditAccount from '../components/FamilyDashboard/DashboardEditAccount'
import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from '../api/fetcher'
import { API_BASE } from '../api/config'

const APP_NAME = 'Kemboi'

function FamilyBonusDashboard() {
  const { user, token, updateUser, logout, refreshProfile } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  // View state: 'dashboard', 'rewards', 'reward-details', 'edit-account'
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('userActiveTab') || 'dashboard')
  
  useEffect(() => {
    localStorage.setItem('userActiveTab', activeTab)
  }, [activeTab])
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [errors, setErrors] = useState({})
  // Use SWR for optimized data fetching and caching
  const { data: rewardsData, isLoading: rewardsLoading, mutate: mutateRewards } = useSWR(token ? ['/api/rewards', token] : null, fetcher)
  const { data: redemptionsData, isLoading: redemptionsLoading, mutate: mutateRedemptions } = useSWR(token ? ['/api/my_redemptions', token] : null, fetcher)
  const { data: profileData, isLoading: profileLoading, mutate: mutateProfile } = useSWR(token ? ['/api/profile', token] : null, fetcher)
  const [confirmData, setConfirmData] = useState({ isOpen: false, reward: null })
  const [selectedReward, setSelectedReward] = useState(null)

  const rewards = rewardsData || []
  const myRedemptions = redemptionsData || []
  const displayUser = profileData || user


  const refreshAllData = async () => {
    setLoading(true)
    await Promise.all([mutateProfile(), mutateRewards(), mutateRedemptions()])
    setLoading(false)
  }

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

    if ((displayUser?.points_balance || 0) < reward.point_cost) {
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
      const res = await fetch(`${API_BASE}/rewards/${reward.id}/claim`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        showToast(`Success! Your code is: ${data.redemption.voucher_code}`, 'success')
        updateUser(data.user || { ...displayUser, points_balance: data.point_balance })
        setActiveTab('vouchers')
        mutateProfile()
        mutateRedemptions()
      } else {
        showToast(data.error || 'Failed to claim reward', 'error')
      }
    } catch {
      showToast('Network error', 'error')
    }
  }

  useEffect(() => {
    if (token) {
      mutateProfile()
      mutateRewards()
      mutateRedemptions()
    }
  }, [token, mutateProfile, mutateRewards, mutateRedemptions])

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

  const status = getStatusBadge(displayUser?.points_balance || 0)

  // Form state - using displayUser to initialize
  const [formData, setFormData] = useState({
    first_name: displayUser?.first_name || '',
    last_name: displayUser?.last_name || '',
    email: displayUser?.email || '',
    phone: displayUser?.phone || '',
    date_of_birth: displayUser?.date_of_birth || '',
  })

  // Keep form in sync when displayUser loads for the first time
  useEffect(() => {
    if (displayUser) {
      setFormData({
        first_name: displayUser.first_name || '',
        last_name: displayUser.last_name || '',
        email: displayUser.email || '',
        phone: displayUser.phone || '',
        date_of_birth: displayUser.date_of_birth || '',
      })
    }
  }, [displayUser])

  if (!displayUser && (profileLoading || rewardsLoading)) {
    return (
      <div className="min-h-screen bg-[#EBECE4] flex items-center justify-center font-headline font-bold text-primary">
        <div className="flex flex-col items-center gap-4">
           <span className="material-symbols-outlined text-5xl animate-spin">refresh</span>
           <p className="text-xl">Loading your avocado goodness...</p>
        </div>
      </div>
    )
  }

  // Punch Card Logic: 1 punch per 100 points, 5 punches = reward
  const POINTS_PER_PUNCH = 100
  const totalPunches = 5
  const currentPunches = Math.min(totalPunches, Math.floor((displayUser?.points_balance || 0) / POINTS_PER_PUNCH))
  const moreToGo = totalPunches - currentPunches
  const isRewardReady = (displayUser?.points_balance || 0) >= (totalPunches * POINTS_PER_PUNCH)

  const handleSave = async () => {
    const newErrors = {}
    const nameRegex = /^[a-zA-Z\s-]+$/
    
    if (!formData.first_name || !nameRegex.test(formData.first_name)) newErrors.first_name = true
    if (!formData.last_name || !nameRegex.test(formData.last_name)) newErrors.last_name = true
    if (!formData.email || !formData.email.includes('@')) newErrors.email = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setSaveStatus('error')
      showToast('Please correct the highlighted fields.', 'error')
      return
    }

    setLoading(true)
    setSaveStatus('')
    setErrors({})
    try {
      const normalizedData = {
        ...formData,
        first_name: formData.first_name.trim().toLowerCase(),
        last_name: formData.last_name.trim().toLowerCase(),
        email: formData.email.trim().toLowerCase(),
      }
      const updatedUser = await updateProfile(normalizedData, token)
      updateUser(updatedUser)
      mutateProfile(updatedUser) 
      setSaveStatus('success')
      showToast('Profile updated successfully!', 'success')
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (err) {
      console.error('Profile update failed:', err)
      setSaveStatus('error')
      showToast('Update failed. Please check your data.', 'error')
    } finally {
      setLoading(false)
    }
  }

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

          <div className="flex items-center gap-2">
            <div
              onClick={() => setActiveTab('edit-account')}
              className="flex items-center gap-2 md:gap-3 bg-[#FBFBF5] pr-3 md:pr-4 pl-1 py-1 rounded-full border border-outline-variant/20 shadow-sm shadow-black/5 cursor-pointer active:scale-95 transition-all"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[1rem] md:text-[1.1rem]">person</span>
              </div>
              <div className="flex flex-col pr-1">
                <span className="text-[11px] md:text-[12px] font-bold text-primary leading-tight capitalize">
                  {displayUser?.first_name ? `${displayUser.first_name}` : 'Member'}
                </span>
                <span className="text-[8px] md:text-[9px] text-on-surface-variant/60 font-bold uppercase leading-tight tracking-tighter">
                  Member
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="w-10 h-10 rounded-full bg-[#FBFBF5] flex items-center justify-center text-red-500 border border-outline-variant/20 shadow-sm hover:bg-red-50 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[1.1rem] ml-1">logout</span>
            </button>
          </div>
        </div>

        <DashboardHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleTabClick={handleTabClick}
        />

        <main className="mt-4 pb-24 md:pb-0">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              user={user}
              status={status}
              moreToGo={moreToGo}
              currentPunches={currentPunches}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === 'rewards' && (
            <DashboardRewards
              rewards={rewards}
              myRedemptions={myRedemptions}
              handleClaimReward={handleClaimReward}
              setSelectedReward={setSelectedReward}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === 'reward-details' && (
            <DashboardRewardDetails
              selectedReward={selectedReward}
              setActiveTab={setActiveTab}
              user={user}
              myRedemptions={myRedemptions}
              handleClaimReward={handleClaimReward}
            />
          )}
          {activeTab === 'vouchers' && (
            <DashboardVouchers myRedemptions={myRedemptions} />
          )}
          {activeTab === 'edit-account' && (
            <DashboardEditAccount
              user={user}
              formData={formData}
              setFormData={setFormData}
              saveStatus={saveStatus}
              loading={loading}
              handleSave={handleSave}
              setActiveTab={setActiveTab}
            />
          )}
        </main>

        <DashboardBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleTabClick={handleTabClick}
        />
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
