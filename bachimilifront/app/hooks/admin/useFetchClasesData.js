import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchClasesData() {
  const [registros, setRegistros] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchClasesData = async () => {
      try {
        const data = await fetchTestData();
        setRegistros(data.clases);
        setDocentes(data.docentes);
        setMaterias(data.materias);
        setGrupos(data.grupos);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchClasesData();
  }, []);

  return { registros, docentes, materias, grupos };
}
