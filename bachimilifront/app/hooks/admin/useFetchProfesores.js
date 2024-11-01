import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchProfesores() {
  const [profesores, setProfesores] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchTestData();
      setProfesores(data.docentes);
    } catch (error) {
      console.error("Error fetching professor data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { registros: profesores, fetchData };
}
