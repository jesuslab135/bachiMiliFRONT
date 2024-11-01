import fs from "fs";
import path from "path";

export async function PUT(request) {
  try {
    const updatedClase = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const index = jsonData.clases.findIndex((cl) => cl.codigo === updatedClase.codigo);
    if (index !== -1) {
      jsonData.clases[index] = updatedClase;
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Clase no encontrada" }), { status: 404 });
    }
  } catch (error) {
    console.error("Error updating clase:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { codigo } = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const newClases = jsonData.clases.filter((cl) => cl.codigo !== codigo);
    if (newClases.length === jsonData.clases.length) {
      return new Response(JSON.stringify({ success: false, message: "Clase no encontrada" }), { status: 404 });
    }

    jsonData.clases = newClases;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting clase:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
