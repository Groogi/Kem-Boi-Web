function Registration(){
    return (
        <section className="py-32 bg-surface" id="benefits">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative rounded-lg overflow-hidden group">
                    <img
                        className="w-full h-[600px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-1000"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDmtph2Ypo7vMiz5He-AxU7tfbCP-Fe9f0ft4kspDtUQ45j13tEWiQ7JS5GjWDWwOO2Hw8XYArzH9BIoXyi_3xnGECXuYKFDmaD61_3KOTSPBdFP6o5V2Q58jGOTYfZ5s_ICdOOeM3GGvLLeQgpdFfz5Y-bkAlTDwsC_r8gYvSGxy1-LOm2dRc4HLVK2hOaKimR35ArkU6kKNpmceBIjSS-fFzTgBbbJ-mk5N_tLoIg5RuYBAj3bzGslIx9Y2DDvN7yZEng6qyWTb1"
                        alt="Vibrant tropical lifestyle photo of people enjoying avocado desserts in a modern cafe"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex flex-col justify-end p-12">
                        <h3 className="text-on-primary text-3xl font-bold mb-2">Rewards for the Soul</h3>
                        <p className="text-on-primary/80">Every cup brings you closer to exclusive giveaways and avocado-themed bonuses.</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-bold font-headline mb-8">Join the Kem Bơ Family</h2>
                    <ul className="space-y-6 mb-12">
                        <li className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <div>
                                <h4 className="font-bold text-on-surface">Weekly Giveaways</h4>
                                <p className="text-on-surface-variant text-sm">Win limited edition toppings and custom glassware.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <div>
                                <h4 className="font-bold text-on-surface">Loyalty Rewards</h4>
                                <p className="text-on-surface-variant text-sm">Every 5th dessert is on us. Forever.</p>
                            </div>
                        </li>
                    </ul>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-on-surface-variant ml-2">Email Address</label>
                            <input className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all" placeholder="hello@example.com" type="email" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-on-surface-variant ml-2">Password</label>
                            <input className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all" placeholder="••••••••" type="password" />
                        </div>
                        <button className="w-full bg-primary text-on-primary py-4 rounded-full font-bold text-lg editorial-shadow hover:bg-primary-dim transition-all mt-4">
                            Create Free Account
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration