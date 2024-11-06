"use client";

export default function GruposTable({ registros, periodos, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Nombre del Grupo</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Periodo</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((grupo) => {
            const periodo = periodos.find((p) => p.clave === grupo.periodo);
            const periodoTexto = periodo
              ? `${new Date(periodo.fechaInicio).toLocaleDateString()} - ${new Date(periodo.fechaCierre).toLocaleDateString()}`
              : "Periodo no encontrado";

            return (
              <tr key={grupo.codigo} className={`${grupo.codigo % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                <td className="p-3 text-sm text-gray-700">{grupo.codigo}</td>
                <td className="p-3 text-sm text-gray-700">{grupo.nombre}</td>
                <td className="p-3 text-sm text-gray-700">{periodoTexto}</td>
                <td className="p-3 text-sm text-gray-700 space-x-2">
                  <button
                    onClick={() => onEdit(grupo)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => onDelete(grupo.codigo)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
