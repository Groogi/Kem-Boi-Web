function FooterFamily(){
    return (
        <footer className="w-full rounded-t-[3rem] mt-20 bg-[#f7f7f2] dark:bg-[#1e201d]">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 py-12 gap-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2">
            <div className="text-lg font-bold text-[#426500]">Kem Bơ</div>
            <p className="font-body text-sm tracking-wide text-[#5a5c58] dark:text-[#adada9]">
                © 2024 Kem Bơ Digital Editorial
            </p>
            </div>
            <div className="flex gap-8">
            <a
                className="font-body text-sm tracking-wide text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors"
                href="#"
            >
                Instagram
            </a>
            <a
                className="font-body text-sm tracking-wide text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors"
                href="#"
            >
                Location
            </a>
            <a
                className="font-body text-sm tracking-wide text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors"
                href="#"
            >
                Privacy
            </a>
            <a
                className="font-body text-sm tracking-wide text-[#5a5c58] dark:text-[#adada9] hover:text-[#426500] transition-colors"
                href="#"
            >
                Terms
            </a>
            </div>
        </div>
        </footer>
    )
}

export default FooterFamily


