function SubNav() {
  return (
    <>
      <div>
        <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
          Bonus Management
        </h2>
        <p className="text-on-surface-variant max-w-xl">
          Curate your community rewards and manage loyalty points with editorial precision.
        </p>
      </div>
      <nav className="flex p-1 bg-surface-container-low rounded-full">
        <button className="px-6 py-2 rounded-full bg-surface-container-lowest shadow-sm text-primary font-bold text-sm">
          User List
        </button>
        <button className="px-6 py-2 rounded-full text-on-surface-variant hover:text-primary font-medium text-sm transition-colors">
          Rewards
        </button>
        <button className="px-6 py-2 rounded-full text-on-surface-variant hover:text-primary font-medium text-sm transition-colors">
          Analytics
        </button>
      </nav>
    </>
  )
}

export default SubNav
