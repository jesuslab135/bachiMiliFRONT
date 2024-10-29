import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchPeriodos() {
  const [periodos, setPeriodos] = useState([]);

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const data = await fetchTestData();
        setPeriodos(data.periodos);
      } catch (error) {
        console.error("Error al obtener los periodos:", error);
      }
    };
    fetchPeriodos();
  }, []);

  return periodos;
}
