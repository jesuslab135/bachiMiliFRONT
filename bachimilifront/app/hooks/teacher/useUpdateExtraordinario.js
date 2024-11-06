import { useState } from "react";
import { updateCalificacion } from "@/app/lib/fetchTestData";

export default function useUpdateExtraordinario() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateAlumno = async (alumno, claseId) => {
    // Construir objeto de actualización solo con el campo extraordinario
    const extraordinarioUpdate = {
      clave: alumno.clave,
      alumno: alumno.matricula,
      clase: parseInt(claseId),
      ...(alumno.extraordinario !== undefined && { extraordinario: alumno.extraordinario }),
    };

    // Imprimir el objeto antes de enviarlo para verificar su estructura
    console.log("Enviando datos de actualización:", extraordinarioUpdate);

    try {
      const response = await updateCalificacion(alumno.clave, extraordinarioUpdate);
      if (response) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        setErrorMessage("Error al actualizar el extraordinario.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage("Error al enviar los datos.");
    }
  };

  return { showSuccessMessage, errorMessage, handleUpdateAlumno };
}
