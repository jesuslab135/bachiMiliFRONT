import { useState } from "react";

export default function useMateriaForm() {
  const [formData, setFormData] = useState({ nombre: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({ nombre: "" });
  };

  return { formData, handleChange, resetForm };
}
