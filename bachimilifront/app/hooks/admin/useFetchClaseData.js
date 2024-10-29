import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchClaseData() {
  const [materias, setMaterias] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTestData();
        setMaterias(data.materias);
        setDocentes(data.docentes);
        setGrupos(data.grupos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return { materias, docentes, grupos };
}
