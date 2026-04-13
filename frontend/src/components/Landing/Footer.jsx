function Footer(){
    return (
      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#f1f1ec] dark:bg-[#1e201d]">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 py-12 gap-8 max-w-7xl mx-auto">
          <div className="text-lg font-bold text-[#426500] font-['Plus_Jakarta_Sans']">
            Kem Bơ
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-['Be_Vietnam_Pro'] text-sm tracking-wide">
            <a className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors" href="#">Instagram</a>
            <a className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors" href="#">Location</a>
            <a className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors" href="#">Privacy</a>
            <a className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors" href="#">Terms</a>
          </div>
          <div className="text-[#5a5c58] dark:text-[#adada9] text-xs font-['Be_Vietnam_Pro']">
            © 2024 Kem Bơ Digital Editorial
          </div>
        </div>
      </footer>        
    )
}

export default Footer