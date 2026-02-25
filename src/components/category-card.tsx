import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

interface CategoryCardProps {
  title: string
  image: string
}

export function CategoryCard({ title, image }: CategoryCardProps) {
  return (
    <div className="group relative flex flex-col border-black/10 overflow-hidden cursor-pointer bg-white transition-all duration-700 hover:bg-[#f3f3f1] min-h-[400px] lg:min-h-[580px] last:border-l border-b md:border-b-0">
      {/* Title */}
      {/* <div className="p-10 lg:p-14 z-10">
        <h3 className="text-3xl lg:text-4xl font-normal tracking-tight text-black/90">
          {title}
        </h3>
      </div> */}

      {/* Main Image Container */}
      <div className="relative flex-1 flex items-center justify-center transition-all duration-1000 group-hover:scale-105">
        {/* Title absolutely positioned in the image area */}
        <h3 className="absolute top-10 left-10 lg:top-14 lg:left-14 text-3xl lg:text-4xl font-normal tracking-tight text-black/90 z-20 pointer-events-none">
          {title}
        </h3>
        <div className="relative w-full h-full p-12 border border-black rounded-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Action Indicator (Bottom Right) */}
      {/* <div className="absolute bottom-10 right-10 w-16 h-16 pointer-events-none"> */}
      {/* Unhovered State: Simple Arrow Icon */}
      {/* <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-0 group-hover:opacity-0">
          <ArrowUpRight className="w-8 h-8 text-black/90" strokeWidth={1} />
        </div> */}

      {/* Hovered State: Olive Green Circle with Black Arrow */}
      {/* <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#7a8c12] shadow-sm transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 delay-75">
          <ArrowUpRight className="w-8 h-8 text-black" strokeWidth={1.5} />
        </div> */}
      {/* </div> */}
    </div>
  )
}
