export function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[75vh] md:min-h-[82vh] mt-20 lg:mt-27 mx-auto w-[92vw] rounded-2xl overflow-hidden"
      style={{
        backgroundImage: 'url(/home.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-white text-[3.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[14rem] font-(family-name:--font-montserrat) font-black tracking-[-0.07em] leading-none mb-0 drop-shadow-2xl">
          Plaiss
        </h1>
        <p className="text-white text-sm sm:text-base md:text-2xl font-regular tracking-wider mt-2 px-4 py-4">
          UNIQUE DESIGNS FOR DISTINCTIVE SPACES
        </p>
      </div>
    </section>
  )
}
