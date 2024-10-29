"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import ClasesTable from "@/app/components/admin/tables/ClasesTable";
import useFetchClasesData from "@/app/hooks/admin/useFetchClasesData";

export default function ClasesPage() {
  const { registros, docentes, materias, grupos } = useFetchClasesData();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="clases" />

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Clases
          </h2>
          <ClasesTable registros={registros} docentes={docentes} materias={materias} grupos={grupos} />
        </div>
      </div>
    </div>
  );
}
