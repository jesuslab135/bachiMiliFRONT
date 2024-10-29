import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchProfesores() {
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    const fetchProfesoresData = async () => {
      try {
        const data = await fetchTestData();
        setProfesores(data.docentes);
      } catch (error) {
        console.error("Error fetching professor data:", error);
      }
    };

    fetchProfesoresData();
  }, []);

  return profesores;
}
