import React, { useState, useEffect } from 'react'

function InstagramGrid() {
  const desktopTiles = [
    {
      src: '/socials-holding.png',
      alt: 'Social 1',
      style: { left: '0%', top: '0%', width: '25.73%', height: '39.21%' },
      imageClassName: 'scale-[1.3]',
    },
    {
      src: '/socials-store-front.png',
      alt: 'Social 2',
      style: { left: '27.24%', top: '0.42%', width: '38.53%', height: '54.58%' },
      imageClassName: 'scale-[1.2]',
    },
    {
      src: '/socials-dessert.png',
      alt: 'Social 3',
      style: { left: '67.27%', top: '0.42%', width: '32.73%', height: '42.45%' },
      imageClassName: 'scale-[1.3]',
    },
    {
      src: '/socials-dessert.png',
      alt: 'Social 4',
      style: { left: '0%', top: '42.03%', width: '15.27%', height: '57.97%' },
      imageClassName: 'scale-[1.3]',
    },
    {
      src: '/socials-dessert.png',
      alt: 'Social 5',
      style: { left: '16.78%', top: '42.03%', width: '8.95%', height: '14.95%' },
      imageClassName: 'scale-[1.3]',
    },
    {
      src: '/socials-swirl-1.png',
      alt: 'Social 6',
      style: { left: '16.78%', top: '59.8%', width: '19.41%', height: '40.2%' },
      imageClassName: 'scale-[1.4]',
    },
    {
      src: '/socials-holding.png',
      alt: 'Social 7',
      style: { left: '37.7%', top: '59.8%', width: '28.07%', height: '40.2%' },
      imageClassName: 'scale-[1.3]',
    },
    {
      src: '/socials-swirl-2.png',
      alt: 'Social 8',
      style: { left: '67.49%', top: '45.7%', width: '32.51%', height: '54.3%' },
      imageClassName: 'scale-[1.4]',
    },
  ]

  const [socialLinks, setSocialLinks] = useState({
    instagram: 'instagram.com/kemboi',
    facebook: 'facebook.com/kemboi',
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
    <section className="pt-24 pb-20 md:pt-32 md:pb-24 bg-[#f7f7f2]">
      <div className="max-w-[1440px] px-6 md:px-12 mx-auto">
        {/* Header Section */}
        <div className="mb-10 md:mb-14 relative">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-4">
            <h2 className="text-[36px] md:text-[60px] font-bold font-headline text-[#426500] tracking-[-1px] md:tracking-[-1.5px] leading-tight">
              Tag Us On Socials
            </h2>
            <div className="flex gap-4 items-center opacity-80">
              <a
                href={ensureHttps(socialLinks.facebook)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity"
              >
                <svg
                  width="36"
                  height="36"
                  className="md:w-[45px] md:h-[45px]"
                  viewBox="0 0 24 24"
                  fill="#5B5C59"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href={ensureHttps(socialLinks.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity"
              >
                <svg
                  width="36"
                  height="36"
                  className="md:w-[45px] md:h-[45px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5B5C59"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="6" ry="6"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          <p className="text-[#5B5C59] font-bold text-[22px] md:text-[35px] tracking-tight opacity-60">
            For Your Chance to be Featured
          </p>
        </div>

        {/* Masonry Scatter Grid (Images with shadows, no white border padding) */}
        <div
          className="relative hidden lg:block w-full mx-auto"
          style={{ maxWidth: '1329px', aspectRatio: '1329 / 709' }}
        >
          {desktopTiles.map((tile) => (
            <div
              key={`${tile.src}-${tile.alt}`}
              className="absolute rounded-[24px] shadow-[20px_25px_60px_-10px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500 hover:shadow-[25px_30px_70px_-12px_rgba(0,0,0,0.4)]"
              style={tile.style}
            >
              <img
                src={tile.src}
                className={`w-full h-full object-cover ${tile.imageClassName}`}
                alt={tile.alt}
              />
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:hidden px-2 mb-20">
          {/* Item 1 */}
          <div className="rounded-[20px] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.25)] overflow-hidden h-[240px] md:h-[300px]">
            <img src="/socials-holding.png" className="w-full h-full object-cover scale-[1.3]" alt="Social 1" />
          </div>
          {/* Item 2 */}
          <div className="rounded-[20px] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.25)] overflow-hidden h-[280px] md:h-[340px] -mt-4 md:mt-0">
            <img src="/socials-dessert.png" className="w-full h-full object-cover scale-[1.3]" alt="Social 2" />
          </div>
          {/* Item 3 */}
          <div className="rounded-[20px] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.25)] overflow-hidden h-[180px] md:h-[300px]">
            <img src="/socials-swirl-1.png" className="w-full h-full object-cover scale-[1.3]" alt="Social 3" />
          </div>
          {/* Item 4 */}
          <div className="rounded-[20px] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.25)] overflow-hidden h-[220px] md:h-[320px] md:mt-4">
            <img src="/socials-store-front.png" className="w-full h-full object-cover scale-[1.3]" alt="Social 4" />
          </div>
          {/* Item 5 */}
          <div className="rounded-[20px] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.25)] overflow-hidden h-[200px] md:h-[320px] col-span-2 md:col-span-1 -mt-4 md:mt-4">
            <img src="/socials-swirl-2.png" className="w-full h-full object-cover scale-[1.5]" alt="Social 5" />
          </div>
          {/* Item 6 */}
          <div className="hidden md:block rounded-[20px] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.25)] overflow-hidden h-[300px] mt-4">
            <img src="/socials-holding.png" className="w-full h-full object-cover scale-[1.3]" alt="Social 6" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InstagramGrid
