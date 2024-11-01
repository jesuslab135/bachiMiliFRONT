import { useState } from "react";

export default function useRemediales() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleUpdateAlumno = async (alumno, claseId) => {
    const remedialUpdate = {
      alumno: alumno.matricula,
      clase: parseInt(claseId),
      remedial1: alumno.remedial1,
      remedial2: alumno.remedial2,
      remedial3: alumno.remedial3,
    };

    try {
      const response = await fetch("/api/updateRemediales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([remedialUpdate]),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        alert("Error al actualizar los remediales.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos.");
    }
  };

  return { showSuccessMessage, handleUpdateAlumno };
}
