"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import ProfesoresTable from "@/app/components/admin/tables/ProfesoresTable";
import EditProfesorModal from "@/app/components/admin/modals/EditProfesorModal";
import SuccessMessage from "@/app/components/admin/messages/SuccessMessage";
import useProfesoresPage from "@/app/hooks/admin/useProfesoresPage";

export default function ProfesoresPage() {
  const {
    registros,
    selectedProfesor,
    showEditModal,
    showSuccessMessage,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    setShowEditModal,
  } = useProfesoresPage();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="profesores" />
        <SuccessMessage showMessage={showSuccessMessage} />
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Profesores
          </h2>
          <ProfesoresTable
            registros={registros}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {showEditModal && (
        <EditProfesorModal
          selectedProfesor={selectedProfesor}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
