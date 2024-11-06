import { createMateria } from "@/app/lib/fetchTestData";

export default function useSubmitMateriaForm(resetForm) {
  const handleSubmit = async (formData) => {
    try {
      // Enviar solo el campo 'nombre' sin 'codigo'
      const submitData = { nombre: formData.nombre };

      const response = await createMateria(submitData);
      if (response) {
        alert("Materia registrada exitosamente.");
        resetForm();
      } else {
        alert("Error al registrar la materia.");
      }
    } catch (error) {
      console.error("Error al registrar la materia:", error);
    }
  };

  return handleSubmit;
}
