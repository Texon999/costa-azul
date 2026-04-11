import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, UserCircle, Waves, Menu, X } from 'lucide-react'

function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser]                 = useState(null)
  const [menuOpen, setMenuOpen]         = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const authenticated = localStorage.getItem('authenticated') === 'true'
    const userData      = localStorage.getItem('user')
    if (authenticated && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authenticated')
    localStorage.removeItem('user')
    fetch('http://localhost:3000/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {})
    setIsAuthenticated(false)
    setUser(null)
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0A0F1E]/95 backdrop-blur-md border-b border-[#1E293B]/80' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <Waves className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-white font-bold text-lg tracking-widest uppercase">Costa Azul</span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/reservations" className="text-[#94A3B8] hover:text-white text-base transition-colors">Reservaciones</Link>
          <a href="#habitaciones" className="text-[#94A3B8] hover:text-white text-base transition-colors">Sedes</a>
          <a href="#" className="text-[#94A3B8] hover:text-white text-base transition-colors">Contacto</a>
        </div>

        {/* Auth desktop */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <UserCircle className="w-5 h-5" />
                <span>{user?.user || 'Usuario'}</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-[#64748B] hover:text-white text-sm transition-colors">
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[#94A3B8] hover:text-white text-sm transition-colors px-3 py-2">
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-white hover:bg-red-500 hover:text-white text-[#0A0F1E] text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Hamburguesa móvil */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0F1E]/98 border-t border-[#1E293B] px-4 py-4 space-y-1">
          <Link to="/reservations" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-[#94A3B8] hover:text-white hover:bg-[#0F172A] rounded-xl text-sm transition-colors">
            Reservaciones
          </Link>
          <a href="#habitaciones" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-[#94A3B8] hover:text-white hover:bg-[#0F172A] rounded-xl text-sm transition-colors">
            Sedes
          </a>
          <div className="pt-2 border-t border-[#1E293B] mt-2 space-y-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-[#94A3B8]">{user?.user}</span>
                <button onClick={handleLogout} className="text-[#64748B] hover:text-red-400 text-sm flex items-center gap-1.5 transition-colors">
                  <LogOut className="w-4 h-4" /> Salir
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-[#94A3B8] hover:text-white hover:bg-[#0F172A] rounded-xl text-sm transition-colors">
                  Iniciar sesión
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 bg-white hover:bg-red-500 hover:text-white text-[#0A0F1E] font-bold rounded-xl text-sm text-center transition-all duration-200">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
