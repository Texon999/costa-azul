import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/axios";
import { Input } from "./Input.jsx";
import { InputPassword } from "./InputPassword.jsx";
import { StatusMessage } from "./StatusMessage.jsx";
import { Button } from "./Button.jsx";
import { User } from "lucide-react";

export const LoginForm = ({ mode = "login", onError }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ text: null, type: null });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const clearStatus = () => {
    setStatus({ text: null, type: null });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status.text) {
      clearStatus();
      if (onError) onError(null);
    }
  };

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      const message = "Completa usuario y contraseña";
      setStatus({ text: message, type: "error" });
      if (onError) onError(message);
      return;
    }

    setLoading(true);
    clearStatus();
    if (onError) onError(null);

    try {
      const endpoint = mode === "login" ? "login" : "register";
      const response = await API.post(`/auth/${endpoint}`, {
        user: form.username,
        password: form.password,
      });

      if (mode === "register") {
        setStatus({
          text: "Cuenta creada. Redirigiendo a login...",
          type: "success",
        });
        setForm({ username: "", password: "" });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const userData = response.data.data;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authenticated", "true");
        const redirectTo = searchParams.get("redirect") || "/reservations";
        navigate(redirectTo);
      }
    } catch (err) {
      let message = "Error de conexión";

      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err?.response?.status === 401) {
        message = "Usuario o contraseña incorrectos";
      } else if (err?.response?.status === 409) {
        message = "Este usuario ya existe";
      } else if (err?.response?.status === 400) {
        message = "Por favor completa todos los campos";
      }

      setStatus({ text: message, type: "error" });
      if (onError) onError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-white">
          {mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
        </h2>
        <p className="text-[#94A3B8] text-sm">
          {mode === "login"
            ? "Ingresa tus credenciales para continuar"
            : "Registra tus datos para acceder al sistema"}
        </p>
      </div>

      <Input
        label="Usuario"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Cielo Alejandra"
        icon={User}
        error={status.type === "error" ? status.text : null}
      />

      <InputPassword value={form.password} onChange={handleChange} />

      <StatusMessage message={status.text} type={status.type} />

      <Button onClick={handleSubmit} loading={loading}>
        {mode === "login" ? "Iniciar sesión" : "Registrarse"}
      </Button>

      <div className="text-center text-sm text-[#94A3B8]">
        <p>
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <Link
            to={mode === "login" ? "/register" : "/login"}
            className="text-blue-400 hover:underline"
          >
            {mode === "login" ? "Regístrate aquí" : "Inicia sesión"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
