import { useState, useEffect } from "react";
import { getClases, updateClase, deleteClase, getDocentes, getMaterias, getGrupos } from "@/app/lib/fetchTestData";

export default function useClasesPage() {
  const [registros, setRegistros] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [selectedClase, setSelectedClase] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Función para cargar datos
  const fetchData = async () => {
    try {
      const [clasesData, docentesData, materiasData, gruposData] = await Promise.all([
        getClases(),
        getDocentes(),
        getMaterias(),
        getGrupos(),
      ]);

      setRegistros(clasesData || []);
      setDocentes(docentesData || []);
      setMaterias(materiasData || []);
      setGrupos(gruposData || []);
    } catch (error) {
      console.error("Error al obtener los registros:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (clase) => {
    setSelectedClase(clase);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedClase((prevClase) => ({ ...prevClase, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateClase(selectedClase.codigo, selectedClase);

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

  const handleDelete = async (claseId) => {
    if (!confirm("¿Está seguro de que desea eliminar este registro?")) return;

    try {
      const response = await deleteClase(claseId);

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
    docentes,
    materias,
    grupos,
    selectedClase,
    showEditModal,
    showSuccessMessage,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    setShowEditModal,
  };
}
