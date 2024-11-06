"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import useFetchAttendanceData from "@/app/hooks/teacher/useFetchAttendanceData";
import AttendanceNav from "@/app/components/teacher/AttendanceNav";
import MonthNavigator from "@/app/components/teacher/MonthNavigator";
import AttendanceTable from "@/app/components/teacher/AttendanceTable";

export default function AsistenciasPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const claseId = searchParams.get("clase");
  const [activeTab, setActiveTab] = useState("asistencias");

  const {
    materiaNombre,
    grupoNombre,
    alumnos,
    daysInMonth,
    periodos,
    parciales,
    selectedPeriodo,
    setSelectedPeriodo,
    selectedParcial,
    setSelectedParcial,
    setCurrentDate,
    currentDate,
    tipoActividades,
  } = useFetchAttendanceData(claseId);

  // Limitar navegación dentro de los meses del periodo seleccionado
  const handlePreviousMonth = () => {
    if (selectedPeriodo && currentDate > new Date(selectedPeriodo.fechaInicio)) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (selectedPeriodo && currentDate < new Date(selectedPeriodo.fechaCierre)) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }
  };

  const handlePeriodoChange = (event) => {
    const periodoId = parseInt(event.target.value);
    const periodo = periodos.find((p) => p.clave === periodoId);
    if (periodo) {
      setSelectedPeriodo(periodo);
      setSelectedParcial(null); // Resetear el parcial seleccionado
      setCurrentDate(new Date(periodo.fechaInicio)); // Ajustar al primer mes del periodo
    }
  };

  const handleParcialChange = (event) => {
    const parcialId = parseInt(event.target.value);
    const parcial = parciales.find((p) => p.clave === parcialId && p.periodo === selectedPeriodo?.clave);
    if (parcial) {
      setSelectedParcial(parcial);
      setCurrentDate(new Date(parcial.fechaInicio)); // Ajustar al primer mes del parcial
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar />
      <div className="p-4 flex-1 mt-16 ml-64">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              {materiaNombre} - {grupoNombre} - Asistencias
            </h3>
          </div>

          {/* Dropdown para seleccionar el periodo */}
          <div className="flex space-x-4 mb-4">
            <select
              value={selectedPeriodo?.clave || ""}
              onChange={handlePeriodoChange}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
            >
              <option value="" disabled>
                Seleccionar Periodo
              </option>
              {periodos.map((periodo) => (
                <option key={periodo.clave} value={periodo.clave}>
                  {`Periodo ${periodo.clave} (${new Date(periodo.fechaInicio).toLocaleDateString()} - ${new Date(
                    periodo.fechaCierre
                  ).toLocaleDateString()})`}
                </option>
              ))}
            </select>

            {/* Dropdown para seleccionar el parcial */}
            <select
              value={selectedParcial?.clave || ""}
              onChange={handleParcialChange}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
              disabled={!selectedPeriodo}
            >
              <option value="" disabled>
                Seleccionar Parcial
              </option>
              {parciales
                .filter((parcial) => parcial.periodo === selectedPeriodo?.clave)
                .map((parcial) => (
                  <option key={parcial.clave} value={parcial.clave}>
                    {parcial.nombre}
                  </option>
                ))}
            </select>
          </div>

          <AttendanceNav activeTab={activeTab} setActiveTab={setActiveTab} router={router} claseId={claseId} />
          <MonthNavigator
            currentDate={currentDate}
            handlePreviousMonth={handlePreviousMonth}
            handleNextMonth={handleNextMonth}
          />

          {alumnos.length > 0 && (
            <AttendanceTable
              alumnos={alumnos}
              daysInMonth={daysInMonth}
              tipoActividades={tipoActividades}
              selectedParcial={selectedParcial}
              claseId={claseId}
              currentDate={currentDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
