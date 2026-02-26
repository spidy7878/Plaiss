import Image from 'next/image'

interface CategoryCardProps {
  title: string
  image: string
}

export function CategoryCard({ title, image }: CategoryCardProps) {
  return (
    <div className="group flex flex-col items-center cursor-pointer py-4 px-2 sm:py-6 sm:px-4 rounded-2xl transition-colors duration-300 hover:bg-[#b0b0b0]">
      {/* Title */}
      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-normal text-black/85 mb-3 sm:mb-5 md:mb-6 text-center leading-snug">
        {title}
      </h3>

      {/* Image */}
      <div className="relative w-full flex items-center justify-center h-28 sm:h-40 md:h-52 lg:h-64 transition-transform duration-500 group-hover:scale-105">
        <Image
          src={image}
          alt={title}
          width={260}
          height={260}
          className="object-contain w-full h-full drop-shadow-sm"
          priority
        />
      </div>
    </div>
  )
}
