import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login"); // "login" | "signup"
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  
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
      const user = await login({ email: loginData.email, password: loginData.password });
      if (user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/family");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mocking the behavior for UI review
    setTimeout(() => {
      setResetSent(true);
      setLoading(false);
    }, 1500);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setIsForgotMode(false);
    setResetSent(false);
    setError("");
  };

  // --- RENDERING FORGOT PASSWORD VIEW ---
  if (isForgotMode) {
    return (
      <div className="bg-[#fbfcf8] rounded-[2rem] p-10 md:p-14 shadow-2xl shadow-black/10 mx-auto w-full max-w-[850px] min-h-[500px] flex flex-col justify-center relative z-10 border border-white/50 backdrop-blur-md animate-fade-in">
        <button 
          onClick={() => setIsForgotMode(false)}
          className="absolute top-8 left-8 flex items-center gap-2 text-[#426500] font-bold text-sm hover:-translate-x-1 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          BACK TO LOGIN
        </button>

        <div className="text-center mb-10 mt-6">
           <h2 className="text-[2.5rem] font-headline font-bold text-[#426500] mb-4">Forgot Password?</h2>
           <p className="text-[#63665e] font-medium text-lg max-w-md mx-auto">
             Enter your email address and we'll send you instructions to reset your password.
           </p>
        </div>

        {!resetSent ? (
          <form className="max-w-md mx-auto w-full space-y-8" onSubmit={handleForgotSubmit}>
            <div className="space-y-2">
              <label className="text-[13px] text-[#63665e] ml-2 font-bold tracking-wide">Email Address</label>
              <input
                className="w-full px-6 py-4 bg-[#dcdcd8] border-none rounded-[1.5rem] focus:bg-[#d4d4d0] focus:ring-2 focus:ring-[#426500]/40 transition-all text-[#444] text-[16px] font-semibold"
                type="email"
                placeholder="hello@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            
            <button
              className="w-full bg-[#395800] text-white font-headline text-[1.4rem] tracking-wide py-4 rounded-[1.8rem] hover:bg-[#467800] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#395800]/30 disabled:opacity-60"
              disabled={loading}
              type="submit"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="text-center animate-fade-in py-10">
             <div className="w-20 h-20 bg-[#c3e68c] rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <span className="material-symbols-outlined text-[40px]">mark_email_read</span>
             </div>
             <h3 className="text-2xl font-bold font-headline text-[#426500] mb-2">Check Your Email</h3>
             <p className="text-[#63665e] font-medium mb-8">
               We've sent a magic link to <span className="font-bold">{forgotEmail}</span>.
             </p>
             <button 
                onClick={() => setIsForgotMode(false)}
                className="text-[#426500] font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
             >
                Return to login
             </button>
          </div>
        )}
      </div>
    );
  }

  // --- RENDERING LOGIN / SIGNUP VIEW ---
  return (
    <div className="bg-[#fbfcf8] rounded-[2rem] p-10 md:p-14 shadow-2xl shadow-black/10 mx-auto w-full max-w-[850px] min-h-[500px] flex flex-col justify-center relative z-10 border border-white/50 backdrop-blur-md">
      
      {/* Header Tabs */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          className={`text-[2rem] font-headline transition-colors flex flex-col items-center gap-1 ${
            activeTab === "login"
              ? "text-[#426500] font-bold"
              : "text-[#767871] hover:text-[#426500] font-medium"
          }`}
          onClick={() => switchTab("login")}
          type="button"
        >
          Log In
          {activeTab === "login" && <div className="h-[3px] w-full bg-[#426500] rounded-full"></div>}
          {activeTab !== "login" && <div className="h-[3px] w-full bg-transparent"></div>}
        </button>
        <button
          className={`text-[2rem] font-headline transition-colors flex flex-col items-center gap-1 ${
            activeTab === "signup"
              ? "text-[#426500] font-bold"
              : "text-[#767871] hover:text-[#426500] font-medium"
          }`}
          onClick={() => switchTab("signup")}
          type="button"
        >
          Join The Family
          {activeTab === "signup" && <div className="h-[3px] w-full bg-[#426500] rounded-full"></div>}
          {activeTab !== "signup" && <div className="h-[3px] w-full bg-transparent"></div>}
        </button>
      </div>

      <div className="text-center mb-12 text-[#63665e] font-medium text-lg">
        {activeTab === "login" ? "Welcome Back to the World of Kem Boi." : "Start Your Journey into the World of Kem Boi."}
      </div>

      {error && (
        <div className="mb-6 px-5 py-3 bg-red-100 text-red-800 rounded-xl text-sm font-semibold text-center w-full max-w-md mx-auto">
          {error}
        </div>
      )}

      {/* Main Content Area - Split Layout */}
      <div className="flex flex-col md:flex-row items-stretch justify-center w-full gap-8 md:gap-12 lg:gap-16">
        
        {/* Left Side: Social Login */}
        <div className="flex flex-col justify-center gap-5 w-[280px]">
          <div className="w-full">
            <p className="text-[14px] font-medium text-[#63665e] mb-3 ml-2">
              {activeTab === "login" ? "Log in With:" : "Create Account With:"}
            </p>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#fcfcfb] rounded-[1.5rem] shadow-sm shadow-[#426500]/10 hover:bg-[#f6f7f2] transition-colors border border-[#d6d8d1]">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                <span className="text-[#555] font-semibold tracking-wide">Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#fcfcfb] rounded-[1.5rem] shadow-sm shadow-[#426500]/10 hover:bg-[#f6f7f2] transition-colors border border-[#d6d8d1]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.057 10.78a4.425 4.425 0 0 1 2.067-3.693 4.48 4.48 0 0 0-3.522-1.895c-1.493-.153-2.91.88-3.667.88-.756 0-1.928-.862-3.174-.836a4.704 4.704 0 0 0-3.95 2.39c-1.696 2.94-.434 7.288 1.216 9.673 1.05 1.517 2.152 3.012 3.483 2.962 1.282-.05 1.767-.827 3.32-.827 1.554 0 1.99.827 3.333.801 1.366-.025 2.316-1.34 3.155-2.564a10.456 10.456 0 0 0 1.442-2.955 4.28 4.28 0 0 1-2.204-4.635zM15.42 5.093c1-.86 1.724-2.053 1.54-3.243-1.026.041-2.268.683-3.004 1.543-.66.756-1.238 1.967-1.082 3.132 1.0.078 2.162-.572 2.546-1.432z"/>
                </svg>
                <span className="text-[#555] font-semibold tracking-wide">Apple</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:flex flex-col items-center justify-center py-2 px-4">
          <div className="w-[1.5px] h-full bg-[#83867d]/40 flex-1"></div>
          <span className="my-3 text-xs font-bold text-[#83867d] tracking-wider uppercase">OR</span>
          <div className="w-[1.5px] h-full bg-[#83867d]/40 flex-1"></div>
        </div>
        
        {/* Mobile divider */}
        <div className="md:hidden flex items-center justify-center w-full my-4">
            <div className="h-[1.5px] w-full bg-[#83867d]/40 flex-1"></div>
            <span className="mx-4 text-xs font-bold text-[#83867d] tracking-wider uppercase">OR</span>
            <div className="h-[1.5px] w-full bg-[#83867d]/40 flex-1"></div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex flex-col justify-center">
          <form 
            className="w-full flex flex-col gap-4" 
            onSubmit={activeTab === "login" ? handleLogin : handleSignup}
          >
            {activeTab === "signup" && (
              <div className="space-y-1">
                <label className="text-[13px] text-[#63665e] ml-2 font-bold tracking-wide">Full Name</label>
                <input
                  className="w-full px-6 py-3.5 bg-[#dcdcd8] border-none rounded-[1.5rem] focus:bg-[#d4d4d0] focus:ring-2 focus:ring-[#426500]/40 transition-all text-[#444] text-[15px] font-semibold"
                  type="text"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  required
                />
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[13px] text-[#63665e] ml-2 font-bold tracking-wide">Email</label>
              <input
                className="w-full px-6 py-3.5 bg-[#dcdcd8] border-none rounded-[1.5rem] focus:bg-[#d4d4d0] focus:ring-2 focus:ring-[#426500]/40 transition-all text-[#444] text-[15px] font-semibold"
                type="email"
                value={activeTab === "login" ? loginData.email : signupData.email}
                onChange={(e) => 
                  activeTab === "login" 
                    ? setLoginData({ ...loginData, email: e.target.value })
                    : setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-1 relative">
              <div className="flex justify-between items-end ml-2 mr-2">
                <label className="text-[13px] text-[#63665e] font-bold tracking-wide">Password</label>
                {activeTab === "login" && (
                  <button 
                    type="button"
                    onClick={() => setIsForgotMode(true)}
                    className="text-[13px] text-[#63665e] hover:text-[#426500] transition-colors hover:underline underline underline-offset-2 decoration-[#63665e]/50"
                  >
                    Forgot Password
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  className="w-full px-6 py-3.5 bg-[#dcdcd8] border-none rounded-[1.5rem] focus:bg-[#d4d4d0] focus:ring-2 focus:ring-[#426500]/40 transition-all text-[#444] text-[15px] font-semibold"
                  type={showPassword ? "text" : "password"}
                  value={activeTab === "login" ? loginData.password : signupData.password}
                  onChange={(e) => 
                    activeTab === "login"
                      ? setLoginData({ ...loginData, password: e.target.value })
                      : setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
                <span
                  className="material-symbols-outlined absolute right-5 top-[0.8rem] text-on-surface-variant/50 cursor-pointer select-none text-xl hover:text-on-surface-variant"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </div>
            </div>

            {/* Hidden Submit Button to allow 'Enter' key submission */}
            <button type="submit" className="hidden" />
          </form>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="mt-14 flex flex-col items-center">
        <button
          className="w-full max-w-[480px] bg-[#395800] text-white font-headline text-[1.4rem] tracking-wide font-normal py-4 rounded-[1.8rem] hover:bg-[#467800] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#395800]/30 disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={() => {
             // trigger form submission manually
             const form = document.querySelector('form');
             if (form) {
                 if (typeof form.requestSubmit === 'function') {
                     form.requestSubmit();
                 } else {
                     form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                 }
             }
          }}
          disabled={loading}
        >
          {loading 
            ? (activeTab === "login" ? "Logging in..." : "Creating Account...") 
            : (activeTab === "login" ? "Login" : "Create Your Account")}
        </button>

        <p className="text-center text-[11px] text-[#63665e] font-semibold mt-4 max-w-sm tracking-wide">
          By Continuing, you agree to Kem Boi's <Link to="/terms" className="underline decoration-[#63665e]/60 underline-offset-2 hover:text-[#426500]">Terms of Service</Link> and <Link to="/privacy" className="underline decoration-[#63665e]/60 underline-offset-2 hover:text-[#426500]">Privacy Policy</Link>
        </p>
      </div>
      
    </div>
  );
}

export default LoginForm;
