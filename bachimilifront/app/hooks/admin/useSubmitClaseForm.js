// useSubmitClaseForm.js

import { createClase } from "@/app/lib/fetchTestData";

export default function useSubmitClaseForm(resetForm) {
  const handleSubmit = async (formData) => {
    try {
      const submitData = {
        materia: formData.materia,
        grupo: formData.grupo,
        docente: formData.docente,
      };

      console.log("Datos enviados para registrar clase:", submitData);

      const response = await createClase(submitData);

      if (response) {
        alert("Clase registrada exitosamente.");
        resetForm();
      } else {
        alert("Error al registrar la clase.");
      }
    } catch (error) {
      console.error("Error al enviar datos de la clase:", error);
    }
  };

  return handleSubmit;
}
