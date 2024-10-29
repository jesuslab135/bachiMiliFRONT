"use client";

export default function MateriasTable({ registros }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Nombre de la Materia</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((materia, index) => (
            <tr key={materia.codigo} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
              <td className="p-3 text-sm text-gray-700">{materia.codigo}</td>
              <td className="p-3 text-sm text-gray-700">{materia.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
