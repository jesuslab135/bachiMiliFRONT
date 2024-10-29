"use client";

export default function AlumnoForm({ formData, grupos, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl mb-4 text-gray-700">Registrar Alumno</h2>
      
      <div>
        <label htmlFor="nomPila" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="nomPila"
          name="nomPila"
          type="text"
          value={formData.nomPila}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Nombre del alumno"
        />
      </div>

      <div>
        <label htmlFor="apPat" className="block text-sm font-medium text-gray-700">
          Apellido Paterno
        </label>
        <input
          id="apPat"
          name="apPat"
          type="text"
          value={formData.apPat}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Apellido Paterno"
        />
      </div>

      <div>
        <label htmlFor="apMat" className="block text-sm font-medium text-gray-700">
          Apellido Materno
        </label>
        <input
          id="apMat"
          name="apMat"
          type="text"
          value={formData.apMat}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Apellido Materno"
        />
      </div>

      <div>
        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Correo"
        />
      </div>

      <div>
        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="contrasena"
          name="contrasena"
          type="password"
          value={formData.contrasena}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Contraseña"
        />
      </div>

      <div>
        <label htmlFor="grupo" className="block text-sm font-medium text-gray-700">
          Grupo Asignado
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
