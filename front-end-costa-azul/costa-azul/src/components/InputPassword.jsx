import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

export const InputPassword = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm text-[#94A3B8]">Contraseña</label>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />

        <input
          type={show ? "text" : "password"}
          name="password"
          value={value}
          onChange={onChange}
          autoComplete="password"
          maxLength={7}
          className="auth-input w-full pl-10 pr-10 py-3.5 rounded-xl bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:border-blue-500 focus:ring-0 focus:bg-[#1E293B] focus:text-white transition-all duration-200"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default InputPassword;