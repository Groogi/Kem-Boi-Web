import React from 'react'

function AddUserView({ addUserForm, setAddUserForm, loading, handleCreateUser, setViewMode }) {
  return (
    <div className="bg-[#EEF4E4]/70 rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-14 max-w-4xl relative border border-white/40 shadow-sm">
      <div className="bg-white/60 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 space-y-8 md:space-y-10 border border-white/20">
        <div>
          <label className="block text-sm font-bold text-[#4A6B10] mb-3 px-1">Full Name</label>
          <div className="relative group">
            <input
              type="text"
              value={addUserForm.full_name}
              onChange={(e) => setAddUserForm({ ...addUserForm, full_name: e.target.value })}
              className="w-full bg-[#EBECE4] border-none rounded-full px-6 py-4 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
              <span className="material-symbols-outlined text-[18px]">edit_square</span>
              <span className="text-[9px] font-bold uppercase mt-0.5 tracking-wider">Edit</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#4A6B10] mb-3 px-1">Email Address</label>
          <div className="relative group">
            <input
              type="email"
              value={addUserForm.email}
              onChange={(e) => setAddUserForm({ ...addUserForm, email: e.target.value })}
              className="w-full bg-[#EBECE4] border-none rounded-full px-6 py-4 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
              <span className="material-symbols-outlined text-[18px]">edit_square</span>
              <span className="text-[9px] font-bold uppercase mt-0.5 tracking-wider">Edit</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#4A6B10] mb-3 px-1">Add Points</label>
          <div className="flex items-center gap-6">
            <div className="relative group w-48">
              <input
                type="number"
                value={addUserForm.points}
                onChange={(e) => setAddUserForm({ ...addUserForm, points: e.target.value })}
                className="w-full bg-[#EBECE4] border-none rounded-full px-6 py-4 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
                <span className="material-symbols-outlined text-[18px]">edit_square</span>
                <span className="text-[9px] font-bold uppercase mt-0.5 tracking-wider">Edit</span>
              </div>
            </div>
            <button className="bg-[#5c8b16] text-white font-bold py-3.5 px-8 text-sm tracking-wide rounded-full shadow-md hover:bg-[#4a6b10] transition-all">
              Add Points
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-16 pt-8 border-t border-on-surface-variant/10">
        <button
          onClick={handleCreateUser}
          disabled={loading}
          className="w-full sm:w-auto bg-[#426500] text-white font-bold py-3.5 px-8 text-xs tracking-widest rounded-full shadow-md hover:bg-[#4a6b10] transition-all disabled:opacity-50 uppercase"
        >
          {loading ? 'Sending...' : 'Send Invitation Email'}
        </button>
        <button
          onClick={() => setViewMode('list')}
          className="w-full sm:w-auto bg-white border-2 border-[#D1D3C8] text-on-surface-variant/80 font-bold py-[12px] px-10 text-xs tracking-widest rounded-full hover:bg-surface-container-highest/20 transition-all uppercase"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddUserView
