import React from "react";

export default function Tabs({ activeTab, setActiveTab, currentView, setCurrentView, router, claseId }) {
  const goToAsistencias = () => {
    setActiveTab("asistencias");
    router.push(`/profesor/dashboard/asistencias?clase=${claseId}`);
  };

  const goToParciales = () => {
    setCurrentView("parciales");
    router.push(`/profesor/dashboard/calificaciones/parciales?clase=${claseId}`);
  };

  const goToRemediales = () => {
    setCurrentView("remedial");
    router.push(`/profesor/dashboard/calificaciones/remediales?clase=${claseId}`);
  };

  const showExtraordinario = () => {
    setCurrentView("extraordinario");
    router.push(`/profesor/dashboard/calificaciones/extraordinarios?clase=${claseId}`);
  };

  return (
    <div>
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
          onClick={goToParciales}
          className={`px-4 py-2 rounded-md shadow-sm ${currentView === "parciales" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"}`}
        >
          Parciales
        </button>
        <button
          onClick={goToRemediales}
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
    </div>
  );
}
