// ParcialesPage.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import { fetchTestData } from "@/app/lib/fetchTestData";
import Tabs from "@/app/components/teacher/Tabs";
import SuccessMessage from "@/app/components/teacher/SuccessMessage";
import StudentsTable from "@/app/components/teacher/StudentsTable";
import { generatePDF } from "@/app/hooks/teacher/pdfUtils";

export default function ParcialesPage() {
  const [activeTab, setActiveTab] = useState("calificaciones");
  const [currentView, setCurrentView] = useState("parciales");
  const [materiaNombre, setMateriaNombre] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchClaseData = async () => {
      const claseId = searchParams.get("clase");
      if (claseId) {
        try {
          const data = await fetchTestData();
          const clase = data.clases.find((c) => c.codigo === parseInt(claseId));
          if (clase) {
            const materia = data.materias.find((m) => m.codigo === clase.materia);
            const grupo = data.grupos.find((g) => g.codigo === clase.grupo);
            const alumnosRelacionados = data.alumnos.filter((alumno) => alumno.grupo === clase.grupo);

            const updatedAlumnos = alumnosRelacionados.map((alumno) => {
              const calificaciones = data.calificaciones.find(
                (cal) => cal.alumno === alumno.matricula && cal.clase === parseInt(claseId)
              );
              return {
                ...alumno,
                parcial1: calificaciones?.parcial1 ?? "",
                parcial2: calificaciones?.parcial2 ?? "",
                parcial3: calificaciones?.parcial3 ?? "",
                remedial1: calificaciones?.remedial1 ?? "",
                remedial2: calificaciones?.remedial2 ?? "",
                remedial3: calificaciones?.remedial3 ?? "",
                extraordinario: calificaciones?.extraordinario ?? "",
              };
            });

            setMateriaNombre(materia ? materia.nombre : "Materia desconocida");
            setGrupoNombre(grupo ? grupo.nombre : "Grupo desconocido");
            setAlumnos(updatedAlumnos);
          }
        } catch (error) {
          console.error("Error al obtener los datos de la clase:", error);
        }
      }
    };

    fetchClaseData();
  }, [searchParams]);

  const handleCalificacionChange = (alumno, parcial, value) => {
    const updatedAlumnos = alumnos.map((a) =>
      a.matricula === alumno.matricula ? { ...a, [parcial]: parseInt(value) } : a
    );
    setAlumnos(updatedAlumnos);
  };

  const handleUpdateAlumno = async (alumno) => {
    const updatedGrade = {
      alumno: alumno.matricula,
      clase: parseInt(searchParams.get("clase")),
      parcial1: alumno.parcial1,
      parcial2: alumno.parcial2,
      parcial3: alumno.parcial3,
    };

    try {
      const response = await fetch("/api/updateGrades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedGrades: [updatedGrade] }),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        alert("Error al actualizar las calificaciones.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar />

      <div className="p-8 flex-1 mt-16 ml-64">
        {showSuccessMessage && <SuccessMessage message="Actualización exitosa" />}

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              {materiaNombre} - {grupoNombre} - Parciales
            </h3>
            <Link href="/profesor/dashboard/calificaciones" className="text-blue-600 hover:text-blue-800">
              <i className="fas fa-home fa-lg"></i>
            </Link>
          </div>

          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentView={currentView}
            setCurrentView={setCurrentView}
            router={router}
            claseId={searchParams.get("clase")}
          />

          <button
            onClick={() => generatePDF(materiaNombre, grupoNombre, alumnos)}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 mb-4"
          >
            Generar Reporte PDF
          </button>

          <StudentsTable
            alumnos={alumnos}
            setAlumnos={setAlumnos}
            handleCalificacionChange={handleCalificacionChange}
            handleUpdateAlumno={handleUpdateAlumno}
          />
        </div>
      </div>
    </div>
  );
}
