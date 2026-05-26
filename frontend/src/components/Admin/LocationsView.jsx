import React from 'react'

function LocationsView({ locations, setEditingLocation, setLocationMode }) {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-2">
        <div>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary capitalize">
            Store Locations
          </h2>
          <p className="text-on-surface-variant font-medium opacity-60">
            Manage your active stalls and stores.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingLocation(null)
            setLocationMode('editor')
          }}
          className="w-full sm:w-auto bg-[#426500] text-white font-bold py-3.5 px-8 text-sm tracking-widest rounded-full shadow-md hover:bg-[#4a6b10] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add_location</span>
          ADD STORE
        </button>
      </div>

      <div className="bg-[#fcfdf9] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-outline-variant/30">
        <div className="bg-white rounded-[1.2rem] md:rounded-[2rem] overflow-x-auto border border-primary/5 shadow-sm whitespace-nowrap lg:whitespace-normal">
          <table className="w-full text-left">
            <thead className="bg-[#F2F3EB]/30 border-b border-primary/5">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest">
                  Store Name
                </th>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest">
                  Suburb
                </th>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#426500]/5">
              {locations.length > 0 ? (
                locations.map((store, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-highest/10 transition-colors">
                    <td className="px-8 py-6 text-sm font-bold text-on-surface">{store.name}</td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant/70 italic">
                      {store.suburb}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-widest ${store.active ? 'text-[#4A6B10]' : 'text-on-surface-variant/40'}`}
                      >
                        {store.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => {
                          setEditingLocation(store)
                          setLocationMode('editor')
                        }}
                        className="bg-[#426500]/10 text-[#426500] font-bold text-[10px] tracking-widest px-4 py-1.5 rounded-full border border-[#426500]/20 hover:bg-[#426500] hover:text-white transition-all uppercase"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-10 text-center text-sm font-medium text-on-surface-variant/40 italic"
                  >
                    No stores found. List your first store to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LocationsView
