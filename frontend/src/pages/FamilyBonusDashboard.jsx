import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../api/auth";

function FamilyBonusDashboard() {
  const { user, token, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // View state: 'dashboard', 'rewards', 'giveaways', 'reward-details', 'edit-account'
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [giveaways, setGiveaways] = useState([]);

  useEffect(() => {
    const fetchGiveaways = async () => {
      try {
        const res = await fetch("/api/giveaways", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        setGiveaways(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch giveaways", err);
      }
    };
    if (token) fetchGiveaways();
  }, [token]);

  const getStatusBadge = (points) => {
    if (points >= 1500) return { label: 'PLATINUM', class: 'bg-[#4A6B10] text-white shadow-md' };
    if (points >= 1000) return { label: 'GOLD', class: 'bg-primary text-white shadow-sm' };
    if (points >= 500) return { label: 'SILVER', class: 'bg-[#DFEECA] text-[#4A6B10]' };
    return { label: 'BRONZE', class: 'bg-[#EEF4E4] text-[#4A6B10]/60' };
  };

  const status = getStatusBadge(user?.points_balance || 0);

  // Form state
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    date_of_birth: user?.date_of_birth || ""
  });

  // Punch Card Logic: 1 punch per 200 points, 6 punches = reward
  const POINTS_PER_PUNCH = 200;
  const totalPunches = 6;
  const currentPunches = Math.floor((user?.points_balance || 0) / POINTS_PER_PUNCH) % totalPunches;
  const moreToGo = totalPunches - currentPunches;

  const handleSave = async () => {
    setLoading(true);
    setSaveStatus("");
    try {
      const updatedUser = await updateProfile(formData, token);
      updateUser(updatedUser);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Reusable header navigation
  const renderHeader = () => (
    <header className={`flex justify-between items-center py-8 mb-6 border-outline-variant/10 ${activeTab === 'edit-account' ? 'border-b-0' : 'border-b'}`}>
      <div className="text-3xl font-headline font-bold text-primary">
        Kem Boi
      </div>
      
      {activeTab !== 'edit-account' && (
        <>
          <div className="hidden md:flex gap-10 text-[15px] font-semibold mt-2">
            <div className="relative group cursor-pointer" onClick={() => setActiveTab("dashboard")}>
              <span className={`transition-colors ${activeTab === 'dashboard' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>
                Dashboard
              </span>
              {activeTab === 'dashboard' && <div className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-primary"></div>}
            </div>
            
            <div className="relative group cursor-pointer" onClick={() => setActiveTab("rewards")}>
              <span className={`transition-colors ${activeTab === 'rewards' || activeTab === 'reward-details' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>
                Rewards
              </span>
              {activeTab === 'rewards' || activeTab === 'reward-details' ? <div className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-primary"></div> : null}
            </div>

            <div className="relative group cursor-pointer" onClick={() => setActiveTab("giveaways")}>
              <span className={`transition-colors ${activeTab === 'giveaways' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>
                Giveaways
              </span>
              {activeTab === 'giveaways' && <div className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-primary"></div>}
            </div>
          </div>

           <div className="flex items-center gap-4">
              <div 
                onClick={() => setActiveTab('edit-account')}
                className="flex items-center gap-3 bg-white/40 pr-4 pl-1 py-1 rounded-full border border-white/60 cursor-pointer hover:bg-white/60 transition-colors shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-[#e8ebe3] font-bold">
                    <span className="material-symbols-outlined text-[1.2rem]">person</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-primary leading-tight">
                      {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : "Full Name"}
                    </span>
                    <span className="text-xs text-on-surface-variant/70 leading-tight capitalize">{user?.role || 'Member'}</span>
                </div>
              </div>

              <button 
                onClick={() => { logout(); navigate("/"); }}
                className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-primary border border-white/60 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                title="Logout"
              >
                <span className="material-symbols-outlined text-[1.2rem] pointer-events-none">logout</span>
              </button>
           </div>
        </>
      )}
    </header>
  );

  const renderBottomNav = () => (
    <div className="fixed bottom-0 left-0 w-full bg-[#fcfdf9]/90 backdrop-blur-md border-t border-outline-variant/10 px-6 py-3 flex justify-around items-center md:hidden z-50">
      <button 
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-primary' : 'text-on-surface-variant/60'}`}
      >
        <span className="material-symbols-outlined text-[24px]">home</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('rewards')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'rewards' || activeTab === 'reward-details' ? 'text-primary' : 'text-on-surface-variant/60'}`}
      >
        <span className="material-symbols-outlined text-[24px]">emoji_events</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Rewards</span>
      </button>

      <button 
        onClick={() => setActiveTab('giveaways')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'giveaways' ? 'text-primary' : 'text-on-surface-variant/60'}`}
      >
        <span className="material-symbols-outlined text-[24px]">redeem</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">WINS</span>
      </button>

      <button 
        onClick={() => setActiveTab('edit-account')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'edit-account' ? 'text-primary' : 'text-on-surface-variant/60'}`}
      >
        <span className="material-symbols-outlined text-[24px]">person</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
      </button>
    </div>
  );


  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-[#DFEECA] rounded-[1.5rem] p-8 md:p-10 shadow-sm border border-white/40">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
          Welcome to your Kem Boi Dashboard, {user?.first_name || 'Family member'}!
        </h1>
        <p className="text-on-surface-variant font-medium text-lg md:text-xl opacity-80">Stay on top of your rewards, and never miss a giveaway.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Points Balance */}
        <div className="bg-primary rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
             <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold font-headline">Points Balance:</h2>
                <span className={`px-5 py-1.5 rounded-full text-[10px] font-bold tracking-widest ${status.class} shadow-lg shadow-black/10 transition-transform active:scale-95`}>
                   {status.label}
                </span>
             </div>
             <div className="text-7xl md:text-[5.5rem] font-bold font-headline text-center my-8 tracking-tighter text-[#e7eed8] drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                {user?.points_balance || 0} pt<span className="text-5xl md:text-6xl">s</span>
             </div>
          </div>
          <p className="text-base font-semibold leading-relaxed opacity-90 mt-4 max-w-[280px] relative z-10 italic">
            "Keep sipping, you're only {status.label === 'PLATINUM' ? 'mastering the art' : (status.label === 'GOLD' ? '500 pts' : 'a few drinks')} away from the next tier!"
          </p>
          
          {/* Subtle background decoration */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
        </div>

        {/* Punch Card Tracker */}
        <div className="bg-primary rounded-[1.5rem] p-8 md:p-10 text-white shadow-md flex flex-col justify-between">
           <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2">Buy 5, Get 1 Free</h2>
              <p className="text-lg font-medium opacity-90 mb-8 font-headline">
                {moreToGo === 0 ? "Reward Ready to Claim!" : `Only ${moreToGo} more punch${moreToGo > 1 ? 'es' : ''} to go!`}
              </p>
              
              {/* Punch circles */}
              <div className="flex justify-between items-center gap-3 mb-10">
                 {[1, 2, 3, 4, 5, 6].map((idx) => (
                    <div key={idx} className={`h-4 lg:h-5 flex-1 rounded-full shadow-inner ${idx <= currentPunches ? 'bg-[#c3e68c]' : 'bg-[#e2ead3]'}`}></div>
                 ))}
              </div>
           </div>
           
           <div className="flex justify-center">
              <button 
                disabled={moreToGo > 0} 
                className={`font-bold py-3.5 px-10 rounded-full text-lg tracking-wide transition-all ${moreToGo === 0 ? 'bg-[#c3e68c] text-primary shadow-lg hover:scale-105 active:scale-95' : 'bg-[#d5dfc5] text-primary/40 cursor-not-allowed'}`}
              >
                 {moreToGo === 0 ? 'Claim Reward' : 'Claim Offer'}
              </button>
           </div>
        </div>
      </div>

      {/* Action Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div onClick={() => setActiveTab('rewards')} className="bg-transparent border border-outline-variant/30 rounded-[1.5rem] p-8 shadow-sm flex justify-between items-start cursor-pointer hover:bg-[#e0e2d6]/50 transition-colors group">
           <div className="pr-4">
             <h3 className="text-primary font-bold font-headline text-2xl mb-3 group-hover:underline">Claim Your Rewards</h3>
             <p className="text-base text-on-surface-variant/80 font-medium">View and redeem your rewards here.</p>
           </div>
           <span className="material-symbols-outlined text-[2rem] text-primary">emoji_events</span>
        </div>

        <div onClick={() => setActiveTab('giveaways')} className="bg-transparent border border-outline-variant/30 rounded-[1.5rem] p-8 shadow-sm flex justify-between items-start cursor-pointer hover:bg-[#e0e2d6]/50 transition-colors group">
           <div className="pr-4">
             <h3 className="text-primary font-bold font-headline text-2xl mb-3 group-hover:underline">Win a Free Kem Boi Tote Bag</h3>
             <p className="text-base text-on-surface-variant/80 font-medium">Keep up to date with current and upcoming giveaways here.</p>
           </div>
           <span className="material-symbols-outlined text-[2rem] text-primary">redeem</span>
        </div>
      </div>

    </div>
  );

  const renderGiveaways = () => {
    const activeGiveaways = giveaways.filter(g => g.active);
    const upcomingGiveaways = giveaways.filter(g => !g.active);

    return (
      <div className="space-y-10 animate-fade-in pb-12">
        <div>
           <h2 className="text-xl font-bold font-headline text-on-surface mb-6">Current Giveaways</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeGiveaways.length === 0 ? (
                 <p className="text-on-surface-variant/60 font-medium col-span-full">No active giveaways at the moment. Check back soon!</p>
              ) : (
                 activeGiveaways.map((g, idx) => (
                    <div key={idx} className="bg-[#E4ECD5] rounded-2xl p-6 shadow-sm flex flex-col border border-white/20 min-h-[180px]">
                       <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-primary text-lg font-headline">{g.title}</h3>
                          <span className="material-symbols-outlined text-primary text-xl">redeem</span>
                       </div>
                       <p className="text-sm text-on-surface-variant font-medium opacity-80 mb-8 flex-grow pr-8">
                          {g.participation_conditions || g.conditions || g.description}
                       </p>
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-bold text-primary/60 tracking-widest uppercase">Ends {g.end_date}</span>
                          <button className="bg-primary text-white font-bold py-1.5 px-6 text-xs tracking-wider rounded-md hover:bg-[#395800] transition-colors shadow-sm">
                             ENTER
                          </button>
                       </div>
                    </div>
                 ))
              )}
           </div>
        </div>

        <div>
           <h2 className="text-xl font-bold font-headline text-on-surface mb-6">Upcoming Giveaways</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingGiveaways.length === 0 ? (
                 <p className="text-on-surface-variant/60 font-medium col-span-full">No upcoming giveaways.</p>
              ) : (
                 upcomingGiveaways.map((g, idx) => (
                    <div key={idx} className="bg-surface-container-highest/30 rounded-2xl p-6 shadow-sm flex flex-col border border-outline-variant/10 opacity-70 min-h-[180px]">
                       <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-on-surface-variant text-lg font-headline mb-1">{g.title}</h3>
                       </div>
                       <p className="text-sm text-on-surface-variant font-medium opacity-80 mb-8 flex-grow pr-8">
                          {g.participation_conditions || g.conditions || g.description}
                       </p>
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-bold text-on-surface-variant/60 tracking-widest uppercase">Starts {g.start_date}</span>
                          <button disabled className="bg-transparent border border-outline-variant/40 text-on-surface-variant/60 font-bold py-1.5 px-6 text-xs tracking-wider rounded-full">
                             PREVIEW
                          </button>
                       </div>
                    </div>
                 ))
              )}
           </div>
        </div>
      </div>
    );
  };

  const renderRewards = () => (
    <div className="space-y-10 animate-fade-in pb-12">
       <div>
          <h2 className="text-xl font-bold font-headline text-on-surface mb-6">Redeemable Offers:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
             <div onClick={() => setActiveTab('reward-details')} className="bg-[#E4ECD5] rounded-[1.5rem] p-6 shadow-sm flex flex-col cursor-pointer border border-primary/10 hover:border-[#426500]/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-on-surface text-lg font-headline">Refer A Friend</h3>
                   <span className="material-symbols-outlined text-on-surface-variant/70 text-[26px]">sell</span>
                </div>
                <p className="text-sm text-on-surface-variant font-medium opacity-80 mb-8 flex-grow pr-4">
                   Sweet Treats are better with a friend.
                </p>
                <div className="flex justify-end pt-2">
                   <button className="bg-primary text-white font-bold py-2 px-8 text-[11px] tracking-wider rounded-full hover:bg-[#395800] transition-colors shadow-sm">
                      CLAIM
                   </button>
                </div>
             </div>

             <div className="bg-[#E4ECD5] rounded-[1.5rem] p-6 shadow-sm flex flex-col border border-primary/10">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-on-surface text-lg font-headline">Loyalty Level Up</h3>
                   <span className="material-symbols-outlined text-on-surface-variant/70 text-[26px]">sell</span>
                </div>
                <p className="text-sm text-on-surface-variant font-medium opacity-80 mb-8 flex-grow pr-4">
                   Loyalty hits different when its sweet.
                </p>
                <div className="flex justify-end pt-2">
                   <button className="bg-primary text-white font-bold py-2 px-8 text-[11px] tracking-wider rounded-full hover:bg-[#395800] transition-colors shadow-sm">
                      CLAIM
                   </button>
                </div>
             </div>
          </div>
       </div>

       <div>
          <h2 className="text-xl font-bold font-headline text-on-surface mb-6">Upcoming Offers:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
             <div className="bg-surface-container-highest/20 rounded-[1.5rem] p-6 shadow-sm flex flex-col border border-outline-variant/10">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-on-surface-variant text-lg font-headline">Birthday Surprise</h3>
                   <span className="material-symbols-outlined text-on-surface-variant opacity-60 text-[26px]">cake</span>
                </div>
                <p className="text-sm text-on-surface-variant font-medium opacity-70 mb-8 flex-grow pr-4">
                   A special treat for your special day.
                </p>
                <div className="flex justify-end pt-2">
                   <button disabled className="bg-transparent border-2 border-outline-variant/30 text-on-surface-variant/60 font-bold py-1.5 px-6 text-[11px] tracking-wider rounded-full">
                      LOCKED
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderRewardDetails = () => (
    <div className="animate-fade-in flex justify-center pb-12 mt-4">
       <div className="w-full bg-[#DFEECA] rounded-[1.5rem] p-10 md:p-14 shadow-sm flex flex-col border border-white/40 min-h-[400px]">
          
          <div className="flex-grow">
            <h2 className="font-bold text-primary text-3xl font-headline mb-1">Refer A Friend</h2>
            <p className="text-on-surface-variant font-medium opacity-80 mb-8 text-lg">
               Sweet Treats are better with a friend.
            </p>

            <h3 className="font-bold text-primary text-xl font-headline mt-12 mb-1">Participation Details:</h3>
            <p className="text-on-surface-variant font-medium opacity-80 text-base max-w-sm">
               Earn double points for every successful friend invite.
            </p>
          </div>

          <div className="flex justify-between items-end mt-12">
             <span className="text-[15px] font-medium text-on-surface-variant opacity-80">
                Expires 02:25:30
             </span>
             <button className="bg-primary text-white font-bold py-3 px-10 text-sm tracking-widest rounded-full hover:bg-[#395800] transition-colors shadow-md shadow-[#426500]/20">
                CLAIM
             </button>
          </div>
       </div>
    </div>
  );

  const renderEditAccount = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in pb-12 pt-2">
       {/* Left Panel */}
       <div className="col-span-1 flex flex-col h-full">
           <div className="bg-[#fcfdf9] rounded-[1.5rem] p-6 shadow-sm border border-outline-variant/30 flex-grow">
              {/* Profile Box */}
              <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#426500] flex flex-col justify-center items-center text-white text-3xl font-bold border-4 border-white shadow-sm">
                     <span className="material-symbols-outlined text-[2.5rem]">person</span>
                  </div>
                  <div>
                     <h3 className="font-bold text-[#426500] text-2xl font-headline tracking-tight">
                       {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : "Full Name"}
                     </h3>
                     <p className="text-[13px] font-bold text-on-surface-variant opacity-80">{user?.account_id ? `#${user.account_id}` : '#account_ID'}</p>
                  </div>
              </div>

              {/* Nav selector */}
              <div className="bg-white border-2 border-[#e5e7e1] rounded-full px-5 py-3 flex items-center gap-3 text-[#426500] font-bold shadow-sm cursor-pointer shadow-black/5">
                 <span className="material-symbols-outlined font-bold text-xl">account_circle</span>
                 <span className="text-base text-[#4a6b10]">Personal Details</span>
              </div>
           </div>
           
           <div className="text-center pt-3 pb-8">
              <button onClick={() => setActiveTab('dashboard')} className="text-[#63665e] font-bold text-[13px] tracking-wide hover:underline hover:text-[#426500] transition-colors">
                 Back to Dashboard
              </button>
           </div>
       </div>

       {/* Right Panel (Form) */}
       <div className="col-span-1 lg:col-span-2 bg-[#fcfdf9] rounded-[1.5rem] p-8 md:p-10 shadow-sm border border-outline-variant/30 flex flex-col h-full min-h-[460px]">
          <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-[#426500] font-headline">Personal Details</h2>
              <span className="border-2 border-[#dbdfd2] bg-[#edf2e6] text-[#4a5440] font-extrabold text-[11px] tracking-widest px-4 py-1.5 rounded-full shadow-inner uppercase">{user?.role}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 flex-grow">
              {/* First Name */}
              <div className="col-span-1">
                  <label className="block text-[14px] font-bold text-[#63665e] mb-2 ml-[2px]">First Name</label>
                  <div className="relative">
                      <input 
                        type="text" 
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                        className="w-full bg-[#dcdcd8] border-none rounded-full px-5 py-3.5 focus:ring-2 focus:ring-[#426500]/40 transition-shadow text-[#555] font-semibold text-sm" 
                      />
                      <span className="material-symbols-outlined absolute right-4 top-3.5 text-on-surface-variant/60 text-[20px] pointer-events-none">edit_square</span>
                  </div>
              </div>
              
              {/* Last Name */}
              <div className="col-span-1">
                  <label className="block text-[14px] font-bold text-[#63665e] mb-2 ml-[2px]">Last Name</label>
                  <div className="relative">
                      <input 
                        type="text" 
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                        className="w-full bg-[#dcdcd8] border-none rounded-full px-5 py-3.5 focus:ring-2 focus:ring-[#426500]/40 transition-shadow text-[#555] font-semibold text-sm" 
                      />
                      <span className="material-symbols-outlined absolute right-4 top-3.5 text-on-surface-variant/60 text-[20px] pointer-events-none">edit_square</span>
                  </div>
              </div>
              
              {/* Email Address */}
              <div className="col-span-1 md:col-span-2">
                  <label className="block text-[14px] font-bold text-[#63665e] mb-2 ml-[2px]">Email Address</label>
                  <div className="relative">
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#dcdcd8] border-none rounded-full px-5 py-3.5 focus:ring-2 focus:ring-[#426500]/40 transition-shadow text-[#555] font-semibold text-sm" 
                      />
                      <span className="material-symbols-outlined absolute right-4 top-3.5 text-on-surface-variant/60 text-[20px] pointer-events-none">edit_square</span>
                  </div>
              </div>

              {/* Phone */}
              <div className="col-span-1">
                  <label className="block text-[14px] font-bold text-[#63665e] mb-2 ml-[2px]">Phone Number(Optional)</label>
                  <div className="relative">
                      <input 
                        type="text" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#dcdcd8] border-none rounded-full px-5 py-3.5 focus:ring-2 focus:ring-[#426500]/40 transition-shadow text-[#555] font-semibold text-sm" 
                      />
                      <span className="material-symbols-outlined absolute right-4 top-3.5 text-on-surface-variant/60 text-[20px] pointer-events-none">edit_square</span>
                  </div>
              </div>

              {/* D.O.B. */}
              <div className="col-span-1">
                  <label className="block text-[14px] font-bold text-[#63665e] mb-2 ml-[2px]">D.O.B. (Optional)</label>
                  <div className="relative">
                      <input 
                        type="date" 
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                        className="w-full bg-[#dcdcd8] border-none rounded-full px-5 py-3.5 focus:ring-2 focus:ring-[#426500]/40 transition-shadow text-[#555] font-semibold text-sm" 
                      />
                       <div className="absolute right-4 top-[10px] flex flex-col items-center leading-none text-on-surface-variant/40 select-none pointer-events-none">
                          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                          <span className="text-[7px] font-bold uppercase mt-0.5">Edit</span>
                       </div>
                  </div>
              </div>
          </div>

          <div className="flex justify-end gap-3 mt-10 pt-4">
              {saveStatus === "success" && <span className="text-[#426500] font-bold self-center mr-4 animate-fade-in text-sm">Profile updated successfully!</span>}
              {saveStatus === "error" && <span className="text-red-600 font-bold self-center mr-4 animate-fade-in text-sm text-right">Update failed.<br/>Check required fields.</span>}
              <button 
                onClick={handleSave}
                disabled={loading}
                className="bg-[#426500] text-white font-bold py-2.5 px-8 text-[15px] tracking-wide rounded-full shadow-md shadow-[#426500]/30 hover:bg-[#4a6b10] transition-colors hover:-translate-y-0.5 duration-200 disabled:opacity-50"
              >
                 {loading ? "Saving..." : "Save"}
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
  );

  return (
    <div className="min-h-screen bg-[#EBECE4] font-body text-on-surface selection:bg-[#c7fc79] selection:text-[#304c00]">
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10">
        {renderHeader()}
        
        <main className="mt-4 pb-24 md:pb-0">
           {activeTab === 'dashboard' && renderDashboard()}
           {activeTab === 'giveaways' && renderGiveaways()}
           {activeTab === 'rewards' && renderRewards()}
           {activeTab === 'reward-details' && renderRewardDetails()}
           {activeTab === 'edit-account' && renderEditAccount()}
        </main>

        {renderBottomNav()}
      </div>
    </div>
  );
}

export default FamilyBonusDashboard;


