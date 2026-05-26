import React, { useState } from 'react'
import { ModernConfirm } from '../Common/SharedUI'

const UserDetailsView = ({
  selectedUser,
  setSelectedUser,
  status,
  manualPointsAmount,
  setManualPointsAmount,
  handleManualAddPoints,
  editUserForm,
  setEditUserForm,
  handleUpdateUser,
  setShowDeleteModal,
  setViewMode,
  loading,
  setLoading,
  rewards,
  token,
  showToast,
  fetchUserRedemptions,
  fetchUsers,
  fetchRewards,
  fetchRedemptions,
  onUpdate,
  onDelete,
  selectedUserRedemptions,
}) => {
  const [detailTab, setDetailTab] = useState('details') // details, points
  const [confirmFulfill, setConfirmFulfill] = useState({
    isOpen: false,
    reward: null,
    redemptionId: null,
  })

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex gap-6 mb-2">
        <button
          onClick={() => setDetailTab('details')}
          className={`text-xl font-bold font-headline transition-all ${detailTab === 'details' ? 'text-primary underline underline-offset-8 decoration-2' : 'text-on-surface-variant opacity-60'}`}
        >
          User Details
        </button>
        <button
          onClick={() => setDetailTab('points')}
          className={`text-xl font-bold font-headline transition-all ${detailTab === 'points' ? 'text-primary underline underline-offset-8 decoration-2' : 'text-on-surface-variant opacity-60'}`}
        >
          Points Dashboard
        </button>
      </div>

      <div className="bg-[#EEF4E4]/60 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-outline-variant/30 max-w-4xl min-h-[440px]">
        {detailTab === 'details' ? (
          <div className="space-y-6 md:space-y-10 max-w-lg animate-fade-in pt-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-4">
              <div className="flex-grow">
                <label className="block text-[11px] font-bold text-[#4A6B10] mb-2 px-1 uppercase tracking-widest">
                  First Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={editUserForm.first_name}
                    onChange={(e) =>
                      setEditUserForm({ ...editUserForm, first_name: e.target.value })
                    }
                    className="w-full bg-[#EBECE4] border-none rounded-full px-7 py-3.5 shadow-inner text-on-surface font-medium focus:ring-2 focus:ring-[#426500]/20 outline-none"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <label className="block text-[11px] font-bold text-[#4A6B10] mb-2 px-1 uppercase tracking-widest">
                  Last Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={editUserForm.last_name}
                    onChange={(e) =>
                      setEditUserForm({ ...editUserForm, last_name: e.target.value })
                    }
                    className="w-full bg-[#EBECE4] border-none rounded-full px-7 py-3.5 shadow-inner text-on-surface font-medium focus:ring-2 focus:ring-[#426500]/20 outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#4A6B10] mb-2 px-1 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={editUserForm.email}
                  onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                  className="w-full bg-[#EBECE4] border-none rounded-full px-7 py-3.5 shadow-inner text-on-surface font-medium focus:ring-2 focus:ring-[#426500]/20 outline-none"
                />
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={handleUpdateUser}
                disabled={loading}
                className="bg-[#426500] text-white font-bold py-3.5 px-12 rounded-full text-xs shadow-md shadow-[#426500]/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 tracking-widest"
              >
                {loading ? 'SAVING...' : 'SAVE CHANGES'}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <h4 className="text-3xl font-bold font-headline text-[#4A6B10]">
                {selectedUser?.first_name} {selectedUser?.last_name}
              </h4>
              <span
                className={`px-6 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] ${status.class}`}
              >
                {status.label}
              </span>
            </div>

            <div className="bg-[#F2F3EB]/60 rounded-full p-1.5 shadow-inner flex items-center border border-white max-w-md mb-8">
              <div className="bg-white rounded-full px-10 py-1.5 flex flex-col items-center flex-grow shadow-sm">
                <p className="text-[9px] font-bold text-[#4A6B10]/50 uppercase tracking-[0.2em] leading-none mb-1">
                  Points Balance:
                </p>
                <span className="text-2xl font-bold text-[#426500] font-headline">
                  {selectedUser?.points_balance || 0} pts
                </span>
              </div>
            </div>

            <div className="flex gap-4 max-w-lg mb-10">
              <div className="relative flex-grow">
                <input
                  type="number"
                  value={manualPointsAmount}
                  onChange={(e) => setManualPointsAmount(e.target.value)}
                  className="w-full bg-[#EBECE4] border-none rounded-full px-8 py-3.5 shadow-inner font-bold text-lg text-on-surface focus:ring-0"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
                  <span className="material-symbols-outlined text-[18px]">edit_square</span>
                  <span className="text-[8px] font-bold uppercase tracking-tighter">Edit</span>
                </div>
              </div>
              <button
                onClick={handleManualAddPoints}
                disabled={loading}
                className="bg-[#426500] text-white font-bold px-12 py-3.5 rounded-full text-sm shadow-md shadow-[#426500]/20 disabled:opacity-50 hover:bg-[#395800] transition-all active:scale-95"
              >
                {loading ? '...' : 'Add Points'}
              </button>
            </div>

            <div className="mt-12 space-y-10">
              {/* 1. Activated Rewards (Pending fulfillment) */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="material-symbols-outlined text-[#4A6B10]">
                    confirmation_number
                  </span>
                  <p className="text-[11px] font-black text-[#4A6B10] uppercase tracking-[0.2em]">
                    Ready to Use (Activated on App):
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedUserRedemptions.filter((r) => r.status === 'pending').length === 0 ? (
                    <p className="text-[12px] font-medium text-on-surface-variant/40 italic pl-1">
                      No pending vouchers for this user.
                    </p>
                  ) : (
                    selectedUserRedemptions
                      .filter((r) => r.status === 'pending')
                      .map((red) => (
                        <div
                          key={red.id}
                          className="bg-surface-container-highest/10 rounded-3xl p-5 shadow-sm border border-white flex justify-between items-center hover:bg-white transition-all"
                        >
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest mb-1">
                              Code: {red.voucher_code}
                            </span>
                            <span className="font-bold text-on-surface text-base leading-tight">
                              {red.reward?.name}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setConfirmFulfill({
                                isOpen: true,
                                reward: red.reward,
                                redemptionId: red.id,
                              })
                            }
                            className="bg-white border-2 border-[#426500] text-[#426500] font-bold py-2 px-6 rounded-full text-[10px] tracking-widest hover:bg-[#426500] hover:text-white transition-all shadow-sm whitespace-nowrap"
                          >
                            USE NOW
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* 2. Eligible Rewards (Based on current balance) */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="material-symbols-outlined text-[#4A6B10]">shopping_basket</span>
                  <p className="text-[11px] font-black text-[#4A6B10] uppercase tracking-[0.2em]">
                    Redeemable Right Now:
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rewards.filter((r) => {
                    const isActive = r.active && !r.archived
                    const hasPoints = r.point_cost <= (selectedUser?.points_balance || 0)

                    // Stock Limit check
                    const hasStock =
                      r.total_limit === 0 ||
                      r.total_limit === null ||
                      (r.redemptions_count || 0) < r.total_limit

                    // User Limit check
                    const redemptionsForThisReward = selectedUserRedemptions.filter(
                      (red) => (red.reward_id || red.reward?.id) === r.id
                    )
                    const underUserLimit =
                      r.limit_per_user === 0 ||
                      r.limit_per_user === null ||
                      redemptionsForThisReward.length < r.limit_per_user

                    return isActive && hasPoints && hasStock && underUserLimit
                  }).length === 0 ? (
                    <p className="text-[12px] font-medium text-on-surface-variant/40 italic pl-1">
                      User doesn't have enough points or has reached the limit for available
                      rewards.
                    </p>
                  ) : (
                    rewards
                      .filter((r) => {
                        const isActive = r.active && !r.archived
                        const hasPoints = r.point_cost <= (selectedUser?.points_balance || 0)
                        const hasStock =
                          r.total_limit === 0 ||
                          r.total_limit === null ||
                          (r.redemptions_count || 0) < r.total_limit
                        const redemptionsForThisReward = selectedUserRedemptions.filter(
                          (red) => (red.reward_id || red.reward?.id) === r.id
                        )
                        const underUserLimit =
                          r.limit_per_user === 0 ||
                          r.limit_per_user === null ||
                          redemptionsForThisReward.length < r.limit_per_user
                        return isActive && hasPoints && hasStock && underUserLimit
                      })
                      .map((r) => (
                        <div
                          key={r.id}
                          className="bg-surface-container-highest/10 rounded-3xl p-5 shadow-sm border border-white flex justify-between items-center hover:bg-white transition-all"
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                                {r.point_cost} PTS
                              </span>
                              {r.total_limit > 0 && (
                                <span className="text-[8px] font-bold bg-[#E2EAD3] text-[#4A6B10] px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                  {r.total_limit - (r.redemptions_count || 0)} Left
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-on-surface text-base leading-tight">
                              {r.name}
                            </span>
                          </div>
                          <button
                            onClick={() => setConfirmFulfill({ isOpen: true, reward: r })}
                            className="bg-white border-2 border-[#426500] text-[#426500] font-bold py-2 px-6 rounded-full text-[10px] tracking-widest hover:bg-[#426500] hover:text-white transition-all shadow-sm whitespace-nowrap"
                          >
                            CLAIM & USE
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-12 pb-2 px-2 sm:px-0">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full sm:w-auto bg-red-600 text-white font-bold py-3.5 px-12 text-[10px] tracking-[0.2em] rounded-full shadow-md shadow-red-600/10 hover:bg-red-700 transition-all active:scale-95 uppercase"
          >
            Delete Profile
          </button>
          <button
            onClick={() => setViewMode('list')}
            className="w-full sm:w-auto bg-white border-2 border-[#D1D3C8] text-on-surface-variant font-bold py-3.5 px-14 text-[10px] tracking-[0.2em] rounded-full hover:bg-surface-container-highest/20 transition-all uppercase"
          >
            Return to list
          </button>
        </div>

        {/* Note: ModernConfirm is in a different place, so we might need to import it if used, 
            but wait, it's used right here. So I should import ModernConfirm */}
      </div>
    </div>
  )
}

export default UserDetailsView
