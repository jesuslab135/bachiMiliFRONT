import fs from "fs";
import path from "path";

export async function PUT(request) {
  try {
    const updatedProfesor = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const index = jsonData.docentes.findIndex((d) => d.matricula === updatedProfesor.matricula);
    if (index !== -1) {
      jsonData.docentes[index] = {
        ...jsonData.docentes[index],
        nomPila: updatedProfesor.nomPila,
        apPat: updatedProfesor.apPat,
        apMat: updatedProfesor.apMat,
        correo: updatedProfesor.correo,
      };
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Profesor no encontrado" }), { status: 404 });
    }
  } catch (error) {
    console.error("Error updating profesor:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { matricula } = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const newProfesores = jsonData.docentes.filter((d) => d.matricula !== matricula);
    if (newProfesores.length === jsonData.docentes.length) {
      return new Response(JSON.stringify({ success: false, message: "Profesor no encontrado" }), { status: 404 });
    }

    jsonData.docentes = newProfesores;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting profesor:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
