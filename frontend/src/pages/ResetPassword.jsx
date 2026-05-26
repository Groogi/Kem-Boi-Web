import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { resetPassword } from '../api/auth'
import { useToast } from '../context/ToastContext'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token || !email) {
      showToast('Invalid or missing reset token', 'error')
      navigate('/login')
    }
  }, [token, email, navigate, showToast])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password.length < 8) {
      showToast('Password must be at least 8 characters', 'error')
      return
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error')
      return
    }

    setLoading(true)
    try {
      await resetPassword({ email, token, password })
      setSuccess(true)
      showToast('Password reset successful!', 'success')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      showToast(err.message || 'Failed to reset password', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen font-body text-on-surface antialiased flex flex-col relative overflow-hidden z-0">
      <div className="absolute inset-0 bg-[#f4f7ed] -z-20"></div>
      <div
        className="absolute inset-0 -z-10 mix-blend-luminosity opacity-[0.4]"
        style={{
          backgroundImage: "url('/swirl-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      <div className="relative z-10 w-full px-6 py-6 flex justify-center md:justify-between items-center">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Kem Boi Logo"
            className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 pb-12">
        <div className="bg-[#f7f7f2] rounded-[3rem] p-10 md:p-16 w-full max-w-[600px] mx-auto min-h-[400px] flex flex-col justify-center relative z-10 animate-fade-in shadow-2xl shadow-black/5 border border-white/50">
          <div className="text-center mb-10 mt-2">
            <h2 className="text-[2.5rem] font-headline font-bold text-[#426500] mb-4">
              Create New Password
            </h2>
            <p className="text-[#63665e] font-medium text-lg max-w-sm mx-auto leading-relaxed">
              Please enter your new secure password below.
            </p>
          </div>

          {!success ? (
            <form className="max-w-md mx-auto w-full space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-[12px] text-[#8ea46a] ml-5 font-black tracking-widest uppercase">
                  New Password
                </label>
                <input
                  className="w-full px-8 py-5 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-[#F8F8F0] transition-all text-[#444] text-[16px] font-semibold outline-none"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[12px] text-[#8ea46a] ml-5 font-black tracking-widest uppercase">
                  Confirm Password
                </label>
                <input
                  className="w-full px-8 py-5 bg-[#dcdcdc]/40 border-none rounded-full focus:bg-[#F8F8F0] transition-all text-[#444] text-[16px] font-semibold outline-none"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="w-full bg-[#4d7902] text-white font-bold text-[1.4rem] tracking-wide py-5 rounded-full hover:bg-[#3d6101] transition-all shadow-xl shadow-[#4d7902]/20 mt-4"
                disabled={loading}
                type="submit"
              >
                {loading ? 'Saving...' : 'Save New Password'}
              </button>
            </form>
          ) : (
            <div className="text-center animate-fade-in py-10">
              <div className="w-20 h-20 bg-[#c3e68c] rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <span className="material-symbols-outlined text-[40px]">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold font-headline text-[#426500] mb-2">
                Password Updated!
              </h3>
              <p className="text-[#63665e] font-medium mb-8">
                Your password has been changed successfully. Redirecting you to login...
              </p>
              <Link
                to="/login"
                className="text-[#426500] font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Go to login now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
