import { CategoryCard } from '@/components/category-card'

const PLANTERS_DATA = [
  {
    title: 'Low light plants',
    image:
      'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&q=80',
  },
  {
    title: 'Small desk plants',
    image:
      'https://images.unsplash.com/photo-1602491674275-316d95560fb1?w=400&q=80',
  },
  {
    title: 'Large statement plants',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    title: 'Pet safe plants',
    image:
      'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400&q=80',
  },
]

const FURNITURE_DATA = [
  {
    title: 'Chairs',
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80',
  },
  {
    title: 'Dining',
    image:
      'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=400&q=80',
  },
  {
    title: 'Couches',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
  },
  {
    title: 'TV Top',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
  },
]

export function PlantersGridSection() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-12 pb-12 sm:pb-16 md:pb-24">
      {/* Planters Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
        {PLANTERS_DATA.map((item, index) => (
          <CategoryCard key={index} title={item.title} image={item.image} />
        ))}
      </div>

      {/* Furniture Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        {FURNITURE_DATA.map((item, index) => (
          <CategoryCard key={index} title={item.title} image={item.image} />
        ))}
      </div>
    </section>
  )
}
