import fs from "fs";
import path from "path";

export async function PUT(request) {
  try {
    const updatedMateria = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const index = jsonData.materias.findIndex((m) => m.codigo === updatedMateria.codigo);
    if (index !== -1) {
      jsonData.materias[index].nombre = updatedMateria.nombre;
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Materia no encontrada" }), { status: 404 });
    }
  } catch (error) {
    console.error("Error updating materia:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { codigo } = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const newMaterias = jsonData.materias.filter((m) => m.codigo !== codigo);
    if (newMaterias.length === jsonData.materias.length) {
      return new Response(JSON.stringify({ success: false, message: "Materia no encontrada" }), { status: 404 });
    }

    jsonData.materias = newMaterias;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting materia:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
