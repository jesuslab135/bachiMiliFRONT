import { createDocente } from "@/app/lib/fetchTestData";

export default function useSubmitProfesorForm(resetForm) {
  const handleSubmit = async (formData) => {
    console.log("Datos enviados para registrar docente:", formData);

    try {
      const response = await createDocente(formData);

      if (response) {
        alert("Profesor registrado exitosamente");
        resetForm();
      } else {
        alert("Error al registrar el profesor");
        console.error("Detalles del error:", response);
      }
    } catch (error) {
      console.error("Error al enviar datos del profesor:", error);
    }
  };

  return handleSubmit;
}
