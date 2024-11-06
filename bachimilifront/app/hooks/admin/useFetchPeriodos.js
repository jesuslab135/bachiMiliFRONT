import { useState, useEffect } from "react";
import { getPeriodos } from "@/app/lib/fetchTestData";

export default function useFetchPeriodos() {
  const [periodos, setPeriodos] = useState([]);

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const data = await getPeriodos();
        if (data) {
          setPeriodos(data); // Guardamos los datos directamente en el estado
        } else {
          console.error("No se recibieron datos de los periodos");
        }
      } catch (error) {
        console.error("Error al obtener los periodos:", error);
      }
    };

    fetchPeriodos();
  }, []);

  return periodos;
}
