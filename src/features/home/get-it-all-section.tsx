const CATEGORIES = [
  'Wardrobe',
  'Tools',
  'Beds',
  'Plants',
  'Kitchen',
  'Outdoor',
  'Lighting',
  'Decor',
]

export function GetItAllSection() {
  return (
    <section className="py-20 bg-white mb-12">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-light text-black tracking-tight mb-6">
          Get it all here
        </h2>
        <p className="text-base text-black/70 max-w-xl mx-auto">
          This is the space to introduce the business&apos;s team and what makes
          it special.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 max-w-7xl mx-auto">
        {CATEGORIES.map((category) => (
          <div key={category} className="flex flex-col items-center">
            <h3 className="text-xl font-light text-black mb-8">{category}</h3>
            <div className="w-full aspect-square bg-white/50 rounded-lg overflow-hidden">
              <img
                src="/106.avif"
                alt={category}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
