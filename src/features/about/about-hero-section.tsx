export function AboutHeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[75vh] md:min-h-[82vh] mt-20 lg:mt-27 mx-auto w-[92vw] rounded-2xl overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="videos/home_video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center">
        <h1
          className="text-white text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-regular tracking-[-0.07em] leading-none mb-0 drop-shadow-2xl"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          About
        </h1>
        <p className="text-white text-2xl font-regular tracking-wider mt-2 px-4 py-4">
          UNIQUE DESIGNS FOR DISTINCTIVE SPACES
        </p>
      </div>
    </section>
  )
}
