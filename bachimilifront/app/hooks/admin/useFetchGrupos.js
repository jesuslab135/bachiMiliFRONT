import { useState, useEffect } from "react";
import { getGrupos } from "@/app/lib/fetchTestData";

export default function useFetchGrupos() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const data = await getGrupos();
        setGrupos(data);
      } catch (error) {
        console.error("Error al obtener los grupos:", error);
      }
    };

    fetchGrupos();
  }, []);

  return grupos;
}
