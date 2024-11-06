import { createAlumno } from "@/app/lib/fetchTestData";

export default function useSubmitAlumnoForm(resetForm) {
  const handleSubmit = async (formData) => {
    const submitData = {
      ...formData,
      grupo: parseInt(formData.grupo, 10),
    };

    try {
      console.log("Datos enviados:", submitData);

      const response = await createAlumno(submitData);

      if (response) {
        alert("Alumno registrado exitosamente");
        resetForm();
      } else {
        alert("Error al registrar el alumno. Verifica que todos los campos sean correctos.");
      }
    } catch (error) {
      console.error("Error al enviar datos del alumno:", error);
    }
  };

  return handleSubmit;
}
