export async function fetchTestData() {
    try {
      const response = await fetch("/testData.json");
      if (!response.ok) {
        throw new Error("Error al cargar los datos de prueba");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en fetchTestData:", error);
      return null;
    }
  }
  