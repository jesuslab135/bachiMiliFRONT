import { useState } from "react";

export default function useGrupoForm() {
  const [formData, setFormData] = useState({
    nombreGrupo: "",
    periodo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "periodo" ? parseInt(value, 10) : value, // Convert periodo to number
    }));
  };

  const resetForm = () => {
    setFormData({
      nombreGrupo: "",
      periodo: "",
    });
  };

  return { formData, handleChange, resetForm };
}
