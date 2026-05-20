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

function FamilyBonusDashboard() {
  const { user, token, updateUser, logout, refreshProfile } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

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
      console.error('Failed to fetch rewards:', err)
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
      console.error('Failed to fetch my redemptions:', err)
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
      console.error('Profile update failed:', err)
      setSaveStatus('error')
      showToast('Update failed. Please check your network.', 'error')
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
