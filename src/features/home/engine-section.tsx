export function EngineSection() {
  return (
    <section className="relative w-full min-h-[110vh] overflow-hidden flex items-center justify-center rounded-3xl">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
      >
        <source
          src="/videos/Video Ad for AI _ SaaS Product _ Doks.AI.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Blurry Overlay */}
      <div className="absolute inset-0 bg-[#0b1120]/80 backdrop-blur-sm rounded-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-24">
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-none mb-10">
          The Plaiss Engine
        </h2>

        <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed mb-2">
          The most Advance Engine to make your home designing process efficient
          is now on its way –
        </p>
        <p className="text-base md:text-lg font-bold text-white mb-10">
          Spring 2027
        </p>

        {/* Glowing Button */}
        <div className="relative group">
          {/* Green glow */}
          <div className="absolute -inset-4 bg-green-500/40 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
          <button className="relative bg-white text-gray-900 px-10 py-3.5 rounded-full text-base font-medium hover:bg-white/90 transition-colors duration-200 cursor-pointer">
            View Demo
          </button>
        </div>
      </div>
    </section>
  )
}
