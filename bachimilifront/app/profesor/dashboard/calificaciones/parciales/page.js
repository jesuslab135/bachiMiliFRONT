"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link"; // Importamos Link
import TeacherSidebar from "@/app/components/TeacherSidebar";

export default function ParcialesPage() {
  const [activeTab, setActiveTab] = useState("calificaciones");
  const [currentView, setCurrentView] = useState("parciales");
  const [selectedClase, setSelectedClase] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const clase = searchParams.get("clase");
    if (clase) {
      setSelectedClase(clase);
    }
  }, [searchParams]);

  const goToAsistencias = () => {
    setActiveTab("asistencias");
    router.push(`/profesor/dashboard/asistencias?clase=${selectedClase}`);
  };

  const showCalificaciones = () => {
    setCurrentView("parciales");
  };

  const showRemedial = () => {
    setCurrentView("remedial");
    router.push(`/profesor/dashboard/calificaciones/remediales?clase=${selectedClase}`);
  };

  const showExtraordinario = () => {
    setCurrentView("extraordinario");
    router.push(`/profesor/dashboard/calificaciones/extraordinarios?clase=${selectedClase}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar />

      <div className="p-4 flex-1 mt-16 ml-64">
        <div className="bg-white p-4 rounded-lg shadow-md max-w-5xl mx-auto relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{selectedClase} - Parciales</h3>
            <Link href="/profesor/dashboard/calificaciones" className="text-blue-600 hover:text-blue-800">
              <i className="fas fa-home fa-lg"></i>
            </Link>
          </div>

          <nav className="mb-6">
            <ul className="flex space-x-4 justify-center border-b-2 pb-2">
              <li>
                <button
                  onClick={() => setActiveTab("calificaciones")}
                  className={`px-4 py-2 rounded-t-md shadow-sm ${activeTab === "calificaciones" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`}
                >
                  Calificaciones
                </button>
              </li>
              <li>
                <button
                  onClick={goToAsistencias}
                  className={`px-4 py-2 rounded-t-md shadow-sm ${activeTab === "asistencias" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`}
                >
                  Asistencias
                </button>
              </li>
            </ul>
          </nav>

          <div className="mb-6 flex justify-center space-x-4">
            <button
              onClick={showCalificaciones}
              className={`px-4 py-2 rounded-md shadow-sm ${currentView === "parciales" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`}
            >
              Parciales
            </button>
            <button
              onClick={showRemedial}
              className={`px-4 py-2 rounded-md shadow-sm ${currentView === "remedial" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`}
            >
              Remedial
            </button>
            <button
              onClick={showExtraordinario}
              className={`px-4 py-2 rounded-md shadow-sm ${currentView === "extraordinario" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`}
            >
              Extraordinario
            </button>
          </div>

          {/* Tabla de Parciales */}
          <form onSubmit={() => {}}>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-gray-500 border">Alumno</th>
                  <th className="py-2 px-4 text-gray-500 border">Parcial 1</th>
                  <th className="py-2 px-4 text-gray-500 border">Parcial 2</th>
                  <th className="py-2 px-4 text-gray-500 border">Parcial 3</th>
                  <th className="py-2 px-4 text-gray-500 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border">
                    <input type="text" value="Alumno 1" className="w-full px-2 py-1 text-gray-400 border rounded" disabled />
                  </td>
                  <td className="py-2 px-4 border">
                    <select className="w-full px-2 py-1 text-gray-400 border rounded">
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border">
                    <select className="w-full px-2 py-1 text-gray-400 border rounded">
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border">
                    <select className="w-full px-2 py-1 text-gray-400 border rounded">
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600">
                      Actualizar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}
