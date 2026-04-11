import { useState, useEffect } from "react";
import Header from "../components/Header";
import ReservationCard from "../components/ReservationCard";
import { Mail, Phone, Building2 } from "lucide-react";
import API from "../services/axios";

const fallbackSedes = [
  { id: 1, type: "Hotel Costa Azul Bocagrande", location: "Cartagena, Colombia",         price: 150000, imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600", isAvailable: true },
  { id: 2, type: "Hotel Costa Azul Rosario",    location: "Islas del Rosario, Colombia",  price: 280000, imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=600", isAvailable: true },
  { id: 3, type: "Hotel Costa Azul Amurallada", location: "Cartagena, Colombia",         price: 210000, imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600", isAvailable: true },
  { id: 4, type: "Hotel Costa Azul Poblado",    location: "Medellín, Colombia",          price: 180000, imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600", isAvailable: true },
  { id: 5, type: "Hotel Costa Azul Zona Rosa",  location: "Bogotá, Colombia",            price: 200000, imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600", isAvailable: true },
];

const Reservations = () => {
  const [sedes, setSedes]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const res = await API.get("/sedes");
        if (res.data?.data && Array.isArray(res.data.data)) {
          setSedes(res.data.data.map((loc) => ({
            id:          loc.id_sede,
            type:        loc.nombre,
            location:    `${loc.ciudad}, Colombia`,
            price:       parseFloat(loc.precio_base),
            imageUrl:    loc.imagen_url,
            isAvailable: true,
          })));
        } else {
          setSedes(fallbackSedes);
        }
      } catch {
        setSedes(fallbackSedes);
      } finally {
        setLoading(false);
      }
    };
    fetchSedes();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Header />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">

        <div className="flex items-end justify-between">
          <div>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">Disponibles</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Nuestras sedes</h1>
            <p className="text-[#64748B] mt-1 text-sm">Elige tu destino y reserva en segundos</p>
          </div>
          {!loading && (
            <div className="flex items-center gap-2 text-[#64748B] text-sm shrink-0">
              <Building2 className="w-4 h-4" />
              <span>{sedes.length} sedes</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {loading
            ? [...Array(3)].map((_, i) => <ReservationCard key={i} />)
            : sedes.map((sede) => <ReservationCard key={sede.id} reservation={sede} />)
          }
        </div>

        {/* Footer ayuda */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 md:p-8 text-center">
          <h4 className="text-base font-semibold text-white mb-1">¿Necesitas ayuda?</h4>
          <p className="text-[#64748B] text-sm max-w-md mx-auto mb-5">
            Nuestro equipo está disponible 24/7 para asistirte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="mailto:soporte@costazul.com" className="flex items-center justify-center gap-2 bg-[#0A0F1E] border border-[#1E293B] hover:border-blue-500/40 text-[#94A3B8] hover:text-white px-4 py-2.5 rounded-xl text-sm transition-all">
              <Mail className="w-4 h-4 text-blue-400" />
              soporte@costazul.com
            </a>
            <a href="tel:+573001234567" className="flex items-center justify-center gap-2 bg-[#0A0F1E] border border-[#1E293B] hover:border-blue-500/40 text-[#94A3B8] hover:text-white px-4 py-2.5 rounded-xl text-sm transition-all">
              <Phone className="w-4 h-4 text-blue-400" />
              +57 300 123 4567
            </a>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Reservations;
