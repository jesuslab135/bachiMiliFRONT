-- Create the database
CREATE DATABASE BachiMiliBack;

-- Use the newly created database
USE BachiMiliBack;

-- Create the tables
CREATE TABLE periodos (
	clave INT AUTO_INCREMENT PRIMARY KEY,
	fechaInicio DATE NOT NULL,
	fechaCierre DATE NOT NULL
);

CREATE TABLE parciales (
	clave INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(30) NOT NULL,
	periodo INT NOT NULL,
	FOREIGN KEY (periodo) REFERENCES periodos(clave)
);

CREATE TABLE tipoAsistencias (
	codigo VARCHAR(2) PRIMARY KEY,
	descripcion VARCHAR(30)
);

CREATE TABLE docentes (
	matricula VARCHAR(20) PRIMARY KEY,
	nombrePila VARCHAR(25) NOT NULL,
	apPat VARCHAR(30) NOT NULL,
	apMat VARCHAR(30),
	correo VARCHAR(50) NOT NULL,
	telefono VARCHAR(12) NOT NULL,
	contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE materias (
	codigo INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL
);

CREATE TABLE grupos (
	codigo INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	periodo INT NOT NULL,
	FOREIGN KEY (periodo) REFERENCES periodos(clave)
);

CREATE TABLE clases (
	codigo INT AUTO_INCREMENT PRIMARY KEY,
	materia INT NOT NULL,
	docente VARCHAR(20) NOT NULL,
	grupo INT NOT NULL,
	FOREIGN KEY (materia) REFERENCES materias(codigo),
	FOREIGN KEY (docente) REFERENCES docentes(matricula),
	FOREIGN KEY (grupo) REFERENCES grupos(codigo)
);

CREATE TABLE alumnos (
	matricula VARCHAR(20) PRIMARY KEY,
	nomPila VARCHAR(30) NOT NULL,
	apPat VARCHAR(30) NOT NULL,
	apMat VARCHAR(30),
	correo VARCHAR(50) NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
	grupo INT,
	FOREIGN KEY (grupo) REFERENCES grupos(codigo)
);

CREATE TABLE asistencias (
	codigo INT AUTO_INCREMENT PRIMARY KEY,
	dia DATE NOT NULL,
	parcial INT,
	tipoAsistencia VARCHAR(2),
	alumno VARCHAR(20),
	clase INT,
	FOREIGN KEY (parcial) REFERENCES parciales(clave),
	FOREIGN KEY (tipoAsistencia) REFERENCES tipoAsistencias(codigo),
	FOREIGN KEY (alumno) REFERENCES alumnos(matricula),
	FOREIGN KEY (clase) REFERENCES clases(codigo)
);

CREATE TABLE tipoActividades (
	clave VARCHAR(2) PRIMARY KEY,
	descripcion VARCHAR(30) NOT NULL
);

CREATE TABLE criterios (
	codigo INT AUTO_INCREMENT PRIMARY KEY,
	valorPorcentaje INT NOT NULL,
	clase INT,
	tipo VARCHAR(2),
	parcial INT,
	FOREIGN KEY (parcial) REFERENCES parciales(clave),
	FOREIGN KEY (clase) REFERENCES clases(codigo),
	FOREIGN KEY (tipo) REFERENCES tipoActividades(clave)
);

CREATE TABLE calificaciones (
	clave INT AUTO_INCREMENT PRIMARY KEY,
	total FLOAT DEFAULT 7.0,
	alumno VARCHAR(20) NOT NULL,
	clase INT,
	FOREIGN KEY (clase) REFERENCES clases(codigo),
	FOREIGN KEY (alumno) REFERENCES alumnos(matricula)
);

CREATE TABLE actividades (
	clave INT AUTO_INCREMENT PRIMARY KEY,
	descripcion VARCHAR(100) NOT NULL,
	parcial INT,
	tipo VARCHAR(2),
	clase INT,
	FOREIGN KEY (parcial) REFERENCES parciales(clave),
	FOREIGN KEY (clase) REFERENCES clases(codigo),
	FOREIGN KEY (tipo) REFERENCES tipoActividades(clave)
);

CREATE TABLE alumnos_actividades (
	alumno VARCHAR(20) NOT NULL,
	actividad INT NOT NULL,
	PRIMARY KEY (alumno, actividad),
	FOREIGN KEY (alumno) REFERENCES alumnos(matricula),
	FOREIGN KEY (actividad) REFERENCES actividades(clave)
);


CREATE TABLE admin (
    matricula VARCHAR(20) PRIMARY KEY,
    nombrePila VARCHAR(25) NOT NULL,
    apPat VARCHAR(30) NOT NULL,
    apMat VARCHAR(30),
    correo VARCHAR(50) NOT NULL,
    telefono VARCHAR(12) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);


INSERT INTO admin (matricula, nombrePila, apPat, apMat, correo, telefono, contrasena)
VALUES ('ADMIN001', 'Juan', 'Pérez', 'Gómez', 'admin@example.com', '5551234567', 'mi_contraseña_segura');
