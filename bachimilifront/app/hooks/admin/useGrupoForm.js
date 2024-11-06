import { useState } from "react";

export default function useGrupoForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    periodo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "periodo" ? parseInt(value, 10) : value, // Convertir periodo a número
    }));
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      periodo: "",
    });
  };

  return { formData, handleChange, resetForm };
}
