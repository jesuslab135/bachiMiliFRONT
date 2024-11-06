import { createGrupo } from "@/app/lib/fetchTestData";

export default function useSubmitGrupoForm(resetForm) {
  const handleSubmit = async (formData) => {
    try {
      const submitData = {
        nombre: formData.nombre,
        periodo: formData.periodo,
      };
      console.log("Datos enviados para registrar grupo:", submitData);

      const response = await createGrupo(submitData);

      if (response) {
        alert("Grupo registrado exitosamente");
        resetForm();
      } else {
        alert("Error al registrar el grupo");
      }
    } catch (error) {
      console.error("Error al enviar datos del grupo:", error);
    }
  };

  return handleSubmit;
}
