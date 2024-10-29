export default function useSubmitAlumnoForm(resetForm) {
    const handleSubmit = async (formData) => {
      const submitData = {
        ...formData,
        grupo: parseInt(formData.grupo, 10),
      };
  
      try {
        const response = await fetch("/api/addAlumno", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          resetForm();
        } else {
          alert("Error al registrar el alumno");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return handleSubmit;
  }
  