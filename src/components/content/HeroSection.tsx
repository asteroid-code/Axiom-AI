export function HeroSection() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Background animation or pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      <div className="relative z-10 max-w-3xl px-4 fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 text-primary">
          Axiom AI: The Future of Intelligence
        </h1>
        <p className="text-xl md:text-2xl text-white opacity-80 mb-8">
          Unveiling the latest breakthroughs, insights, and ethical debates in Artificial Intelligence.
        </p>
        <button className="bg-accent text-dark px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg">
          Explore Articles
        </button>
      </div>
    </section>
  );
}
