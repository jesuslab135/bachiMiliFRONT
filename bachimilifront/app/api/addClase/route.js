// app/api/addClase/route.js
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const filePath = path.join(process.cwd(), "public", "testData.json");

    // Leer el archivo JSON
    const fileData = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(fileData);

    // Obtener los datos de la nueva clase del cuerpo de la solicitud
    const body = await req.json();
    const newClase = {
      codigo: data.clases.length + 1, // Genera un nuevo código basado en la longitud
      materia: body.materia,
      docente: body.profesor,
      grupo: parseInt(body.grupo, 10),
    };

    // Añadir la nueva clase y guardar el archivo actualizado
    data.clases.push(newClase);
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(JSON.stringify({ message: "Clase registrada exitosamente", clase: newClase }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    return new Response(JSON.stringify({ message: "Error al registrar la clase" }), { status: 500 });
  }
}
