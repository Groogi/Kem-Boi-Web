function BonusEntryForm(){
    return(
        <aside className="xl:col-span-4 sticky top-8">
        <div className="bg-primary-container rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-on-primary-container mb-2">
            Award Bonus
            </h3>
            <p className="text-on-primary-container/70 text-sm mb-8 leading-relaxed">
            Instantly reward your most loyal avocados. This action is tracked in the
            store ledger.
            </p>
            <form className="space-y-6">
            <div>
                <label className="block text-xs font-bold text-on-primary-container uppercase tracking-widest mb-2 px-1">
                Customer Email
                </label>
                <input
                className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary/40 transition-all outline-none"
                placeholder="e.g. hello@kumboi.com"
                type="email"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-on-primary-container uppercase tracking-widest mb-2 px-1">
                Point Amount
                </label>
                <div className="relative">
                <input
                    className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary/40 transition-all outline-none pl-10"
                    placeholder={0.0}
                    type="number"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary text-sm">
                    star_rate
                </span>
                </div>
            </div>
            <button
                className="w-full bg-primary text-on-primary font-bold py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                type="submit"
            >
                <span>Add Bonus</span>
                <span className="material-symbols-outlined text-base">
                auto_awesome
                </span>
            </button>
            </form>
        </div>
        {/* Bento Stat Card */}
        <div className="mt-8 bg-surface-container-low rounded-lg p-6 flex items-center justify-between">
            <div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                Total Bonus Payout
            </p>
            <h4 className="text-3xl font-black text-on-surface">
                14.2k{" "}
                <span className="text-sm font-medium text-on-surface-variant">pts</span>
            </h4>
            </div>
            <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary">
                trending_up
            </span>
            </div>
        </div>
        </aside>

    )
}

export default BonusEntryForm