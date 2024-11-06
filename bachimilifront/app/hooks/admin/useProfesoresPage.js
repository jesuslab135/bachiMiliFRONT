import { useState, useEffect } from "react"; // Agregar useEffect aquí
import { getDocentes, updateDocente, deleteDocente } from "@/app/lib/fetchTestData";

export default function useProfesoresPage() {
  const [registros, setRegistros] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Función para cargar datos de profesores
  const fetchData = async () => {
    try {
      const data = await getDocentes();
      setRegistros(data || []);
    } catch (error) {
      console.error("Error al obtener los registros de profesores:", error);
    }
  };

  // Llama a fetchData en el montaje del componente
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (profesor) => {
    setSelectedProfesor(profesor);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProfesor((prevProfesor) => ({ ...prevProfesor, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateDocente(selectedProfesor.matricula, selectedProfesor);

      if (response) {
        await fetchData();
        setShowEditModal(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        console.error("No se pudo actualizar el registro.");
      }
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

  const handleDelete = async (matricula) => {
    if (!confirm("¿Está seguro de que desea eliminar este registro?")) return;

    try {
      const response = await deleteDocente(matricula);

      if (response) {
        await fetchData();
      } else {
        console.error("No se pudo eliminar el registro.");
      }
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  return {
    registros,
    selectedProfesor,
    showEditModal,
    showSuccessMessage,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    setShowEditModal,
  };
}
