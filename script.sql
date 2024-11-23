CREATE DATABASE IF NOT EXISTS menu;
USE menu;
DROP TABLE IF EXISTS Pedido_Producto;
DROP TABLE IF EXISTS Reseña;
DROP TABLE IF EXISTS Reserva;
DROP TABLE IF EXISTS Pedido;
DROP TABLE IF EXISTS Metodo_de_pago;
DROP TABLE IF EXISTS Producto;
DROP TABLE IF EXISTS Restaurante;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS Categoria;
DROP TABLE IF EXISTS Horario;
DROP TABLE IF EXISTS Rol;

CREATE TABLE Rol (
    id_rol VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- INSERTS PARA TABLA Rol
INSERT INTO Rol (id_rol, nombre, descripcion)
VALUES
	("1", 'Usuario', 'Puede realizar pedidos y reservas'),
    ("2", 'Administrador', 'Gestiona el sistema y tiene acceso completo'),
    ("3", 'Dueño', 'Gestiona su propio restaurante y productos');

CREATE TABLE Categoria (
    id_categoria VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- INSERTS PARA TABLA Categoria
INSERT INTO Categoria (id_categoria, nombre)
VALUES
    (UUID(), 'italiana'),
    (UUID(), 'china'),
    (UUID(), 'Comida rápida');

CREATE TABLE Metodo_de_pago (
    id_metodo_pago VARCHAR(36) PRIMARY KEY,
    tipo_pago ENUM('Tarjeta de crédito', 'PayPal', 'Transferencia', 'Efectivo') NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE
);

-- INSERTS PARA TABLA Metodo_de_pago
INSERT INTO Metodo_de_pago (id_metodo_pago, tipo_pago)
VALUES
    (UUID(), 'Tarjeta de crédito'),
    (UUID(), 'PayPal'),
    (UUID(), 'Efectivo');


CREATE TABLE Horario (
    id_horario VARCHAR(36) PRIMARY KEY,
    lunes VARCHAR(50),
    martes VARCHAR(50),
    miercoles VARCHAR(50),
    jueves VARCHAR(50),
    viernes VARCHAR(50),
    sabado VARCHAR(50),
    domingo VARCHAR(50)
);

-- INSERTS PARA TABLA Horario
INSERT INTO Horario (id_horario, lunes, martes, miercoles, jueves, viernes, sabado, domingo)
VALUES
    (UUID(), '8:00am-6:00pm', '8:00am-6:00pm', '8:00am-6:00pm', '8:00am-6:00pm', '8:00am-6:00pm', '9:00am-5:00pm', 'Cerrado'),
    (UUID(), '10:00am-8:00pm', '10:00am-8:00pm', '10:00am-8:00pm', '10:00am-8:00pm', '10:00am-8:00pm', '10:00am-6:00pm', '10:00am-4:00pm');

CREATE TABLE Usuario (
    id_usuario VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    id_rol VARCHAR(36) DEFAULT "1",
    contrasena VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    fecha_nacimiento DATE,
    preferencias TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado_cuenta BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol)
);

-- INSERTS PARA TABLA Usuario
INSERT INTO Usuario (id_usuario, nombre, apellido, correo, telefono, id_rol, contrasena, direccion, fecha_nacimiento, estado_cuenta)
VALUES
    (UUID(), 'Juan', 'Pérez', 'juan.perez@gmail.com', '3216549870', (SELECT id_rol FROM Rol WHERE nombre = 'Usuario'), 'password123', 'Carrera 789', '1990-12-12', TRUE),
    (UUID(), 'María', 'Gómez', 'maria.gomez@gmail.com', '1237894560', (SELECT id_rol FROM Rol WHERE nombre = 'Administrador'), 'adminpassword', 'Calle 101', '1985-07-07', TRUE);


CREATE TABLE Restaurante (
    id_restaurante VARCHAR(36) PRIMARY KEY,
    nombre_restaurante VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    direccion VARCHAR(255),
    fecha_fundacion DATE,
    id_categoria VARCHAR(36),
    id_horario VARCHAR(36),
    descripcion TEXT,
    id_dueno VARCHAR(36),
    calificacion FLOAT CHECK (calificacion >= 0 AND calificacion <= 5),
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria),
    FOREIGN KEY (id_horario) REFERENCES Horario(id_horario),
    FOREIGN KEY (id_dueno) REFERENCES Usuario(id_usuario)
);

-- INSERTS PARA TABLA Restaurante
INSERT INTO Restaurante (id_restaurante, nombre_restaurante, correo, telefono, direccion, fecha_fundacion, id_categoria, id_horario, descripcion, calificacion)
VALUES
    (UUID(), 'Pizzería Italiana', 'contacto@pizzeriaitaliana.com', '1234567890', 'Calle 123', '2010-01-01', (SELECT id_categoria FROM Categoria WHERE nombre = 'italiana'), (SELECT id_horario FROM Horario LIMIT 1), 'La mejor pizza de la ciudad', 4.8),
    (UUID(), 'Hamburguesas Rápidas', 'info@hamburguesasrapidas.com', '0987654321', 'Avenida 456', '2015-05-15', (SELECT id_categoria FROM Categoria WHERE nombre = 'Comida rápida'), (SELECT id_horario FROM Horario LIMIT 1 OFFSET 1), 'Deliciosas hamburguesas a toda velocidad', 4.2);
    
