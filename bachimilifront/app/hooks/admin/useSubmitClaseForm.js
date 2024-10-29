export default function useSubmitClaseForm(resetForm) {
    const handleSubmit = async (formData) => {
      try {
        const response = await fetch("/api/addClase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          resetForm();
        } else {
          alert("Error al registrar la clase");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return handleSubmit;
  }
  