"use client";

export default function ProfesoresTable({ registros, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Nombre</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Correo</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((profesor, index) => (
            <tr key={profesor.matricula} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
              <td className="p-3 text-sm text-gray-700">{profesor.matricula}</td>
              <td className="p-3 text-sm text-gray-700">{`${profesor.nomPila} ${profesor.apPat} ${profesor.apMat || ""}`}</td>
              <td className="p-3 text-sm text-gray-700">{profesor.correo}</td>
              <td className="p-3 text-sm text-gray-700 space-x-2">
                <button
                  onClick={() => onEdit(profesor)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => onDelete(profesor.matricula)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
