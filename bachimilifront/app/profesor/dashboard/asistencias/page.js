"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Para redireccionar y obtener parámetros
import Link from "next/link";
import TeacherSidebar from "@/app/components/TeacherSidebar"; // Importar TeacherSidebar

export default function AsistenciasPage() {
  const [activeTab, setActiveTab] = useState("asistencias");
  const [currentDate, setCurrentDate] = useState(null); // Inicializar como null
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [attendanceData, setAttendanceData] = useState({}); // Guardar las asistencias de los alumnos
  const [selectedClase, setSelectedClase] = useState(""); // Clase seleccionada

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const clase = searchParams.get("clase");
    if (clase) {
      setSelectedClase(clase);
    }

    const now = new Date();
    setCurrentDate(now);

    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };

    if (now) {
      const year = now.getFullYear();
      const month = now.getMonth();
      const days = getDaysInMonth(year, month);
      const daysArray = Array.from({ length: days }, (_, i) => i + 1);
      setDaysInMonth(daysArray);

      // Inicializar los datos de asistencia con N/A
      const initialAttendance = {
        "Alumno 1": Array(days).fill("N/A"),
        "Alumno 2": Array(days).fill("N/A"),
        "Alumno 3": Array(days).fill("N/A"),
      };
      setAttendanceData(initialAttendance);
    }
  }, [searchParams]);

  // Cambiar al mes anterior
  const handlePreviousMonth = () => {
    if (currentDate) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    }
  };

  // Cambiar al mes siguiente
  const handleNextMonth = () => {
    if (currentDate) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    }
  };

  // Manejar el cambio de asistencia
  const handleAttendanceChange = (alumno, dayIndex, value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [alumno]: prevData[alumno].map((att, i) => (i === dayIndex ? value : att)),
    }));
  };

  // Calcular el total de clases asistidas (sin incluir "N/A")
  const calculateTotalClasses = (alumno) => {
    const totalEffectiveClasses = attendanceData[alumno]?.filter((att) => att !== "N/A").length || 0;
    return `${totalEffectiveClasses}/${totalEffectiveClasses}`; // Mostrar solo los días efectivos
  };

  const goToParciales = () => {
    setActiveTab("calificaciones");
    router.push(`/profesor/dashboard/calificaciones/parciales?clase=${selectedClase}`);
  };

  if (!currentDate) {
    // Mientras la fecha no esté disponible (carga del cliente)
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar /> {/* Usamos el sidebar fijo */}

      {/* Contenido principal */}
      <div className="p-4 flex-1 mt-16 ml-64">
        <div className="bg-white p-4 rounded-lg shadow-md max-w-5xl mx-auto relative">
          {/* Ícono de Home */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{selectedClase} - Asistencias</h3>
            <Link href="/profesor/dashboard/calificaciones" className="text-blue-600 hover:text-blue-800">
              <i className="fas fa-home fa-lg"></i>
            </Link>
          </div>

          {/* Sección de Tabs */}
          <nav className="mb-6">
            <ul className="flex space-x-4 justify-center border-b-2 pb-2">
              <li>
                <button
                  onClick={goToParciales}
                  className={`px-4 py-2 rounded-t-md shadow-sm ${
                    activeTab === "calificaciones" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Calificaciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("asistencias")}
                  className={`px-4 py-2 rounded-t-md shadow-sm ${
                    activeTab === "asistencias" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Asistencias
                </button>
              </li>
            </ul>
          </nav>

          {/* Navegación de Meses */}
          <div className="flex justify-between mb-4">
            <button onClick={handlePreviousMonth} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
              Mes Anterior
            </button>
            <h2 className="text-lg text-gray-400 font-medium">
              {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
            </h2>
            <button onClick={handleNextMonth} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
              Mes Siguiente
            </button>
          </div>

          {/* Tabla de asistencias con scroll horizontal */}
          <div className="overflow-auto">
            <table className="min-w-max bg-white border table-fixed">
              <thead>
                <tr>
                  <th className="w-32 py-2 px-4 border text-gray-500 bg-gray-200 sticky left-0 z-10">Alumno</th>
                  {daysInMonth.map((day) => (
                    <th key={day} className="py-2 px-4 border text-gray-400 bg-gray-100">{day}</th>
                  ))}
                  <th className="py-2 px-4 border text-gray-400 bg-gray-100">Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(attendanceData).map((alumno) => (
                  <tr key={alumno}>
                    <td className="py-2 px-4 border text-gray-400 bg-gray-50 sticky left-0 z-10">{alumno}</td>
                    {attendanceData[alumno].map((attendance, dayIndex) => (
                      <td key={dayIndex} className="py-2 px-4 border">
                        <select
                          value={attendance}
                          onChange={(e) => handleAttendanceChange(alumno, dayIndex, e.target.value)}
                          className="w-full px-2 py-1 border rounded-md text-gray-800"
                        >
                          <option value="N/A">N/A</option>
                          <option value="P">P</option>
                          <option value="A">A</option>
                          <option value="J">J</option>
                        </select>
                      </td>
                    ))}
                    <td className="py-2 px-4 border text-gray-400 bg-gray-50">
                      {calculateTotalClasses(alumno)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
