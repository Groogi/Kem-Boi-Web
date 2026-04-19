import { useState } from "react";

function WebsiteLinksForm() {
  const [socialLinks, setSocialLinks] = useState({ instagram: "", facebook: "", website: "" });
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="bg-[#EEF4E4] rounded-[2.5rem] p-10 shadow-sm border border-white/40 max-w-3xl">
        <h3 className="text-3xl font-bold font-headline text-[#4A6B10] mb-8">Website Links</h3>
        
        <div className="space-y-8 mb-12">
           <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-2">Instagram Link:</label>
              <div className="relative group">
                 <input 
                   type="text" 
                   value={socialLinks.instagram} 
                   placeholder="www.instagram.com/kemboi"
                   onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})} 
                   className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3.5 shadow-inner font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 />
                 <div className="absolute right-4 top-2.5 flex flex-col items-center leading-none text-on-surface-variant/40">
                    <span className="material-symbols-outlined text-[18px]">edit_square</span>
                    <span className="text-[8px] font-bold uppercase tracking-tighter">Edit</span>
                 </div>
              </div>
           </div>
           <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-2">Facebook Link:</label>
              <div className="relative group">
                 <input 
                   type="text" 
                   value={socialLinks.facebook} 
                   placeholder="www.facebook.com/kemboi"
                   onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})} 
                   className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3.5 shadow-inner font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 />
                 <div className="absolute right-4 top-2.5 flex flex-col items-center leading-none text-on-surface-variant/40">
                    <span className="material-symbols-outlined text-[18px]">edit_square</span>
                    <span className="text-[8px] font-bold uppercase tracking-tighter">Edit</span>
                 </div>
              </div>
           </div>
           <div>
              <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-2">Website Link</label>
              <div className="relative group">
                 <input 
                   type="text" 
                   value={socialLinks.website} 
                   placeholder="www.kemboi.com"
                   onChange={(e) => setSocialLinks({...socialLinks, website: e.target.value})} 
                   className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3.5 shadow-inner font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 />
                 <div className="absolute right-4 top-2.5 flex flex-col items-center leading-none text-on-surface-variant/40">
                    <span className="material-symbols-outlined text-[18px]">edit_square</span>
                    <span className="text-[8px] font-bold uppercase tracking-tighter">Edit</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex justify-end">
           <button 
             onClick={handleUpdate}
             disabled={loading}
             className={`font-bold py-3 px-12 text-sm rounded-full shadow-md transition-all active:scale-95 ${socialLinks.instagram || socialLinks.website ? 'bg-[#426500] text-white hover:bg-[#4a6b10]' : 'bg-white border-2 border-[#D1D3C8] text-on-surface-variant/40 animate-pulse cursor-not-allowed'}`}
           >
              {loading ? "Updating..." : "Update"}
           </button>
        </div>
      </div>
    </div>
  );
}

export default WebsiteLinksForm;



