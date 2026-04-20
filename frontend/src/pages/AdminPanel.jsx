import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import BonusEntryForm from "../components/Admin/BonusEntryForm";
import WebsiteLinksForm from "../components/Admin/WebsiteLinksForm";
import GiveawayEditor from "../components/Admin/GiveawayEditor";
import LocationEditor from "../components/Admin/LocationEditor";
import RewardsManager from "../components/Admin/RewardsManager";
import { ModernAlert, ModernConfirm } from "../components/Common/SharedUI";

function AdminPanel() {
   const { user, token, logout } = useAuth();
   const { showToast } = useToast();
   const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, bonus-entry, giveaways, locations
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [viewMode, setViewMode] = useState("list"); // list, add-user, user-details
   const [selectedUser, setSelectedUser] = useState(null);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [deleteConfirmText, setDeleteConfirmText] = useState("");
   
   // Giveaway State
   const [giveaways, setGiveaways] = useState([]);
   const [giveawayMode, setGiveawayMode] = useState("grid");
   const [editingGiveaway, setEditingGiveaway] = useState(null);

   // Locations State
   const [locations, setLocations] = useState([]);
   const [locationMode, setLocationMode] = useState("grid");
   const [editingLocation, setEditingLocation] = useState(null);

   const [users, setUsers] = useState([]);
   const [redemptions, setRedemptions] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [loading, setLoading] = useState(false);
   const [redemptionSearch, setRedemptionSearch] = useState("");
   const [redemptionToDelete, setRedemptionToDelete] = useState(null);

   const filteredUsers = users.filter(u => {
      const fullName = `${u.first_name || ''} ${u.last_name || ''}`.toLowerCase();
      const email = (u.email || '').toLowerCase();
      const query = searchQuery.toLowerCase();
      return fullName.includes(query) || email.includes(query);
   });
   // New states for interactive features
   const [quickEmail, setQuickEmail] = useState("");
   const [quickPoints, setQuickPoints] = useState("");
   const [manualPointsAmount, setManualPointsAmount] = useState("");
   const [addUserForm, setAddUserForm] = useState({ full_name: "", email: "", points: "" });
   const [editUserForm, setEditUserForm] = useState({ first_name: "", last_name: "", email: "" });

   const fetchUsers = useCallback(async () => {
      try {
         const res = await fetch("/api/users_list", {
            headers: { "Authorization": `Bearer ${token}` }
         });
         const data = await res.json();
         setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
         console.error("Failed to fetch users", err);
         setUsers([]);
      }
   }, [token]);

   const fetchGiveaways = useCallback(async () => {
      try {
         const res = await fetch("/api/giveaways", {
            headers: { "Authorization": `Bearer ${token}` }
         });
         const data = await res.json();
         setGiveaways(Array.isArray(data) ? data : []);
      } catch (err) {
         console.error("Failed to fetch giveaways", err);
         setGiveaways([]);
      }
   }, [token]);

   const fetchRedemptions = useCallback(async () => {
      try {
         const res = await fetch("/api/redemptions", {
            headers: { "Authorization": `Bearer ${token}` }
         });
         const data = await res.json();
         setRedemptions(Array.isArray(data) ? data : []);
      } catch (err) {
         console.error("Failed to fetch redemptions", err);
         setRedemptions([]);
      }
   }, [token]);

   const fetchLocations = useCallback(async () => {
      try {
         const res = await fetch("/api/locations", {
            headers: { "Authorization": `Bearer ${token}` }
         });
         const data = await res.json();
         setLocations(Array.isArray(data) ? data : []);
      } catch (err) {
         console.error("Failed to fetch locations", err);
         setLocations([]);
      }
   }, [token]);

   useEffect(() => {
      if (token && user && user.role !== 'admin') {
         navigate("/");
      }
   }, [user, token, navigate]);

   useEffect(() => {
      if (token) {
         fetchUsers();
         fetchGiveaways();
         fetchLocations();
         fetchRedemptions();
      }
   }, [token, fetchUsers, fetchGiveaways, fetchLocations, fetchRedemptions]);

   const handleUpdateRedemptionStatus = async (redId, newStatus) => {
      try {
         const res = await fetch(`/api/redemptions/${redId}`, {
            method: 'PUT',
            headers: { 
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ status: newStatus })
         });
         if (res.ok) {
            showToast(`Redemption marked as ${newStatus}`);
            fetchRedemptions();
         }
      } catch (err) {
         showToast("Failed to update status", "error");
      }
   };

   const handleDeleteRedemption = async (redId) => {
      const id = redId || (redemptionToDelete && redemptionToDelete.id);
      if (!id) return;
      
      try {
         const res = await fetch(`/api/redemptions/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
         });
         if (res.ok) {
            showToast("Redemption record deleted");
            setRedemptionToDelete(null);
            fetchRedemptions();
         }
      } catch (err) {
         showToast("Failed to delete redemption", "error");
      }
   };

   useEffect(() => {
      if (selectedUser) {
         setEditUserForm({
            first_name: selectedUser.first_name || "",
            last_name: selectedUser.last_name || "",
            email: selectedUser.email || ""
         });
      }
   }, [selectedUser]);

   const handleQuickPoints = async (email, points) => {
      const targetEmail = email || quickEmail;
      const targetPoints = points || quickPoints;
      if (!targetEmail || !targetPoints) return;
      setLoading(true);
      try {
         const res = await fetch("/api/transactions/quick_add", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ email: targetEmail, points: targetPoints })
         });
         if (res.ok) {
            setQuickEmail(""); setQuickPoints("");
            fetchUsers();
            showToast("Points added successfully!");
         }
      } catch (err) { 
         console.error(err); 
         showToast("Failed to add points.", "error");
      }
      finally { setLoading(false); }
   };

   const handleManualAddPoints = async () => {
      if (!selectedUser || !manualPointsAmount) return;
      setLoading(true);
      try {
         const res = await fetch(`/api/users/${selectedUser.id}/add_points`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ points: manualPointsAmount, notes: "Admin Manual Addition" })
         });
         if (res.ok) {
            const data = await res.json();
            setSelectedUser({ ...selectedUser, points_balance: data.new_balance });
            setManualPointsAmount("");
            showToast("Points updated successfully!");
            fetchUsers();
         } else {
            const errData = await res.json();
            showToast(`Failed to add points: ${errData.error || errData.errors || "Access denied"}`, "error");
         }
      } catch (err) { 
         console.error(err); 
         showToast("Network error occurred while adding points.", "error");
      }
      finally { setLoading(false); }
   };

   const handleDeleteUser = async () => {
      if (!selectedUser) return;
      setLoading(true);
      try {
         const res = await fetch(`/api/users/${selectedUser.id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
         });
         if (res.ok) {
            setShowDeleteModal(false);
            setDeleteConfirmText("");
            setViewMode("list");
            fetchUsers();
         }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
   };

   const handleCreateUser = async () => {
      setLoading(true);
      try {
         const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Registration is usually public
            body: JSON.stringify({
               email: addUserForm.email,
               first_name: addUserForm.full_name.trim().split(' ')[0] || addUserForm.full_name.trim(),
               last_name: addUserForm.full_name.trim().split(' ').slice(1).join(' ') || "",
               password: "Password123!", // Default password for invitations
               role: "customer"
            })
         });
         if (res.ok) {
            const userData = await res.json();
            // If points were specified, add them now
            if (addUserForm.points && Number(addUserForm.points) !== 0) {
               const userId = userData.id || userData.user?.id;
               if (userId) {
                  try {
                     await fetch(`/api/users/${userId}/add_points`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                        body: JSON.stringify({ points: addUserForm.points, notes: "Initial Sign-up Bonus" })
                     });
                  } catch (pointErr) {
                     console.error("Failed to add initial points:", pointErr);
                  }
               }
            }
            showToast(`Invitation sent to ${addUserForm.email}!`, "success");
            setAddUserForm({ full_name: "", email: "", points: "" });
            setViewMode("list");
            fetchUsers();
         } else {
            const errorData = await res.json();
            showToast(errorData.error || errorData.errors?.join(", ") || "Failed to create user", "error");
         }
      } catch (err) { 
         console.error(err); 
         showToast("Network error occurred while creating user.", "error");
      }
      finally { setLoading(false); }
   };




   const handleSaveGiveaway = async (giveawayData) => {
      setLoading(true);
      try {
         const url = giveawayData.id ? `/api/giveaways/${giveawayData.id}` : "/api/giveaways";
         const method = giveawayData.id ? "PUT" : "POST";
         await fetch(url, {
            method,
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(giveawayData)
         });
         fetchGiveaways();
         setGiveawayMode('grid');
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
   };

   const handleSaveLocation = async (locationData) => {
      setLoading(true);
      try {
         const url = locationData.id ? `/api/locations/${locationData.id}` : "/api/locations";
         const method = locationData.id ? "PUT" : "POST";
         await fetch(url, {
            method,
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(locationData)
         });
         fetchLocations();
         setLocationMode('grid');
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
   };

   const handleDeleteGiveaway = async (id) => {
      setLoading(true);
      try {
         await fetch(`/api/giveaways/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
         });
         fetchGiveaways();
         setGiveawayMode('grid');
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
   };

   const handleDeleteLocation = async (id) => {
      setLoading(true);
      try {
         await fetch(`/api/locations/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
         });
         fetchLocations();
         setLocationMode('grid');
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
   };

   const renderGiveawaysGridView = () => {
      const current = giveaways.filter(g => g.active);
      const upcoming = giveaways.filter(g => !g.active);

      return (
         <div className="animate-fade-in space-y-12 relative pb-48">
            <section>
               <h3 className="text-2xl font-bold font-headline text-[#4A6B10] mb-8">Current Giveaways</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {current.map((g, idx) => (
                     <div 
                        key={idx} 
                        onClick={() => { setEditingGiveaway(g); setGiveawayMode("editor"); }}
                        className="bg-[#EEF4E4] rounded-[1.5rem] p-8 shadow-sm border border-white/40 flex flex-col justify-between min-h-[190px] cursor-pointer hover:scale-[1.02] transition-all"
                     >
                        <div>
                           <h4 className="font-bold text-[#4A6B10] text-3xl font-headline mb-2">{g.title}</h4>
                           <p className="text-[13px] opacity-70 font-medium leading-relaxed">
                              {g.participation_conditions || g.conditions}
                           </p>
                        </div>
                        <div className="flex justify-end mt-4">
                           <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
                              Ends in {g.end_date || 'TBC'}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            <section>
               <h3 className="text-2xl font-bold font-headline text-[#4A6B10] mb-8">Upcoming Giveaways</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcoming.map((g, idx) => (
                     <div 
                        key={idx} 
                        onClick={() => { setEditingGiveaway(g); setGiveawayMode("editor"); }}
                        className="bg-[#DCDDDA]/60 rounded-[1.5rem] p-8 shadow-sm border border-white/20 flex flex-col justify-between min-h-[190px] cursor-pointer hover:scale-[1.02] transition-all opacity-80"
                     >
                        <div>
                           <h4 className="font-bold text-[#4A5440] text-3xl font-headline mb-2">{g.title}</h4>
                           <p className="text-[13px] text-on-surface-variant/60 font-medium leading-relaxed">
                              {g.participation_conditions || g.conditions}
                           </p>
                        </div>
                        <div className="flex justify-end mt-4">
                           <span className="text-[11px] font-bold text-on-surface-variant/40 tracking-widest uppercase">
                              Starts in {g.start_date || 'TBC'}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            {/* Floating Action Button - Positioned to not overlap content area */}
            <button 
               onClick={() => { setEditingGiveaway(null); setGiveawayMode("editor"); }}
               className="fixed bottom-10 right-10 bg-[#426500] text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-[#395800] transition-all flex items-center gap-3 z-50 animate-scale-in"
            >
               <span className="material-symbols-outlined">add</span>
               <span className="text-sm tracking-widest">New Giveaway</span>
            </button>
         </div>
      );
   };


   const getStatusBadge = (points) => {
      if (points >= 1000) return { label: "PLATINUM", class: "bg-[#4A6B10] text-white" };
      if (points >= 500) return { label: "GOLD", class: "bg-[#BFE9A2] text-[#304c00]" };
      if (points >= 200) return { label: "SILVER", class: "bg-[#E2EAD3] text-[#4A5440]" };
      return { label: "BRONZE", class: "bg-[#D1D3C8] text-white" };
   };

   // Sidebar navigation
   const navItems = [
      { id: "dashboard", label: "Dashboard", icon: "grid_view" },
      { id: "bonus-entry", label: "Bonus Entry", icon: "wb_sunny" },
      { id: "giveaways", label: "Giveaways", icon: "redeem" },
      { id: "locations", label: "Locations", icon: "task_alt" },
      { id: "rewards", label: "Rewards", icon: "workspace_premium" },
      { id: "redemptions", label: "Redemptions", icon: "confirmation_number" },
      { id: "links", label: "Website Links", icon: "ads_click" },
   ];

   const renderSidebar = () => (
      <>
         {/* Mobile Overlay */}
         {isSidebarOpen && (
            <div 
               className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] lg:hidden animate-fade-in"
               onClick={() => setIsSidebarOpen(false)}
            ></div>
         )}

         <div className={`w-64 bg-[#F2F3EB] h-screen fixed left-0 top-0 border-r border-outline-variant/10 flex flex-col p-6 z-[70] transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center mb-10 pl-2">
               <div>
                  <h1 className="text-3xl font-headline font-bold text-primary leading-tight">Kem Boi</h1>
                  <p className="text-[11px] font-bold text-on-surface-variant/60 tracking-widest uppercase mt-[-4px]">Admin Dashboard</p>
               </div>
               <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-primary">
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>

         <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
               <div
                  key={item.id}
                  onClick={() => { 
                     setActiveTab(item.id); 
                     setViewMode("list"); 
                     if (item.id === 'giveaways') setGiveawayMode("grid");
                     if (item.id === 'locations') setLocationMode("grid");
                     setIsSidebarOpen(false); 
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-all duration-200 group ${activeTab === item.id
                        ? "bg-white border-2 border-[#E5E7E1] text-primary shadow-sm shadow-black/5"
                        : "text-on-surface-variant hover:bg-surface-container-highest/30"
                     }`}
               >
                  <span className={`material-symbols-outlined text-[22px] ${activeTab === item.id ? "font-bold" : "font-light"}`}>
                     {item.icon}
                  </span>
                  <span className={`text-[15px] ${activeTab === item.id ? "font-bold text-[#4A6B10]" : "font-medium"}`}>
                     {item.label}
                  </span>
               </div>
            ))}
         </nav>

         <div 
            onClick={() => { logout(); navigate("/"); }}
            className="mt-auto mb-4 flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-all duration-200 text-on-surface-variant hover:bg-red-50 hover:text-red-600"
         >
            <span className="material-symbols-outlined pointer-events-none">logout</span>
            <span className="text-[15px] font-bold">Sign Out</span>
         </div>
      </div>
   </>
   );

   const renderHeader = () => (
      <div className="flex justify-between items-center mb-10">
         <h2 className="text-4xl font-headline font-bold text-primary capitalize tracking-[-0.02em]">
            {activeTab === 'dashboard' ? 'Dashboard' : activeTab.replace("-", " ")}
         </h2>

         <div className="flex items-center gap-3 bg-white pr-4 pl-1 py-1 rounded-full border border-outline-variant/20 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
               <span className="material-symbols-outlined text-[1.2rem]">person</span>
            </div>
            <div className="flex flex-col">
               <span className="text-sm font-bold text-primary leading-tight">
                  {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : "Full Name"}
               </span>
               <span className="text-[11px] text-on-surface-variant/60 font-bold uppercase leading-tight tracking-tighter">{user?.role}</span>
            </div>
         </div>
      </div>
   );


   const renderUserList = () => (
      <div className="animate-fade-in space-y-6">
         <div className="relative max-w-xl">
            <input
               type="text"
               placeholder="Search membership, email..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-[#F2F3EB] border-none rounded-full px-12 py-3.5 shadow-inner focus:ring-2 focus:ring-primary/20 transition-all font-medium text-on-surface-variant"
            />
            <span className="material-symbols-outlined absolute left-4 top-3.5 text-on-surface-variant/40">search</span>
         </div>

         <div className="bg-[#EEF4E4]/40 rounded-[2.5rem] p-10 md:p-14 relative">
            <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-[#F2F3EB]/30">
                     <tr>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80">ID</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80">User Name</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80">Email Address</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 text-center">Points Balance</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 text-center">Status</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredUsers.length > 0 ? filteredUsers.map((u, idx) => {
                        const status = getStatusBadge(u.points_balance);
                        return (
                           <tr key={idx} onClick={() => { setSelectedUser(u); setViewMode("user-details"); }} className="hover:bg-surface-container-highest/10 cursor-pointer transition-colors">
                              <td className="px-8 py-5 text-[11px] font-black text-on-surface-variant opacity-60">#{u.account_id || u.id}</td>
                              <td className="px-8 py-5 text-sm font-bold text-on-surface">{u.first_name} {u.last_name}</td>
                              <td className="px-8 py-5 text-sm font-medium text-on-surface-variant/80 italic">{u.email}</td>
                              <td className="px-8 py-5 text-sm font-bold text-[#4A6B10] text-center font-headline">{u.points_balance} pts</td>
                              <td className="px-8 py-5 text-center">
                                 <span className={`inline-block px-4 py-1 rounded-full text-[9px] font-bold tracking-widest ${status.class}`}>
                                    {status.label}
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <span className="bg-[#426500]/5 text-[#426500] font-bold text-[10px] tracking-widest px-6 py-2.5 rounded-full hover:bg-[#426500] hover:text-white transition-all uppercase">
                                    View
                                 </span>
                              </td>
                           </tr>
                        );
                     }) : (
                        [1, 2, 3, 4, 5].map((idx) => (
                           <tr key={idx} className="opacity-10">
                              <td className="px-8 py-5 text-[10px] font-black">#000</td>
                              <td className="px-8 py-5 text-sm font-bold text-on-surface">Member Name</td>
                              <td className="px-8 py-5 text-sm font-medium italic">member@email.com</td>
                              <td className="px-8 py-5 text-sm font-bold text-center">0 pts</td>
                              <td className="px-8 py-5 text-center">
                                 <span className="inline-block px-4 py-1 rounded-full text-[9px] font-bold bg-[#D1D3C8] text-white">BRONZE</span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                 <span className="bg-[#426500]/5 text-[#426500] font-bold text-[10px] px-4 py-1.5 rounded-full uppercase">View</span>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
            <div className="flex justify-end mt-8">
               <button onClick={() => setViewMode("add-user")} className="bg-[#426500] text-white font-bold py-2 px-8 text-[11px] tracking-widest rounded-full shadow-md shadow-[#426500]/20 hover:bg-[#4a6b10] transition-colors">
                  ADD USER
               </button>
            </div>
         </div>
      </div>
   );

   const renderAddUserView = () => (
         <div className="bg-[#EEF4E4]/40 rounded-[2.5rem] p-10 md:p-14 max-w-4xl relative">
            <div className="bg-white/40 backdrop-blur-sm rounded-[2.5rem] p-12">
               <div>
                  <label className="block text-sm font-bold text-[#4A6B10] mb-3 px-1">Full Name</label>
                  <div className="relative group">
                     <input
                        type="text"
                        value={addUserForm.full_name}
                        onChange={(e) => setAddUserForm({ ...addUserForm, full_name: e.target.value })}
                        className="w-full bg-[#EBECE4] border-none rounded-full px-6 py-4 shadow-inner font-medium text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                     />
                     <div className="absolute right-5 top-[14px] flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
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
                     <div className="absolute right-5 top-[14px] flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
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
                        <div className="absolute right-4 top-[14px] flex flex-col items-center leading-none text-on-surface-variant/40 pointer-events-none select-none">
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

            <div className="flex justify-end gap-4 mt-16 md:absolute md:bottom-10 md:right-10 md:mt-0">
               <button
                  onClick={handleCreateUser}
                  disabled={loading}
                  className="bg-[#5c8b16] text-white font-bold py-3.5 px-8 text-sm tracking-wide rounded-full shadow-md hover:bg-[#4a6b10] transition-colors disabled:opacity-50"
               >
                  {loading ? "Sending..." : "Send Invitation Email"}
               </button>
               <button onClick={() => setViewMode("list")} className="bg-[#f7f7f2] border-2 border-[#D1D3C8] text-on-surface-variant/80 font-bold py-3.5 px-8 text-sm tracking-wide rounded-full hover:bg-surface-container-highest/20 transition-all">
                  Cancel
               </button>
            </div>
         </div>
   );

   const handleUpdateUser = async () => {
      if (!selectedUser) return;
      setLoading(true);
      try {
         const res = await fetch(`/api/users/${selectedUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(editUserForm)
         });
         if (res.ok) {
            const data = await res.json();
            const updatedUser = data.user || data;
            setSelectedUser(updatedUser);
            fetchUsers();
            
            // If admin edited their own profile, sync the header
            if (user && updatedUser.id === user.id) {
               // Update localStorage so refresh keeps it, and context if it's mutable
               const stored = JSON.parse(localStorage.getItem('user') || '{}');
               const newUserData = { ...stored, ...updatedUser };
               localStorage.setItem('user', JSON.stringify(newUserData));
               // Note: AuthContext might need a refresh logic, but this is a start
            }

            showToast("User profile updated successfully.", "success");
         }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
   };


   const renderDeleteModal = () => (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md animate-fade-in px-6">
         <div className="bg-[#FBFBF5] rounded-[3rem] p-10 md:p-14 max-w-lg w-full shadow-2xl border border-white/20 relative animate-scale-in">
            <div className="flex flex-col items-center mb-10">
               <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
               </div>
               <h3 className="text-[#1a2a00] text-3xl font-bold font-headline text-center mb-3">Confirm Deletion</h3>
               <p className="text-on-surface-variant/70 text-center font-medium leading-relaxed max-w-[280px]">
                  You are about to permanently remove <span className="text-red-600 font-bold">{selectedUser?.first_name} {selectedUser?.last_name}</span>. This cannot be undone.
               </p>
            </div>

            <div className="space-y-8">
               <div className="space-y-3">
                  <label className="block text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] text-center">Type 'DELETE' to confirm</label>
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
                     {loading ? "Deleting..." : "Permanently Delete"}
                  </button>
                  <button
                     onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(""); }}
                     className="flex-1 bg-white border-2 border-[#D1D3C8] text-on-surface-variant/60 font-bold py-4 rounded-full transition-all hover:bg-surface-container-highest/20 text-sm tracking-widest uppercase"
                  >
                     Keep User
                  </button>
               </div>
            </div>
         </div>
      </div>
   );

   const renderLocationsView = () => (
      <div className="animate-fade-in space-y-8">
         <div className="flex justify-between items-center mb-2">
            <div>
               <h2 className="text-4xl font-headline font-bold text-primary capitalize">Store Locations</h2>
               <p className="text-on-surface-variant font-medium opacity-60">Manage your active stalls and stores.</p>
            </div>
            <button 
               onClick={() => { setEditingLocation(null); setLocationMode('editor'); }} 
               className="bg-[#426500] text-white font-bold py-3.5 px-8 text-sm tracking-widest rounded-full shadow-md hover:bg-[#4a6b10] transition-all flex items-center gap-2"
            >
               <span className="material-symbols-outlined text-[20px]">add_location</span>
               ADD STORE
            </button>
         </div>

         <div className="bg-[#fcfdf9] rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/30">
            <div className="bg-white rounded-[2rem] overflow-hidden border border-primary/5 shadow-sm">
               <table className="w-full text-left">
                  <thead className="bg-[#F2F3EB]/30 border-b border-primary/5">
                     <tr>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest">Store Name</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest">Suburb</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-center">Status</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[#426500]/5">
                     {locations.length > 0 ? locations.map((store, idx) => (
                        <tr key={idx} className="hover:bg-surface-container-highest/10 transition-colors">
                           <td className="px-8 py-6 text-sm font-bold text-on-surface">{store.name}</td>
                           <td className="px-8 py-6 text-sm font-medium text-on-surface-variant/70 italic">{store.suburb}</td>
                           <td className="px-8 py-6 text-center">
                              <span className={`text-[11px] font-bold uppercase tracking-widest ${store.active ? 'text-[#4A6B10]' : 'text-on-surface-variant/40'}`}>
                                 {store.active ? 'Active' : 'Inactive'}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button 
                                 onClick={() => { setEditingLocation(store); setLocationMode('editor'); }}
                                 className="bg-[#426500]/10 text-[#426500] font-bold text-[10px] tracking-widest px-4 py-1.5 rounded-full border border-[#426500]/20 hover:bg-[#426500] hover:text-white transition-all uppercase"
                              >
                                 Manage
                              </button>
                           </td>
                        </tr>
                     )) : (
                        <tr>
                           <td colSpan="4" className="px-8 py-10 text-center text-sm font-medium text-on-surface-variant/40 italic">No stores found. List your first store to get started!</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );

    const renderRedemptionLogs = () => (
      <div className="animate-fade-in space-y-8">
          <div className="flex justify-between items-center mb-12">
             <div>
                <h2 className="text-5xl font-headline font-bold text-primary capitalize tracking-[-0.03em]">Redemption Log</h2>
                <p className="text-on-surface-variant font-medium opacity-60 text-lg mt-2">Track and verify customer reward claims.</p>
             </div>
          </div>

         <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="relative flex-1">
               <input
                  type="text"
                  placeholder="Search by customer name or ID..."
                  value={redemptionSearch}
                  onChange={(e) => setRedemptionSearch(e.target.value)}
                  className="w-full bg-[#fcfdf2] border-none rounded-full px-12 py-4 shadow-inner focus:ring-4 focus:ring-[#426500]/10 transition-all font-medium text-on-surface-variant outline-none"
               />
               <span className="material-symbols-outlined absolute left-4 top-[18px] text-on-surface-variant/40">search</span>
            </div>
            <button 
               onClick={fetchRedemptions}
               className="bg-[#426500] text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-[#426500]/10 hover:bg-[#395800] transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
               <span className="material-symbols-outlined text-[20px]">refresh</span>
               <span className="text-sm tracking-widest">REFRESH</span>
            </button>
         </div>

         <div className="bg-[#fcfdf9] rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/30">
            <div className="bg-white rounded-[2rem] overflow-hidden border border-primary/5 shadow-sm">
               <table className="w-full text-left">
                  <thead className="bg-[#F2F3EB]/30 border-b border-primary/5">
                     <tr>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-[11px]">Date</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-[11px]">Customer</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-[11px]">Reward</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-[11px]">Voucher Code</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-center text-[11px]">Status</th>
                        <th className="px-8 py-5 text-sm font-bold text-[#4A6B10] opacity-80 uppercase tracking-widest text-right text-[11px]">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {redemptions.filter(red => {
                        const name = `${red.user?.first_name || ''} ${red.user?.last_name || ''}`.toLowerCase();
                        const accId = String(red.user?.account_id || '').toLowerCase();
                        const query = redemptionSearch.toLowerCase();
                        return name.includes(query) || accId.includes(query);
                     }).length > 0 ? redemptions.filter(red => {
                        const name = `${red.user?.first_name || ''} ${red.user?.last_name || ''}`.toLowerCase();
                        const accId = String(red.user?.account_id || '').toLowerCase();
                        const query = redemptionSearch.toLowerCase();
                        return name.includes(query) || accId.includes(query);
                     }).map((red, idx) => (
                        <RedemptionRow 
                           key={idx} 
                           red={red} 
                           onUpdate={handleUpdateRedemptionStatus} 
                           onDelete={() => setRedemptionToDelete(red)}
                        />
                     )) : (
                        <tr>
                           <td colSpan="6" className="px-8 py-16 text-center text-sm font-medium text-on-surface-variant/40 italic">No redemptions found.</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );

   return (
      <div className="min-h-screen bg-[#FBFBF5] font-body text-on-surface selection:bg-[#c7fc79] selection:text-[#304c00]">
         {renderSidebar()}

         {/* Mobile Header */}
         <div className="lg:hidden bg-[#F2F3EB] border-b border-outline-variant/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-3">
               <button onClick={() => setIsSidebarOpen(true)} className="text-primary hover:bg-white/50 p-2 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[32px]">menu</span>
               </button>
               <h1 className="text-2xl font-headline font-bold text-primary">Kem Boi</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/20">
               <span className="material-symbols-outlined text-[1.2rem]">person</span>
            </div>
         </div>

         <main className="lg:ml-64 p-6 md:p-10 min-h-screen">
            <div className="max-w-[1100px] mx-auto">
               {renderHeader()}

               {activeTab === 'dashboard' && (
                  <>
                     {viewMode === 'list' && renderUserList()}
                     {viewMode === 'add-user' && renderAddUserView()}
                     {viewMode === 'user-details' && (
                        <UserDetailsView 
                           selectedUser={selectedUser}
                           status={getStatusBadge(selectedUser?.points_balance || 0)}
                           manualPointsAmount={manualPointsAmount}
                           setManualPointsAmount={setManualPointsAmount}
                           handleManualAddPoints={handleManualAddPoints}
                           editUserForm={editUserForm}
                           setEditUserForm={setEditUserForm}
                           handleUpdateUser={handleUpdateUser}
                           setShowDeleteModal={setShowDeleteModal}
                           setViewMode={setViewMode}
                           loading={loading}
                        />
                     )}
                  </>
               )}

               {activeTab === 'giveaways' && (
                  giveawayMode === 'grid' ? renderGiveawaysGridView() : (
                    <GiveawayEditor 
                       giveaway={editingGiveaway} 
                       onSave={handleSaveGiveaway} 
                       onCancel={() => setGiveawayMode('grid')} 
                       onDelete={handleDeleteGiveaway}
                       loading={loading} 
                    />
                  )
               )}

                {activeTab === 'locations' && (
                  locationMode === 'grid' ? renderLocationsView() : (
                    <LocationEditor 
                       location={editingLocation} 
                       onSave={handleSaveLocation} 
                       onCancel={() => setLocationMode('grid')} 
                       onDelete={handleDeleteLocation}
                       loading={loading} 
                    />
                  )
                )}

               {activeTab === 'bonus-entry' && (
                  <BonusEntryForm 
                     users={users} 
                     onQuickAdd={handleQuickPoints} 
                     loading={loading} 
                     token={token}
                  />
               )}

               {activeTab === 'rewards' && <RewardsManager />}
               {activeTab === 'redemptions' && renderRedemptionLogs()}
               {activeTab === 'links' && <WebsiteLinksForm />}
            </div>
         </main>

         {activeTab === 'redemptions' && (
            <ModernConfirm 
               isOpen={!!redemptionToDelete}
               onConfirm={() => handleDeleteRedemption()}
               onCancel={() => setRedemptionToDelete(null)}
               title="Delete Redemption?"
               message="This will permanently remove the record from the log. This action is irreversible."
               confirmText="Delete Permanently"
            />
         )}
      </div>
   );
}

export default AdminPanel;

const RedemptionRow = ({ red, onUpdate, onDelete }) => {
   const [loading, setLoading] = useState(false);
   
   return (
      <tr className="hover:bg-white/60 transition-all group">
         <td className="px-8 py-8">
            <span className="text-[11px] font-bold text-on-surface-variant font-mono">
               {new Date(red.created_at).toLocaleDateString('en-AU')}
            </span>
         </td>
         <td className="px-8 py-6">
            <div className="flex flex-col">
               <span className="text-sm font-bold text-on-surface">{red.user?.first_name} {red.user?.last_name}</span>
               <span className="text-[10px] font-bold text-[#4A6B10] opacity-40 uppercase tracking-widest leading-none mt-1">#{red.user?.account_id}</span>
            </div>
         </td>
         <td className="px-8 py-6">
            <span className="text-sm font-medium text-on-surface-variant font-headline">{red.reward?.name}</span>
         </td>
         <td className="px-8 py-6">
            <div className="flex justify-center">
               <span className="inline-block font-mono whitespace-nowrap bg-[#F2F3EB] px-6 py-4 rounded-[1.5rem] text-[#4A6B10] font-bold tracking-[0.2em] border border-primary/10 text-[14px]">
                  {red.voucher_code}
               </span>
            </div>
         </td>
         <td className="px-8 py-6 text-center">
            <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
               red.status === 'used' ? 'bg-red-50 text-red-500 border-red-200' : 'bg-green-50 text-green-600 border-green-200'
            }`}>
               {red.status}
            </span>
         </td>
         <td className="px-8 py-8 text-right">
            <div className="flex justify-end gap-3">
               {red.status === 'pending' ? (
                  <button 
                     onClick={async () => {
                        setLoading(true);
                        await onUpdate(red.id, 'used');
                        setLoading(false);
                     }}
                     disabled={loading}
                     className="bg-[#426500] text-white font-bold text-[10px] tracking-widest px-6 h-[38px] rounded-full hover:bg-[#4a6b10] transition-all uppercase disabled:opacity-50 flex items-center justify-center whitespace-nowrap"
                  >
                     {loading ? "Processing..." : "Confirm Redeem"}
                  </button>
               ) : (
                  <button 
                     onClick={async () => {
                        setLoading(true);
                        await onDelete(red.id);
                        setLoading(false);
                     }}
                     disabled={loading}
                     className="bg-red-50 text-red-600 font-bold text-[10px] tracking-widest px-6 h-[38px] rounded-full border-none hover:bg-red-600 hover:text-white transition-all uppercase disabled:opacity-50 flex items-center justify-center whitespace-nowrap"
                  >
                     {loading ? "Deleting..." : "Delete Record"}
                  </button>
               )}
            </div>
         </td>
      </tr>
   );
};

const UserDetailsView = ({ selectedUser, status, manualPointsAmount, setManualPointsAmount, handleManualAddPoints, editUserForm, setEditUserForm, handleUpdateUser, setShowDeleteModal, setViewMode, loading }) => {
   const [detailTab, setDetailTab] = useState("details"); // details, points

   return (
      <div className="animate-fade-in space-y-6">
         <div className="flex gap-6 mb-2">
            <button
               onClick={() => setDetailTab("details")}
               className={`text-xl font-bold font-headline transition-all ${detailTab === 'details' ? 'text-primary underline underline-offset-8 decoration-2' : 'text-on-surface-variant opacity-60'}`}
            >
               User Details
            </button>
            <button
               onClick={() => setDetailTab("points")}
               className={`text-xl font-bold font-headline transition-all ${detailTab === 'points' ? 'text-primary underline underline-offset-8 decoration-2' : 'text-on-surface-variant opacity-60'}`}
            >
               Points Dashboard
            </button>
         </div>

         <div className="bg-[#F2F3EB]/50 rounded-[2.5rem] p-12 shadow-sm border border-outline-variant/30 max-w-4xl min-h-[440px]">
            {detailTab === 'details' ? (
               <div className="space-y-10 max-w-lg animate-fade-in pt-4">
                  <div className="flex gap-4">
                     <div className="flex-grow">
                        <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">First Name</label>
                        <div className="relative group">
                           <input 
                              type="text" 
                              value={editUserForm.first_name}
                              onChange={(e) => setEditUserForm({ ...editUserForm, first_name: e.target.value })}
                              className="w-full bg-[#EBECE4] border-none rounded-full px-7 py-3.5 shadow-inner text-on-surface font-medium focus:ring-2 focus:ring-[#426500]/20 outline-none" 
                           />
                        </div>
                     </div>
                     <div className="flex-grow">
                        <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Last Name</label>
                        <div className="relative group">
                           <input 
                              type="text" 
                              value={editUserForm.last_name}
                              onChange={(e) => setEditUserForm({ ...editUserForm, last_name: e.target.value })}
                              className="w-full bg-[#EBECE4] border-none rounded-full px-7 py-3.5 shadow-inner text-on-surface font-medium focus:ring-2 focus:ring-[#426500]/20 outline-none" 
                           />
                        </div>
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#4A6B10] mb-2 px-1">Email Address</label>
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
                        {loading ? "SAVING..." : "SAVE CHANGES"}
                     </button>
                  </div>
               </div>
            ) : (
               <div className="animate-fade-in">
                  <div className="flex items-center gap-4 mb-4">
                     <h4 className="text-3xl font-bold font-headline text-[#4A6B10]">{selectedUser?.first_name} {selectedUser?.last_name}</h4>
                     <span className={`px-6 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] ${status.class}`}>{status.label}</span>
                  </div>

                  <div className="bg-[#F2F3EB]/60 rounded-full p-1.5 shadow-inner flex items-center border border-white max-w-md mb-8">
                     <div className="bg-white rounded-full px-10 py-1.5 flex flex-col items-center flex-grow shadow-sm">
                        <p className="text-[9px] font-bold text-[#4A6B10]/50 uppercase tracking-[0.2em] leading-none mb-1">Points Balance:</p>
                        <span className="text-2xl font-bold text-[#426500] font-headline">{selectedUser?.points_balance || 0} pts</span>
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
                        <div className="absolute right-5 top-2.5 flex flex-col items-center leading-none text-on-surface-variant/40">
                           <span className="material-symbols-outlined text-[18px]">edit_square</span>
                           <span className="text-[8px] font-bold uppercase tracking-tighter">Edit</span>
                        </div>
                     </div>
                     <button
                        onClick={handleManualAddPoints}
                        disabled={loading}
                        className="bg-[#426500] text-white font-bold px-12 py-3.5 rounded-full text-sm shadow-md shadow-[#426500]/20 disabled:opacity-50 hover:bg-[#395800] transition-all active:scale-95"
                     >
                        {loading ? "..." : "Add Points"}
                     </button>
                  </div>

                  <div className="mt-8">
                     <p className="text-[11px] font-bold text-[#4A6B10] mb-5 pl-1 uppercase tracking-[0.1em]">Redeemable Offers:</p>
                     <div className="flex gap-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-36 h-24 bg-[#EEF4E4] rounded-[1.8rem] border border-white shadow-sm transition-all hover:scale-105 cursor-pointer"></div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            <div className="flex justify-end gap-3 mt-12 pb-2">
               <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-[#426500] text-white font-bold py-3 px-12 text-xs tracking-[0.1em] rounded-full shadow-md hover:bg-[#4a6b10] transition-all"
               >
                  DELETE USER
               </button>
               <button onClick={() => setViewMode("list")} className="bg-white border-2 border-[#D1D3C8] text-on-surface-variant/80 font-bold py-3 px-14 text-xs tracking-[0.1em] rounded-full hover:bg-surface-container-highest/20 transition-all">
                  EXIT
               </button>
            </div>
         </div>
      </div>
   );
};


