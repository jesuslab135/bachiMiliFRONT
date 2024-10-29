"use client";

export default function AlumnosTable({ registros, getGrupoNombre }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Nombre</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Grupo</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Correo</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((alumno, index) => (
            <tr key={alumno.matricula} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
              <td className="p-3 text-sm text-gray-700">{alumno.matricula}</td>
              <td className="p-3 text-sm text-gray-700">{`${alumno.nomPila} ${alumno.apPat} ${alumno.apMat || ""}`}</td>
              <td className="p-3 text-sm text-gray-700">{getGrupoNombre(alumno.grupo)}</td>
              <td className="p-3 text-sm text-gray-700">{alumno.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
