import { CalendarDays, MapPin, ArrowRight, BanIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);

const statusStyles = {
  Confirmada: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Cancelada:  "bg-red-500/10 text-red-400 border-red-500/20",
  Pendiente:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Completada: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const SkeletonCard = () => (
  <div className="bg-[#0F172A] rounded-2xl overflow-hidden border border-[#1E293B] animate-pulse h-52">
    <div className="flex h-full">
      <div className="w-2/5 bg-[#1E293B] shrink-0" />
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-5 bg-[#1E293B] rounded w-3/4" />
          <div className="h-4 bg-[#1E293B] rounded w-1/2" />
        </div>
        <div className="h-8 bg-[#1E293B] rounded w-1/3" />
      </div>
    </div>
  </div>
);

const ReservationCard = ({ reservation, onCancel }) => {
  const navigate = useNavigate();

  if (!reservation) return <SkeletonCard />;

  const { id, type, location, checkIn, checkOut, price, status, imageUrl, isAvailable } = reservation;

  const handleReserve = () => {
    const authenticated = localStorage.getItem("authenticated") === "true";
    const dest = `/new-reservation?sede=${id}`;
    authenticated ? navigate(dest) : navigate(`/login?redirect=${encodeURIComponent(dest)}`);
  };

  return (
    // h-52 fija la altura de todas las cards igual
    <div className="bg-[#0F172A] rounded-2xl overflow-hidden border border-[#1E293B] hover:border-blue-500/30 transition-all duration-300 flex h-52 group">

      {/* Imagen — ancho fijo, altura heredada de la card */}
      <div className="relative w-2/5 md:w-64 shrink-0 overflow-hidden">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600"}
          alt={type}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F172A]/30" />
        <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full border ${
          isAvailable
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            : statusStyles[status] || statusStyles.Pendiente
        }`}>
          {isAvailable ? "Disponible" : status}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-5 md:p-7 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-white mb-1 truncate">{type}</h3>
          <div className="flex items-center gap-1.5 text-[#64748B] text-sm">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Fechas — solo reservas del usuario */}
        {!isAvailable && checkIn && checkOut && (
          <div className="flex gap-4 md:gap-8 text-sm">
            <div className="flex items-center gap-2 text-[#64748B]">
              <CalendarDays className="w-4 h-4 shrink-0" />
              <div>
                <p className="text-xs text-[#475569] uppercase tracking-wide">Entrada</p>
                <p className="text-white font-medium text-sm">{checkIn}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#64748B]">
              <CalendarDays className="w-4 h-4 shrink-0" />
              <div>
                <p className="text-xs text-[#475569] uppercase tracking-wide">Salida</p>
                <p className="text-white font-medium text-sm">{checkOut}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-[#475569] uppercase tracking-wide mb-0.5">
              {isAvailable ? "Por noche" : "Total"}
            </p>
            <p className="text-xl md:text-2xl font-bold text-blue-400">{formatPrice(price)}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isAvailable && status !== "Cancelada" && status !== "Completada" && onCancel && (
              <button
                onClick={() => onCancel(id)}
                className="text-[#475569] hover:text-red-400 text-xs md:text-sm transition-colors px-2 md:px-3 py-2 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
              >
                Cancelar
              </button>
            )}

            {isAvailable ? (
              <button
                onClick={handleReserve}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-medium px-4 md:px-5 py-2.5 rounded-xl transition-colors duration-200"
              >
                Reservar
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : status === "Cancelada" ? (
              <span className="flex items-center gap-1.5 text-[#475569] text-sm">
                <BanIcon className="w-4 h-4" />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
