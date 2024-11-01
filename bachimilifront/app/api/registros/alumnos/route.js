import fs from "fs";
import path from "path";

export async function PUT(request) {
  try {
    const updatedAlumno = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const index = jsonData.alumnos.findIndex((al) => al.matricula === updatedAlumno.matricula);
    if (index !== -1) {
      jsonData.alumnos[index] = updatedAlumno;
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Alumno no encontrado" }), { status: 404 });
    }
  } catch (error) {
    console.error("Error updating alumno:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { matricula } = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const newAlumnos = jsonData.alumnos.filter((al) => al.matricula !== matricula);
    if (newAlumnos.length === jsonData.alumnos.length) {
      return new Response(JSON.stringify({ success: false, message: "Alumno no encontrado" }), { status: 404 });
    }

    jsonData.alumnos = newAlumnos;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting alumno:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
