const GRID_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80',
    alt: 'Wooden stools',
  },
  {
    src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80',
    alt: 'Shelf with decor',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'Green fabric texture',
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    alt: 'Orange sofa',
  },
  {
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    alt: 'Dark round table',
  },
  {
    src: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&q=80',
    alt: 'Glass table',
  },
  {
    src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
    alt: 'Blue armchair',
  },
  {
    src: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80',
    alt: 'Wood detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    alt: 'Table lamp',
  },
  {
    src: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80',
    alt: 'Wire chair',
  },
]

export function FollowUsSection() {
  return (
    <section className="py-20 w-full flex flex-col items-center bg-white">
      <h2 className="text-2xl md:text-4xl font-normal text-black mb-6 md:mb-10 text-center tracking-tight">
        FOLLOW US <span className="font-normal">#Plaiss</span>
      </h2>
      <div className="w-[95vw] max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {GRID_IMAGES.map((image) => (
          <div
            key={image.alt}
            className="aspect-square rounded-2xl overflow-hidden"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
