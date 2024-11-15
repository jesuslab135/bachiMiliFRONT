import React, { useState, useEffect } from "react";
import { createCriterio, createTipoActividad, getTipoActividades } from "@/app/lib/fetchTestData";

export default function CriteriaTable({ criterios = [], parciales = [], onUpdateCriterio, claseId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'criterio' o 'actividad' o 'update'
  const [formData, setFormData] = useState({});
  const [selectedCriterio, setSelectedCriterio] = useState(null);
  const [tipoActividades, setTipoActividades] = useState([]);

  useEffect(() => {
    const fetchTipoActividades = async () => {
      try {
        const tipos = await getTipoActividades();
        setTipoActividades(tipos);
      } catch (error) {
        console.error("Error al obtener tipos de actividades:", error);
      }
    };

    fetchTipoActividades();
  }, []);

  const handleOpenModal = (type, criterio = null) => {
    setModalType(type);
    if (type === "update" && criterio) {
      setSelectedCriterio({ ...criterio });
    } else {
      setFormData({});
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setFormData({});
    setSelectedCriterio(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async () => {
    try {
      if (modalType === "criterio") {
        if (!formData.parcial) {
          alert("Por favor selecciona un parcial antes de agregar un criterio.");
          return;
        }

        const nuevoCriterio = {
          clase: claseId,
          parcial: formData.parcial,
          valorPorcentaje: parseInt(formData.valorPorcentaje, 10) || 0,
          tipo: formData.tipo,
        };

        await createCriterio(nuevoCriterio);
        alert("Criterio agregado con éxito.");
      } else if (modalType === "actividad") {
        const nuevaActividad = {
          clave: formData.clave,
          descripcion: formData.descripcion,
        };

        await createTipoActividad(nuevaActividad);
        alert("Tipo de actividad agregado con éxito.");
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error al realizar la operación:", error);
      alert("Hubo un error al realizar la operación.");
    }
  };

  const filteredCriterios = criterios.filter((criterio) => criterio.clase === claseId);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-blue-700">Criterios</h4>
        <div className="flex gap-4">
          <button
            onClick={() => handleOpenModal("criterio")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Agregar Criterio
          </button>
          <button
            onClick={() => handleOpenModal("actividad")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar Tipo de Actividad
          </button>
        </div>
      </div>

      {filteredCriterios.length > 0 ? (
        <table className="min-w-full bg-white border rounded-lg shadow-md mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-blue-600 text-white font-semibold border">Valor Porcentaje</th>
              <th className="py-2 px-4 bg-blue-600 text-white font-semibold border">Tipo</th>
              <th className="py-2 px-4 bg-blue-600 text-white font-semibold border">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {filteredCriterios.map((criterio) => {
            const actividadDescripcion = tipoActividades.find((actividad) => actividad.clave === criterio.tipo)?.descripcion || "Desconocido";

            return (
              <tr key={criterio.codigo}>
                <td className="py-2 px-4 border text-center text-blue-700 font-semibold">{criterio.valorPorcentaje}%</td>
                <td className="py-2 px-4 border text-center text-blue-700 font-semibold">{actividadDescripcion}</td>
                <td className="py-2 px-4 border text-center">
                  <button
                    className="text-green-600 font-semibold hover:text-green-800"
                    onClick={() => handleOpenModal("update", criterio)}
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No hay criterios disponibles para el parcial seleccionado.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">
              {modalType === "criterio" ? "Agregar Criterio" : modalType === "actividad" ? "Agregar Tipo de Actividad" : "Actualizar Criterio"}
            </h3>

            {modalType === "criterio" && (
              <>
                <label className="block mb-2 text-blue-700 font-semibold">
                  Parcial:
                  <select
                    name="parcial"
                    value={formData.parcial || ""}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-blue-700 font-semibold"
                  >
                    <option value="">Selecciona un parcial</option>
                    {parciales.map((parcial) => (
                      <option key={parcial.clave} value={parcial.clave}>
                        {parcial.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block mb-2 text-blue-700 font-semibold">
                  Tipo:
                  <select
                    name="tipo"
                    value={formData.tipo || ""}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-blue-700 font-semibold"
                  >
                    <option value="">Selecciona un tipo</option>
                    {tipoActividades.map((actividad) => (
                      <option key={actividad.clave} value={actividad.clave}>
                        {actividad.descripcion}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block mb-2 text-blue-700 font-semibold">
                  Valor Porcentaje:
                  <input
                    type="number"
                    name="valorPorcentaje"
                    value={formData.valorPorcentaje || ""}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-blue-700 font-semibold"
                    placeholder="Porcentaje"
                  />
                </label>
              </>
            )}

            {modalType === "actividad" && (
              <>
                <label className="block mb-2 text-blue-700 font-semibold">
                  Clave:
                  <input
                    type="text"
                    name="clave"
                    value={formData.clave || ""}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-blue-700 font-semibold"
                    placeholder="Clave de la actividad"
                  />
                </label>

                <label className="block mb-2 text-blue-700 font-semibold">
                  Descripción:
                  <textarea
                    name="descripcion"
                    value={formData.descripcion || ""}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-blue-700 font-semibold"
                    placeholder="Descripción de la actividad"
                  />
                </label>
              </>
            )}

            {modalType === "update" && selectedCriterio && (
              <>
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
              </>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={modalType === "update" ? handleSave : handleSubmit}
                className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 mr-2"
              >
                Guardar
              </button>
              <button
                onClick={handleCloseModal}
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
