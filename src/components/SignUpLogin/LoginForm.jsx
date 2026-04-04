function LoginForm(){
    return(
        <div className="felx flex-col gap-12 lg:pl-12">
            <div className="flex gap-8 border-b-0">
                <button
                className="text-2xl font-headline font-extrabold tracking-tight text-primary border-b-4 border-primary pb-2"
                id="show-signup"
                >
                Join the Family
                </button>
                <button
                className="text-2xl font-headline font-extrabold tracking-tight text-on-surface-variant/40 hover:text-on-surface-variant transition-colors pb-2"
                id="show-login"
                >
                Login
                </button>
            </div>
            {/* Registration Form */}
            <section className="block" id="signup-section">
                <div className="space-y-6">
                <header>
                    <h1 className="text-display-sm font-headline font-bold text-on-surface">
                    Create your account
                    </h1>
                    <p className="text-on-surface-variant mt-2">
                    Start your journey into the world of Kem Bơ.
                    </p>
                </header>
                <form className="space-y-5">
                    <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface ml-1">
                        Full Name
                    </label>
                    <input
                        className="w-full px-6 py-4 bg-surface-container-highest border-none rounded-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline"
                        placeholder="Enter your name"
                        type="text"
                    />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface ml-1">
                        Email Address
                    </label>
                    <input
                        className="w-full px-6 py-4 bg-surface-container-highest border-none rounded-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline"
                        placeholder="hello@kemboi.com"
                        type="email"
                    />
                    </div>
                    <div className="space-y-2 relative">
                    <label className="text-sm font-semibold text-on-surface ml-1">
                        Password
                    </label>
                    <input
                        className="w-full px-6 py-4 bg-surface-container-highest border-none rounded-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline"
                        placeholder="••••••••"
                        type="password"
                    />
                    <span className="material-symbols-outlined absolute right-6 top-[3.25rem] text-on-surface-variant cursor-pointer select-none">
                        visibility
                    </span>
                    </div>
                    <div className="pt-4">
                    <button
                        className="w-full bg-primary text-on-primary font-headline font-bold py-5 rounded-full editorial-shadow hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl shadow-primary/10"
                        type="submit"
                    >
                        Join the Family
                    </button>
                    </div>
                </form>
                </div>
            </section>
            {/* Login Form (Hidden by default in static view, logic implies a swap) */}
            <section className="hidden" id="login-section">
                <div className="space-y-6">
                <header>
                    <h1 className="text-display-sm font-headline font-bold text-on-surface">
                    Welcome back
                    </h1>
                    <p className="text-on-surface-variant mt-2">
                    Your avocado favorites are waiting.
                    </p>
                </header>
                <form className="space-y-5">
                    <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface ml-1">
                        Email Address
                    </label>
                    <input
                        className="w-full px-6 py-4 bg-surface-container-highest border-none rounded-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline"
                        placeholder="hello@kemboi.com"
                        type="email"
                    />
                    </div>
                    <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-semibold text-on-surface">
                        Password
                        </label>
                        <a
                        className="text-xs font-semibold text-primary hover:underline"
                        href="#"
                        >
                        Forgot Password?
                        </a>
                    </div>
                    <input
                        className="w-full px-6 py-4 bg-surface-container-highest border-none rounded-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline"
                        placeholder="••••••••"
                        type="password"
                    />
                    </div>
                    <div className="pt-4">
                    <button
                        className="w-full bg-primary text-on-primary font-headline font-bold py-5 rounded-full editorial-shadow hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl shadow-primary/10"
                        type="submit"
                    >
                        Login
                    </button>
                    </div>
                </form>
                </div>
            </section>
            {/* Social Proof / Footer */}
            <footer className="pt-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-outline-variant/20" />
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/40">
                    Or continue with
                </span>
                <div className="h-px flex-1 bg-outline-variant/20" />
                </div>
                <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-surface-container-lowest rounded-full editorial-shadow hover:bg-surface-container-low transition-colors text-sm font-semibold">
                    <span className="w-5 h-5 bg-tertiary/10 rounded-full" />
                    Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-surface-container-lowest rounded-full editorial-shadow hover:bg-surface-container-low transition-colors text-sm font-semibold">
                    <span className="w-5 h-5 bg-tertiary/10 rounded-full" />
                    Apple
                </button>
                </div>
                <p className="text-center text-xs text-on-surface-variant/60 leading-relaxed px-8">
                By continuing, you agree to Kem Bơ's{" "}
                <a className="underline" href="#">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a className="underline" href="#">
                    Privacy Policy
                </a>
                .
                </p>
            </footer>
        </div>
    )
}

export default LoginForm