import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function SideNavbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen flex flex-col p-4 bg-[#f7f7f2] dark:bg-[#1e201d] h-full w-64 border-r-0 z-40">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-bold text-[#426500] tracking-tight">Kem Bơ Admin</h1>
        <p className="text-xs text-on-surface-variant font-medium">Store Manager</p>
      </div>
      <nav className="flex flex-col gap-2 flex-1">
        <a
          className="flex items-center gap-3 bg-[#ffffff] dark:bg-[#2d2f2c] text-[#426500] dark:text-[#c7fc79] rounded-full px-4 py-3 shadow-sm transition-colors duration-300"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-medium text-sm">Dashboard</span>
        </a>
        <a
          className="flex items-center gap-3 text-[#5a5c58] dark:text-[#adada9] px-4 py-3 hover:bg-[#e8e9e3] dark:hover:bg-[#395800]/20 rounded-full transition-colors duration-300"
          href="#"
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-medium text-sm">Inventory</span>
        </a>
        <a
          className="flex items-center gap-3 text-[#5a5c58] dark:text-[#adada9] px-4 py-3 hover:bg-[#e8e9e3] dark:hover:bg-[#395800]/20 rounded-full transition-colors duration-300"
          href="#"
        >
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="font-medium text-sm">Orders</span>
        </a>
        <a
          className="flex items-center gap-3 text-[#5a5c58] dark:text-[#adada9] px-4 py-3 hover:bg-[#e8e9e3] dark:hover:bg-[#395800]/20 rounded-full transition-colors duration-300"
          href="#"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-medium text-sm">Settings</span>
        </a>
      </nav>
      <div className="mt-auto p-4 bg-surface-container-lowest rounded-lg flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
            AD
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">Admin Profile</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Master</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-2 py-2 bg-error-container text-on-error-container rounded-full text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default SideNavbar
