export function CategoriesSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 mt-12 border-t border-b border-black">
      {/* All Planters Card */}
      <div className="relative min-h-105 flex flex-col justify-between pt-8 pl-8 pb-12 pr-12 bg-[#f8f6f3] border-r border-black">
        <h2 className="text-2xl font-light text-black z-10">All Planters</h2>
        <div className="absolute inset-0">
          <img
            src="/106.avif"
            alt="All Planters"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="self-end z-10 -mb-4 -mr-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-black"
          >
            <path d="M7 7L17 17M17 17H7M17 7V17" />
          </svg>
        </div>
      </div>

      {/* All Furnitures Card */}
      <div className="relative min-h-105 flex flex-col justify-between pt-8 pl-8 pb-12 pr-12 bg-[#f8f6f3]">
        <h2 className="text-2xl font-light text-black z-10">All Furnitures</h2>
        <div className="absolute inset-0">
          <img
            src="/purple chair - bg.avif"
            alt="All Furnitures"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="self-end z-10 -mb-4 -mr-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-black"
          >
            <path d="M7 7L17 17M17 17H7M17 7V17" />
          </svg>
        </div>
      </div>
    </section>
  )
}
