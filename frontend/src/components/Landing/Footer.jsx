import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const [socialLinks, setSocialLinks] = useState({
    instagram: 'instagram.com/kemboi',
    facebook: 'facebook.com/kemboi',
    website: 'kemboi.com',
  })

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch('/api/social_links')
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

  return (
    <footer className="w-full bg-[#f7f7f2] py-14 border-t border-black/[0.03]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-[13px] text-[#5B5C59] font-medium font-body gap-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold text-[#426500] text-[20px] font-headline mb-1">Kem Boi</div>
            <div className="opacity-50 text-[11px]">© 2026 Kem Boi Digital Editorial</div>
          </div>

          <div className="flex gap-12 font-medium">
            <a href="/#locations" className="hover:text-[#426500] transition-colors">
              Location
            </a>
            <Link to="/privacy" className="hover:text-[#426500] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#426500] transition-colors">
              Terms
            </Link>
          </div>

          <div className="flex gap-5 items-center">
            <a
              href={ensureHttps(socialLinks.facebook)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#426500] transition-colors text-[#2D2F2C]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href={ensureHttps(socialLinks.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#426500] transition-colors text-[#2D2F2C]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.975-9.675v.001c-.001.325.04.577.065.7.075.367.245.71.499.98.269.284.606.467.973.528.127.022.378.064.698.064h.001A1.44 1.44 0 0019.65 7.16a1.44 1.44 0 00-1.44-1.44h-.359c-.279.03-.509.083-.699.083z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
