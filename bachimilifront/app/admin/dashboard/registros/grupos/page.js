"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import GruposTable from "@/app/components/admin/tables/GruposTable";
import EditGrupoModal from "@/app/components/admin/modals/EditGrupoModal";
import SuccessMessage from "@/app/components/admin/messages/SuccessMessage";
import useGruposPage from "@/app/hooks/admin/useGruposPage";

export default function GruposPage() {
  const {
    registros,
    periodos,
    selectedGrupo,
    showEditModal,
    showSuccessMessage,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    setShowEditModal,
  } = useGruposPage();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="grupos" />
        <SuccessMessage showMessage={showSuccessMessage} />
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Grupos
          </h2>
          <GruposTable
            registros={registros}
            periodos={periodos}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {showEditModal && (
        <EditGrupoModal
          selectedGrupo={selectedGrupo}
          periodos={periodos}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
