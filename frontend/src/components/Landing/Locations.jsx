import React, { useState, useEffect } from 'react'

function Locations() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/locations')
        if (res.ok) {
          const data = await res.json()
          // Show only active stores
          setLocations(data.filter((l) => l.active))
        }
      } catch (err) {
        console.error('Failed to fetch locations', err)
      }
    }
    fetchLocations()
  }, [])

  return (
    <section className="py-20 md:py-24 bg-[#f7f7f2]" id="locations">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {locations.length === 0 ? (
          <div className="bg-[#EAF5D6] bg-opacity-60 rounded-[30px] md:rounded-[40px] p-16 text-center">
            <h2 className="text-[32px] md:text-[48px] font-bold font-headline text-[#426500] mb-6">
              Visiting Soon
            </h2>
            <p className="text-[20px] md:text-[24px] text-[#5B5C59] font-medium italic">
              Our store locations are being updated. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {locations.map((loc, idx) => (
              <div
                key={loc.id}
                className={`bg-[#EAF5D6] bg-opacity-60 rounded-[30px] md:rounded-[40px] p-8 md:p-12 lg:p-16 flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 md:gap-16 items-center`}
              >
                <div className="lg:w-[45%] flex flex-col items-start lg:px-10">
                  <h2 className="text-[32px] md:text-[48px] font-bold font-headline text-[#426500] mb-6 tracking-tight leading-tight">
                    Find Our Atelier
                  </h2>
                  <h4 className="font-bold text-[18px] md:text-[19px] text-[#426500] mb-2 font-body uppercase tracking-wider">
                    {loc.name}
                  </h4>
                  <p className="text-[20px] md:text-[28px] text-[#5B5C59] font-bold leading-relaxed mb-8 md:mb-10 tracking-tight">
                    {loc.address_line_1}
                    <br />
                    {loc.suburb}, {loc.state}
                    <br />
                    {loc.postcode}
                  </p>
                  <a
                    href={
                      loc.map_url ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${loc.address_line_1} ${loc.suburb} ${loc.state} ${loc.postcode}`)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#426500] text-[#F7F7F2] px-8 py-3.5 rounded-full font-bold flex items-center gap-3 hover:bg-[#395800] transition-all shadow-sm active:scale-95 text-[16px] font-body"
                  >
                    <span className="material-symbols-outlined text-[20px]">map</span>
                    Open In Maps
                  </a>
                </div>
                <div className="lg:w-[55%] aspect-square lg:aspect-[693/670] w-full relative">
                  {/* We can use the static map or a dynamic placeholder if map_url is just a link */}
                  <img
                    className="w-full h-full object-cover rounded-[32px] shadow-sm brightness-95"
                    src="/map-pic.png"
                    alt={`Map to ${loc.name}`}
                  />
                  <div className="absolute inset-0 bg-primary/5 rounded-[32px] pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Locations
