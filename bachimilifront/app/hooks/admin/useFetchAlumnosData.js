import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchAlumnosData() {
  const [registros, setRegistros] = useState([]);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchAlumnosData = async () => {
      try {
        const data = await fetchTestData();
        setRegistros(data.alumnos);
        setGrupos(data.grupos);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchAlumnosData();
  }, []);

  return { registros, grupos };
}
