// useFetchClaseData.js

import { useState, useEffect } from "react";
import { getMaterias, getDocentes, getGrupos } from "@/app/lib/fetchTestData";

export default function useFetchClaseData() {
  const [materias, setMaterias] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materiasData = await getMaterias();
        const docentesData = await getDocentes();
        const gruposData = await getGrupos();

        setMaterias(materiasData || []);
        setDocentes(docentesData || []);
        setGrupos(gruposData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return { materias, docentes, grupos };
}
