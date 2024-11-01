"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import MateriasTable from "@/app/components/admin/tables/MateriasTable";
import EditMateriaModal from "@/app/components/admin/modals/EditMateriaModal";
import SuccessMessage from "@/app/components/admin/messages/SuccessMessage";
import useMateriasPage from "@/app/hooks/admin/useMateriasPage";

export default function MateriasPage() {
  const {
    registros,
    selectedMateria,
    showEditModal,
    showSuccessMessage,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    setShowEditModal,
  } = useMateriasPage();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="materias" />
        <SuccessMessage showMessage={showSuccessMessage} />
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Materias
          </h2>
          <MateriasTable
            registros={registros}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {showEditModal && (
        <EditMateriaModal
          selectedMateria={selectedMateria}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
