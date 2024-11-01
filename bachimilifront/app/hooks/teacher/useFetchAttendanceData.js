import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchAttendanceData(claseId) {
  const [materiaNombre, setMateriaNombre] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const fetchClaseData = async () => {
      try {
        const data = await fetchTestData();
        const claseData = data.clases.find((c) => c.codigo === parseInt(claseId));
        if (claseData) {
          const materia = data.materias.find((m) => m.codigo === claseData.materia);
          const grupo = data.grupos.find((g) => g.codigo === claseData.grupo);

          setMateriaNombre(materia ? materia.nombre : "Materia desconocida");
          setGrupoNombre(grupo ? grupo.nombre : "Grupo desconocido");

          const alumnosRelacionados = data.alumnos.filter((alumno) => alumno.grupo === claseData.grupo);
          setAlumnos(alumnosRelacionados);

          const now = new Date();
          const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
          setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));

          const initialAttendance = alumnosRelacionados.reduce((acc, alumno) => {
            acc[alumno.matricula] = Array(days).fill("N/A");
            return acc;
          }, {});
          setAttendanceData(initialAttendance);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la clase:", error);
      }
    };

    if (claseId) fetchClaseData();
  }, [claseId]);

  return { materiaNombre, grupoNombre, alumnos, attendanceData, setAttendanceData, daysInMonth };
}
