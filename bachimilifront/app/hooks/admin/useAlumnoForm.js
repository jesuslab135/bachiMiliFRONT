import { useState } from "react";

export default function useAlumnoForm() {
  const [formData, setFormData] = useState({
    matricula: "",
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
      [name]: name === "grupo" ? parseInt(value, 10) || "" : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      matricula: "",
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
