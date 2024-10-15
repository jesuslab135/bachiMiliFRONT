"use client";

import { useRouter } from "next/navigation";
import TeacherSidebar from "@/app/components/TeacherSidebar"; // Importamos el componente TeacherSidebar

export default function CalificacionesPage() {
  const router = useRouter();
  const clases = [
    "Física 5B",
    "Matemáticas 3A",
    "Química 2D",
    "Biología 5A",
    "Contabilidad 2A",
  ];

  // Manejar el clic en una clase
  const handleClaseClick = (clase) => {
    router.push(`/profesor/dashboard/calificaciones/parciales?clase=${clase}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar /> {/* Incluimos el menú deslizante */}

      {/* Contenido principal */}
      <div className="p-4 flex-1 mt-16 ml-64"> {/* mt-16 para espacio de la barra superior y ml-64 para el sidebar */}
        <div className="bg-white p-4 rounded-lg shadow-md max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Clases que imparte:</h2>
          <ul className="space-y-2">
            {clases.map((clase) => (
              <li key={clase}>
                <button
                  onClick={() => handleClaseClick(clase)}
                  className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md shadow-md text-blue-700 w-full text-left"
                >
                  {clase}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
