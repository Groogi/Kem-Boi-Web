import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { CustomDatePicker, ModernConfirm } from '../Common/SharedUI'
import { API_BASE } from '../../api/config'

function RewardsManager({ onRewardsChange }) {
  const { token } = useAuth()
  const { showToast } = useToast()
  const [rewards, setRewards] = useState([])
  const [editingReward, setEditingReward] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showNewReward, setShowNewReward] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false)
  const [rewardToDelete, setRewardToDelete] = useState(null)
  const [pendingClaimsCount, setPendingClaimsCount] = useState(0)
  const [errors, setErrors] = useState({})

  const [rewardData, setRewardData] = useState({
    name: '',
    description: '',
    point_cost: 0,
    active: true,
    start_date: '',
    end_date: '',
    limit_per_user: 0,
    total_limit: 0,
    reward_type: 'standard',
    never_expires: false,
  })

  const fetchRewards = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/rewards`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setRewards(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    }
  }, [token])

  useEffect(() => {
    fetchRewards()
  }, [token])


  const handleSaveReward = () => {
    if (!rewardData.name.trim()) {
      setErrors({ name: true })
      showToast('Reward name is required', 'error')
      return
    }
    setErrors({})
    setShowSaveConfirm(true)
  }

  const executeSave = async () => {
    setLoading(true)
    setShowSaveConfirm(false)
    const url = editingReward ? `${API_BASE}/rewards/${editingReward.id}` : `${API_BASE}/rewards`
    const method = editingReward ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reward: rewardData }),
      })

      if (res.ok) {
        showToast(editingReward ? 'Reward updated!' : 'Reward created!', 'success')
        fetchRewards()
        if (onRewardsChange) onRewardsChange()
        forceCancel() // Close directly after success
      } else {
        const errData = await res.json()
        const errMsg = errData
          ? Object.entries(errData)
              .map(([k, v]) => `${k} ${v}`)
              .join(', ')
          : 'Operation failed'
        showToast(errMsg, 'error')
      }
    } catch {
      showToast('Network error occurred', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReward = (id) => {
    const r = rewards.find(x => x.id === id)
    if (r) {
      const pending = (r.redemptions_count || 0) - (r.fulfilled_count || 0)
      setPendingClaimsCount(pending)
    } else {
      setPendingClaimsCount(0)
    }
    setRewardToDelete(id)
    setShowConfirm(true)
  }

  const confirmDelete = async () => {
    if (!rewardToDelete) return

    try {
      const res = await fetch(`${API_BASE}/rewards/${rewardToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        showToast('Reward deleted', 'info')
        fetchRewards()
        if (onRewardsChange) onRewardsChange()
        forceCancel() 
      }
    } catch (err) {
      console.error(err)
      showToast('Failed to delete', 'error')
    } finally {
      setShowConfirm(false)
      setRewardToDelete(null)
      setPendingClaimsCount(0)
    }
  }

  const hasChanges = () => {
    const original = editingReward || {
      name: '',
      description: '',
      point_cost: 0,
      active: true,
      start_date: '',
      end_date: '',
      limit_per_user: 0,
      total_limit: 0,
      reward_type: 'standard',
      never_expires: false,
    }

    return (
      rewardData.name !== (original.name || '') ||
      rewardData.description !== (original.description || '') ||
      rewardData.point_cost !== (original.point_cost || 0) ||
      rewardData.active !== original.active ||
      rewardData.start_date !== (original.start_date || '') ||
      rewardData.end_date !== (original.end_date || '') ||
      rewardData.limit_per_user !== (original.limit_per_user || 0) ||
      rewardData.total_limit !== (original.total_limit || 0) ||
      rewardData.reward_type !== (original.reward_type || 'standard') ||
      rewardData.never_expires !== (original.never_expires || false)
    )
  }

  const cancelEdit = () => {
    if (hasChanges()) {
      setShowUnsavedWarning(true)
      return
    }
    forceCancel()
  }

  const forceCancel = () => {
    setEditingReward(null)
    setShowNewReward(false)
    setShowUnsavedWarning(false)
    setShowSaveConfirm(false)
    setRewardData({
      name: '',
      description: '',
      point_cost: 0,
      active: true,
      start_date: '',
      end_date: '',
      limit_per_user: 0,
      total_limit: 0,
      reward_type: 'standard',
      never_expires: false,
    })
    setErrors({})
  }

  const startEdit = (reward) => {
    setEditingReward(reward)
    setRewardData({
      name: reward.name || '',
      description: reward.description || '',
      point_cost: reward.point_cost || 0,
      active: reward.active,
      start_date: reward.start_date || '',
      end_date: reward.end_date || '',
      limit_per_user: reward.limit_per_user || 0,
      total_limit: reward.total_limit || 0,
      reward_type: reward.reward_type || 'standard',
      never_expires: reward.never_expires || false,
    })
    setShowNewReward(true)
  }

  return (
    <div className="animate-fade-in space-y-10">
      {showNewReward ? (
        <div className="bg-[#EEF4E4] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-white/40 max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-bold font-headline text-[#4A6B10] mb-8">
            {editingReward ? 'Edit Reward' : 'Create New Reward'}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">
                Reward Name:
              </label>
              <input
                type="text"
                value={rewardData.name}
                onChange={(e) => {
                  setRewardData({ ...rewardData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: false })
                }}
                placeholder="e.g. Free Avocado Smoothie"
                className={`w-full bg-[#FBFBF5] border-none rounded-full px-6 py-4 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none ${errors.name ? 'ring-2 ring-red-500/50' : ''}`}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-4 xl:gap-8">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold text-[#4A6B10] mb-2 px-1">
                  Point Cost:
                </label>
                <input
                  type="number"
                  value={rewardData.point_cost}
                  onChange={(e) =>
                    setRewardData({ ...rewardData, point_cost: parseInt(e.target.value) || 0 })
                  }
                  className="w-full bg-[#FBFBF5] border-none rounded-[1.2rem] px-5 py-4 shadow-inner font-bold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold text-[#4A6B10] mb-2 px-1 sm:text-center">
                  Limit/User:
                </label>
                <input
                  type="number"
                  value={rewardData.limit_per_user}
                  onChange={(e) =>
                    setRewardData({ ...rewardData, limit_per_user: parseInt(e.target.value) || 0 })
                  }
                  placeholder="0 = ∞"
                  className="w-full bg-[#FBFBF5] border-none rounded-[1.2rem] px-5 py-4 shadow-inner font-bold sm:text-center text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold text-[#4A6B10] mb-2 px-1 sm:text-center">
                  Stock Limit:
                </label>
                <input
                  type="number"
                  value={rewardData.total_limit}
                  onChange={(e) =>
                    setRewardData({ ...rewardData, total_limit: parseInt(e.target.value) || 0 })
                  }
                  placeholder="0 = ∞"
                  className="w-full bg-[#FBFBF5] border-none rounded-[1.2rem] px-5 py-4 shadow-inner font-black sm:text-center text-[#4A6B10] focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>

              <div className="col-span-1 sm:col-span-1">
                <label className="block text-xs font-bold text-[#4A6B10] mb-2 px-1 sm:text-center whitespace-nowrap">
                  Active:
                </label>
                <div 
                  onClick={() => setRewardData({ ...rewardData, active: !rewardData.active })}
                  className="w-full h-[58px] bg-[#FBFBF5] rounded-[1.2rem] flex items-center justify-center cursor-pointer shadow-inner hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-6 rounded-full relative transition-all duration-500 shadow-inner ${rewardData.active ? 'bg-[#4A6B10]' : 'bg-[#D1D3C8]'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-500 transform ${rewardData.active ? 'left-6 scale-110' : 'left-0.5 scale-90'}`}></div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-1">
                <label className="block text-xs font-bold text-[#4A6B10] mb-2 px-1 sm:text-center whitespace-nowrap">
                  Referral:
                </label>
                <div 
                  onClick={() =>
                    setRewardData({
                      ...rewardData,
                      reward_type: rewardData.reward_type === 'referral' ? 'standard' : 'referral',
                    })
                  }
                  className="w-full h-[58px] bg-[#FBFBF5] rounded-[1.2rem] flex items-center justify-center cursor-pointer shadow-inner hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-6 rounded-full relative transition-all duration-500 shadow-inner ${rewardData.reward_type === 'referral' ? 'bg-[#4A6B10]' : 'bg-[#D1D3C8]'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-500 transform ${rewardData.reward_type === 'referral' ? 'left-6 scale-110' : 'left-0.5 scale-90'}`}></div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-1">
                <label className="block text-xs font-bold text-[#4A6B10] mb-2 px-1 sm:text-center whitespace-nowrap">
                  Never Expires:
                </label>
                <div 
                  onClick={() => setRewardData({ ...rewardData, never_expires: !rewardData.never_expires })}
                  className="w-full h-[58px] bg-[#FBFBF5] rounded-[1.2rem] flex items-center justify-center cursor-pointer shadow-inner hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-6 rounded-full relative transition-all duration-500 shadow-inner ${rewardData.never_expires ? 'bg-[#4A6B10]' : 'bg-[#D1D3C8]'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-500 transform ${rewardData.never_expires ? 'left-6 scale-110' : 'left-0.5 scale-90'}`}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
              <div className="w-full">
                <CustomDatePicker
                  label="Start Date"
                  value={rewardData.start_date}
                  onChange={(val) => setRewardData({ ...rewardData, start_date: val })}
                  placeholder="Set start date"
                />
              </div>
              <div className={`w-full transition-opacity duration-300 ${rewardData.never_expires ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <CustomDatePicker
                  label="End Date"
                  value={rewardData.end_date}
                  onChange={(val) => setRewardData({ ...rewardData, end_date: val })}
                  placeholder={rewardData.never_expires ? "Permanent Reward" : "Set end date"}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">
                Description:
              </label>
              <textarea
                value={rewardData.description}
                onChange={(e) => setRewardData({ ...rewardData, description: e.target.value })}
                placeholder="Short description for the customer..."
                className="w-full bg-[#FBFBF5] border-none rounded-[1.5rem] px-6 py-5 shadow-inner min-h-[120px] resize-none font-medium text-sm leading-relaxed text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-10">
            <div className="w-full sm:w-auto text-center sm:text-left">
              {editingReward && (
                <button
                  onClick={() => handleDeleteReward(editingReward.id)}
                  className="text-red-500 font-bold text-[11px] tracking-widest uppercase hover:underline"
                >
                  Delete Permanently
                </button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={handleSaveReward}
                disabled={loading}
                className="w-full sm:w-auto bg-[#426500] text-white font-bold py-3.5 px-12 rounded-full shadow-md hover:bg-[#4a6b10] transition-all disabled:opacity-50 uppercase text-xs tracking-widest"
              >
                {loading ? 'SAVING...' : editingReward ? 'Update' : 'Save Reward'}
              </button>
              <button
                onClick={cancelEdit}
                className="w-full sm:w-auto bg-white border-2 border-[#D1D3C8] text-on-surface-variant/80 font-bold py-3.5 px-12 rounded-full hover:bg-gray-50 transition-all uppercase text-xs tracking-widest"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <h3 className="text-3xl font-bold font-headline text-[#4A6B10]">Available Rewards</h3>
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <button
                onClick={fetchRewards}
                disabled={loading}
                className="w-12 h-12 bg-white text-[#4A6B10] flex items-center justify-center rounded-full shadow-md border border-[#EEF4E4] hover:bg-[#EEF4E4] transition-all active:scale-90"
                title="Refresh statistics"
              >
                <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>
                  refresh
                </span>
              </button>
              <button
                onClick={() => setShowNewReward(true)}
                className="flex-grow sm:flex-grow-0 bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm tracking-widest uppercase"
              >
                <span className="material-symbols-outlined">add</span>
                Add Reward
              </button>
            </div>
          </div>

          {rewards.length === 0 ? (
            <div className="bg-[#EEF4E4] rounded-[2rem] p-12 text-center border border-dashed border-[#4A6B10]/20">
              <p className="text-on-surface-variant font-medium">
                No rewards created yet. Click "Add Reward" to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  onClick={() => startEdit(reward)}
                  className="bg-[#EEF4E4] rounded-[2rem] p-6 shadow-sm border border-white/20 flex flex-col group hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <h4 className="text-xl font-bold font-headline text-primary leading-tight">
                      {reward.name}
                    </h4>
                    <span className="bg-white px-4 py-1.5 rounded-full text-[10px] font-bold text-primary shadow-sm border border-primary/5 whitespace-nowrap h-fit">
                      {reward.point_cost} pts
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant flex-grow mb-10 leading-relaxed pr-4">
                    {reward.description}
                  </p>

                  {/* Performance Stats */}
                  <div className="mb-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/60 rounded-[1.5rem] p-4 text-center border border-white/60 shadow-sm">
                      <p className="text-[9px] font-black text-primary/40 uppercase tracking-widest mb-1.5 leading-none">
                        Claimed
                      </p>
                      <p className="text-xl font-bold text-primary leading-none">
                        {reward.redemptions_count || 0}
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-[1.5rem] p-4 text-center border border-white/60 shadow-sm">
                      <p className="text-[9px] font-black text-primary/40 uppercase tracking-widest mb-1.5 leading-none">
                        Used
                      </p>
                      <p className="text-xl font-bold text-primary leading-none">
                        {reward.fulfilled_count || 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-primary/10">
                    <span
                      className={`text-[9px] font-black uppercase tracking-[0.2em] ${reward.active ? 'text-primary' : 'text-red-400'}`}
                    >
                      {reward.active ? '● Live' : '○ Draft'}
                    </span>
                    <button
                      onClick={() => startEdit(reward)}
                      className="text-primary hover:underline text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Edit <span className="material-symbols-outlined text-sm">east</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <ModernConfirm
        isOpen={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirm(false)
          setPendingClaimsCount(0)
        }}
        title="Delete Reward?"
        message={
          pendingClaimsCount > 0 
            ? `WARNING: ${pendingClaimsCount} customer(s) have claimed this reward but haven't used it yet. If you delete it, their vouchers will vanish and their points will NOT be refunded automatically. Are you sure?`
            : "This will permanently remove this reward from the system. It cannot be undone."
        }
        confirmText="Yes, Delete it"
        cancelText="Keep Reward"
        variant="danger"
      />

      <ModernConfirm
        isOpen={showSaveConfirm}
        onConfirm={executeSave}
        onCancel={() => setShowSaveConfirm(false)}
        title={editingReward ? "Update Reward?" : "Save New Reward?"}
        message={editingReward 
          ? "Are you sure you want to update this reward with your latest changes?" 
          : "Are you sure you want to create and publish this new reward?"}
        confirmText={editingReward ? "Yes, Update" : "Yes, Save"}
        cancelText="Cancel"
        variant="primary"
      />

      <ModernConfirm
        isOpen={showUnsavedWarning}
        onConfirm={forceCancel}
        onCancel={() => setShowUnsavedWarning(false)}
        title="Unsaved Changes"
        message="You have unsaved changes that will be lost. Are you sure you want to discard them?"
        confirmText="Discard Changes"
        cancelText="Keep Editing"
        variant="warning"
      />
    </div>
  )
}

export default RewardsManager
