function LockedBonusCard({icon, title, description}){
    return (
        <div className="bg-surface-container-low rounded-lg p-6 opacity-60 grayscale border border-dashed border-outline-variant/30">
        <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
            <span className="text-[10px] font-bold bg-surface-container-highest px-2 py-1 rounded text-on-surface">LOCKED</span>
        </div>
        <h4 className="font-bold text-on-surface-variant mb-2">{title}</h4>
        <p className="text-xs text-on-surface-variant leading-relaxed">{description}</p>
        </div>
    )
}

function ComingSoonGrid(){
    return(
        <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Coming Soon Bonuses</h2>
                <div className="h-px flex-grow mx-6 bg-surface-container"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <LockedBonusCard icon="cake" title="Birthday Surprise" description="Unlock a premium dessert on your special day." />
                <LockedBonusCard icon="group" title="Refer a Friend" description="Earn double points for every successful invite." />
                <LockedBonusCard icon="eco" title="Eco-Warrior" description="Bring your own jar and get a 10% discount." />
                <LockedBonusCard icon="volunteer_activism" title="Loyalty Level Up" description="Reached after 10 smoothie orders in a month." />
            </div>
        </section>        
    )
}

export default ComingSoonGrid


