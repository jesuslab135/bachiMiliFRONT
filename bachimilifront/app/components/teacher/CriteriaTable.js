import React, { useState } from "react";

export default function CriteriaTable({ criterios = [], parciales = [], onUpdateCriterio }) {
  const [selectedCriterio, setSelectedCriterio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateClick = (criterio) => {
    setSelectedCriterio({ ...criterio });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (selectedCriterio) {
      try {
        await onUpdateCriterio(selectedCriterio.codigo, selectedCriterio);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error al actualizar el criterio:", error);
      }
    }
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-4 text-blue-700">Criterios</h4>
      {criterios.length > 0 ? (
        <table className="min-w-full bg-white border rounded-lg shadow-md mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-blue-600 text-white font-semibold border">Valor Porcentaje</th>
              <th className="py-2 px-4 bg-blue-600 text-white font-semibold border">Tipo</th>
              <th className="py-2 px-4 bg-blue-600 text-white font-semibold border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {criterios.map((criterio) => (
              <tr key={criterio.codigo}>
                <td className="py-2 px-4 border text-center text-blue-700 font-semibold">{criterio.valorPorcentaje}%</td>
                <td className="py-2 px-4 border text-center text-blue-700 font-semibold">{criterio.tipo}</td>
                <td className="py-2 px-4 border text-center">
                  <button
                    className="text-green-600 font-semibold hover:text-green-800"
                    onClick={() => handleUpdateClick(criterio)}
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No hay criterios disponibles para el parcial seleccionado.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Actualizar Criterio</h3>

            {/* Input para valorPorcentaje */}
            <label className="block mb-2 text-blue-700 font-semibold">
              Valor Porcentaje:
              <input
                type="number"
                value={selectedCriterio.valorPorcentaje}
                onChange={(e) =>
                  setSelectedCriterio({
                    ...selectedCriterio,
                    valorPorcentaje: e.target.value,
                  })
                }
                className="w-full px-2 py-1 border rounded text-blue-700 font-semibold"
              />
            </label>

            {/* Dropdown para seleccionar parcial */}
            <label className="block mb-2 text-blue-700 font-semibold">
              Seleccionar Parcial:
              <select
                value={selectedCriterio.parcial}
                onChange={(e) =>
                  setSelectedCriterio({
                    ...selectedCriterio,
                    parcial: parseInt(e.target.value, 10),
                  })
                }
                className="w-full px-2 py-1 border rounded text-blue-700 font-semibold"
              >
                {parciales.map((parcial) => (
                  <option key={parcial.clave} value={parcial.clave}>
                    {parcial.nombre}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 mr-2"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
