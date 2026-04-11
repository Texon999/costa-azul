import { User } from "lucide-react";

export const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-[#94A3B8]">{label}</label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
        )}

        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="username"
          maxLength={10}
          
          className={`
  auth-input w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#1E293B] text-white border
  ${error ? "border-red-500" : "border-[#334155]"}
  focus:outline-none focus:border-blue-500 focus:ring-0 focus:bg-[#1E293B] focus:text-white
  transition-all duration-200
`}
        />
      </div>
    </div>
  );
};

export default Input;