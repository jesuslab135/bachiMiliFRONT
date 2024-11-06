import { useState, useEffect } from "react";
import { getGrupos, getPeriodos, updateGrupo, deleteGrupo as deleteGrupoApi } from "@/app/lib/fetchTestData";

export default function useGruposPage() {
  const [registros, setRegistros] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const fetchData = async () => {
    try {
      const gruposData = await getGrupos();
      const periodosData = await getPeriodos();
      setRegistros(gruposData || []);
      setPeriodos(periodosData || []);
    } catch (error) {
      console.error("Error al obtener los datos de grupos y periodos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (grupo) => {
    setSelectedGrupo(grupo);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedGrupo((prevGrupo) => ({ ...prevGrupo, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateGrupo(selectedGrupo.codigo, selectedGrupo);
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

  const handleDelete = async (grupoId) => {
    if (!confirm("¿Está seguro de que desea eliminar este registro?")) return;

    try {
      const response = await deleteGrupoApi(grupoId);
      if (response) {
        await fetchData();
      }
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  return {
    registros,
    periodos,
    selectedGrupo,
    showEditModal,
    showSuccessMessage,
    handleEditClick,
    handleEditChange,
    handleEditSubmit,
    handleDelete,
    setShowEditModal,
  };
}
