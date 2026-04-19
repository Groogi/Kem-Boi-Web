function MobileBottomNavbar(){
    return (
        <nav className="md:hidden fixed bottom-0 w-full bg-[#f7f7f2]/90 backdrop-blur-xl flex justify-around items-center py-4 px-6 z-50 rounded-t-2xl">
        <a className="flex flex-col items-center gap-1 text-[#426500]" href="#">
            <span className="material-symbols-outlined active-icon">dashboard</span>
            <span className="text-[10px] font-bold">Home</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#5a5c58]" href="#">
            <span className="material-symbols-outlined">history</span>
            <span className="text-[10px] font-medium">History</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#5a5c58]" href="#">
            <span className="material-symbols-outlined">redeem</span>
            <span className="text-[10px] font-medium">Giveaway</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#5a5c58]" href="#">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="text-[10px] font-medium">Profile</span>
        </a>
        </nav>
    )
}

export default MobileBottomNavbar


