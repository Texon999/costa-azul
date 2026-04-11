export const Button = ({ children, onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 transition duration-200 ease-out text-white font-semibold hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;