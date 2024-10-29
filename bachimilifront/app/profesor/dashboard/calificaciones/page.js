"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function CalificacionesPage() {
  const router = useRouter();
  const [clases, setClases] = useState([]);

  // Fetch de datos para obtener clases, materias y grupos
  useEffect(() => {
    const fetchClasesData = async () => {
      try {
        const data = await fetchTestData();
        
        // Obtener el ID del docente desde el almacenamiento local
        const docenteId = localStorage.getItem("docenteId");
        
        if (!docenteId) {
          console.error("ID de docente no encontrado en el almacenamiento local");
          return;
        }
        
        // Filtrar las clases que imparte el docente
        const clasesData = data.clases
          .filter((clase) => clase.docente === docenteId) // Filtrar solo las clases del docente
          .map((clase) => {
            const materia = data.materias.find((mat) => mat.codigo === clase.materia);
            const grupo = data.grupos.find((grp) => grp.codigo === clase.grupo);
            return {
              id: clase.codigo,
              nombreClase: `${materia?.nombre || "Materia desconocida"} - ${grupo?.nombre || "Grupo desconocido"}`
            };
          });

        setClases(clasesData);
      } catch (error) {
        console.error("Error al obtener los datos de clases:", error);
      }
    };

    fetchClasesData();
  }, []);

  // Manejar el clic en una clase
  const handleClaseClick = (clase) => {
    router.push(`/profesor/dashboard/calificaciones/parciales?clase=${clase.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar /> {/* Incluimos el menú deslizante */}

      {/* Contenido principal */}
      <div className="p-4 flex-1 mt-16 ml-64"> {/* mt-16 para espacio de la barra superior y ml-64 para el sidebar */}
        <div className="bg-white p-4 rounded-lg shadow-md max-w-5xl mx-auto text-gray-500">
          <h2 className="text-lg font-semibold mb-4">Clases que imparte:</h2>
          <ul className="space-y-2">
            {clases.length > 0 ? (
              clases.map((clase) => (
                <li key={clase.id}>
                  <button
                    onClick={() => handleClaseClick(clase)}
                    className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md shadow-md text-blue-700 w-full text-left"
                  >
                    {clase.nombreClase}
                  </button>
                </li>
              ))
            ) : (
              <p>No tienes clases asignadas.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
