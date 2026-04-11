import { MapPin, Star, Waves } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Ubicación privilegiada',
    description: 'Frente al mar cristalino de Cartagena, en la zona más exclusiva de la ciudad.',
  },
  {
    icon: Star,
    title: 'Servicio 5 estrellas',
    description: 'Atención personalizada y estándares internacionales para una estancia perfecta.',
  },
  {
    icon: Waves,
    title: 'Experiencias únicas',
    description: 'Desde cenas románticas frente al mar hasta tours privados por las Islas del Rosario.',
  },
]

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors duration-300">
        <Icon size={22} className="text-blue-400" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
      <p className="text-[#64748B] text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Features() {
  return (
    <section className="bg-[#0A0F1E] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Por qué elegirnos</p>
          <h2 className="text-white text-4xl font-bold">Una experiencia sin igual</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
