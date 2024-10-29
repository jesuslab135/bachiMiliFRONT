"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link"; 
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function RemedialesPage() {
  const [activeTab, setActiveTab] = useState("calificaciones");
  const [currentView, setCurrentView] = useState("remedial");
  const [materiaNombre, setMateriaNombre] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [remedialStatus, setRemedialStatus] = useState({});
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

            setMateriaNombre(materia ? materia.nombre : "Materia desconocida");
            setGrupoNombre(grupo ? grupo.nombre : "Grupo desconocido");

            const updatedAlumnos = alumnosRelacionados.map((alumno) => {
              const calificaciones = data.calificaciones.find(
                (c) => c.alumno === alumno.matricula && c.clase === parseInt(claseId)
              );

              return {
                ...alumno,
                remedial1: calificaciones?.parcial1 < 6 ? calificaciones.remedial1 || "" : null,
                remedial2: calificaciones?.parcial2 < 6 ? calificaciones.remedial2 || "" : null,
                remedial3: calificaciones?.parcial3 < 6 ? calificaciones.remedial3 || "" : null,
              };
            });

            setAlumnos(updatedAlumnos);
          }
        } catch (error) {
          console.error("Error al obtener los datos de la clase:", error);
        }
      }
    };

    fetchClaseData();
  }, [searchParams]);

  const handleRemedialChange = (alumno, remedial, value) => {
    const updatedAlumnos = alumnos.map((a) =>
      a.matricula === alumno.matricula ? { ...a, [remedial]: parseInt(value) } : a
    );
    setAlumnos(updatedAlumnos);
  };

  const handleUpdate = async () => {
    const remedialUpdates = alumnos
      .filter((alumno) => alumno.remedial1 !== null || alumno.remedial2 !== null || alumno.remedial3 !== null)
      .map((alumno) => ({
        alumno: alumno.matricula,
        clase: parseInt(searchParams.get("clase")),
        remedial1: alumno.remedial1,
        remedial2: alumno.remedial2,
        remedial3: alumno.remedial3,
      }));

    try {
      const response = await fetch("/api/updateRemediales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(remedialUpdates),
      });

      if (response.ok) {
        alert("Remediales actualizados exitosamente.");
      } else {
        alert("Error al actualizar los remediales.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos.");
    }
  };

  const goToAsistencias = () => {
    setActiveTab("asistencias");
    router.push(`/profesor/dashboard/asistencias?clase=${searchParams.get("clase")}`);
  };

  const showCalificaciones = () => {
    setCurrentView("parciales");
    router.push(`/profesor/dashboard/calificaciones/parciales?clase=${searchParams.get("clase")}`);
  };

  const showRemedial = () => setCurrentView("remedial");

  const showExtraordinario = () => {
    setCurrentView("extraordinario");
    router.push(`/profesor/dashboard/calificaciones/extraordinarios?clase=${searchParams.get("clase")}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar />

      <div className="p-4 flex-1 mt-16 ml-64">
        <div className="bg-white p-4 rounded-lg shadow-md max-w-5xl mx-auto relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {materiaNombre} - {grupoNombre} - Remedial
            </h3>
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

          <form onSubmit={(e) => e.preventDefault()}>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-gray-500 border">Alumno</th>
                  <th className="py-2 px-4 text-gray-500 border">Remedial 1</th>
                  <th className="py-2 px-4 text-gray-500 border">Remedial 2</th>
                  <th className="py-2 px-4 text-gray-500 border">Remedial 3</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.matricula}>
                    <td className="py-2 px-4 border">
                      <input
                        type="text"
                        value={`${alumno.nomPila} ${alumno.apPat} ${alumno.apMat || ""}`}
                        className="w-full px-2 py-1 text-gray-400 border rounded"
                        disabled
                      />
                    </td>
                    {["remedial1", "remedial2", "remedial3"].map((remedial) => (
                      <td key={remedial} className="py-2 px-4 border">
                        <select
                          className="w-full px-2 py-1 text-gray-400 border rounded"
                          value={alumno[remedial] || ""}
                          onChange={(e) => handleRemedialChange(alumno, remedial, e.target.value)}
                          disabled={alumno[remedial] === null}
                        >
                          {[5, 6, 7, 8, 9, 10].map((score) => (
                            <option key={score} value={score}>
                              {score}
                            </option>
                          ))}
                        </select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={handleUpdate}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
            >
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
