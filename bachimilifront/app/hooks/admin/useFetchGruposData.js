import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchGruposData() {
  const [grupos, setGrupos] = useState([]);
  const [periodos, setPeriodos] = useState([]);

  const fetchData = async () => {
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
      setPeriodos(data.periodos);
    } catch (error) {
      console.error("Error fetching groups data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { registros: grupos, periodos, fetchData };
}
