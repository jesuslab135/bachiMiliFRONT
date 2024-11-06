"use client";

export default function ProfesorForm({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl mb-4 text-gray-700">Registrar Profesor</h2>

      <div>
        <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
          Matrícula
        </label>
        <input
          id="matricula"
          name="matricula"
          type="text"
          value={formData.matricula}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Matrícula"
          required
        />
      </div>

      <div>
        <label htmlFor="nombrePila" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="nombrePila"
          name="nombrePila"
          type="text"
          value={formData.nombrePila}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Nombre del profesor"
          required
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
          required
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
          required
        />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          type="text"
          value={formData.telefono}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          placeholder="Teléfono"
          required
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
          required
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
