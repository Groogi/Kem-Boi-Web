import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { forgotPassword } from '../../api/auth'
import { useGoogleLogin } from '@react-oauth/google'

function LoginForm() {
  const { login, register, googleAuth } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [activeTab, setActiveTab] = useState(location.state?.mode === 'signup' ? 'signup' : 'login') // "login" | "signup"
  const [isForgotMode, setIsForgotMode] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const modeParam = params.get('mode')
    
    if (modeParam === 'signup' || modeParam === 'login') {
      setActiveTab(modeParam)
    } else if (location.state?.mode) {
      setActiveTab(location.state.mode)
    }
  }, [location])

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [signupData, setSignupData] = useState({ firstName: '', lastName: '', email: '', password: '', password_confirmation: '', referralCode: '' })
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    
    const newErrors = {}
    const nameRegex = /^[a-zA-Z\s-]+$/

    if (!signupData.firstName || !nameRegex.test(signupData.firstName)) newErrors.firstName = true
    if (!signupData.lastName || !nameRegex.test(signupData.lastName)) newErrors.lastName = true
    if (!signupData.email || !validateEmail(signupData.email)) newErrors.email = true
    if (signupData.password.length < 8) newErrors.password = true
    if (signupData.password !== signupData.password_confirmation) newErrors.password_confirmation = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      if (newErrors.password_confirmation && signupData.password === signupData.password_confirmation) {
          // This case won't happen based on the logic above, but keeping it safe
      }
      
      if (newErrors.firstName || newErrors.lastName) showToast('Names can only contain letters, spaces, or hyphens', 'error')
      else if (newErrors.email) showToast('Please enter a valid email address', 'error')
      else if (newErrors.password) showToast('Password must be at least 8 characters', 'error')
      else if (newErrors.password_confirmation) showToast('Passwords do not match', 'error')
      return
    }

    setErrors({})

    setLoading(true)
    try {
      await register({
        first_name: signupData.firstName.trim().toLowerCase(),
        last_name: signupData.lastName.trim().toLowerCase(),
        email: signupData.email.trim().toLowerCase(),
        password: signupData.password,
        password_confirmation: signupData.password_confirmation,
        referral_code: signupData.referralCode.trim().toUpperCase(),
      })
      showToast('Welcome to the Kem Boi Family!', 'success')
      navigate('/family')
    } catch (err) {
      showToast(err.message || 'Failed to create account', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!loginData.email || !validateEmail(loginData.email)) {
      setErrors({ email: true })
      showToast('Please enter a valid email address', 'error')
      return
    }

    setErrors({})
    setLoading(true)

    setLoading(true)
    try {
      const user = await login({ email: loginData.email.trim().toLowerCase(), password: loginData.password })
      showToast(`Welcome back!`, 'success')
      navigate(user.role === 'admin' ? '/admin' : '/family')
    } catch {
      showToast('Invalid email or password', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (tokenResponse) => {
    setLoading(true)
    try {
      // useGoogleLogin implicitly grants an access_token for the 'implicit flow'
      // We send this token to the backend
      const user = await googleAuth(tokenResponse.access_token)
      showToast('Successfully signed in with Google!', 'success')
      navigate(user.role === 'admin' ? '/admin' : '/family')
    } catch (err) {
      showToast(err.message || 'Google sign in failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleClick = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => showToast('Google sign in failed', 'error'),
  })

  const handleForgotSubmit = async (e) => {
    e.preventDefault()
    if (!forgotEmail || !validateEmail(forgotEmail)) {
      showToast('Please enter a valid email address', 'error')
      return
    }

    setLoading(true)
    try {
      await forgotPassword(forgotEmail)
      setResetSent(true)
    } catch (err) {
      showToast(err.message || 'Failed to send reset link', 'error')
    } finally {
      setLoading(false)
    }
  }

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
          <h2 className="text-[2.5rem] font-headline font-bold text-[#426500] mb-4">
            Forgot Password?
          </h2>
          <p className="text-[#63665e] font-medium text-lg max-w-md mx-auto leading-relaxed">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {!resetSent ? (
          <form 
            className="max-w-md mx-auto w-full space-y-8" 
            onSubmit={handleForgotSubmit}
            noValidate
          >
            <div className="space-y-1">
              <label className="text-[12px] text-[#8ea46a] ml-5 font-black tracking-widest uppercase">
                Email Address
              </label>
              <input
                className={`w-full px-8 py-5 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[16px] font-semibold outline-none ${errors.forgotEmail ? 'ring-2 ring-red-500/50' : ''}`}
                type="email"
                placeholder="hello@example.com"
                value={forgotEmail}
                onChange={(e) => {
                  setForgotEmail(e.target.value)
                  if (errors.forgotEmail) setErrors({ ...errors, forgotEmail: false })
                }}
                required
              />
            </div>

            <button
              className="w-full bg-[#4d7902] text-white font-bold text-[1.4rem] tracking-wide py-5 rounded-full hover:bg-[#3d6101] transition-all shadow-xl shadow-[#4d7902]/20"
              disabled={loading}
              type="submit"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center animate-fade-in py-10">
            <div className="w-20 h-20 bg-[#c3e68c] rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <span className="material-symbols-outlined text-[40px]">mark_email_read</span>
            </div>
            <h3 className="text-2x font-bold font-headline text-[#426500] mb-2">
              Check Your Email
            </h3>
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
    )
  }

  return (
    <div className="bg-[#f7f7f2] rounded-[3rem] p-8 md:p-14 w-full max-w-[850px] mx-auto relative z-10 animate-fade-in shadow-2xl shadow-black/5 border border-white/50 flex flex-col items-center">
      {/* Header - Centered as per screenshot */}
      <div className="flex items-center gap-2 md:gap-8 mb-2">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setActiveTab('login')}
            className={`text-[1.4rem] md:text-[2.2rem] font-headline font-bold transition-all whitespace-nowrap ${activeTab === 'login' ? 'text-primary border-b-[3px] border-primary pb-1' : 'text-[#BCC1B1]'}`}
          >
            Log In
          </button>
        </div>
        <button
          onClick={() => setActiveTab('signup')}
          className={`text-[1.4rem] md:text-[2.2rem] font-headline font-bold transition-all whitespace-nowrap ${activeTab === 'signup' ? 'text-primary border-b-[3px] border-primary pb-1' : 'text-[#BCC1B1]'}`}
        >
          Join The Family
        </button>
      </div>

      <p className="text-[#7d8076] font-medium text-lg mb-12">
        {activeTab === 'login'
          ? 'Welcome Back to the World of Kem Boi.'
          : 'Start your avocado journey today.'}
      </p>

      <form
        className="w-full flex flex-col items-center"
        onSubmit={activeTab === 'login' ? handleLogin : handleSignup}
        noValidate
      >
        {/* Split Interior - Match Screenshot */}
        <div className="w-full flex-grow flex flex-col md:flex-row items-stretch justify-center gap-12 mb-12">
          {/* Left: Social Login */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-[13px] font-bold text-[#7d8076] mb-6">
              {activeTab === 'login' ? 'Log in With:' : 'Sign up With:'}
            </p>
            <div className="space-y-4 w-full max-w-[280px]">
              <button
                type="button"
                onClick={() => handleGoogleClick()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-[#E3E5D7] rounded-full shadow-lg shadow-black/5 hover:bg-white/80 transition-all disabled:opacity-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-6 h-6"
                />
                <span className="text-[15px] font-bold text-[#4A5440] tracking-wide">Google</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-[#E3E5D7] rounded-full shadow-lg shadow-black/5 hover:bg-white/80 transition-all"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.057 10.78a4.425 4.425 0 0 1 2.067-3.693 4.48 4.48 0 0 0-3.522-1.895c-1.493-.153-2.91.88-3.667.88-.756 0-1.928-.862-3.174-.836a4.704 4.704 0 0 0-3.95 2.39c-1.696 2.94-.434 7.288 1.216 9.673 1.05 1.517 2.152 3.012 3.483 2.962 1.282-.05 1.767-.827 3.32-.827 1.554 0 1.99.827 3.333.801 1.366-.025 2.316-1.34 3.155-2.564a10.456 10.456 0 0 0 1.442-2.955 4.28 4.28 0 0 1-2.204-4.635zM15.42 5.093c1-.86 1.724-2.053 1.54-3.243-1.026.041-2.268.683-3.004 1.543-.66.756-1.238 1.967-1.082 3.132 1.0.078 2.162-.572 2.546-1.432z" />
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
              {activeTab === 'signup' && (
                <div className="flex gap-4">
                  <div className="space-y-1 flex-1">
                    <label className="text-[12px] text-[#7d8076] ml-5 font-bold tracking-widest uppercase">
                      First Name
                    </label>
                    <input
                      className={`w-full px-8 py-4 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[15px] font-semibold outline-none ${errors.firstName ? 'ring-2 ring-red-500/50' : ''}`}
                      type="text"
                      placeholder="First name"
                      value={signupData.firstName}
                      onChange={(e) => {
                        setSignupData({ ...signupData, firstName: e.target.value })
                        if (errors.firstName) setErrors({ ...errors, firstName: false })
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <label className="text-[12px] text-[#7d8076] ml-5 font-bold tracking-widest uppercase">
                      Last Name
                    </label>
                    <input
                      className={`w-full px-8 py-4 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[15px] font-semibold outline-none ${errors.lastName ? 'ring-2 ring-red-500/50' : ''}`}
                      type="text"
                      placeholder="Last name"
                      value={signupData.lastName}
                      onChange={(e) => {
                        setSignupData({ ...signupData, lastName: e.target.value })
                        if (errors.lastName) setErrors({ ...errors, lastName: false })
                      }}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[12px] text-[#7d8076] ml-5 font-bold tracking-widest uppercase">
                  Email
                </label>
                <input
                  className={`w-full px-8 py-4 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[15px] font-semibold outline-none ${errors.email ? 'ring-2 ring-red-500/50' : ''}`}
                  type="email"
                  placeholder="email@example.com"
                  value={activeTab === 'login' ? loginData.email : signupData.email}
                  onChange={(e) => {
                    if (activeTab === 'login') {
                      setLoginData({ ...loginData, email: e.target.value })
                    } else {
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    if (errors.email) setErrors({ ...errors, email: false })
                  }}
                  required
                />
              </div>

              <div className="space-y-1 relative">
                <div className="flex justify-between items-baseline ml-5 mr-3">
                  <label className="text-[12px] text-[#7d8076] font-bold tracking-widest uppercase">
                    Password
                  </label>
                  {activeTab === 'login' && (
                    <button
                      type="button"
                      onClick={() => setIsForgotMode(true)}
                      className="text-[10px] text-[#7d8076] underline hover:text-primary transition-all font-bold"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative group/pass">
                  <input
                    className={`w-full px-8 pr-14 py-4 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[15px] font-semibold outline-none ${errors.password ? 'ring-2 ring-red-500/50' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={activeTab === 'login' ? loginData.password : signupData.password}
                    onChange={(e) => {
                      if (activeTab === 'login') {
                        setLoginData({ ...loginData, password: e.target.value })
                      } else {
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                      if (errors.password) setErrors({ ...errors, password: false })
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#7d8076] hover:text-[#426500] transition-colors p-1 flex items-center justify-center"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {activeTab === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[12px] text-[#7d8076] ml-5 font-bold tracking-widest uppercase">
                    Confirm Password
                  </label>
                  <input
                    className={`w-full px-8 py-4 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-white transition-all text-[#444] text-[15px] font-semibold outline-none ${errors.password_confirmation ? 'ring-2 ring-red-500/50' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={signupData.password_confirmation}
                    onChange={(e) => {
                      setSignupData({ ...signupData, password_confirmation: e.target.value })
                      if (errors.password_confirmation) setErrors({ ...errors, password_confirmation: false })
                    }}
                    required
                  />
                </div>
              )}
              {activeTab === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[12px] text-[#7d8076] ml-5 font-bold tracking-widest uppercase">
                    Referral Code (Optional)
                  </label>
                  <input
                    className="w-full px-8 py-4 bg-[#426500]/5 border-2 border-dashed border-[#426500]/20 rounded-full focus:bg-white transition-all text-[#426500] text-[15px] font-bold outline-none placeholder:text-[#426500]/30"
                    type="text"
                    placeholder="e.g. KB-REF-123"
                    value={signupData.referralCode}
                    onChange={(e) => setSignupData({ ...signupData, referralCode: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full max-w-[500px] bg-[#4d7902] text-white font-bold text-[1.3rem] md:text-[1.6rem] tracking-wide py-5 rounded-full hover:bg-[#3d6101] active:scale-[0.98] transition-all shadow-2xl shadow-[#4d7902]/20"
          disabled={loading}
        >
          {loading ? 'Please wait...' : activeTab === 'login' ? 'Login' : 'Join The Family'}
        </button>
      </form>

      <p className="text-center text-[10px] text-[#7d8076] font-bold mt-6 opacity-60">
        By Continuing, you agree to Kem Boi's{' '}
        <Link to="/terms" className="underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}

export default LoginForm
