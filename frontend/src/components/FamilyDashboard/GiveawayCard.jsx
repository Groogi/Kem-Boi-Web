function GiveawayCard(){
    return (
        <div className="bg-tertiary-container rounded-lg p-8 flex flex-col justify-between border-none">
        <div>
            <span
            className="material-symbols-outlined text-tertiary mb-4 text-3xl"
            data-icon="featured_seasonal"
            >
            featured_seasonal_and_gifts
            </span>
            <h3 className="text-xl font-bold text-on-tertiary-container mb-2">
            Weekend Giveaway
            </h3>
            <p className="text-on-tertiary-fixed-variant text-sm leading-relaxed">
            Join our Saturday Raffle for a chance to win a limited edition "Avocado
            Atelier" tote bag!
            </p>
        </div>
        <div className="mt-6">
            <div className="text-xs font-bold text-tertiary uppercase tracking-widest mb-4">
            Ends in 02:45:12
            </div>
            <button className="w-full py-3 bg-surface-container-lowest text-tertiary rounded-full font-bold hover:bg-surface-container-low transition-colors">
            Enter Now
            </button>
        </div>
        </div>
    )
}

export default GiveawayCard


