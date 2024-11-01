"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function CalificacionesPage() {
  const router = useRouter();
  const [clases, setClases] = useState([]);

  useEffect(() => {
    const fetchClasesData = async () => {
      try {
        const data = await fetchTestData();

        const docenteId = localStorage.getItem("docenteId");

        if (!docenteId) {
          console.error("ID de docente no encontrado en el almacenamiento local");
          return;
        }

        const clasesData = data.clases
          .filter((clase) => clase.docente === docenteId)
          .map((clase) => {
            const materia = data.materias.find((mat) => mat.codigo === clase.materia);
            const grupo = data.grupos.find((grp) => grp.codigo === clase.grupo);
            return {
              id: clase.codigo,
              nombreClase: `${materia?.nombre || "Materia desconocida"} - ${grupo?.nombre || "Grupo desconocido"}`,
            };
          });

        setClases(clasesData);
      } catch (error) {
        console.error("Error al obtener los datos de clases:", error);
      }
    };

    fetchClasesData();
  }, []);

  const handleClaseClick = (clase) => {
    router.push(`/profesor/dashboard/calificaciones/parciales?clase=${clase.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar />

      <div className="p-8 flex-1 mt-16 ml-64">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Clases que imparte:</h2>
          <ul className="space-y-4">
            {clases.length > 0 ? (
              clases.map((clase) => (
                <li key={clase.id}>
                  <button
                    onClick={() => handleClaseClick(clase)}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                  >
                    {clase.nombreClase}
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No tienes clases asignadas.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
