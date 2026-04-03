function Locations(){
    return (
        <section className="py-24 bg-surface-container-low" id="locations">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-surface-container-lowest rounded-lg p-12 flex flex-col lg:flex-row gap-12 editorial-shadow">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-bold font-headline mb-6">Find Our Atelier</h2>
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined">location_on</span>
                                    The Flagship Stall
                                </h4>
                                <p className="text-2xl text-on-surface font-headline leading-tight">128 Nguyễn Trãi, District 1<br />Ho Chi Minh City, Vietnam</p>
                            </div>
                            <div className="pt-6 border-t border-outline-variant/10">
                                <p className="text-on-surface-variant mb-6 italic">"A small slice of Dalat's misty hills in the heart of the bustling city."</p>
                                <button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-full font-bold flex items-center gap-3 hover:opacity-90 transition-all">
                                    <span className="material-symbols-outlined">map</span>
                                    Open in Maps
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 min-h-[400px] bg-surface-container rounded-lg relative overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi-TXerLhKLyHtlbmNSZDURugTSFFxFn_qUlHSAgOO24znbTMbyErMMMEM41Q6Dor7FRtDFdsQ0C3abRnqTOhBO9K4HBfTjnjckeAYzgP79WIieR_TZ0tDsKycX65EI65JURNSZWGpX7ER0l4Kvek_Krsj0kvZianEyZpCICDnJHCjSbBcAQJHzSGRFVfIQf1AOlE8pAd35bSrT1GW7N0Ck4LWvy5AtimB9Wp20JzzQ7TbdWASJFgrtWW-aHFKrKBsaQH5X9IP317M"
                            alt="Stylized map showing Ho Chi Minh City location"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Locations