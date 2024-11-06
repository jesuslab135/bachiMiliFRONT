import { useState, useEffect } from "react";
import { getClases, getMaterias, getGrupos, getAlumnos, getCalificaciones } from "@/app/lib/fetchTestData";

export default function useFetchClaseData(claseId) {
  const [materiaNombre, setMateriaNombre] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const fetchClaseData = async () => {
      if (claseId) {
        try {
          // Llamadas paralelas para obtener los datos de la API
          const [clases, materias, grupos, alumnosData, calificaciones] = await Promise.all([
            getClases(),
            getMaterias(),
            getGrupos(),
            getAlumnos(),
            getCalificaciones(),
          ]);

          const clase = clases.find((c) => c.codigo === parseInt(claseId));
          if (clase) {
            const materia = materias.find((m) => m.codigo === clase.materia);
            const grupo = grupos.find((g) => g.codigo === clase.grupo);
            const alumnosRelacionados = alumnosData.filter((alumno) => alumno.grupo === clase.grupo);

            setMateriaNombre(materia ? materia.nombre : "Materia desconocida");
            setGrupoNombre(grupo ? grupo.nombre : "Grupo desconocido");

            const updatedAlumnos = alumnosRelacionados.map((alumno) => {
              const calificacionesAlumno = calificaciones.find(
                (c) => c.alumno === alumno.matricula && c.clase === parseInt(claseId)
              );
              return {
                ...alumno,
                remedial1: calificacionesAlumno?.parcial1 < 6 ? calificacionesAlumno.remedial1 || "" : null,
                remedial2: calificacionesAlumno?.parcial2 < 6 ? calificacionesAlumno.remedial2 || "" : null,
                remedial3: calificacionesAlumno?.parcial3 < 6 ? calificacionesAlumno.remedial3 || "" : null,
                clave: calificacionesAlumno?.clave || null,  // Agrega la clave para facilitar la actualización
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
