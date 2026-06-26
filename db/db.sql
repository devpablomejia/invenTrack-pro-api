CREATE DATABASE IF NOT EXISTS inventrack_db;

USE inventrack_db;

CREATE TABLE
    IF NOT EXISTS roles (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(80) UNIQUE,
        PRIMARY KEY (id)
    );

CREATE TABLE
    IF NOT EXISTS usuarios (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role_id INT NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    IF NOT EXISTS categorias (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(100) UNIQUE NOT NULL,
        descripcion TEXT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    IF NOT EXISTS productos (
        id INT NOT NULL AUTO_INCREMENT,
        sku VARCHAR(255) UNIQUE NOT NULL,
        nombre VARCHAR(100) UNIQUE NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10, 2),
        stock_actual INT DEFAULT 0,
        categoria_id INT NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    IF NOT EXISTS historial_movimiento (
        id INT NOT NULL AUTO_INCREMENT,
        producto_id INT NOT NULL,
        usuario_id INT NOT NULL,
        tipo_movimiento_id INT NOT NULL,
        cantidad INT,
        motivo VARCHAR(255),
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
        PRIMARY KEY (id)
    );

CREATE TABLE
    IF NOT EXISTS tipo_movimiento (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_roles FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE productos ADD CONSTRAINT fk_productos_categorias FOREIGN KEY (categoria_id) REFERENCES categorias (id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE historial_movimiento ADD CONSTRAINT fk_historial_productos FOREIGN KEY (producto_id) REFERENCES productos (id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE historial_movimiento ADD CONSTRAINT fk_historial_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE historial_movimiento ADD CONSTRAINT fk_historial_tipos FOREIGN KEY (tipo_movimiento_id) REFERENCES tipo_movimiento (id) ON DELETE RESTRICT ON UPDATE CASCADE;