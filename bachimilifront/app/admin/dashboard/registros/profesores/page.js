"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import ProfesoresTable from "@/app/components/admin/tables/ProfesoresTable";
import useFetchProfesores from "@/app/hooks/admin/useFetchProfesores";

export default function ProfesoresPage() {
  const registros = useFetchProfesores();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="profesores" />

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Profesores
          </h2>
          <ProfesoresTable registros={registros} />
        </div>
      </div>
    </div>
  );
}
