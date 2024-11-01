import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchClaseData(claseId) {
  const [materiaNombre, setMateriaNombre] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const fetchClaseData = async () => {
      if (claseId) {
        try {
          const data = await fetchTestData();
          const clase = data.clases.find((c) => c.codigo === parseInt(claseId));
          if (clase) {
            const materia = data.materias.find((m) => m.codigo === clase.materia);
            const grupo = data.grupos.find((g) => g.codigo === clase.grupo);
            const alumnosRelacionados = data.alumnos.filter((alumno) => alumno.grupo === clase.grupo);

            setMateriaNombre(materia ? materia.nombre : "Materia desconocida");
            setGrupoNombre(grupo ? grupo.nombre : "Grupo desconocido");

            const updatedAlumnos = alumnosRelacionados.map((alumno) => {
              const calificaciones = data.calificaciones.find(
                (c) => c.alumno === alumno.matricula && c.clase === parseInt(claseId)
              );
              return {
                ...alumno,
                remedial1: calificaciones?.parcial1 < 6 ? calificaciones.remedial1 || "" : null,
                remedial2: calificaciones?.parcial2 < 6 ? calificaciones.remedial2 || "" : null,
                remedial3: calificaciones?.parcial3 < 6 ? calificaciones.remedial3 || "" : null,
              };
            });
            setAlumnos(updatedAlumnos);
          }
        } catch (error) {
          console.error("Error al obtener los datos de la clase:", error);
        }
      }
    };
    fetchClaseData();
  }, [claseId]);

  return { materiaNombre, grupoNombre, alumnos, setAlumnos };
}
