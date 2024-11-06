import { useState, useEffect } from "react";
import { getClases, getMaterias, getGrupos, getAlumnos, getCalificaciones } from "@/app/lib/fetchTestData";
import { useSearchParams } from "next/navigation";

export default function useFetchExtraordinariosData() {
  const [materiaNombre, setMateriaNombre] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchClaseData = async () => {
      const claseId = searchParams.get("clase");
      if (claseId) {
        try {
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

            const updatedAlumnos = alumnosRelacionados.map((alumno) => {
              const calificacionesAlumno = calificaciones.find(
                (c) => c.alumno === alumno.matricula && c.clase === parseInt(claseId)
              );

              const remedial1 = calificacionesAlumno?.remedial1 ?? null;
              const remedial2 = calificacionesAlumno?.remedial2 ?? null;
              const remedial3 = calificacionesAlumno?.remedial3 ?? null;
              const enableExtraordinario = [remedial1, remedial2, remedial3].some(
                (score) => score < 6 && score !== null
              );

              return {
                ...alumno,
                clave: calificacionesAlumno?.clave,  // Aseguramos que clave esté en cada alumno
                remedial1,
                remedial2,
                remedial3,
                extraordinario: enableExtraordinario ? calificacionesAlumno?.extraordinario || "" : null,
                enableExtraordinario,
              };
            });

            setMateriaNombre(materia ? materia.nombre : "Materia desconocida");
            setGrupoNombre(grupo ? grupo.nombre : "Grupo desconocido");
            setAlumnos(updatedAlumnos);
          }
        } catch (error) {
          console.error("Error al obtener los datos de la clase:", error);
        }
      }
    };

    fetchClaseData();
  }, [searchParams]);

  return { materiaNombre, grupoNombre, alumnos, setAlumnos };
}
