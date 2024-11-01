"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import AlumnosTable from "@/app/components/admin/tables/AlumnosTable";
import EditAlumnoModal from "@/app/components/admin/modals/EditAlumnoModal";
import SuccessMessage from "@/app/components/admin/messages/SuccessMessage";
import useAlumnosPage from "@/app/hooks/admin/useAlumnosPage";

export default function AlumnosPage() {
  const {
    registros,
    grupos,
    selectedAlumno,
    showSuccessMessage,
    showEditModal,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    closeModal,
  } = useAlumnosPage();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="alumnos" />
        <SuccessMessage showMessage={showSuccessMessage} />
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Alumnos
          </h2>
          <AlumnosTable
            registros={registros}
            getGrupoNombre={(codigoGrupo) => {
              const grupo = grupos.find((g) => g.codigo === codigoGrupo);
              return grupo ? grupo.nombre : "Grupo no encontrado";
            }}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {showEditModal && (
        <EditAlumnoModal
          selectedAlumno={selectedAlumno}
          grupos={grupos}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
