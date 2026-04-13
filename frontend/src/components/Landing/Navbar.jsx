import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-[#f7f7f2]/70 dark:bg-[#2d2f2c]/70 backdrop-blur-xl">
            <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                <div className="text-2xl font-black text-[#426500] dark:text-[#c7fc79] tracking-tighter font-['Plus_Jakarta_Sans']">
                    Kem Bơ
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a className="text-[#426500] dark:text-[#c7fc79] font-bold border-b-2 border-[#426500] font-['Plus_Jakarta_Sans'] text-sm transition-opacity hover:opacity-80" href="#menu">Menu</a>
                    <a className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] font-['Plus_Jakarta_Sans'] text-sm transition-opacity" href="#benefits">Benefits</a>
                    <a className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] font-['Plus_Jakarta_Sans'] text-sm transition-opacity" href="#locations">Locations</a>
                    <a className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] font-['Plus_Jakarta_Sans'] text-sm transition-opacity" href="#story">Story</a>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/login" className="material-symbols-outlined text-[#5a5c58] hover:text-[#426500] transition-colors">account_circle</Link>
                    <button className="bg-[#426500] text-[#dbffa4] px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 active:scale-95 duration-200">
                        Order Now
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar