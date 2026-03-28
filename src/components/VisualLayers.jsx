function VisaulLayers(){
    return (
        <section className="py-24 bg-surface-container-low" id="menu">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-headline mb-4">The Anatomy of Bliss</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto">Crafted with three distinct layers of texture and temperature.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Layer 1 */}
              <div className="bg-surface-container-lowest p-8 rounded-lg editorial-shadow transform translate-y-4">
                <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">nutrition</span>
                </div>
                <h3 className="text-xl font-bold mb-3 font-headline">Avocado Mousse</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">Ripe Hass avocados whipped into a velvet-smooth base with a hint of condensed milk.</p>
              </div>
              {/* Layer 2 */}
              <div className="bg-surface-container-lowest p-8 rounded-lg editorial-shadow">
                <div className="w-16 h-16 bg-tertiary-container rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-tertiary text-3xl">icecream</span>
                </div>
                <h3 className="text-xl font-bold mb-3 font-headline">Coconut Cream</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">Churned artisanal coconut ice cream provides a cool, floral contrast to the rich mousse.</p>
              </div>
              {/* Layer 3 */}
              <div className="bg-surface-container-lowest p-8 rounded-lg editorial-shadow transform translate-y-4">
                <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-secondary text-3xl">grain</span>
                </div>
                <h3 className="text-xl font-bold mb-3 font-headline">Toasted Garnish</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">Toasted coconut shavings and crushed peanuts add an essential earthy crunch.</p>
              </div>
            </div>
          </div>
        </section>
    )
}

export default VisaulLayers