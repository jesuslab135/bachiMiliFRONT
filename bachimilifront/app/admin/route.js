import { connectToDatabase } from '../lib/db';

export async function GET(request) {
  const connection = await connectToDatabase();

  try {
    const [rows] = await connection.query('SELECT * FROM admin');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener los administradores' }), { status: 500 });
  } finally {
    connection.end();
  }
}
