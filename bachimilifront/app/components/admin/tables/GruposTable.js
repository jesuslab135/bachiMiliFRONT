"use client";

export default function GruposTable({ registros }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Nombre del Grupo</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Periodo</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((grupo, index) => (
            <tr key={grupo.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
              <td className="p-3 text-sm text-gray-700">{grupo.id}</td>
              <td className="p-3 text-sm text-gray-700">{grupo.nombre}</td>
              <td className="p-3 text-sm text-gray-700">{grupo.periodo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
