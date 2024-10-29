// app/api/addMateria/route.js
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const filePath = path.join(process.cwd(), "public", "testData.json");

    // Leer el archivo JSON
    const fileData = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(fileData);

    // Obtener la nueva materia del cuerpo de la solicitud
    const body = await req.json();
    const newMateria = {
      codigo: data.materias.length + 1,
      ...body,
    };

    // Añadir la nueva materia y guardar el archivo actualizado
    data.materias.push(newMateria);
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(JSON.stringify({ message: "Materia registrada exitosamente", materia: newMateria }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    return new Response(JSON.stringify({ message: "Error al registrar la materia" }), { status: 500 });
  }
}
