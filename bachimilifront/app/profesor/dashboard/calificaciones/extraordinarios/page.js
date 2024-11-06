// ExtraordinariosPage.js
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import useFetchExtraordinariosData from "@/app/hooks/teacher/useFetchExtraordinariosData";
import useUpdateExtraordinario from "@/app/hooks/teacher/useUpdateExtraordinario"; // Importar el hook
import SuccessMessage from "@/app/components/teacher/SuccessMessage";
import Tabs from "@/app/components/teacher/Tabs";
import ExtraordinariosTable from "@/app/components/teacher/ExtraordinariosTable";

export default function ExtraordinariosPage() {
  const { materiaNombre, grupoNombre, alumnos, setAlumnos } = useFetchExtraordinariosData();
  const { showSuccessMessage, errorMessage, handleUpdateAlumno } = useUpdateExtraordinario(); // Extraer handleUpdateAlumno
  const [activeTab, setActiveTab] = useState("calificaciones");
  const [currentView, setCurrentView] = useState("extraordinario");
  const router = useRouter();
  const searchParams = useSearchParams();
  const claseId = searchParams.get("clase");

  const handleExtraordinarioChange = (alumno, value) => {
    const updatedAlumnos = alumnos.map((a) =>
      a.matricula === alumno.matricula ? { ...a, extraordinario: parseInt(value) } : a
    );
    setAlumnos(updatedAlumnos);
  };

  const handleUpdateAlumnoClick = (alumno) => {
    handleUpdateAlumno(alumno, claseId); // Llamada a la función handleUpdateAlumno
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar />
      {showSuccessMessage && <SuccessMessage message="Actualización exitosa" />}
      {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
      <div className="p-8 flex-1 mt-16 ml-64">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              {materiaNombre} - {grupoNombre} - Extraordinario
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
            claseId={claseId}
          />
          <ExtraordinariosTable
            alumnos={alumnos}
            handleExtraordinarioChange={handleExtraordinarioChange}
            handleUpdateAlumno={handleUpdateAlumnoClick} // Pasar la función correcta
          />
        </div>
      </div>
    </div>
  );
}
