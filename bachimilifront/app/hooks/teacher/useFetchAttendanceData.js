import { useState, useEffect } from "react";
import {
  getClases,
  getMaterias,
  getGrupos,
  getAlumnos,
  getPeriodos,
  getParciales,
  getTipoActividades,
} from "@/app/lib/fetchTestData";

export default function useFetchAttendanceData(claseId) {
  const [materiaNombre, setMateriaNombre] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [parciales, setParciales] = useState([]);
  const [tipoActividades, setTipoActividades] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);
  const [selectedParcial, setSelectedParcial] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [periodosData, parcialesData, tipoActividadesData] = await Promise.all([
          getPeriodos(),
          getParciales(),
          getTipoActividades(),
        ]);
        setPeriodos(periodosData);
        setParciales(parcialesData);
        setTipoActividades(tipoActividadesData);

        if (periodosData.length > 0) setSelectedPeriodo(periodosData[0]);
        if (parcialesData.length > 0) setSelectedParcial(parcialesData[0]);
      } catch (error) {
        console.error("Error al obtener los datos iniciales:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchClaseData = async () => {
      try {
        const [clases, materias, grupos, alumnosData] = await Promise.all([
          getClases(),
          getMaterias(),
          getGrupos(),
          getAlumnos(),
        ]);

        const claseData = clases.find((c) => c.codigo === parseInt(claseId));
        if (claseData) {
          const materia = materias.find((m) => m.codigo === claseData.materia);
          const grupo = grupos.find((g) => g.codigo === claseData.grupo);

          setMateriaNombre(materia ? materia.nombre : "Materia desconocida");
          setGrupoNombre(grupo ? grupo.nombre : "Grupo desconocido");

          const alumnosRelacionados = alumnosData.filter(
            (alumno) => alumno.grupo === claseData.grupo
          );
          setAlumnos(alumnosRelacionados);

          // Establece los días del mes actual
          const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          const daysInSelectedMonth = Array.from(
            { length: endOfMonth.getDate() },
            (_, i) => i + 1
          );
          setDaysInMonth(daysInSelectedMonth);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la clase:", error);
      }
    };

    if (claseId && selectedPeriodo && selectedParcial) fetchClaseData();
  }, [claseId, selectedPeriodo, selectedParcial, currentDate]);

  return {
    materiaNombre,
    grupoNombre,
    alumnos,
    daysInMonth,
    periodos,
    parciales,
    selectedPeriodo,
    setSelectedPeriodo,
    selectedParcial,
    setSelectedParcial,
    setCurrentDate,
    currentDate,
    tipoActividades,
  };
}
