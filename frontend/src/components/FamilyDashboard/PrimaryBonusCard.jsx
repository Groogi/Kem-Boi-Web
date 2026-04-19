function PrimaryBonusCard(){
    return (
        <div className="md:col-span-2 bg-surface-container-lowest rounded-lg p-8 flex flex-col justify-between relative overflow-hidden group">
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-primary mb-1">
                    Buy 5, Get 1 Free
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                    Current Progress: 3 / 5 Smoothies
                    </p>
                </div>
                <span
                    className="material-symbols-outlined active-icon text-primary-dim text-4xl">
                    local_drink
                </span>
                </div>
            </div>
        </div>
    )
}

export default PrimaryBonusCard


