import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchGrupos() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const data = await fetchTestData();
        setGrupos(data.grupos);
      } catch (error) {
        console.error("Error al obtener los grupos:", error);
      }
    };

    fetchGrupos();
  }, []);

  return grupos;
}
