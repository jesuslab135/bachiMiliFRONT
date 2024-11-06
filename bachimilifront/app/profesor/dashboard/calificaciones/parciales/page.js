"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import {
  getClases,
  getMaterias,
  getGrupos,
  getAlumnos,
  getCalificaciones,
  getParciales,
  getPeriodos,
  getCriterios,
  updateCriterio,
} from "@/app/lib/fetchTestData";
import Tabs from "@/app/components/teacher/Tabs";
import SuccessMessage from "@/app/components/teacher/SuccessMessage";
import StudentsTable from "@/app/components/teacher/StudentsTable";
import CriteriaTable from "@/app/components/teacher/CriteriaTable";

export default function ParcialesPage() {
  const [activeTab, setActiveTab] = useState("calificaciones");
  const [currentView, setCurrentView] = useState("parciales");
  const [materiaNombre, setMateriaNombre] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [parciales, setParciales] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [criterios, setCriterios] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);
  const [selectedParcial, setSelectedParcial] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const claseId = searchParams.get("clase");
      if (claseId) {
        try {
          const [
            clases,
            materias,
            grupos,
            alumnosData,
            calificacionesData,
            periodosData,
            parcialesData,
            criteriosData,
          ] = await Promise.all([
            getClases(),
            getMaterias(),
            getGrupos(),
            getAlumnos(),
            getCalificaciones(),
            getPeriodos(),
            getParciales(),
            getCriterios(),
          ]);

          const clase = clases.find((c) => c.codigo === parseInt(claseId));
          if (clase) {
            const materia = materias.find((m) => m.codigo === clase.materia);
            const grupo = grupos.find((g) => g.codigo === clase.grupo);
            const alumnosRelacionados = alumnosData.filter((alumno) => alumno.grupo === clase.grupo);

            const updatedAlumnos = alumnosRelacionados.map((alumno) => {
              const calificacionesAlumno = calificacionesData.find(
                (cal) => cal.alumno === alumno.matricula && cal.clase === parseInt(claseId)
              );

              return {
                ...alumno,
                clave: calificacionesAlumno?.clave,
                parcial1: calificacionesAlumno?.parcial1 ?? null,
                parcial2: calificacionesAlumno?.parcial2 ?? null,
                parcial3: calificacionesAlumno?.parcial3 ?? null,
              };
            });

            setMateriaNombre(materia ? materia.nombre : "Materia desconocida");
            setGrupoNombre(grupo ? grupo.nombre : "Grupo desconocido");
            setAlumnos(updatedAlumnos);
            setCalificaciones(calificacionesData);
            setPeriodos(periodosData);
            setParciales(parcialesData);
            setCriterios(criteriosData);
          }
        } catch (error) {
          console.error("Error al obtener los datos de la clase:", error);
        }
      }
    };

    fetchData();
  }, [searchParams]);

  const handlePeriodoChange = (e) => {
    const periodoId = Number(e.target.value);
    setSelectedPeriodo(periodoId);
    setSelectedParcial(null);
  };

  const handleParcialChange = (e) => {
    setSelectedParcial(Number(e.target.value));
  };

  const filteredCriterios = criterios.filter((criterio) => criterio.parcial === selectedParcial);
  const filteredParciales = parciales.filter((parcial) => parcial.periodo === selectedPeriodo); // Filtrado de parciales

  const handleUpdateCriterio = async (codigo, updatedCriterio) => {
    try {
      await updateCriterio(codigo, updatedCriterio);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);

      const updatedCriterios = await getCriterios();
      setCriterios(updatedCriterios);
    } catch (error) {
      console.error("Error al actualizar el criterio:", error);
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

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Seleccionar Periodo</label>
            <select
              value={selectedPeriodo || ""}
              onChange={handlePeriodoChange}
              className="w-full px-4 py-2 border text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Selecciona un Periodo
              </option>
              {periodos.map((periodo) => (
                <option key={periodo.clave} value={periodo.clave}>
                  {`Periodo ${periodo.clave}: ${new Date(periodo.fechaInicio).toLocaleDateString()} - ${new Date(
                    periodo.fechaCierre
                  ).toLocaleDateString()}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Seleccionar Parcial</label>
            <select
              value={selectedParcial || ""}
              onChange={handleParcialChange}
              className="w-full px-4 py-2 border text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedPeriodo}
            >
              <option value="" disabled>
                Selecciona un Parcial
              </option>
              {filteredParciales.map((parcial) => (
                <option key={parcial.clave} value={parcial.clave}>
                  {parcial.nombre}
                </option>
              ))}
            </select>
          </div>

          <CriteriaTable criterios={filteredCriterios} parciales={filteredParciales} onUpdateCriterio={handleUpdateCriterio} />

          <StudentsTable
            alumnos={alumnos}
            criterios={filteredCriterios}
            selectedParcial={selectedParcial}
            calificacionesData={calificaciones}
          />
        </div>
      </div>
    </div>
  );
}
