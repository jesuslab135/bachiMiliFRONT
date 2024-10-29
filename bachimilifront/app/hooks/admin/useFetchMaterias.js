import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchMaterias() {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchMateriasData = async () => {
      try {
        const data = await fetchTestData();
        setMaterias(data.materias);
      } catch (error) {
        console.error("Error fetching subjects data:", error);
      }
    };

    fetchMateriasData();
  }, []);

  return materias;
}
