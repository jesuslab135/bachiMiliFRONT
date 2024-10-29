import { useState } from "react";

export default function useAlumnoForm() {
  const [formData, setFormData] = useState({
    nomPila: "",
    apPat: "",
    apMat: "",
    correo: "",
    contrasena: "",
    grupo: "",
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
      grupo: "",
    });
  };

  return { formData, handleChange, resetForm };
}
