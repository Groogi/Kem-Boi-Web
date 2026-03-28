function InstagramGrid(){
    return (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold font-headline mb-2">Social Feed</h2>
                <p className="text-on-surface-variant">Tag us @KemBoAtelier to be featured.</p>
              </div>
              <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold flex items-center gap-2 editorial-shadow">
                <span className="material-symbols-outlined">photo_camera</span>
                Follow
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden relative group">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQBlpR8qwaziFQhftN0Nf4frRJ7OgsfM2k2EEmxqVJ2wFXoyuwzVt8OTC0fzoHZbzoJQadRt-9LgVKwEQtIfzYK9O8rgXAloJEOQ3Kdq3XqIrSq0qkAMhvNKfWR7R_tQXzlSd2KiyV87o9-512UL5qMcgtJohkAE5T4qQVPFQtvKq8MjgWg0VcIAbLzE0zrmH2j_fpDvUkanSXXqyBZm_k_uvj-rK5h6v1FmsvtkIohE0rwdqOcmMGTlPeyZzFop7sBrlXsiFGf2Rr" alt="Close up of avocado dessert with coconut flakes" />
              </div>
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden relative group translate-y-8">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9j1RXnVXGbSbmB3QlEHXm0lznLc69clQ6HIx_9lkz9w17groA8zoPAvDkgOPwdcskApF9aL3mz1lSA2w62TY3h-J1JchN5IqQzV4HClm7vTLjiz-9v03iW7CAEww_wCCg-Ms_NeG1Z2c2hEE7pjEyQlkp7VRBlD4vmH0RbVSZmtm7qbSJGoLLK7zZ3eLeryzuW4dk4I795mP0iKWLE_aVrN770wneawEsFFYSMaSRVwm4nWPpXvoEQd8Y9tZSdlcxCd0vqBoJoJyA" alt="Minimalist shop interior with light wood and green accents" />
              </div>
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden relative group">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8GDZ64lBefApIE3akluo9o5uESCOTs36QNpGZ6RfrLyQD-Rjl_Z6K1RIGakRwYYQ-c7otcJcDynu3Kl0GOj3IXwqjLCpq71yzzLrt82Fp7eOX1cYNx90H4cRnMDjl2oVE2AleTeXTZ9Shyf-jCvp4cYO_DHpHRJzu4zuHazjf8rh8XnllTzqfZjkJhI1hxar4rvsAyFDceb6BbRTUn0IvBVu9jOGcHUB0JbmsJVNTGZilEe3FR3KZgl-1w9UjUSmprfzfFXPBQtc-" alt="Hands holding a cup of avocado dessert against a white wall" />
              </div>
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden relative group translate-y-8">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7wZqOxBPf5MhrAogVX7NvW0EQA0ldCwdVqR3wljiTzHgt9-wPUCCC2fyBH_N8pnDL1Ac2y1f6-gv5wz_8D6oNtmUHB9TYwIVpfdl-prZy5w3XBnNyQmOP8fys86M1v0sWq5z7hZrr--myUwMLIR8x4-RrhKeIkLO42KZ-AMg6snN_mSm0yi77l0j-P31SSub8kP1vY0Cn9rQmIbwAfb-fiep4a2ob8jjTtuErokLgWkt6Qxo2vUtcsJas47Sic8HVN99WaTTlnVjJ" alt="Artistic macro shot of creamy avocado mousse texture" />
              </div>
            </div>
          </div>
        </section>        
    )
}

export default InstagramGrid