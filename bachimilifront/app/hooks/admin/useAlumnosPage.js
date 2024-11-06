import { useState, useEffect } from "react";
import { getAlumnos, getGrupos, updateAlumno, deleteAlumno } from "@/app/lib/fetchTestData";

export default function useAlumnosPage() {
  const [registros, setRegistros] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Función para obtener datos de alumnos y grupos
  const fetchData = async () => {
    try {
      const alumnosData = await getAlumnos();
      const gruposData = await getGrupos();
      setRegistros(alumnosData);
      setGrupos(gruposData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      const response = await updateAlumno(selectedAlumno.matricula, selectedAlumno);

      if (response) {
        await fetchData(); // Refresca los datos después de la actualización
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
      const response = await deleteAlumno(alumnoId);

      if (response) {
        await fetchData(); // Refresca los datos después de la eliminación
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
