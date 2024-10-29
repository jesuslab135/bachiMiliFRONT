"use client";

export default function GrupoForm({ formData, periodos, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl mb-4 text-gray-700">Registrar Grupo</h2>

      <div>
        <label htmlFor="nombreGrupo" className="block text-sm font-medium text-gray-700">
          Nombre del Grupo
        </label>
        <input
          id="nombreGrupo"
          name="nombreGrupo"
          type="text"
          value={formData.nombreGrupo}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Nombre del Grupo"
        />
      </div>

      <div>
        <label htmlFor="periodo" className="block text-sm font-medium text-gray-700">
          Periodo
        </label>
        <select
          id="periodo"
          name="periodo"
          value={formData.periodo}
          onChange={handleChange}
          className="mt-1 block w-full border text-gray-400 border-gray-300 rounded-md shadow-sm px-3 py-2"
        >
          <option value="">Seleccionar Periodo</option>
          {periodos.map((periodo) => (
            <option key={periodo.clave} value={periodo.clave}>
              {`Periodo ${periodo.clave}: ${periodo.fechaInicio} - ${periodo.fechaCierre}`}
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
