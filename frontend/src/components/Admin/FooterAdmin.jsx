function FooterAdmin(){
    return (
        <footer className="ml-64 bg-[#f7f7f2] dark:bg-[#1e201d] w-full rounded-t-[3rem] mt-20 flex flex-col md:flex-row justify-between items-center px-10 py-8 gap-4">
        <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#426500]">Kem Bơ</span>
            <span className="text-xs text-on-surface-variant font-medium">
            Digital Editorial
            </span>
        </div>
        <p className="font-body text-sm tracking-wide text-[#5a5c58] dark:text-[#adada9]">
            © 2024 Kem Bơ Digital Editorial
        </p>
        <div className="flex gap-6">
            <a
            className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors text-sm"
            href="#"
            >
            Privacy
            </a>
            <a
            className="text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors text-sm"
            href="#"
            >
            Terms
            </a>
        </div>
        </footer>
    )
}

export default FooterAdmin


