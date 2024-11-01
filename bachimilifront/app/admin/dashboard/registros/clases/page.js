"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import ClasesTable from "@/app/components/admin/tables/ClasesTable";
import EditClaseModal from "@/app/components/admin/modals/EditClaseModal";
import SuccessMessage from "@/app/components/admin/messages/SuccessMessage";
import useClasesPage from "@/app/hooks/admin/useClasesPage";

export default function ClasesPage() {
  const {
    registros,
    docentes,
    materias,
    grupos,
    selectedClase,
    showEditModal,
    showSuccessMessage,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    setShowEditModal,
  } = useClasesPage();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="clases" />
        <SuccessMessage showMessage={showSuccessMessage} />
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Clases
          </h2>
          <ClasesTable
            registros={registros}
            docentes={docentes}
            materias={materias}
            grupos={grupos}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {showEditModal && (
        <EditClaseModal
          selectedClase={selectedClase}
          docentes={docentes}
          materias={materias}
          grupos={grupos}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
