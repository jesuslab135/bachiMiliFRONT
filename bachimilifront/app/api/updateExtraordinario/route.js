import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const updatedExtraordinarios = await req.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    updatedExtraordinarios.forEach((update) => {
      const calificacion = data.calificaciones.find(
        (c) => c.alumno === update.alumno && c.clase === update.clase
      );
      if (calificacion) {
        calificacion.extraordinario = update.extraordinario;
      }
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    return new Response(JSON.stringify({ message: "Extraordinarios actualizados exitosamente." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error al actualizar los extraordinarios:", error);
    return new Response(JSON.stringify({ message: "Error al actualizar los extraordinarios." }), {
      status: 500,
    });
  }
}
