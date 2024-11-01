import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { updatedGrades } = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'testData.json');

    // Verificar si el archivo JSON existe antes de leerlo
    if (!fs.existsSync(filePath)) {
      console.error("El archivo testData.json no existe en la ruta especificada:", filePath);
      return new Response(JSON.stringify({ message: 'Archivo no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Actualizamos las calificaciones en el archivo JSON
    updatedGrades.forEach((updatedGrade) => {
      const existingGrade = jsonData.calificaciones.find(
        (calificacion) =>
          calificacion.alumno === updatedGrade.alumno && calificacion.clase === updatedGrade.clase
      );

      if (existingGrade) {
        existingGrade.parcial1 = updatedGrade.parcial1;
        existingGrade.parcial2 = updatedGrade.parcial2;
        existingGrade.parcial3 = updatedGrade.parcial3;
      } else {
        jsonData.calificaciones.push({
          clave: jsonData.calificaciones.length + 1,
          ...updatedGrade,
          remedial: null,
          extraordinario: null,
        });
      }
    });

    // Escribir los datos actualizados al archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify({ message: 'Calificaciones actualizadas correctamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al actualizar el archivo JSON:', error.message);
    return new Response(JSON.stringify({ message: 'Error al actualizar las calificaciones', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
