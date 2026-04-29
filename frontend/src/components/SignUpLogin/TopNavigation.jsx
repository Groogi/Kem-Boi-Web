function TopNav() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
      <a className="text-2xl font-black text-primary tracking-tighter font-headline" href="/">
        Kem Bơ
      </a>
      <a
        className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
        href="#"
      >
        Back to home
      </a>
    </nav>
  )
}
export default TopNav
