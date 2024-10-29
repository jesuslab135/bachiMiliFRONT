// app/api/addAlumno/route.js
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const filePath = path.join(process.cwd(), "public", "testData.json");

    // Leer el archivo JSON
    const fileData = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(fileData);

    // Obtener el nuevo alumno del cuerpo de la solicitud
    const body = await req.json();
    const newAlumno = {
      matricula: `ALU00${data.alumnos.length + 1}`,
      ...body,
    };

    // Añadir el nuevo alumno y guardar el archivo actualizado
    data.alumnos.push(newAlumno);
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(JSON.stringify({ message: "Alumno registrado exitosamente", alumno: newAlumno }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    return new Response(JSON.stringify({ message: "Error al registrar el alumno" }), { status: 500 });
  }
}
