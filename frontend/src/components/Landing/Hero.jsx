function Hero() {
  return (
    <section className="relative min-h-[921px] flex items-center px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div className="order-2 lg:order-1">
          <span className="inline-block px-4 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6">Traditional Reimagined</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-6 font-headline">
            Vietnamese <br /> <span className="text-primary italic">Avocado</span> Dessert
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed font-body">
            A silky symphony of fresh avocado mousse, artisanal coconut ice cream, and a crunch of toasted toppings. Experience the creamy heart of Dalat in every spoonful.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg editorial-shadow hover:bg-primary-dim transition-all active:scale-95">
              Join the Kem Bơ Family
            </button>
            <button className="bg-surface-container-lowest border border-outline-variant/20 text-on-surface px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-container-low transition-all active:scale-95">
              Our Story
            </button>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-container/40 to-transparent rounded-full blur-3xl"></div>
          <img
            className="w-full h-auto object-cover rounded-lg rotate-3 hover:rotate-0 transition-transform duration-700 editorial-shadow"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoA4r_KYan9Js5V99ZoTaQC-iTbBA0jJ7cZTspjRzGW4x92aAuLuNzY5iQrYyoF_o2nEzohEajOL-tFxlJQ64_xID5glze8HNdrm2uDywetG4V5JYnWGuqrqGEHX8EPexxZcKk--D3Lk3TZAxgVQx58o6dQE-CFRqIhqawyfueyKysjBXFeAPcRqfS9eFpIaWZ9RpFf_a3aDzhpFSl-5SoFE4nchhUD6FVDj6CrZWWLGaUCJsebHpWR-qEzxtnRGhBtj0a4PYiI1dL"
            alt="Premium close-up of a layered avocado dessert in a crystal glass"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero