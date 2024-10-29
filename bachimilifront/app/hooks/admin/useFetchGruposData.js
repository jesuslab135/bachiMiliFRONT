import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchGruposData() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGruposData = async () => {
      try {
        const data = await fetchTestData();
        const gruposConPeriodo = data.grupos.map((grupo) => {
          const periodo = data.periodos.find((p) => p.clave === grupo.periodo);
          return {
            id: grupo.codigo,
            nombre: grupo.nombre,
            periodo: periodo ? `${periodo.fechaInicio} - ${periodo.fechaCierre}` : "Periodo no encontrado",
          };
        });
        setGrupos(gruposConPeriodo);
      } catch (error) {
        console.error("Error fetching groups data:", error);
      }
    };

    fetchGruposData();
  }, []);

  return grupos;
}
