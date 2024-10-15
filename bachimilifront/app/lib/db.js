import mysql from 'mysql2/promise';

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost', // Cambia si es necesario
    user: 'jefeadmin', // Usuario de MySQL
    password: 'mi_contraseña_segura', // Contraseña de MySQL (si tienes)
    database: 'bachimiliback', // Nombre de tu base de datos en XAMPP
  });

  return connection;
}

