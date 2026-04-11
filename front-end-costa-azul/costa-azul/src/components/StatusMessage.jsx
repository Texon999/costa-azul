import { AlertCircle, CheckCircle } from "lucide-react";

export const StatusMessage = ({ message, type }) => {
  if (!message) return null;

  const success = type === "success";

  return (
    <div
      className={`flex flex-wrap items-start gap-3 text-sm mt-2 ${
        success ? "text-emerald-300" : "text-red-400"
      }`}
    >
      <span className="flex-shrink-0 mt-1">
        {success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      </span>
      <span className="break-words leading-5">
        {message}
      </span>
    </div>
  );
};

export default StatusMessage;