CREATE TABLE Pedido (
    id_pedido VARCHAR(36) PRIMARY KEY,
    id_usuario VARCHAR(36),
    id_restaurante VARCHAR(36),
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    monto_total FLOAT NOT NULL,
    estado ENUM('Pendiente', 'Preparación', 'Enviado', 'Completado', 'Cancelado'),
    id_metodo_pago VARCHAR(36),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_restaurante) REFERENCES Restaurante(id_restaurante),
    FOREIGN KEY (id_metodo_pago) REFERENCES Metodo_de_pago(id_metodo_pago)
);

-- INSERTS PARA TABLA Pedido
INSERT INTO Pedido (id_pedido, id_usuario, id_restaurante, monto_total, estado, id_metodo_pago)
VALUES
    (UUID(), (SELECT id_usuario FROM Usuario WHERE correo = 'juan.perez@gmail.com'), (SELECT id_restaurante FROM Restaurante WHERE nombre_restaurante = 'Pizzería Italiana'), 21.98, 'Pendiente', (SELECT id_metodo_pago FROM Metodo_de_pago WHERE tipo_pago = 'Tarjeta de crédito'));


CREATE TABLE Producto (
    id_producto VARCHAR(36) PRIMARY KEY,
    id_restaurante VARCHAR(36),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio FLOAT NOT NULL,
    imagen VARCHAR(255),
    FOREIGN KEY (id_restaurante) REFERENCES Restaurante(id_restaurante)
);
-- INSERTS PARA TABLA Producto
INSERT INTO Producto (id_producto, id_restaurante, nombre, descripcion, precio, imagen)
VALUES
    (UUID(), (SELECT id_restaurante FROM Restaurante WHERE nombre_restaurante = 'Pizzería Italiana'), 'Pizza Margarita', 'Pizza clásica con albahaca y queso mozzarella', 10.99, 'pizza.jpg'),
    (UUID(), (SELECT id_restaurante FROM Restaurante WHERE nombre_restaurante = 'Hamburguesas Rápidas'), 'Hamburguesa Clásica', 'Hamburguesa con queso, tomate y lechuga', 8.50, 'hamburguesa.jpg');

CREATE TABLE Pedido_Producto (
    id_pedido VARCHAR(36),
    id_producto VARCHAR(36),
    cantidad INT NOT NULL,
    observaciones TEXT,
    PRIMARY KEY (id_pedido, id_producto),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

-- INSERTS PARA TABLA Pedido_Producto
INSERT INTO Pedido_Producto (id_pedido, id_producto, cantidad, observaciones)
VALUES
    ((SELECT id_pedido FROM Pedido WHERE id_usuario = (SELECT id_usuario FROM Usuario WHERE correo = 'juan.perez@gmail.com')), 
     (SELECT id_producto FROM Producto WHERE nombre = 'Pizza Margarita'), 
     2, 'Sin albahaca');

CREATE TABLE Reserva (
    id_reserva VARCHAR(36) PRIMARY KEY,
    id_usuario VARCHAR(36),
    id_restaurante VARCHAR(36),
    fecha_reserva DATETIME,
    numero_personas INT NOT NULL,
    estado ENUM("Pendiente", "Confirmada", "Cancelada", "Completada"),
    comentario TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_restaurante) REFERENCES Restaurante(id_restaurante)
);
-- INSERTS PARA TABLA Reserva
INSERT INTO Reserva (id_reserva, id_usuario, id_restaurante, fecha_reserva, numero_personas, estado, comentario)
VALUES
    (UUID(), (SELECT id_usuario FROM Usuario WHERE correo = 'juan.perez@gmail.com'), 
     (SELECT id_restaurante FROM Restaurante WHERE nombre_restaurante = 'Pizzería Italiana'), 
     '2024-11-25 20:00:00', 4, 'Pendiente', 'Mesa cerca de la ventana');
     
CREATE TABLE Reseña (
    id_reseña VARCHAR(36) PRIMARY KEY,
    id_usuario VARCHAR(36),
    id_restaurante VARCHAR(36),
    calificacion FLOAT CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_restaurante) REFERENCES Restaurante(id_restaurante)
);
-- INSERTS PARA TABLA Reseña
INSERT INTO Reseña (id_reseña, id_usuario, id_restaurante, calificacion, comentario)
VALUES
    (UUID(), (SELECT id_usuario FROM Usuario WHERE correo = 'juan.perez@gmail.com'), 
     (SELECT id_restaurante FROM Restaurante WHERE nombre_restaurante = 'Pizzería Italiana'), 
     5.0, 'Deliciosa comida y excelente servicio.');

