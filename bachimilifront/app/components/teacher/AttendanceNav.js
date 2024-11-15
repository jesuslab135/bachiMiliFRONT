import React from "react";

export default function AttendanceNav({ activeTab, setActiveTab, router, claseId }) {
  const goToParciales = () => {
    setActiveTab("calificaciones");
    router.push(`/profesor/dashboard/calificaciones/parciales/parcial1?clase=${claseId}`);
  };

  return (
    <nav className="mb-6">
      <ul className="flex space-x-4 justify-center border-b-2 pb-2">
        <li>
          <button
            onClick={goToParciales}
            className={`px-4 py-2 rounded-t-md shadow-sm ${activeTab === "calificaciones" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`}
          >
            Calificaciones
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("asistencias")}
            className={`px-4 py-2 rounded-t-md shadow-sm ${activeTab === "asistencias" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`}
          >
            Asistencias
          </button>
        </li>
      </ul>
    </nav>
  );
}
