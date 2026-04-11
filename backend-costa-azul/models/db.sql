CREATE DATABASE IF NOT EXISTS hotel_costa_azul;
USE hotel_costa_azul;

CREATE TABLE IF NOT EXISTS usuario (
  id_usuario         INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario     VARCHAR(100) NOT NULL UNIQUE,
  contrasena_usuario VARCHAR(255) NOT NULL,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sede (
  id_sede     INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(150) NOT NULL,
  ciudad      VARCHAR(100) NOT NULL,
  direccion   VARCHAR(150) NOT NULL,
  imagen_url  VARCHAR(500) NOT NULL,
  precio_base DECIMAL(10,2) NOT NULL,
  descripcion VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS habitacion (
  id_habitacion INT AUTO_INCREMENT PRIMARY KEY,
  id_sede       INT NOT NULL,
  numero        VARCHAR(10) NOT NULL,
  tipo          ENUM('simple','doble','suite') NOT NULL,
  capacidad     INT NOT NULL,
  precio_noche  DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_sede) REFERENCES sede(id_sede)
);

CREATE TABLE IF NOT EXISTS reserva (
  id_reserva    INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario    INT NOT NULL,
  id_sede       INT NOT NULL,
  id_habitacion INT NOT NULL,
  fecha_inicio  DATE NOT NULL,
  fecha_fin     DATE NOT NULL,
  precio        DECIMAL(10,2) NOT NULL,
  estado        ENUM('pendiente','confirmada','cancelada','completada')
                NOT NULL DEFAULT 'pendiente',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario)    REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_sede)       REFERENCES sede(id_sede),
  FOREIGN KEY (id_habitacion) REFERENCES habitacion(id_habitacion)
);





-- Datos para probar la bd 

-- USUARIOS DE PRUEBA
-- Usuario: demo, Contraseña: demo123
INSERT INTO usuario (nombre_usuario, contrasena_usuario) VALUES
('demo', '$2a$10$F9/clWj7HVcJV1K.qQ0ghuBepKKLpR.hLhzXrSN0FDv0eFH5h/FXq');

-- SEDES
INSERT INTO sede (nombre, ciudad, direccion, imagen_url, precio_base, descripcion) VALUES
('Hotel Costa Azul Bocagrande', 'Cartagena', 'Av. del Mar #12-34, Bocagrande', 'https://images.unsplash.com/photo-1566073771259-6a8506099945', 150000, 'Hotel frente al mar en Bocagrande'),
('Hotel Costa Azul Rosario', 'Islas del Rosario', 'Isla Grande, Archipiélago', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791', 280000, 'Resort privado en las islas'),
('Hotel Costa Azul Amurallada', 'Cartagena', 'Calle del Cuartel #3-45, Centro', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa', 210000, 'Hotel boutique en la ciudad amurallada'),
('Hotel Costa Azul Poblado', 'Medellín', 'Calle 10 #43-28, El Poblado', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', 180000, 'Hotel de lujo en el mejor sector de Medellín'),
('Hotel Costa Azul Zona Rosa', 'Bogotá', 'Cra 13 #85-60, Zona Rosa', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9', 200000, 'Hotel ejecutivo en el corazón de Bogotá');

INSERT INTO habitacion (id_sede, numero, tipo, capacidad, precio_noche) VALUES
-- HABITACIONES PARA HOTEL COSTA AZUL BOCAGRANDE
(1, '101', 'simple', 1, 150000),
(1, '102', 'doble',  2, 200000),
(1, '201', 'suite',  4, 350000),
  
(2, '101', 'simple', 1, 280000),
(2, '102', 'doble',  2, 350000),
(2, '201', 'suite',  4, 500000),

(3, '101', 'simple', 1, 210000),
(3, '102', 'doble',  2, 260000),
(3, '201', 'suite',  4, 420000),

(4, '101', 'simple', 1, 180000),
(4, '102', 'doble',  2, 230000),
(4, '201', 'suite',  4, 380000),

(5, '101', 'simple', 1, 200000),
(5, '102', 'doble',  2, 250000),
(5, '201', 'suite',  4, 400000);