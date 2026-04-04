function ProgressBar(){
    return (
        <>
        <div className="flex gap-2 mb-8">
        <div className="h-3 flex-1 bg-primary rounded-full" />
        <div className="h-3 flex-1 bg-primary rounded-full" />
        <div className="h-3 flex-1 bg-primary rounded-full" />
        <div className="h-3 flex-1 bg-surface-container rounded-full" />
        <div className="h-3 flex-1 bg-surface-container rounded-full" />
        </div>
        <button className="w-fit px-8 py-3 bg-primary text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            Claim Progress
        </button>
        </>
    )
}

export default ProgressBar