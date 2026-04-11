import { Star, ShieldCheck, Wifi, Headset, MapPin, CalendarDays } from "lucide-react";

const formatCOP = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);

const perks = [
  { icon: ShieldCheck, label: "Pago seguro" },
  { icon: Wifi,        label: "WiFi premium" },
  { icon: Headset,     label: "Concierge 24/7" },
];

const EmptySummary = () => (
  <div className="w-full lg:w-[440px] shrink-0 bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden lg:sticky lg:top-24">
    <div className="h-52 bg-[#0A0F1E] flex items-center justify-center">
      <CalendarDays className="w-12 h-12 text-[#1E293B]" />
    </div>
    <div className="p-7 text-center space-y-2">
      <p className="text-white font-semibold">Resumen de tu reservación</p>
      <p className="text-[#64748B] text-sm">
        Selecciona las fechas para ver el desglose de precios
      </p>
    </div>
  </div>
);

const ReservationSummary = ({ sedeData, summaryData }) => {
  if (!sedeData) return <EmptySummary />;

  const { hotelName, location, imageUrl } = sedeData;

  return (
    <div className="w-full lg:w-[440px] shrink-0 bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden lg:sticky lg:top-24">

      {/* Imagen */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={hotelName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent" />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold border border-white/10">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-white">4.9</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-bold text-lg leading-snug">{hotelName}</h3>
          <p className="text-white/60 text-sm flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {location}
          </p>
        </div>
      </div>

      <div className="p-7 space-y-6">

        {/* Desglose de precios */}
        {summaryData ? (
          <div className="bg-[#0A0F1E] rounded-xl p-5 space-y-3 text-sm">
            <div className="flex justify-between text-[#94A3B8]">
              <span>Fechas</span>
              <span className="text-white font-medium">{summaryData.dates}</span>
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>Noches</span>
              <span className="text-white font-medium">{summaryData.nights}</span>
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>Precio por noche</span>
              <span className="text-white font-medium">{formatCOP(summaryData.pricePerNight)}</span>
            </div>
            <div className="h-px bg-[#1E293B]" />
            <div className="flex justify-between">
              <span className="text-[#94A3B8] font-medium">Total estimado</span>
              <span className="text-blue-400 text-lg font-bold">{formatCOP(summaryData.total)}</span>
            </div>
          </div>
        ) : (
          <div className="bg-[#0A0F1E] rounded-xl p-5 text-center">
            <p className="text-[#64748B] text-sm">Elige las fechas para ver el precio total</p>
          </div>
        )}

        {/* Perks */}
        <div className="grid grid-cols-3 gap-3">
          {perks.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-[#64748B] text-xs">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReservationSummary;
