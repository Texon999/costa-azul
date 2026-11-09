# Costa Azul — Sistema de reservas de hotel

Plataforma para buscar hoteles, registrarse, iniciar sesión y hacer reservas de habitaciones. Está separada en dos partes:

- **Backend** (`backend-costa-azul/`): API REST con Node.js, Express y MySQL. Autenticación con JWT (cookie `httpOnly`), contraseñas con bcrypt, validación con Zod.
- **Frontend** (`front-end-costa-azul/costa-azul/`): cliente en React + Vite + Tailwind CSS que consume la API.

## Arquitectura

```
costa-azul/
├── backend-costa-azul/      # API REST (Node.js + Express + MySQL)
│   ├── src/server.js        # Punto de entrada
│   ├── app.js               # Configuración de Express (CORS, cookies, rutas)
│   ├── routes/              # authRoutes, reservationRoutes, locationRoutes
│   ├── controller/          # authController, reservationController, locationController
│   ├── services/            # authService, reservationService, locationService
│   ├── repositories/        # acceso a MySQL (user, reservation, room, location)
│   ├── validators/          # esquemas Zod (auth, reservation)
│   ├── utils/               # validate, calculateNights
│   ├── test/                # pruebas (node --test, sin dependencias nuevas)
│   ├── models/db.sql        # esquema y datos de prueba de MySQL
│   ├── package.json
│   └── .env                 # crear a partir de .env.example (no subir)
├── front-end-costa-azul/
│   └── costa-azul/          # Cliente React + Vite + Tailwind
│       ├── src/
│       │   └── services/axios.js   # URL del backend por VITE_API_BASE_URL
│       ├── .env.example   # configuración de ejemplo (sin credenciales)
│       ├── package.json
│       └── ...
└── README.md
```

## Flujo principal (login y reservas)

1. **Registro / login**: `POST /api/auth/register` y `POST /api/auth/login`. El login devuelve un token JWT en una cookie `httpOnly`.
2. **Ver hoteles disponibles**: `GET /api/sedes` (ruta pública, sin sesión).
3. **Hacer una reserva** (requiere sesión): `POST /api/reservas`. El servidor calcula el precio (`noches × precio_noche`) y asigna la habitación; el cliente no envía el precio.
4. **Mis reservas** (requiere sesión): `GET /api/reservas/me`, filtrar por fecha o estado, actualizar, cancelar.

## Rutas públicas vs protegidas

- Públicas (cualquiera): `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/sedes`.
- Protegidas (token JWT válido en cookie): todo lo bajo `/api/reservas` (incluido `GET /api/reservas/public` que antes estaba expuesto sin token y ahora requiere autenticación).

## Requisitos

- Node.js (v18 o superior)
- MySQL (base de datos `hotel_costa_azul`)
- Para el frontend: npm

## Configuración

### Backend
1. Copia el ejemplo de entorno y ajusta los valores (nunca subas credenciales reales):

   ```bash
   cd backend-costa-azul
   # crear .env con tus valores (no hay .env.example en el repo por seguridad)
   ```

   Variables necesarias: `PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `JWT_EXPIRES_IN`.

2. Crea las tablas en MySQL ejecutando `models/db.sql` (incluye datos de prueba: usuario `demo` / `demo123`).

3. Instala dependencias y arranca:

   ```bash
   npm install
   npm run dev        # nodemon
   # o
   npm start          # node server.js
   ```

   La API queda disponible en `http://localhost:3000`.

### Frontend
1. Copia el ejemplo de configuración:

   ```bash
   cd front-end-costa-azul/costa-azul
   cp .env.example .env
   ```

   `.env.example` solo contiene `VITE_API_BASE_URL` (sin credenciales). Ajusta la URL si el backend no está en `localhost:3000`.

2. Instala dependencias y arranca:

   ```bash
   npm install
   npm run dev        # Vite (dev)
   npm run build      # build de producción
   npm run preview    # previsualizar build
   ```

   El cliente lee la URL del backend desde `VITE_API_BASE_URL` (Vite expone variables con prefijo `VITE_`). No hay `localhost` hardcodeado en el cliente.

## Pruebas

Backend (sin dependencias nuevas, usa `node --test`):

```bash
cd backend-costa-azul
npm test
```

Frontend: revisar lint y build:

```bash
cd front-end-costa-azul/costa-azul
npm run lint
npm run build
```

También se incluyen archivos `.http` (`auth.http`, `location.http`, `reservation.http`) para probar los endpoints manualmente con la extensión REST Client de VS Code.

## Demo

No hay una URL de demo publicada registrada en este repositorio. Si desplegas el proyecto, añade aquí el enlace para que se pueda probar directamente.

## Tecnologías

- Backend: Node.js, Express, MySQL (mysql2), JWT (jsonwebtoken), bcryptjs, Zod, dotenv, cors, cookie-parser, morgan.
- Frontend: React, Vite, Tailwind CSS, Axios, Lucide React, React Router.