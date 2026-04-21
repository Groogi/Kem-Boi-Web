import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

function LoginForm() {
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login"); // "login" | "signup"
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        password_confirmation: signupData.password,
      });
      showToast("Welcome to the Kem Boi Family!", "success");
      navigate("/family");
    } catch (err) {
      showToast(err.message || "Failed to create account", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login({ email: loginData.email, password: loginData.password });
      showToast(`Welcome back!`, "success");
      navigate(user.role === 'admin' ? "/admin" : "/family");
    } catch (err) {
      showToast("Invalid email or password", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResetSent(true);
      setLoading(false);
    }, 1500);
  };

  if (isForgotMode) {
    return (
      <div className="bg-[#f7f7f2] rounded-[3rem] p-10 md:p-16 w-full max-w-[850px] mx-auto min-h-[500px] flex flex-col justify-center relative z-10 animate-fade-in shadow-2xl shadow-black/5 border border-white/50">
        <button 
          onClick={() => setIsForgotMode(false)}
          className="absolute top-10 left-10 flex items-center gap-2 text-[#426500] font-bold text-sm hover:-translate-x-1 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          BACK TO LOGIN
        </button>

        <div className="text-center mb-10 mt-6">
           <h2 className="text-[2.5rem] font-headline font-bold text-[#426500] mb-4">Forgot Password?</h2>
           <p className="text-[#63665e] font-medium text-lg max-w-md mx-auto leading-relaxed">
             Enter your email address and we'll send you instructions to reset your password.
           </p>
        </div>

        {!resetSent ? (
          <form className="max-w-md mx-auto w-full space-y-8" onSubmit={handleForgotSubmit}>
            <div className="space-y-1">
              <label className="text-[12px] text-[#8ea46a] ml-5 font-black tracking-widest uppercase">Email Address</label>
              <input
                className="w-full px-8 py-5 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[16px] font-semibold outline-none"
                type="email"
                placeholder="hello@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            
            <button
              className="w-full bg-[#4d7902] text-white font-bold text-[1.4rem] tracking-wide py-5 rounded-full hover:bg-[#3d6101] transition-all shadow-xl shadow-[#4d7902]/20"
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
             <h3 className="text-2x font-bold font-headline text-[#426500] mb-2">Check Your Email</h3>
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

  return (
    <div className="bg-[#f7f7f2] rounded-[3rem] p-8 md:p-14 w-full max-w-[850px] mx-auto relative z-10 animate-fade-in shadow-2xl shadow-black/5 border border-white/50 flex flex-col items-center">
      
      {/* Header - Centered as per screenshot */}
      <div className="flex items-center gap-2 md:gap-8 mb-2">
        <div className="flex flex-col items-center">
          <button 
            onClick={() => setActiveTab("login")}
            className={`text-[1.4rem] md:text-[2.2rem] font-headline font-bold transition-all whitespace-nowrap ${activeTab === "login" ? "text-primary border-b-[3px] border-primary pb-1" : "text-[#BCC1B1]"}`}
          >
            Log In
          </button>
        </div>
        <button 
          onClick={() => setActiveTab("signup")}
          className={`text-[1.4rem] md:text-[2.2rem] font-headline font-bold transition-all whitespace-nowrap ${activeTab === "signup" ? "text-primary border-b-[3px] border-primary pb-1" : "text-[#BCC1B1]"}`}
        >
          Join The Family
        </button>
      </div>
      
      <p className="text-[#7d8076] font-medium text-lg mb-12">
        {activeTab === "login" ? "Welcome Back to the World of Kem Boi." : "Start your avocado journey today."}
      </p>

      <form 
        className="w-full flex flex-col items-center" 
        onSubmit={activeTab === "login" ? handleLogin : handleSignup}
      >

      {/* Split Interior - Match Screenshot */}
      <div className="w-full flex-grow flex flex-col md:flex-row items-stretch justify-center gap-12 mb-12">
        
        {/* Left: Social Login */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-[13px] font-bold text-[#7d8076] mb-6">Log in With:</p>
          <div className="space-y-4 w-full max-w-[280px]">
            <button type="button" className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-[#E3E5D7] rounded-full shadow-lg shadow-black/5 hover:bg-white/80 transition-all">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
              <span className="text-[15px] font-bold text-[#4A5440] tracking-wide">Google</span>
            </button>
            <button type="button" className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-[#E3E5D7] rounded-full shadow-lg shadow-black/5 hover:bg-white/80 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.057 10.78a4.425 4.425 0 0 1 2.067-3.693 4.48 4.48 0 0 0-3.522-1.895c-1.493-.153-2.91.88-3.667.88-.756 0-1.928-.862-3.174-.836a4.704 4.704 0 0 0-3.95 2.39c-1.696 2.94-.434 7.288 1.216 9.673 1.05 1.517 2.152 3.012 3.483 2.962 1.282-.05 1.767-.827 3.32-.827 1.554 0 1.99.827 3.333.801 1.366-.025 2.316-1.34 3.155-2.564a10.456 10.456 0 0 0 1.442-2.955 4.28 4.28 0 0 1-2.204-4.635zM15.42 5.093c1-.86 1.724-2.053 1.54-3.243-1.026.041-2.268.683-3.004 1.543-.66.756-1.238 1.967-1.082 3.132 1.0.078 2.162-.572 2.546-1.432z"/>
              </svg>
              <span className="text-[15px] font-bold text-[#4A5440] tracking-wide">Apple</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:flex flex-col items-center justify-center opacity-30">
          <div className="w-[1px] h-full bg-[#7d8076] flex-1"></div>
          <span className="my-4 text-[11px] font-black text-[#7d8076] uppercase">OR</span>
          <div className="w-[1px] h-full bg-[#7d8076] flex-1"></div>
        </div>
        
        {/* Mobile divider */}
        <div className="md:hidden flex items-center justify-center w-full my-4 opacity-20">
            <div className="h-[1px] w-full bg-[#7d8076] flex-1"></div>
            <span className="mx-4 text-[11px] font-black text-[#7d8076] uppercase">OR</span>
            <div className="h-[1px] w-full bg-[#7d8076] flex-1"></div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full flex flex-col gap-6">
            {activeTab === "signup" && (
              <div className="space-y-1">
                <label className="text-[12px] text-[#7d8076] ml-5 font-bold tracking-widest uppercase">Full Name</label>
                <input
                  className="w-full px-8 py-4 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[15px] font-semibold outline-none"
                  type="text"
                  placeholder="Enter name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  required
                />
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[12px] text-[#7d8076] ml-5 font-bold tracking-widest uppercase">Email</label>
              <input
                className="w-full px-8 py-4 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[15px] font-semibold outline-none"
                type="email"
                placeholder="email@example.com"
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
              <div className="flex justify-between items-baseline ml-5 mr-3">
                <label className="text-[12px] text-[#7d8076] font-bold tracking-widest uppercase">Password</label>
                {activeTab === "login" && (
                  <button 
                    type="button"
                    onClick={() => setIsForgotMode(true)}
                    className="text-[10px] text-[#7d8076] underline hover:text-primary transition-all font-bold"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  className="w-full px-8 py-4 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[15px] font-semibold outline-none"
                  type="password"
                  placeholder="••••••••"
                  value={activeTab === "login" ? loginData.password : signupData.password}
                  onChange={(e) => 
                    activeTab === "login"
                      ? setLoginData({ ...loginData, password: e.target.value })
                      : setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

        <button
          type="submit"
          className="w-full max-w-[500px] bg-[#4d7902] text-white font-bold text-[1.3rem] md:text-[1.6rem] tracking-wide py-5 rounded-full hover:bg-[#3d6101] active:scale-[0.98] transition-all shadow-2xl shadow-[#4d7902]/20"
          disabled={loading}
        >
          {loading ? "Please wait..." : (activeTab === "login" ? "Login" : "Join The Family")}
        </button>
      </form>

      <p className="text-center text-[10px] text-[#7d8076] font-bold mt-6 opacity-60">
        By Continuing, you agree to Kem Boi's <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>
      </p>
    </div>
  );
}

export default LoginForm;
