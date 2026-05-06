import { useState } from 'react'
import { ModernConfirm } from '../Common/SharedUI'
import { useToast } from '../../context/ToastContext'

function LocationEditor({ location, onSave, onCancel, onDelete, loading }) {
  const { showToast } = useToast()
  const [data, setData] = useState(
    location || {
      name: '',
      address_line_1: '',
      address_line_2: '',
      suburb: '',
      state: '',
      postcode: '',
      map_url: '',
      active: true,
    }
  )
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSave = () => {
    // Check mandatory fields
    if (!data.name?.trim()) {
      showToast('Store name is required', 'error')
      return
    }
    if (!data.address_line_1?.trim()) {
      showToast('Street address is required', 'error')
      return
    }
    if (!data.suburb?.trim()) {
      showToast('Suburb is required', 'error')
      return
    }
    if (!data.state?.trim()) {
      showToast('State is required', 'error')
      return
    }
    if (!data.postcode?.trim()) {
      showToast('Postcode is required', 'error')
      return
    }

    // map_url is optional, so we proceed
    onSave(data)
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-headline font-bold text-primary capitalize">Store Location</h2>
        <div className="flex items-center gap-3 bg-[#EEF4E4] px-6 py-2 rounded-full border border-white">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${data.active ? 'text-primary' : 'text-on-surface-variant/60'}`}
          >
            {data.active ? 'Active' : 'Inactive'}
          </span>
          <div
            onClick={() => setData({ ...data, active: !data.active })}
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors shadow-inner ${data.active ? 'bg-primary' : 'bg-[#D1D3C8]'}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${data.active ? 'left-7' : 'left-1'}`}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-[#EEF4E4] rounded-[2.5rem] p-10 md:p-12 shadow-sm border border-white/40">
        <h3 className="text-2xl font-bold font-headline text-[#4A6B10] mb-8">
          {data.id ? 'Edit Store' : 'Add New Store'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Store Name</label>
              <div className="relative group">
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="e.g. Flagship Stall"
                  className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
                <div className="absolute right-5 top-[10px] flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
                  <span className="material-symbols-outlined text-[18px]">edit_square</span>
                  <span className="text-[9px] font-bold uppercase mt-0.5 tracking-wider">Edit</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">
                Street Address
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={data.address_line_1}
                  onChange={(e) => setData({ ...data, address_line_1: e.target.value })}
                  placeholder="123 Avocado St"
                  className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
                <div className="absolute right-5 top-[10px] flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
                  <span className="material-symbols-outlined text-[18px]">edit_square</span>
                  <span className="text-[9px] font-bold uppercase mt-0.5 tracking-wider">Edit</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">
                Street Address 2 (Optional)
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={data.address_line_2}
                  onChange={(e) => setData({ ...data, address_line_2: e.target.value })}
                  placeholder="e.g. Unit 4 or Level 2"
                  className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Suburb</label>
                <input
                  type="text"
                  value={data.suburb}
                  onChange={(e) => setData({ ...data, suburb: e.target.value })}
                  className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">State</label>
                <input
                  type="text"
                  value={data.state}
                  onChange={(e) => setData({ ...data, state: e.target.value })}
                  className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Postcode</label>
              <input
                type="text"
                value={data.postcode}
                onChange={(e) => setData({ ...data, postcode: e.target.value })}
                className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">
                Google Maps URL (Optional)
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={data.map_url}
                  onChange={(e) => setData({ ...data, map_url: e.target.value })}
                  placeholder="https://goo.gl/maps/..."
                  className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
                <div className="absolute right-5 top-[10px] flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
                  <span className="material-symbols-outlined text-[18px]">map</span>
                  <span className="text-[9px] font-bold uppercase mt-0.5 tracking-wider">Link</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-[10px] text-on-surface-variant/60 font-medium px-2 leading-relaxed italic">
                Note: For MVP, coordinate-based mapping is automatic. Ensure the address is accurate
                for navigation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12">
          <div className="w-full sm:w-auto">
            {data.id && (
              <button
                onClick={() => setShowConfirm(true)}
                className="w-full sm:w-auto bg-red-50 text-red-600 font-bold py-3.5 px-8 text-sm tracking-widest rounded-full border border-red-100 hover:bg-red-100 transition-all uppercase"
              >
                Delete Store
              </button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full sm:w-auto bg-[#426500] text-white font-bold py-3.5 px-14 text-sm tracking-widest rounded-full shadow-md hover:bg-[#4a6b10] disabled:opacity-50 transition-all uppercase"
            >
              {loading ? 'Saving...' : data.id ? 'Update Store' : 'Save Store'}
            </button>
            <button
              onClick={onCancel}
              className="w-full sm:w-auto bg-white border-2 border-[#D1D3C8] text-on-surface-variant/80 font-bold py-3.5 px-14 text-sm tracking-widest rounded-full hover:bg-surface-container-highest/20 transition-all uppercase"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <ModernConfirm
        isOpen={showConfirm}
        onConfirm={() => {
          setShowConfirm(false)
          onDelete(data.id)
        }}
        onCancel={() => setShowConfirm(false)}
        title="Delete Store?"
        message="This will permanently remove this location from the map. Customers will no longer be able to select it."
        confirmText="Yes, Delete it"
        cancelText="Keep Store"
        variant="danger"
      />
    </div>
  )
}

export default LocationEditor
