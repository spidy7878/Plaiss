const CATEGORIES = [
  { label: 'Wardrobe', image: '/images/7.png' },
  { label: 'Tools', image: '/images/8.png' },
  { label: 'Beds', image: '/images/6.png' },
  { label: 'Plants', image: '/images/10.avif' },
  { label: 'Chairs', image: '/images/3.png' },
  { label: 'Dining', image: '/images/11.avif' },
  { label: 'Couches', image: '/images/4.png' },
  { label: 'TV Top', image: '/images/9.png' },
]

export function GetItAllSection() {
  return (
    <section className="py-20 bg-white mb-12">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-light text-black tracking-tight mb-6">
          Get it all here
        </h2>
        <p className="text-base text-black/70 max-w-xl mx-auto">
          This is the space to introduce the business&apos;s team and what makes
          it special.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:gap-8 sm:px-8 md:gap-12 md:px-12 max-w-7xl mx-auto">
        {CATEGORIES.map((category) => (
          <div key={category.label} className="flex flex-col items-center">
            <h3 className="text-xl font-light text-black mb-8">
              {category.label}
            </h3>
            <div className="w-full aspect-square bg-white/50 rounded-lg overflow-hidden">
              <img
                src={category.image}
                alt={category.label}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
