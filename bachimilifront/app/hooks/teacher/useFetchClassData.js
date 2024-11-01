import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";

export default function useFetchClassData(claseId) {
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

            const updatedAlumnos = alumnosRelacionados.map((alumno) => {
              const calificaciones = data.calificaciones.find(
                (cal) => cal.alumno === alumno.matricula && cal.clase === parseInt(claseId)
              );
              return {
                ...alumno,
                parcial1: calificaciones?.parcial1 ?? "",
                parcial2: calificaciones?.parcial2 ?? "",
                parcial3: calificaciones?.parcial3 ?? "",
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
  }, [claseId]);

  return { materiaNombre, grupoNombre, alumnos, setAlumnos };
}
