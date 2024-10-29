"use client";

export default function ClaseForm({ formData, materias, docentes, grupos, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl mb-4 text-gray-700">Registrar Clase</h2>

      <div>
        <label htmlFor="materia" className="block text-sm font-medium text-gray-700">
          Materia
        </label>
        <select
          id="materia"
          name="materia"
          value={formData.materia}
          onChange={handleChange}
          className="mt-1 block w-full border text-gray-400 border-gray-300 rounded-md shadow-sm px-3 py-2"
        >
          <option value="">Seleccionar Materia</option>
          {materias.map((materia) => (
            <option key={materia.codigo} value={materia.codigo}>
              {materia.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="profesor" className="block text-sm font-medium text-gray-700">
          Profesor
        </label>
        <select
          id="profesor"
          name="profesor"
          value={formData.profesor}
          onChange={handleChange}
          className="mt-1 block w-full border text-gray-400 border-gray-300 rounded-md shadow-sm px-3 py-2"
        >
          <option value="">Seleccionar Profesor</option>
          {docentes.map((docente) => (
            <option key={docente.matricula} value={docente.matricula}>
              {`${docente.nombrePila} ${docente.apPat} ${docente.apMat}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="grupo" className="block text-sm font-medium text-gray-700">
          Grupo
        </label>
        <select
          id="grupo"
          name="grupo"
          value={formData.grupo}
          onChange={handleChange}
          className="mt-1 block w-full border text-gray-400 border-gray-300 rounded-md shadow-sm px-3 py-2"
        >
          <option value="">Seleccionar Grupo</option>
          {grupos.map((grupo) => (
            <option key={grupo.codigo} value={grupo.codigo}>
              {grupo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        >
          Añadir
        </button>
      </div>
    </form>
  );
}
