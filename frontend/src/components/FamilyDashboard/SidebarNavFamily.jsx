function SidebarNavFamily(){

    return (
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col p-4 bg-[#f7f7f2] dark:bg-[#1e201d] pt-24">
        <div className="mb-8 px-4">
            <h2 className="text-xl font-bold text-[#426500]">Family Hub</h2>
            <p className="text-xs text-on-surface-variant font-medium tracking-wider">Member ID: #AVO-2024</p>
        </div>


        <nav className="flex flex-col gap-2">
            <a
            className="flex items-center gap-3 bg-[#ffffff] dark:bg-[#2d2f2c] text-[#426500] dark:text-[#c7fc79] rounded-full px-4 py-3 shadow-sm transition-colors duration-300"
            href="#"
            >
            <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 1' }}
            >
                dashboard
            </span>
            <span className="font-body text-sm">Dashboard</span>
            </a>
            <a
            className="flex items-center gap-3 text-[#5a5c58] dark:text-[#adada9] px-4 py-3 hover:bg-[#e8e9e3] dark:hover:bg-[#395800]/20 rounded-full transition-colors duration-300"
            href="#"
            >
            <span className="material-symbols-outlined">history</span>
            <span className="font-body text-sm">History</span>
            </a>
            <a
            className="flex items-center gap-3 text-[#5a5c58] dark:text-[#adada9] px-4 py-3 hover:bg-[#e8e9e3] dark:hover:bg-[#395800]/20 rounded-full transition-colors duration-300"
            href="#"
            >
            <span className="material-symbols-outlined">redeem</span>
            <span className="font-body text-sm">Giveaways</span>
            </a>
            <a
            className="flex items-center gap-3 text-[#5a5c58] dark:text-[#adada9] px-4 py-3 hover:bg-[#e8e9e3] dark:hover:bg-[#395800]/20 rounded-full transition-colors duration-300"
            href="#"
            >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body text-sm">Settings</span>
            </a>
        </nav>
        </aside>

    )
}

export default SidebarNavFamily


