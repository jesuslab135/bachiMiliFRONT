import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { matricula, nuevaContrasena } = await request.json();
    const filePath = path.join(process.cwd(), "public", "testData.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const usuario = jsonData.admin.find(a => a.matricula === matricula) || 
                    jsonData.docentes.find(d => d.matricula === matricula);

    if (usuario) {
      usuario.contrasena = nuevaContrasena;
    } else {
      return new Response(JSON.stringify({ success: false, message: "Usuario no encontrado" }), { status: 404 });
    }

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
