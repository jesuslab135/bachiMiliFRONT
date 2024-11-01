import { useState } from "react";
import useFetchMaterias from "./useFetchMaterias";

export default function useMateriasPage() {
  const { registros, fetchData } = useFetchMaterias();
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEditClick = (materia) => {
    setSelectedMateria(materia);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedMateria((prevMateria) => ({ ...prevMateria, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/registros/materias", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedMateria),
      });

      if (response.ok) {
        await fetchData();
        setShowEditModal(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  const handleDelete = async (materiaId) => {
    if (!confirm("¿Está seguro de que desea eliminar este registro?")) return;

    try {
      const response = await fetch(`/api/registros/materias`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo: materiaId }),
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  return {
    registros,
    selectedMateria,
    showEditModal,
    showSuccessMessage,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    setShowEditModal,
  };
}
