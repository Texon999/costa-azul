import { useState, useEffect } from 'react'
import { MapPin, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import API from '../services/axios'

function SedeCard({ sede, destacado }) {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 group flex flex-col">

      {/* Imagen */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={sede.imagen_url}
          alt={sede.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />

        {destacado && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wider">
            Destacado
          </span>
        )}

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-lg leading-snug mb-1">{sede.nombre}</h3>

        <div className="flex items-center gap-1.5 text-[#64748B] text-sm mb-5">
          <MapPin size={13} />
          <span>{sede.direccion}, {sede.ciudad}</span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-[#64748B] text-xs uppercase tracking-wider mb-0.5">Desde</p>
            <p className="text-white font-bold text-xl">
              ${Number(sede.precio_base).toLocaleString('es-CO')}
              <span className="text-[#64748B] text-sm font-normal"> /noche</span>
            </p>
          </div>

          <Link
            to={`/reservations`}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            Reservar
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function SedeCardSkeleton() {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden animate-pulse">
      <div className="h-60 bg-[#1E293B]" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-[#1E293B] rounded w-3/4" />
        <div className="h-4 bg-[#1E293B] rounded w-1/2" />
        <div className="flex justify-between items-end mt-4">
          <div className="h-7 bg-[#1E293B] rounded w-1/3" />
          <div className="h-9 bg-[#1E293B] rounded-xl w-1/4" />
        </div>
      </div>
    </div>
  )
}

function Sedes() {
  const [sedes, setSedes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const { data } = await API.get('/sedes')
        setSedes(data.data.slice(0, 3))
      } catch {
        setError('No se pudieron cargar las sedes')
      } finally {
        setLoading(false)
      }
    }
    fetchSedes()
  }, [])

  return (
    <section className="bg-[#0A0F1E] py-24 px-6" id="habitaciones">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Nuestras sedes</p>
            <h2 className="text-white text-4xl font-bold">Elige tu destino</h2>
            <p className="text-[#64748B] text-sm mt-2">
              Encuentra el paraíso en cualquiera de nuestras exclusivas ubicaciones
            </p>
          </div>
          <Link
            to="/reservations"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors shrink-0 flex items-center gap-1"
          >
            Ver todas
            <ArrowRight size={14} />
          </Link>
        </div>

        {error && (
          <p className="text-center py-12 text-[#64748B]">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <>
              <SedeCardSkeleton />
              <SedeCardSkeleton />
              <SedeCardSkeleton />
            </>
          ) : (
            sedes.map((sede, index) => (
              <SedeCard key={sede.id_sede} sede={sede} destacado={index === 0} />
            ))
          )}
        </div>

      </div>
    </section>
  )
}

export default Sedes
