import { useState } from "react";

export default function useProfesorForm() {
  const [formData, setFormData] = useState({
    matricula: "",
    nombrePila: "",
    apPat: "",
    apMat: "",
    correo: "",
    telefono: "",
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
      matricula: "", // Deja el campo vacío para que se escriba manualmente
      nombrePila: "",
      apPat: "",
      apMat: "",
      correo: "",
      telefono: "",
      contrasena: "",
    });
  };

  return { formData, handleChange, resetForm };
}
