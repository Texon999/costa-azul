import { useState, useEffect } from 'react'
import { UserCircle, LogOut, Waves, Menu, X } from 'lucide-react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser]       = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()

  useEffect(() => {
    const authenticated = localStorage.getItem('authenticated') === 'true'
    const userData      = localStorage.getItem('user')
    if (authenticated && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  // Cierra el menú al cambiar de ruta
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('authenticated')
    localStorage.removeItem('user')
    fetch('http://localhost:3000/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {})
    setIsAuthenticated(false)
    setUser(null)
    navigate('/')
  }

  const navLinks = [
    { to: '/reservations', label: 'Sedes' },
    ...(isAuthenticated ? [{ to: '/my-reservations', label: 'Mis reservaciones' }] : []),
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#0A0F1E]/95 backdrop-blur-md border-b border-[#1E293B]/80">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2.5 group">
          <Waves className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-white font-bold text-sm tracking-widest uppercase">Costa Azul</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-[#64748B]">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hover:text-white transition-colors ${location.pathname === to ? 'text-white' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 text-sm text-[#94A3B8] border border-[#1E293B] px-3 py-1.5 rounded-lg">
                <UserCircle className="w-4 h-4" />
                <span className="max-w-[120px] truncate">{user?.user || 'Usuario'}</span>
              </div>
              <button onClick={handleLogout} className="text-[#64748B] hover:text-white transition-colors" title="Cerrar sesión">
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login?redirect=/reservations"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <UserCircle className="w-4 h-4" />
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Hamburguesa móvil */}
        <button
          className="md:hidden text-[#94A3B8] hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1E293B] bg-[#0A0F1E] px-4 py-4 space-y-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-3 py-2.5 rounded-xl text-sm transition-colors ${
                location.pathname === to
                  ? 'bg-[#0F172A] text-white'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#0F172A]'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#1E293B] mt-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                  <UserCircle className="w-4 h-4" />
                  <span>{user?.user || 'Usuario'}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-1.5 text-[#64748B] hover:text-red-400 text-sm transition-colors">
                  <LogOut className="w-4 h-4" />
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/login?redirect=/reservations"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                <UserCircle className="w-4 h-4" />
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
