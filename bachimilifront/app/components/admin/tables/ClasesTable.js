"use client";

export default function ClasesTable({ registros, docentes, materias, grupos, onEdit, onDelete }) {
  const getDocenteNombre = (matricula) => {
    const docente = docentes.find((doc) => doc.matricula === matricula);
    return docente ? `${docente.nombrePila} ${docente.apPat} ${docente.apMat}` : "Docente no encontrado";
  };

  const getMateriaNombre = (codigo) => {
    const materia = materias.find((mat) => mat.codigo === codigo);
    return materia ? materia.nombre : "Materia no encontrada";
  };

  const getGrupoNombre = (codigoGrupo) => {
    const grupo = grupos.find((grp) => grp.codigo === codigoGrupo);
    return grupo ? grupo.nombre : "Grupo no encontrado";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">ID</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Clase</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Profesor</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Grupo</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((clase, index) => (
            <tr key={clase.codigo} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
              <td className="p-3 text-sm text-gray-700">{clase.codigo}</td>
              <td className="p-3 text-sm text-gray-700">{getMateriaNombre(clase.materia)}</td>
              <td className="p-3 text-sm text-gray-700">{getDocenteNombre(clase.docente)}</td>
              <td className="p-3 text-sm text-gray-700">{getGrupoNombre(clase.grupo)}</td>
              <td className="p-3 text-sm text-gray-700 space-x-2">
                <button
                  onClick={() => onEdit(clase)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => onDelete(clase.codigo)}
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
