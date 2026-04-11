import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import HomePage from "./pages/Home.jsx";
import Reservations from "./pages/Reservations.jsx";
import NewReservation from "./pages/NewReservation.jsx";
import MyReservations from "./pages/MyReservations.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/reservations" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/new-reservation" element={<NewReservation />} />
      <Route path="/my-reservations" element={<MyReservations />} />
      <Route path="*" element={<Navigate to="/reservations" replace />} />
    </Routes>
  );
}
