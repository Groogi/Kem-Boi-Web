import React from 'react'
import { CustomDatePicker } from '../Common/SharedUI'

function DashboardEditAccount({ user, formData, setFormData, saveStatus, loading, handleSave, setActiveTab }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in pb-12 pt-2">
      <div className="col-span-1 flex flex-col h-full">
        <div className="bg-[#fcfdf9] rounded-[1.5rem] p-6 shadow-sm border border-outline-variant/30 flex-grow">
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

      <div className="col-span-1 lg:col-span-2 bg-[#fcfdf9] rounded-[1.5rem] p-8 md:p-10 shadow-sm border border-outline-variant/30 flex flex-col h-full min-h-[460px]">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-[#426500] font-headline">Personal Details</h2>
          <span className="border-2 border-[#dbdfd2] bg-[#edf2e6] text-[#4a5440] font-extrabold text-[11px] tracking-widest px-4 py-1.5 rounded-full shadow-inner uppercase">
            {user?.role}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 flex-grow">
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
}

export default DashboardEditAccount
