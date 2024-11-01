export default function useHandleUpdate(setShowSuccessMessage, claseId) {
    return async (alumno) => {
      const updatedGrade = {
        alumno: alumno.matricula,
        clase: parseInt(claseId),
        parcial1: alumno.parcial1,
        parcial2: alumno.parcial2,
        parcial3: alumno.parcial3,
      };
  
      try {
        const response = await fetch("/api/updateGrades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updatedGrades: [updatedGrade] }),
        });
  
        if (response.ok) {
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
        } else {
          alert("Error al actualizar las calificaciones.");
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Error al enviar los datos.");
      }
    };
  }
  