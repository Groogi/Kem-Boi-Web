import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("signup"); // "signup" | "login"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up form state
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  // Login form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        password_confirmation: signupData.password,
      });
      navigate("/family");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email: loginData.email, password: loginData.password });
      navigate("/family");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  return (
    <div className="flex flex-col gap-12 lg:pl-12">
      {/* Tab switcher */}
      <div className="flex gap-8 border-b-0">
        <button
          className={`text-2xl font-headline font-extrabold tracking-tight pb-2 transition-colors ${
            activeTab === "signup"
              ? "text-primary border-b-4 border-primary"
              : "text-on-surface-variant/40 hover:text-on-surface-variant"
          }`}
          id="show-signup"
          onClick={() => switchTab("signup")}
          type="button"
        >
          Join the Family
        </button>
        <button
          className={`text-2xl font-headline font-extrabold tracking-tight pb-2 transition-colors ${
            activeTab === "login"
              ? "text-primary border-b-4 border-primary"
              : "text-on-surface-variant/40 hover:text-on-surface-variant"
          }`}
          id="show-login"
          onClick={() => switchTab("login")}
          type="button"
        >
          Login
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="px-5 py-3 bg-error-container text-on-error-container rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Registration Form */}
      {activeTab === "signup" && (
        <section id="signup-section">
          <div className="space-y-6">
            <header>
              <h1 className="text-display-sm font-headline font-bold text-on-surface">
                Create your account
              </h1>
              <p className="text-on-surface-variant mt-2">
                Start your journey into the world of Kem Bơ.
              </p>
            </header>
            <form className="space-y-5" onSubmit={handleSignup}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface ml-1">
                  Full Name
                </label>
                <input
                  className="w-full px-6 py-4 bg-surface-container-highest border-none rounded-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline"
                  placeholder="Enter your name"
                  type="text"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  required
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
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-on-surface ml-1">
                  Password
                </label>
                <input
                  className="w-full px-6 py-4 bg-surface-container-highest border-none rounded-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
                <span
                  className="material-symbols-outlined absolute right-6 top-[3.25rem] text-on-surface-variant cursor-pointer select-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </div>
              <div className="pt-4">
                <button
                  className="w-full bg-primary text-on-primary font-headline font-bold py-5 rounded-full editorial-shadow hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl shadow-primary/10 disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating account…" : "Join the Family"}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Login Form */}
      {activeTab === "login" && (
        <section id="login-section">
          <div className="space-y-6">
            <header>
              <h1 className="text-display-sm font-headline font-bold text-on-surface">
                Welcome back
              </h1>
              <p className="text-on-surface-variant mt-2">
                Your avocado favorites are waiting.
              </p>
            </header>
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface ml-1">
                  Email Address
                </label>
                <input
                  className="w-full px-6 py-4 bg-surface-container-highest border-none rounded-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline"
                  placeholder="hello@kemboi.com"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-on-surface">
                    Password
                  </label>
                  <a className="text-xs font-semibold text-primary hover:underline" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="w-full px-6 py-4 bg-surface-container-highest border-none rounded-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                  <span
                    className="material-symbols-outlined absolute right-6 top-[1.1rem] text-on-surface-variant cursor-pointer select-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </div>
              </div>
              <div className="pt-4">
                <button
                  className="w-full bg-primary text-on-primary font-headline font-bold py-5 rounded-full editorial-shadow hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl shadow-primary/10 disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in…" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

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
          By continuing, you agree to Kem Bơ&apos;s{" "}
          <a className="underline" href="#">Terms of Service</a>{" "}
          and{" "}
          <a className="underline" href="#">Privacy Policy</a>.
        </p>
      </footer>
    </div>
  );
}

export default LoginForm;