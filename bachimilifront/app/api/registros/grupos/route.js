import fs from "fs";
import path from "path";

export async function PUT(request) {
  try {
    const updatedGrupo = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const index = jsonData.grupos.findIndex((g) => g.codigo === updatedGrupo.id);
    if (index !== -1) {
      jsonData.grupos[index].nombre = updatedGrupo.nombre;
      jsonData.grupos[index].periodo = updatedGrupo.periodo;
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Grupo no encontrado" }), { status: 404 });
    }
  } catch (error) {
    console.error("Error updating grupo:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const newGrupos = jsonData.grupos.filter((g) => g.codigo !== id);
    if (newGrupos.length === jsonData.grupos.length) {
      return new Response(JSON.stringify({ success: false, message: "Grupo no encontrado" }), { status: 404 });
    }

    jsonData.grupos = newGrupos;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting grupo:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
