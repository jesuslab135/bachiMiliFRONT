import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const remedialUpdates = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    // Leer y parsear el archivo JSON actual
    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    // Actualizar las calificaciones de remedial en el JSON
    remedialUpdates.forEach((update) => {
      const calificacion = jsonData.calificaciones.find(
        (c) => c.alumno === update.alumno && c.clase === update.clase
      );

      if (calificacion) {
        if (update.remedial1 !== undefined) calificacion.remedial1 = update.remedial1;
        if (update.remedial2 !== undefined) calificacion.remedial2 = update.remedial2;
        if (update.remedial3 !== undefined) calificacion.remedial3 = update.remedial3;
      }
    });

    // Escribir los cambios en el archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating remedial data:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
