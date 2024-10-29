"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import MateriasTable from "@/app/components/admin/tables/MateriasTable";
import useFetchMaterias from "@/app/hooks/admin/useFetchMaterias";

export default function MateriasPage() {
  const registros = useFetchMaterias();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="materias" />

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Materias
          </h2>
          <MateriasTable registros={registros} />
        </div>
      </div>
    </div>
  );
}
