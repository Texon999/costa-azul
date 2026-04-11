import { Link } from 'react-router-dom'
import { ChevronDown, Waves } from 'lucide-react'

function Hero() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Imagen de fondo — vista aérea de resort en el Caribe */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=90')`
        }}
      />

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0A0F1E]" />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
          <Waves className="w-3.5 h-3.5 text-blue-300" />
          Caribe Colombiano
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
          Donde el mar se<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
            convierte en hogar
          </span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Vive una experiencia única en el corazón del Caribe. Lujo, naturaleza y hospitalidad en un solo lugar.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/reservations"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            Reservar ahora
          </Link>
          <button
            onClick={scrollToNext}
            className="border border-white/30 hover:border-white/70 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:bg-white/10 backdrop-blur-sm"
          >
            Conocer más
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/90 transition-colors animate-bounce"
        aria-label="Scroll hacia abajo"
      >
        <ChevronDown size={28} />
      </button>

    </section>
  )
}

export default Hero
