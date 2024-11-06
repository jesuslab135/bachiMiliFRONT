import { useState } from "react";
import { updateCalificacion } from "@/app/lib/fetchTestData";

export default function useRemediales() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateAlumno = async (alumno, claseId) => {
    // Construir objeto de actualización solo con campos remediales
    const remedialUpdate = {
      clave: alumno.clave,
      alumno: alumno.matricula,
      clase: parseInt(claseId),
      ...(alumno.remedial1 !== undefined && { remedial1: alumno.remedial1 }),
      ...(alumno.remedial2 !== undefined && { remedial2: alumno.remedial2 }),
      ...(alumno.remedial3 !== undefined && { remedial3: alumno.remedial3 }),
    };
  
    // Imprimir el objeto antes de enviarlo para verificar su estructura
    console.log("Enviando datos de actualización:", remedialUpdate);
  
    try {
      const response = await updateCalificacion(alumno.clave, remedialUpdate);
      if (response) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        setErrorMessage("Error al actualizar los remediales.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage("Error al enviar los datos.");
    }
  };
  
  

  return { showSuccessMessage, errorMessage, handleUpdateAlumno };
}
