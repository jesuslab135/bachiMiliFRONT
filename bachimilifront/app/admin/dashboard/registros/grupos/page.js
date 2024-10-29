"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import GruposTable from "@/app/components/admin/tables/GruposTable";
import useFetchGruposData from "@/app/hooks/admin/useFetchGruposData";

export default function GruposPage() {
  const registros = useFetchGruposData();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="grupos" />

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Grupos
          </h2>
          <GruposTable registros={registros} />
        </div>
      </div>
    </div>
  );
}
