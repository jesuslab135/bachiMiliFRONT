// app/api/addGrupo/route.js
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const filePath = path.join(process.cwd(), "public", "testData.json");

    // Leer el archivo JSON
    const fileData = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(fileData);

    // Obtener el nuevo grupo del cuerpo de la solicitud
    const body = await req.json();
    const newGrupo = {
      codigo: data.grupos.length + 1, // Genera un nuevo código basado en la longitud
      nombre: body.nombreGrupo,
      periodo: parseInt(body.periodo, 10),
    };

    // Añadir el nuevo grupo y guardar el archivo actualizado
    data.grupos.push(newGrupo);
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(JSON.stringify({ message: "Grupo registrado exitosamente", grupo: newGrupo }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    return new Response(JSON.stringify({ message: "Error al registrar el grupo" }), { status: 500 });
  }
}
