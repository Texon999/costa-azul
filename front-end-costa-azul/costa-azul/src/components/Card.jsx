export const AuthCard = ({ children, footer, hasError }) => {
  return (
    <div
      className={`bg-slate-950/95 backdrop-blur-xl w-full max-w-md rounded-[2rem] overflow-hidden shadow-[0_30px_90px_-40px_rgba(14,165,233,0.45)] border ${
        hasError ? "border-red-500/40" : "border-white/10"
      } min-h-[540px]`}
    >

      <div
        className={`h-px ${
          hasError
            ? "bg-gradient-to-r from-transparent via-red-500 to-transparent"
            : "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        }`}
      />


      <div className="p-10 lg:p-12 space-y-10">
        {children}
      </div>

      <div
        className={`h-px ${
          hasError
            ? "bg-gradient-to-r from-transparent via-red-500 to-transparent"
            : "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        }`}
      />




      {footer && (
        <div className="px-8 py-4 text-center text-sm text-[#94A3B8]">
          {footer}
        </div>
      )}

    </div>
  )
}


export default AuthCard ;