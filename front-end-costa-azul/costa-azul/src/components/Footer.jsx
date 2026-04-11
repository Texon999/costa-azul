import { Mail, Phone, MapPin, Globe, ExternalLink, Link as LinkIcon, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#060D1A] border-t border-[#1E293B] py-16 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Waves className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold text-base tracking-widest uppercase">Costa Azul</span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Líderes en hospitalidad de lujo en el Caribe colombiano. Creamos experiencias que perduran en la memoria.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Contacto</h4>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: 'reservas@costaazul.com' },
                { icon: Phone, text: '+57 (605) 123 4567' },
                { icon: MapPin, text: 'Cartagena de Indias, Colombia' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[#64748B] text-sm">
                  <Icon size={13} className="text-blue-400 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Navegación</h4>
            <ul className="space-y-3">
              {[
                { label: 'Reservaciones', to: '/reservations' },
                { label: 'Nuestras sedes', to: '/home#habitaciones' },
                { label: 'Iniciar sesión', to: '/login' },
                { label: 'Registrarse', to: '/register' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-[#64748B] hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Síguenos</h4>
            <div className="flex gap-3">
              {[
                { icon: Globe,       label: 'Sitio web' },
                { icon: ExternalLink, label: 'Blog' },
                { icon: LinkIcon,    label: 'Contacto' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="bg-[#0F172A] border border-[#1E293B] w-9 h-9 rounded-xl flex items-center justify-center text-[#64748B] hover:text-white hover:border-blue-500/50 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="h-px bg-[#1E293B] mb-6" />

        <p className="text-center text-[#475569] text-xs">
          © 2025 Hotel Costa Azul S.A. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  )
}

export default Footer
