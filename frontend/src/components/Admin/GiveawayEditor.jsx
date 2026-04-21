import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { CustomDatePicker } from "../Common/SharedUI";

function GiveawayEditor({ giveaway, onSave, onCancel, onDelete, loading }) {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [data, setData] = useState(giveaway || {
    title: "",
    participation_conditions: "",
    start_date: "",
    end_date: "",
    active: false
  });
  
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      if (!data.id) return;
      setLoadingEntries(true);
      try {
        const res = await fetch(`/api/giveaways/${data.id}/entries`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const entriesData = await res.json();
          setEntries(entriesData);
        }
      } catch (err) {
        console.error("Failed to fetch entries", err);
      } finally {
        setLoadingEntries(false);
      }
    };
    fetchEntries();
  }, [data.id, token]);
  const filteredEntries = entries.filter(entry => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const fullName = `${entry.user?.first_name || ''} ${entry.user?.last_name || ''}`.toLowerCase();
    const email = (entry.user?.email || '').toLowerCase();
    const accountId = (entry.user?.account_id || entry.user?.id || '').toString().toLowerCase();
    
    return fullName.includes(term) || email.includes(term) || accountId.includes(term);
  });


  return (
    <div className="animate-fade-in space-y-8">
      <div className="bg-[#EEF4E4] rounded-[2.5rem] p-10 md:p-12 shadow-sm border border-white/40">
        <div className="flex justify-between items-center mb-8">
           <h3 className="text-3xl font-bold font-headline text-[#4A6B10]">{data.id ? 'Edit Giveaway' : 'New Giveaway'}</h3>
           <div className="flex items-center gap-3">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${data.active ? 'text-primary' : 'text-on-surface-variant/60'}`}>{data.active ? 'Active' : 'Inactive'}</span>
              <div 
                onClick={() => setData({...data, active: !data.active})}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors shadow-inner ${data.active ? 'bg-primary' : 'bg-[#D1D3C8]'}`}
              >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${data.active ? 'left-7' : 'left-1'}`}></div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 mb-12">
           <div className="space-y-6">
              <div>
                 <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Giveaway Title:</label>
                 <div className="relative group">
                    <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                    <div className="absolute right-5 top-2 flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
                      <span className="material-symbols-outlined text-[18px]">edit_square</span>
                      <span className="text-[9px] font-bold uppercase mt-0.5 tracking-wider">Edit</span>
                    </div>
                 </div>
              </div>
              <div>
                 <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Conditions:</label>
                 <div className="relative group">
                    <textarea value={data.participation_conditions} onChange={(e) => setData({...data, participation_conditions: e.target.value})} className="w-full bg-[#FBFBF5] border-none rounded-[1.5rem] px-6 py-5 shadow-inner min-h-[160px] resize-none font-medium text-sm leading-relaxed text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                    <div className="absolute right-5 bottom-4 flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
                       <span className="material-symbols-outlined text-[18px]">edit_square</span>
                       <span className="text-[9px] font-bold uppercase mt-0.5 tracking-wider">Edit</span>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="flex flex-col gap-8 lg:pt-0">
              <div className="w-full md:w-3/4">
                 <CustomDatePicker 
                    label="Start Date"
                    value={data.start_date}
                    onChange={(val) => setData({...data, start_date: val})}
                    placeholder="Set start date"
                 />
              </div>
              <div className="w-full md:w-3/4">
                 <CustomDatePicker 
                    label="End Date"
                    value={data.end_date}
                    onChange={(val) => setData({...data, end_date: val})}
                    placeholder="Set end date"
                 />
              </div>
           </div>
        </div>

        {/* Entries Table Section */}
        <div className="mb-12">
           <div className="flex justify-between items-center mb-6 pl-1">
              <h4 className="text-xl font-bold font-headline text-[#4A6B10]">Participation List ({filteredEntries.length})</h4>
              
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search participants..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border-none rounded-full px-5 py-2.5 pl-11 shadow-inner text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none min-w-[280px]"
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[20px]">search</span>
              </div>
           </div>

           <div className="bg-white rounded-[2rem] overflow-hidden border border-primary/5 shadow-sm">
              <table className="w-full text-left">
                 <thead className="bg-[#F2F3EB]/30 border-b border-primary/5">
                    <tr>
                       <th className="px-8 py-5 text-[11px] font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest">ID</th>
                       <th className="px-8 py-5 text-[11px] font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest">Name</th>
                       <th className="px-8 py-5 text-[11px] font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest">Email</th>
                       <th className="px-8 py-5 text-[11px] font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-center">Date Joined</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#426500]/5">
                    {loadingEntries ? (
                       <tr><td colSpan="4" className="px-8 py-10 text-center text-sm font-medium text-on-surface-variant/40 italic">Loading entries...</td></tr>
                    ) : filteredEntries.length === 0 ? (
                       <tr><td colSpan="4" className="px-8 py-10 text-center text-sm font-medium text-on-surface-variant/40 italic">{searchTerm ? 'No matches found.' : 'No entries yet.'}</td></tr>
                    ) : (
                       filteredEntries.map((entry, idx) => (
                          <tr key={idx}>
                             <td className="px-8 py-5 text-[10px] font-black text-on-surface-variant/40">#{entry.user?.account_id || entry.user?.id}</td>
                             <td className="px-8 py-5 text-sm font-bold text-on-surface">{entry.user?.first_name} {entry.user?.last_name}</td>
                             <td className="px-8 py-5 text-sm font-medium text-on-surface-variant/80 italic">{entry.user?.email}</td>
                             <td className="px-8 py-5 text-sm font-medium text-on-surface-variant/60 text-center">
                                {entry.created_at ? new Date(entry.created_at).toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A'}
                             </td>
                          </tr>
                       ))
                    )}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="flex justify-between items-center mt-6">
           <div>
              {data.id && (
                 <button 
                    onClick={() => { if(window.confirm('Delete this giveaway permanently?')) onDelete(data.id); }} 
                    className="bg-red-50 text-red-600 font-bold py-3.5 px-8 text-sm tracking-widest rounded-full border border-red-100 hover:bg-red-100 transition-all"
                 >
                    Delete
                 </button>
              )}
           </div>
           <div className="flex gap-4">
              <button 
                onClick={() => onSave(data)} 
                disabled={loading} 
                className="bg-[#426500] text-white font-bold py-3.5 px-14 text-sm tracking-widest rounded-full shadow-md hover:bg-[#4a6b10] disabled:opacity-50 transition-all"
              >
                 {loading ? "Saving..." : (data.id ? "Update" : "Save")}
              </button>
              <button 
                onClick={onCancel} 
                className="bg-white border-2 border-[#D1D3C8] text-on-surface-variant/80 font-bold py-3.5 px-14 text-sm tracking-widest rounded-full hover:bg-surface-container-highest/20 transition-all"
              >
                 Cancel
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

export default GiveawayEditor;



