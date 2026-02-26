export function EngineSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Content */}
      <div className="flex flex-col justify-start px-6 pt-12 pb-8 md:px-12 md:pt-28">
        <h2 className="text-5xl md:text-7xl font-normal text-black mb-8 leading-tight">
          <span className="block leading-[0.95]">The Plaiss</span>
          <span className="block leading-[0.95] mt-4">Engine</span>
        </h2>
        <p className="text-base text-black/70 mb-8 leading-relaxed max-w-md mt-8 md:mt-24">
          This is the space to introduce visitors to the business or brand.
          Briefly explain who&apos;s behind it, what it does and what makes it
          unique. Share its core values and what this site has to offer.
        </p>
        <div>
          <button className="bg-green-700 text-white px-12 py-3.5 rounded-full text-base font-light hover:bg-black hover:text-white transition-colors duration-200">
            Try Now
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative min-h-64 md:min-h-150 flex items-center justify-center mx-4 md:mx-0 md:mr-8">
        <img
          src="/Engine.avif"
          alt="The Plaiss Engine"
          className="w-full h-full object-cover rounded-[2.5rem] md:rounded-[3.5rem] lg:rounded-[1.5rem]"
        />
      </div>
    </section>
  )
}
