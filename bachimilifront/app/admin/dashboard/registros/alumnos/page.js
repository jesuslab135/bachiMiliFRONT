"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabsRegistros from "@/app/components/admin/AdminTabsRegistros";
import AlumnosTable from "@/app/components/admin/tables/AlumnosTable";
import useFetchAlumnosData from "@/app/hooks/admin/useFetchAlumnosData";

export default function AlumnosPage() {
  const { registros, grupos } = useFetchAlumnosData();

  const getGrupoNombre = (codigoGrupo) => {
    const grupo = grupos.find((g) => g.codigo === codigoGrupo);
    return grupo ? grupo.nombre : "Grupo no encontrado";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="flex-1 p-8 mt-16 ml-64">
        <AdminTabsRegistros activeTab="alumnos" />
        
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Registros de Alumnos
          </h2>
          <AlumnosTable registros={registros} getGrupoNombre={getGrupoNombre} />
        </div>
      </div>
    </div>
  );
}
