import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function TopAppBar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#f7f7f2]/70 dark:bg-[#2d2f2c]/70 backdrop-blur-xl border-b border-outline-variant/10">
            <div className="flex justify-between items-center px-6 py-4">
                <div className="text-2xl font-black text-[#426500] dark:text-[#c7fc79] tracking-tighter">
                    Kem Bơ
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a
                        className="text-[#426500] dark:text-[#c7fc79] font-bold border-b-2 border-[#426500] font-headline tracking-tight"
                        href="#"
                    >
                        Dashboard
                    </a>
                    <a
                        className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-opacity font-headline font-bold tracking-tight"
                        href="#"
                    >
                        History
                    </a>
                    <a
                        className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-opacity font-headline font-bold tracking-tight"
                        href="#"
                    >
                        Profile
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleLogout}
                        className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold hover:opacity-80 transition-opacity active:scale-95 duration-200"
                    >
                        Logout
                    </button>
                    <span
                        onClick={handleLogout}
                        className="material-symbols-outlined text-[#426500] text-3xl cursor-pointer"
                        data-icon="account_circle"
                        title="Logout"
                    >
                        account_circle
                    </span>
                </div>
            </div>
        </nav>
    )
}


export default TopAppBar


