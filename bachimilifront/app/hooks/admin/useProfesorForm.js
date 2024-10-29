import { useState } from "react";

export default function useProfesorForm() {
  const [formData, setFormData] = useState({
    nomPila: "",
    apPat: "",
    apMat: "",
    correo: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      nomPila: "",
      apPat: "",
      apMat: "",
      correo: "",
      contrasena: "",
    });
  };

  return { formData, handleChange, resetForm };
}
