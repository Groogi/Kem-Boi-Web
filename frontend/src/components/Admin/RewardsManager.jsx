import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

function RewardsManager() {
   const { token } = useAuth();
   const { showToast } = useToast();
   const [rewards, setRewards] = useState([]);
   const [editingReward, setEditingReward] = useState(null);
   const [loading, setLoading] = useState(false);
   const [showNewReward, setShowNewReward] = useState(false);

   const [rewardData, setRewardData] = useState({
     name: "",
     description: "",
     point_cost: 0,
     active: true
   });

   const fetchRewards = async () => {
      try {
         const res = await fetch("/api/rewards", {
            headers: { "Authorization": `Bearer ${token}` }
         });
         const data = await res.json();
         setRewards(Array.isArray(data) ? data : []);
      } catch (err) { console.error(err); }
   };

   useEffect(() => {
      fetchRewards();
   }, [token]);

   const handleSaveReward = async () => {
      if (!rewardData.name.trim()) {
         showToast("Reward name is required", "error");
         return;
      }
      
      setLoading(true);
      const url = editingReward ? `/api/rewards/${editingReward.id}` : "/api/rewards";
      const method = editingReward ? "PUT" : "POST";
      
      try {
         const res = await fetch(url, {
            method,
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ reward: rewardData })
         });
         
         if (res.ok) {
            showToast(editingReward ? "Reward updated!" : "Reward created!", "success");
            fetchRewards();
            cancelEdit();
         }
      } catch (err) {
         showToast("Operation failed", "error");
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteReward = async (id) => {
      if (!window.confirm("Are you sure you want to delete this reward?")) return;
      
      try {
         const res = await fetch(`/api/rewards/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
         });
         if (res.ok) {
            showToast("Reward deleted", "info");
            fetchRewards();
         }
      } catch (err) { console.error(err); }
   };

   const cancelEdit = () => {
      setEditingReward(null);
      setShowNewReward(false);
      setRewardData({ name: "", description: "", point_cost: 0, active: true });
   };

   const startEdit = (reward) => {
      setEditingReward(reward);
      setRewardData({
         name: reward.name,
         description: reward.description,
         point_cost: reward.point_cost,
         active: reward.active
      });
      setShowNewReward(true);
   };

   return (
      <div className="animate-fade-in space-y-10">
         {showNewReward ? (
            <div className="bg-[#EEF4E4] rounded-[2.5rem] p-10 shadow-sm border border-white/40 max-w-2xl">
               <h3 className="text-3xl font-bold font-headline text-[#4A6B10] mb-8">
                  {editingReward ? 'Edit Reward' : 'Create New Reward'}
               </h3>
               <div className="space-y-6">
                  <div>
                     <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Reward Name:</label>
                     <input 
                        type="text" 
                        value={rewardData.name} 
                        onChange={(e) => setRewardData({...rewardData, name: e.target.value})}
                        placeholder="e.g. Free Avocado Smoothie"
                        className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3.5 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                     />
                  </div>
                  <div className="flex gap-8">
                     <div className="w-1/2">
                        <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Point Cost:</label>
                        <input 
                           type="number" 
                           value={rewardData.point_cost} 
                           onChange={(e) => setRewardData({...rewardData, point_cost: parseInt(e.target.value) || 0})}
                           className="w-full bg-[#FBFBF5] border-none rounded-full px-5 py-3.5 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        />
                     </div>
                     <div className="w-1/2 flex flex-col justify-end">
                        <div className="flex items-center gap-3 mb-2">
                           <span className={`text-[10px] font-bold uppercase tracking-widest ${rewardData.active ? 'text-primary' : 'text-on-surface-variant/60'}`}>{rewardData.active ? 'Active' : 'Inactive'}</span>
                           <div 
                              onClick={() => setRewardData({...rewardData, active: !rewardData.active})}
                              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors shadow-inner ${rewardData.active ? 'bg-primary' : 'bg-[#D1D3C8]'}`}
                           >
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${rewardData.active ? 'left-7' : 'left-1'}`}></div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Description:</label>
                     <textarea 
                        value={rewardData.description} 
                        onChange={(e) => setRewardData({...rewardData, description: e.target.value})}
                        placeholder="Short description for the customer..."
                        className="w-full bg-[#FBFBF5] border-none rounded-[1.5rem] px-6 py-5 shadow-inner min-h-[120px] resize-none font-medium text-sm leading-relaxed text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                     />
                  </div>
               </div>
               <div className="flex justify-between items-center mt-10">
                  <div>
                     {editingReward && (
                        <button onClick={() => handleDeleteReward(editingReward.id)} className="text-red-500 font-bold text-sm hover:underline">
                           Delete Permanently
                        </button>
                     )}
                  </div>
                  <div className="flex gap-4">
                     <button onClick={handleSaveReward} disabled={loading} className="bg-[#426500] text-white font-bold py-3.5 px-12 rounded-full shadow-md hover:bg-[#4a6b10] transition-all disabled:opacity-50">
                        {loading ? "Saving..." : (editingReward ? "Update" : "Save Reward")}
                     </button>
                     <button onClick={cancelEdit} className="bg-white border-2 border-[#D1D3C8] text-on-surface-variant font-bold py-3.5 px-12 rounded-full hover:bg-gray-50 transition-all">
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <>
               <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold font-headline text-[#4A6B10]">Available Rewards</h3>
                  <button onClick={() => setShowNewReward(true)} className="bg-primary text-white font-bold px-8 py-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
                     <span className="material-symbols-outlined">add</span>
                     Add Reward
                  </button>
               </div>

               {rewards.length === 0 ? (
                  <div className="bg-[#EEF4E4] rounded-[2rem] p-12 text-center border border-dashed border-[#4A6B10]/20">
                     <p className="text-on-surface-variant font-medium">No rewards created yet. Click "Add Reward" to get started.</p>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {rewards.map(reward => (
                        <div key={reward.id} className="bg-[#EEF4E4] rounded-[2rem] p-6 shadow-sm border border-white/20 flex flex-col group hover:shadow-md transition-all">
                           <div className="flex justify-between items-start mb-4">
                              <h4 className="text-xl font-bold font-headline text-primary">{reward.name}</h4>
                              <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm border border-primary/5">{reward.point_cost} pts</span>
                           </div>
                           <p className="text-sm text-on-surface-variant mb-8 flex-grow">{reward.description}</p>
                           <div className="flex justify-between items-center pt-4 border-t border-primary/10">
                              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${reward.active ? 'text-primary' : 'text-red-400'}`}>
                                 {reward.active ? '● Live' : '○ Draft'}
                              </span>
                              <button onClick={() => startEdit(reward)} className="text-primary hover:underline text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                 Edit <span className="material-symbols-outlined text-sm">east</span>
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </>
         )}
      </div>
   );
}

export default RewardsManager;
