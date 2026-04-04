import { useAuth } from "../../context/AuthContext";

function WelcomeSectionFamily(){
    const { user } = useAuth();
    const displayName = user?.name ? user.name.split(' ')[0] : 'Friend';

    return (
        <header className="mb-12">
        <div className="relative overflow-hidden bg-primary-container rounded-xl p-8 lg:p-12">
            <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-bold mb-4">
                GOLD MEMBER
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-primary-container tracking-tight leading-tight mb-4">
                Welcome to the Family, {displayName}!
            </h1>
            <p className="text-on-secondary-container text-lg max-w-md opacity-90">
                You're only 2 smoothies away from your next free treat. Keep the avocado

                energy flowing!
            </p>
            </div>
        </div>
        </header>
    )
}

export default WelcomeSectionFamily