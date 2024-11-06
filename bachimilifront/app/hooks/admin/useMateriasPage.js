import { useState, useEffect } from "react";
import { getMaterias, updateMateria, deleteMateria } from "@/app/lib/fetchTestData";

export default function useMateriasPage() {
  const [registros, setRegistros] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Función para obtener materias
  const fetchData = async () => {
    try {
      const data = await getMaterias();
      setRegistros(data);
    } catch (error) {
      console.error("Error al obtener los datos de materias:", error);
    }
  };

  // Llamada inicial para obtener datos al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

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
      const response = await updateMateria(selectedMateria.codigo, selectedMateria);
      if (response) {
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
      const response = await deleteMateria(materiaId);
      if (response) {
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
