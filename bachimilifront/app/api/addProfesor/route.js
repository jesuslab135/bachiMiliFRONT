// app/api/addProfesor/route.js
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const filePath = path.join(process.cwd(), "public", "testData.json");

    // Leer el archivo JSON
    const fileData = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(fileData);

    // Obtener el nuevo profesor del cuerpo de la solicitud
    const body = await req.json();
    const newProfesor = {
      matricula: `DOC00${data.docentes.length + 1}`, // Genera una nueva matrícula basada en la longitud
      ...body,
    };

    // Añadir el nuevo profesor y guardar el archivo actualizado
    data.docentes.push(newProfesor);
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(JSON.stringify({ message: "Profesor registrado exitosamente", profesor: newProfesor }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    return new Response(JSON.stringify({ message: "Error al registrar el profesor" }), { status: 500 });
  }
}
