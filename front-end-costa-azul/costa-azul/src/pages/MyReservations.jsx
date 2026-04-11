import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import ReservationCard from "../components/ReservationCard";
import { CalendarX, Plus, AlertTriangle, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/axios";

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

const statusOrder = { Pendiente: 0, Confirmada: 1, Completada: 2, Cancelada: 3 };

const CancelModal = ({ onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 md:p-8 max-w-sm w-full space-y-5">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <button onClick={onClose} className="text-[#64748B] hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div>
        <h3 className="text-white font-semibold text-lg">¿Cancelar reservación?</h3>
        <p className="text-[#64748B] text-sm mt-1">
          Esta acción no se puede deshacer. La reservación quedará marcada como cancelada.
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 bg-[#1E293B] hover:bg-[#334155] text-white text-sm font-medium py-3 rounded-xl transition-colors">
          Volver
        </button>
        <button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-medium py-3 rounded-xl transition-colors">
          Sí, cancelar
        </button>
      </div>
    </div>
  </div>
);

const MyReservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations]   = useState([]);
  const [loading, setLoading]             = useState(true);
  const [cancelTarget, setCancelTarget]   = useState(null);
  const [toast, setToast]                 = useState(null);

  useEffect(() => {
    if (localStorage.getItem("authenticated") !== "true") {
      navigate("/login?redirect=/my-reservations");
    }
  }, [navigate]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchReservations = useCallback(async () => {
    try {
      const res = await API.get("/reservas/me");
      if (res.data?.data) {
        const mapped = res.data.data.map((r) => ({
          id:          r.id_reserva,
          type:        r.nombre,
          location:    `${r.ciudad}, Colombia`,
          checkIn:     r.fecha_inicio?.split("T")[0],
          checkOut:    r.fecha_fin?.split("T")[0],
          price:       parseFloat(r.precio),
          status:      capitalize(r.estado),
          imageUrl:    r.imagen_url,
          isAvailable: false,
        }));
        mapped.sort((a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99));
        setReservations(mapped);
      }
    } catch {
      showToast("No se pudieron cargar tus reservaciones", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

  const handleCancelConfirm = async () => {
    if (!cancelTarget) return;
    try {
      await API.patch(`/reservas/${cancelTarget}/status`, { estado: "cancelada" });
      setReservations((prev) =>
        prev
          .map((r) => r.id === cancelTarget ? { ...r, status: "Cancelada" } : r)
          .sort((a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99))
      );
      showToast("Reservación cancelada correctamente");
    } catch {
      showToast("No se pudo cancelar la reservación", "error");
    } finally {
      setCancelTarget(null);
    }
  };

  const active    = reservations.filter((r) => r.status !== "Cancelada");
  const cancelled = reservations.filter((r) => r.status === "Cancelada");

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Header />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 left-4 md:left-auto md:right-6 z-50 px-5 py-3.5 rounded-xl text-sm font-medium shadow-lg border ${
          toast.type === "error"
            ? "bg-red-500/10 border-red-500/20 text-red-400"
            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
        }`}>
          {toast.message}
        </div>
      )}

      {cancelTarget && (
        <CancelModal onConfirm={handleCancelConfirm} onClose={() => setCancelTarget(null)} />
      )}

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">

        <div className="flex items-start md:items-end justify-between gap-4">
          <div>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">Tu historial</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Mis reservaciones</h1>
            <p className="text-[#64748B] mt-1 text-sm">
              {loading ? "Cargando..." : `${reservations.length} reservación${reservations.length !== 1 ? "es" : ""} en total`}
            </p>
          </div>
          <Link
            to="/reservations"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva reservación</span>
            <span className="sm:hidden">Nueva</span>
          </Link>
        </div>

        {/* Activas */}
        {loading ? (
          <div className="space-y-4">
            <ReservationCard /><ReservationCard /><ReservationCard />
          </div>
        ) : active.length > 0 ? (
          <section className="space-y-4">
            {active.map((res) => (
              <ReservationCard key={res.id} reservation={res} onCancel={(id) => setCancelTarget(id)} />
            ))}
          </section>
        ) : (
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-10 md:p-14 text-center">
            <CalendarX className="w-10 h-10 text-[#334155] mx-auto mb-4" />
            <p className="text-white font-medium mb-1">No tienes reservaciones activas</p>
            <p className="text-[#64748B] text-sm mb-6">Explora nuestras sedes y reserva tu próxima estancia</p>
            <Link to="/reservations" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
              <Plus className="w-4 h-4" />
              Explorar sedes
            </Link>
          </div>
        )}

        {/* Canceladas */}
        {!loading && cancelled.length > 0 && (
          <section>
            <p className="text-[#475569] text-xs uppercase tracking-widest mb-4">
              Canceladas ({cancelled.length})
            </p>
            <div className="space-y-4 opacity-50">
              {cancelled.map((res) => (
                <ReservationCard key={res.id} reservation={res} />
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default MyReservations;
