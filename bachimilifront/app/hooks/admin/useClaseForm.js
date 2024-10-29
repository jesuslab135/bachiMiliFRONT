import { useState } from "react";

export default function useClaseForm() {
  const [formData, setFormData] = useState({
    nombreClase: "",
    materia: "",
    profesor: "",
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
      nombreClase: "",
      materia: "",
      profesor: "",
      grupo: "",
    });
  };

  return { formData, handleChange, resetForm };
}
