import { useState, useEffect } from "react";
import Header from "../components/Header";
import ReservationSummary from "../components/ReservationSummary";
import { ArrowLeft, CalendarDays, MapPin, FileText, CheckCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/axios";

const fallbackLocations = [
  { id_sede: 1, nombre: "Hotel Costa Azul Bocagrande", ciudad: "Cartagena",         precio_base: 150000, imagen_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800" },
  { id_sede: 2, nombre: "Hotel Costa Azul Rosario",    ciudad: "Islas del Rosario",  precio_base: 280000, imagen_url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800" },
  { id_sede: 3, nombre: "Hotel Costa Azul Amurallada", ciudad: "Cartagena",         precio_base: 210000, imagen_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800" },
];

const today = new Date().toISOString().split("T")[0];

const calcNights = (start, end) =>
  Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));

// Clases compartidas para inputs y selects
const inputClass =
  "w-full bg-[#0A0F1E] border border-[#334155] focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors";

const NewReservation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [locations, setLocations]             = useState([]);
  const [selectedSede, setSelectedSede]       = useState("");
  const [checkIn, setCheckIn]                 = useState("");
  const [checkOut, setCheckOut]               = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [summaryData, setSummaryData]         = useState(null);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState("");
  const [success, setSuccess]                 = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 1. Auth check
  useEffect(() => {
    if (localStorage.getItem("authenticated") !== "true") {
      const sede = searchParams.get("sede");
      const dest = sede ? `/new-reservation?sede=${sede}` : "/new-reservation";
      navigate(`/login?redirect=${encodeURIComponent(dest)}`);
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, searchParams]);

  // 2. Cargar sedes
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchLocations = async () => {
      try {
        const res = await API.get("/sedes");
        setLocations(res.data?.ok ? res.data.data : fallbackLocations);
      } catch {
        setLocations(fallbackLocations);
      }
    };
    fetchLocations();
  }, [isAuthenticated]);

  // 3. Pre-seleccionar sede desde URL
  useEffect(() => {
    const sedeParam = searchParams.get("sede");
    if (sedeParam && locations.length > 0) setSelectedSede(sedeParam);
  }, [searchParams, locations]);

  // 4. Calcular desglose cuando hay fechas válidas
  useEffect(() => {
    if (!selectedSede || !checkIn || !checkOut) { setSummaryData(null); return; }
    const loc = locations.find((l) => l.id_sede.toString() === selectedSede);
    if (!loc) return;
    const nights = calcNights(checkIn, checkOut);
    if (nights <= 0) { setSummaryData(null); return; }
    const start = new Date(checkIn);
    const end   = new Date(checkOut);
    setSummaryData({
      dates: `${start.toLocaleDateString("es-ES", { day: "2-digit", month: "short" })} — ${end.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}`,
      nights,
      pricePerNight: loc.precio_base,
      total:         loc.precio_base * nights,
    });
  }, [selectedSede, checkIn, checkOut, locations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSede || !checkIn || !checkOut) { setError("Completa todos los campos requeridos"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/reservas", {
        id_sede:               parseInt(selectedSede),
        fecha_inicio:          checkIn,
        fecha_fin:             checkOut,
        peticiones_especiales: specialRequests,
      });
      if (res.data.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/my-reservations"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear la reservación");
    } finally {
      setLoading(false);
    }
  };

  const sedeActual    = locations.find((l) => l.id_sede.toString() === selectedSede);
  const sedeEstaFijada = !!searchParams.get("sede") && !!sedeActual;
  const sedeData      = sedeActual
    ? { hotelName: sedeActual.nombre, location: `${sedeActual.ciudad}, Colombia`, imageUrl: sedeActual.imagen_url || "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800" }
    : null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[#64748B]">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">¡Reservación creada!</h2>
          <p className="text-[#64748B] text-sm">Redirigiendo a tus reservaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Header />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6 md:space-y-8">

        <Link to="/reservations" className="inline-flex items-center gap-2 text-[#64748B] hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver a reservaciones
        </Link>

        <div>
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">Nueva reservación</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {sedeData ? sedeData.hotelName : "Personaliza tu estancia"}
          </h1>
          <p className="text-[#64748B] mt-1 text-sm">
            {sedeData ? sedeData.location : "Elige una sede para comenzar"}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3.5 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* En móvil: columna. En desktop: fila */}
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Formulario */}
          <div className="w-full lg:flex-1 bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 md:p-8 space-y-6">

            {/* Sede */}
            <div className="space-y-2">
              <label className="text-xs text-[#94A3B8] uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Sede
              </label>
              {sedeEstaFijada ? (
                <div className={`${inputClass} flex items-center justify-between`}>
                  <span className="truncate">{sedeActual.nombre} — {sedeActual.ciudad}</span>
                  <Link to="/reservations" className="text-blue-400 hover:underline text-xs ml-4 shrink-0">
                    Cambiar
                  </Link>
                </div>
              ) : (
                <select
                  value={selectedSede}
                  onChange={(e) => setSelectedSede(e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  required
                >
                  <option value="">Selecciona una sede</option>
                  {locations.map((loc) => (
                    <option key={loc.id_sede} value={loc.id_sede}>
                      {loc.nombre} — {loc.ciudad}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-[#94A3B8] uppercase tracking-widest flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Fecha de entrada
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && e.target.value >= checkOut) setCheckOut("");
                  }}
                  min={today}
                  className={`${inputClass} [color-scheme:dark]`}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-[#94A3B8] uppercase tracking-widest flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Fecha de salida
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || today}
                  className={`${inputClass} [color-scheme:dark]`}
                  required
                />
              </div>
            </div>

            {/* Peticiones especiales */}
            <div className="space-y-2">
              <label className="text-xs text-[#94A3B8] uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Peticiones especiales
                <span className="text-[#334155] normal-case tracking-normal ml-1">(opcional)</span>
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Alergias, preferencias de almohadas, transporte..."
                rows={3}
                className={`${inputClass} resize-none placeholder:text-[#334155]`}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !selectedSede || !checkIn || !checkOut}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors duration-200"
            >
              {loading ? "Creando reservación..." : "Confirmar reservación"}
            </button>
          </div>

          {/* Panel resumen — debajo en móvil, lateral en desktop */}
          <ReservationSummary sedeData={sedeData} summaryData={summaryData} />
        </form>

      </main>
    </div>
  );
};

export default NewReservation;
