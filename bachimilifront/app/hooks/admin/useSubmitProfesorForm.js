export default function useSubmitProfesorForm(resetForm) {
    const handleSubmit = async (formData) => {
      try {
        const response = await fetch("/api/addProfesor", {
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
          alert("Error al registrar el profesor");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return handleSubmit;
  }
  