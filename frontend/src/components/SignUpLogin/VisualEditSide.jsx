function VisualEditSide() {
  return (
    <div className="hidden md:block relative h-[700px] overflow-hidden rounded-xl">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        data-alt="Close-up of a creamy avocado smoothie bowl with fresh toppings and a lime zest garnish in a soft organic ceramic bowl"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY_SwZPg_EogYnAVh5QXqX3eRHz6cZGTWgv3V5n9IGVkUU9NcBWt89HYKGGYqOy_L2OIQ7kRnMXWbPTWoCmGVtEu2roQ2VlgzI1--IOh4CadLQyRqiJl0eCDdTesfywC1Ayb3M9tRELteXGuxyjqALsIhF-ZHcI5ewFn43co_FJYV4NB-_cap--4Q0ASv5qABeI8FCSElIw3u0wXCj_Lcbx9-WHfYVT8A70OG2sKfPKVvTlcDML6HWMF3aq4ziePdS1EU7SIUcLIg5"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
      <div className="absolute bottom-12 left-12 right-12 text-surface-container-lowest">
        <h2 className="text-4xl font-headline font-extrabold tracking-tight mb-4">
          Purely whipped, <br />
          naturally sweet.
        </h2>
        <p className="text-lg opacity-90 max-w-sm">
          Experience the artisanal tradition of Vietnamese avocado cream, reimagined for the modern
          palate.
        </p>
      </div>
    </div>
  )
}

export default VisualEditSide
