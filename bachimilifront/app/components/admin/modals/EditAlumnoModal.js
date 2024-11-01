"use client";

export default function EditAlumnoModal({
  selectedAlumno,
  grupos,
  handleEditChange,
  handleEditSubmit,
  closeModal,
}) {
  if (!selectedAlumno) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-2xl font-semibold mb-4">Editar Alumno</h3>
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input
              type="text"
              name="nomPila"
              value={selectedAlumno.nomPila}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Otras entradas para apPat, apMat, correo y grupo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Grupo</label>
            <select
              name="grupo"
              value={selectedAlumno.grupo}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {grupos.map((grupo) => (
                <option key={grupo.codigo} value={grupo.codigo}>
                  {grupo.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
