import React from 'react'

function DeleteUserModal({
  selectedUser,
  deleteConfirmText,
  setDeleteConfirmText,
  handleDeleteUser,
  loading,
  setShowDeleteModal,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/40 animate-fade-in px-6">
      <div className="bg-[#FBFBF5] rounded-[3rem] p-10 md:p-14 max-w-lg w-full shadow-2xl border border-white/20 relative animate-scale-in">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
          </div>
          <h3 className="text-[#1a2a00] text-3xl font-bold font-headline text-center mb-3">
            Confirm Deletion
          </h3>
          <p className="text-on-surface-variant/70 text-center font-medium leading-relaxed max-w-[280px]">
            You are about to permanently remove{' '}
            <span className="text-red-600 font-bold">
              {selectedUser?.first_name} {selectedUser?.last_name}
            </span>
            . This cannot be undone.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] text-center">
              Type 'DELETE' to confirm
            </label>
            <input
              type="text"
              value={deleteConfirmText}
              placeholder="D E L E T E"
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full bg-[#f0f1e8] border-none rounded-2xl px-5 py-4 shadow-inner text-center font-black tracking-[0.3em] text-red-600 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleDeleteUser}
              disabled={deleteConfirmText !== 'DELETE' || loading}
              className="flex-1 bg-red-600 text-white font-bold py-4 rounded-full shadow-lg shadow-red-600/20 disabled:opacity-20 disabled:grayscale transition-all active:scale-95 text-sm tracking-widest uppercase"
            >
              {loading ? 'Deleting...' : 'Permanently Delete'}
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(false)
                setDeleteConfirmText('')
              }}
              className="flex-1 bg-white border-2 border-[#D1D3C8] text-on-surface-variant/60 font-bold py-4 rounded-full transition-all hover:bg-surface-container-highest/20 text-sm tracking-widest uppercase"
            >
              Keep User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteUserModal
