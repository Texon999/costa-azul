#  Hotel Costa Azul — Backend

Este es el cerebro del sistema de reservas del Hotel Costa Azul. Se encarga de todo lo que el usuario no ve: guardar usuarios, verificar contraseñas, asignar habitaciones y calcular precios.

---

## ¿Qué hace este proyecto?

Imagina que entras a una página de hotel. Puedes registrarte, iniciar sesión, ver los hoteles disponibles y hacer una reserva. Todo eso necesita un servidor que procese la información, la guarde y te responda.

Este proyecto es ese servidor. Está construido con **Node.js** y **Express**, y guarda toda la información en una base de datos **MySQL**.

---

## ¿Qué puede hacer el sistema?

### Sin necesidad de iniciar sesión:
- Ver todos los hoteles disponibles con su información y precios

### Registrándose:
- Crear una cuenta con usuario y contraseña
- Iniciar sesión y recibir un token de acceso

### Con sesión iniciada:
- Hacer una reserva (el sistema asigna la habitación automáticamente)
- Ver todas mis reservas
- Filtrar mis reservas por fechas o por estado
- Actualizar una reserva
- Cambiar el estado de una reserva
- Eliminar mis reservas canceladas

---

## ¿Cómo viaja una petición por el sistema?

### Ejemplo 1 — Registrar un usuario

```
1. El frontend manda:
   POST /api/auth/register
   { "user": "carlos", "password": "123456" }

2. El servidor recibe la petición en las rutas (authRoutes)
   "esta URL existe, voy al controller"

3. El controller extrae los datos:
   user = "carlos", password = "123456"
   y le pasa el trabajo al service

4. El service valida los datos con Zod:
   ¿tiene al menos 3 caracteres? 
   ¿solo letras y números? 
   ¿ya existe ese usuario en la BD? no → continúa

5. Hashea la contraseña:
   "123456" → "$2b$10$Xk9mN..." (irreversible)
   nunca se guarda la contraseña real

6. El repository guarda en MySQL:
   INSERT INTO usuario (nombre_usuario, contrasena_usuario)

7. El frontend recibe:
   { "ok": true, "data": { "id": 1, "user": "carlos" } }
```

---

### Ejemplo 2 — Iniciar sesión

```
1. El frontend manda:
   POST /api/auth/login
   { "user": "carlos", "password": "123456" }

2. El service busca al usuario en la base de datos

3. Compara la contraseña con bcrypt:
   "123456" vs "$2b$10$Xk9mN..." → coinciden 

4. Genera un token JWT:
   es como una pulsera de concierto — prueba que ya pasaste la entrada
   dura 7 días y lleva el id del usuario adentro

5. El frontend recibe:
   { "ok": true, "token": "eyJhbGci...", "user": { "id": 1 } }

6. El frontend guarda ese token
   lo usará en cada petición privada
```

---

### Ejemplo 3 — Hacer una reserva

```
1. El frontend manda:
   POST /api/reservas
   Authorization: Bearer eyJhbGci...   ← el token
   { "id_sede": 1, "fecha_inicio": "2026-12-12", "fecha_fin": "2026-12-15", "tipo": "simple" }

2. El middleware verifica el token:
   ¿es válido? 
   ¿no ha expirado? 
   extrae el id del usuario del token

3. El service valida los datos con Zod:
   ¿la fecha de inicio no es pasada? 
   ¿la fecha fin es posterior al inicio? 

4. Busca habitaciones disponibles:
   ¿hay alguna habitación simple en esas fechas en esa sede?
   si no hay → error "No hay habitaciones disponibles"
   si hay → toma la primera disponible

5. Calcula el precio en el servidor:
   noches = 3 (del 12 al 15 de diciembre)
   precio = habitacion.precio_noche × noches
   precio = $150,000 × 3 = $450,000
   el cliente nunca manda el precio — el servidor lo calcula

6. Guarda la reserva con la habitación asignada

7. El frontend recibe:
   {
     "ok": true,
     "data": {
       "id_reserva": 5,
       "id_habitacion": 3,
       "precio": 450000,
       "estado": "pendiente"
     }
   }
```

---

### Ejemplo 4 — Ver mis reservas

```
1. El frontend manda:
   GET /api/reservas/me
   Authorization: Bearer eyJhbGci...

2. El middleware verifica el token y extrae el id del usuario

3. El repository busca solo las reservas de ESE usuario:
   SELECT ... WHERE id_usuario = 1
   el usuario nunca puede ver las reservas de otros

4. El frontend recibe la lista con nombre del hotel y ciudad incluidos
```

---

## ¿Qué pasa si algo sale mal?

El sistema siempre responde con un mensaje claro:

```
Usuario no existe:
{ "ok": false, "message": "Usuario o contraseña incorrectos" }

Token expirado:
{ "ok": false, "message": "Token expirado" }

No hay habitaciones:
{ "ok": false, "message": "No hay habitaciones disponibles en esas fechas" }

Datos con caracteres especiales:
{ "ok": false, "message": "Solo letras y números, sin caracteres especiales" }
```

---

## ¿Cómo se protegen las rutas?

Hay rutas públicas y rutas privadas:

```
PÚBLICAS — cualquiera puede acceder:
GET /api/auth/register   → registrarse
GET /api/auth/login      → iniciar sesión
GET /api/sedes           → ver los hoteles

PRIVADAS — solo con token válido:
GET  /api/reservas/me    → mis reservas
POST /api/reservas       → hacer una reserva
PUT  /api/reservas/:id   → modificar una reserva
...
```

Para las rutas privadas hay un guardia de seguridad (middleware) que revisa el token antes de dejar pasar la petición. Si el token es falso o expiró, la petición no llega al destino.

---

## Seguridad

- Las contraseñas nunca se guardan como texto — se transforman con **bcrypt** de forma irreversible
- El token **JWT** expira en 7 días — si alguien lo roba, en 7 días ya no sirve
- El precio de la reserva lo calcula el servidor — el cliente no puede inventarse un precio
- Las consultas a la base de datos usan `?` para prevenir ataques de inyección SQL
- El id del usuario siempre viene del token — nadie puede hacer reservas a nombre de otro

---

## Instalación rápida

```bash
# 1. clonar el proyecto
git clone https://github.com/tu-usuario/backend-costa-azul.git
cd backend-costa-azul

# 2. instalar dependencias
npm install

# 3. crear el archivo .env con tus datos
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tupassword
DB_NAME=hotel_costa_azul
JWT_SECRET=clave_secreta_larga
JWT_EXPIRES_IN=7d

# 4. crear las tablas en MySQL
# ejecutar el archivo models/db.sql en MySQL Workbench

# 5. arrancar el servidor
npm run dev
```
