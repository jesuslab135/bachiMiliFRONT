"use client";

export default function MateriaForm({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl mb-4 text-gray-700">Registrar Materia</h2>

      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre de la Materia
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Nombre de la Materia"
        />
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
