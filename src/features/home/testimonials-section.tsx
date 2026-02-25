const TESTIMONIALS = [
  { name: 'Robert Rose', img: '/Robert.avif' },
  { name: 'Alex Smith', img: '/Alex.avif' },
  { name: 'Drew Carlyle', img: '/Drew.avif' },
  { name: 'Jessica Davis', img: '/Jessica.avif' },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 w-full flex flex-col items-center bg-white">
      <div className="w-[95vw] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        {TESTIMONIALS.map((person) => (
          <div
            key={person.name}
            className="flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden mb-6">
              <img
                src={person.img}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quote Icon */}
            <img
              src="/quotes.png"
              alt="Quotes"
              className="w-6 h-6 mb-1"
              style={{
                filter:
                  'invert(32%) sepia(99%) saturate(7496%) hue-rotate(210deg) brightness(99%) contrast(101%)',
              }}
            />

            {/* Name */}
            <p className="text-blue-600 text-base font-normal mb-2">
              {person.name}
            </p>

            {/* Testimonial */}
            <p className="text-blue-600 text-sm leading-relaxed font-normal">
              This is your Testimonial section paragraph. It&apos;s a great
              place to tell users how much you value your customers and their
              feedback.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
