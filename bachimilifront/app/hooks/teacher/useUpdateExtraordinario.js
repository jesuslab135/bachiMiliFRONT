import { useState } from "react";

export default function useUpdateExtraordinario() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateExtraordinario = async (extraordinarioUpdate) => {
    try {
      const response = await fetch("/api/updateExtraordinario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([extraordinarioUpdate]),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        setErrorMessage("Error al actualizar los extraordinarios.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage("Error al enviar los datos.");
    }
  };

  return { showSuccessMessage, errorMessage, updateExtraordinario };
}
