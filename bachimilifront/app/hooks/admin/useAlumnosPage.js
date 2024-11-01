import { useState } from "react";
import useFetchAlumnosData from "./useFetchAlumnosData";

export default function useAlumnosPage() {
  const { registros, grupos, fetchData } = useFetchAlumnosData();
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (alumno) => {
    setSelectedAlumno(alumno);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setSelectedAlumno(null); // Limpia selectedAlumno al cerrar el modal
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedAlumno((prevAlumno) => ({ ...prevAlumno, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/registros/alumnos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAlumno),
      });

      if (response.ok) {
        await fetchData();
        closeModal();
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  const handleDelete = async (alumnoId) => {
    if (!confirm("¿Está seguro de que desea eliminar este registro?")) return;

    try {
      const response = await fetch(`/api/registros/alumnos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricula: alumnoId }),
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
    grupos,
    selectedAlumno,
    showSuccessMessage,
    showEditModal,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    closeModal,
  };
}
