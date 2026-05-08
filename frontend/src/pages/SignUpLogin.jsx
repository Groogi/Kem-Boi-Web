import { useEffect } from 'react'
import TopNav from '../components/SignUpLogin/TopNavigation'
import LoginForm from '../components/SignUpLogin/LoginForm'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { API_BASE } from '../api/config'

function SignUpLogin() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [socialLinks, setSocialLinks] = useState({
    instagram: 'instagram.com/kemboi',
    facebook: 'facebook.com/kemboi',
    website: 'kemboi.com',
  })

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`${API_BASE}/social_links`)
        if (res.ok) {
          const data = await res.json()
          setSocialLinks(data)
        }
      } catch (err) {
        console.error('Failed to fetch social links', err)
      }
    }
    fetchLinks()
  }, [])

  const ensureHttps = (url) => {
    if (!url) return '#'
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `https://${url}`
  }

  useEffect(() => {
    // Wait until we have BOTH authentication and a user object with a role
    if (isAuthenticated && user && user.role) {
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/family')
      }
    }
  }, [isAuthenticated, user, navigate])

  return (
    <div className="min-h-screen font-body text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container flex flex-col relative overflow-hidden z-0">
      {/* Base light cream background */}
      <div className="absolute inset-0 bg-[#f4f7ed] -z-20"></div>

      {/* The avocado swirl texture from your provided image */}
      <div
        className="absolute inset-0 -z-10 mix-blend-luminosity opacity-[0.4]"
        style={{
          backgroundImage: "url('/swirl-bg.png')", // Just place the image in the public folder
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      <div className="relative z-10 w-full px-6 py-6 flex justify-center md:justify-between items-center">
        <a href="/">
          <img
            src="/logo.png"
            alt="Kem Boi Logo"
            className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform"
          />
        </a>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-4xl">
          <LoginForm />
        </div>
      </div>

      <footer className="w-full py-12 px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-10 bg-[#EEF4E4]/40 backdrop-blur-xl relative z-10 text-[13px] text-[#5B5C59] font-medium font-body">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="font-headline font-bold text-[#426500] text-[20px] mb-1 tracking-tight">
            Kem Boi
          </div>
          <div className="opacity-50 text-[11px]">
            © 2026 Kem Boi Digital Editorial
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-medium -translate-x-2">
          <a
            href="/#locations"
            className="hover:text-[#426500] transition-colors"
          >
            Locations
          </a>
          <Link
            to="/privacy"
            className="hover:text-[#426500] transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="hover:text-[#426500] transition-colors"
          >
            Terms
          </Link>
        </div>

        <div className="flex gap-6 items-center justify-center md:justify-end">
          <a
            href={ensureHttps(socialLinks.facebook)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-all opacity-60 hover:opacity-100"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C15.4998 0 19.9997 4.48975 20 10.0195C20.0054 12.4051 19.158 14.7148 17.6104 16.5303C16.0626 18.3457 13.916 19.5478 11.5596 19.9199V12.9199H13.8896L14.3398 10.0195H11.5596V8.13965C11.5597 7.34977 11.9506 6.58008 13.1904 6.58008H14.4502V4.11035C14.4502 4.11035 13.3097 3.91992 12.2197 3.91992C9.93001 3.92003 8.4406 5.29994 8.44043 7.80957V10.0195H5.90039V12.9199H8.44043V19.9199C3.66043 19.1699 0 15.0195 0 10.0195C0.000254539 4.48975 4.50016 0 10 0Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href={ensureHttps(socialLinks.instagram)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-all opacity-60 hover:opacity-100"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2002 0C17.4001 0.000103664 20 2.55815 20 5.70605V13.9688C20 15.482 19.3885 16.9339 18.3008 18.0039C17.2131 19.0737 15.7382 19.6748 14.2002 19.6748H5.7998C2.59989 19.6747 0 17.1167 0 13.9688V5.70605C0 4.19281 0.611508 2.74092 1.69922 1.6709C2.78685 0.601161 4.2618 5.09247e-05 5.7998 0H14.2002ZM5.59961 1.96777C4.64502 1.96788 3.72972 2.34089 3.05469 3.00488C2.37961 3.66898 2.00006 4.56962 2 5.50879V14.166C2.00005 16.1235 3.60982 17.7068 5.59961 17.707H14.4004C15.355 17.7069 16.2703 17.334 16.9453 16.6699C17.6204 16.0058 18 15.1052 18 14.166V5.50879C17.9999 3.55138 16.3901 1.96798 14.4004 1.96777H5.59961ZM10 4.91895C11.326 4.91895 12.5975 5.43708 13.5352 6.35938C14.4728 7.28181 15 8.53337 15 9.83789C14.9999 11.1423 14.4727 12.3931 13.5352 13.3154C12.5975 14.2378 11.326 14.7559 10 14.7559C8.67399 14.7559 7.40251 14.2378 6.46484 13.3154C5.52726 12.3931 5.00011 11.1423 5 9.83789C5 8.53337 5.52716 7.28181 6.46484 6.35938C7.4025 5.43708 8.67402 4.91895 10 4.91895ZM10 6.88672C9.20435 6.88672 8.44151 7.19752 7.87891 7.75098C7.31633 8.30443 7 9.0552 7 9.83789C7.00011 10.6204 7.31647 11.3705 7.87891 11.9238C8.44151 12.4773 9.20435 12.7891 10 12.7891C10.7956 12.7891 11.5585 12.4773 12.1211 11.9238C12.6835 11.3705 12.9999 10.6204 13 9.83789C13 9.0552 12.6837 8.30443 12.1211 7.75098C11.5585 7.19752 10.7956 6.88672 10 6.88672ZM15.25 3.44336C15.5815 3.44336 15.8994 3.5731 16.1338 3.80371C16.3681 4.03431 16.5 4.34679 16.5 4.67285C16.5 4.99892 16.3681 5.3114 16.1338 5.54199C15.8994 5.7726 15.5815 5.90234 15.25 5.90234C14.9185 5.90234 14.6006 5.7726 14.3662 5.54199C14.1319 5.3114 14 4.99892 14 4.67285C14 4.34679 14.1319 4.03431 14.3662 3.80371C14.6006 3.5731 14.9185 3.44336 15.25 3.44336Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default SignUpLogin
