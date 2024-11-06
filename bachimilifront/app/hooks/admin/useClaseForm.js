import { useState } from "react";

export default function useClaseForm() {
  const [formData, setFormData] = useState({
    materia: "",
    docente: "",
    grupo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "materia" || name === "grupo" ? parseInt(value, 10) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      materia: "",
      docente: "",
      grupo: "",
    });
  };

  return { formData, handleChange, resetForm };
}
