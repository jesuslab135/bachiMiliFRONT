"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import Tabs from "@/app/components/teacher/Tabs";
import StudentTableRemediales from "@/app/components/teacher/StudentTableRemediales";
import SuccessMessage from "@/app/components/teacher/SuccessMessage";
import useFetchClaseData from "@/app/hooks/teacher/useFetchClaseData";
import useRemediales from "@/app/hooks/teacher/useRemediales";

export default function RemedialesPage() {
  const [activeTab, setActiveTab] = useState("calificaciones");
  const [currentView, setCurrentView] = useState("remedial");
  const router = useRouter();
  const searchParams = useSearchParams();
  const claseId = searchParams.get("clase");

  const { materiaNombre, grupoNombre, alumnos, setAlumnos } = useFetchClaseData(claseId);
  const { showSuccessMessage, handleUpdateAlumno } = useRemediales();

  const handleRemedialChange = (alumno, remedial, value) => {
    setAlumnos((prev) =>
      prev.map((a) => (a.matricula === alumno.matricula ? { ...a, [remedial]: parseInt(value) } : a))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar />
      
      {showSuccessMessage && <SuccessMessage message="Actualización exitosa" />}
      
      <div className="p-8 flex-1 mt-16 ml-64">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            {materiaNombre} - {grupoNombre} - Remedial
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
          
          <StudentTableRemediales
            alumnos={alumnos}
            handleRemedialChange={handleRemedialChange}
            handleUpdateAlumno={(alumno) => handleUpdateAlumno(alumno, claseId)}
          />
        </div>
      </div>
    </div>
  );
}
