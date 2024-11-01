import { useState, useEffect } from "react";
import { fetchTestData } from "@/app/lib/fetchTestData";
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
          const data = await fetchTestData();
          const clase = data.clases.find((c) => c.codigo === parseInt(claseId));
          if (clase) {
            const materia = data.materias.find((m) => m.codigo === clase.materia);
            const grupo = data.grupos.find((g) => g.codigo === clase.grupo);
            const alumnosRelacionados = data.alumnos.filter((alumno) => alumno.grupo === clase.grupo);

            const updatedAlumnos = alumnosRelacionados.map((alumno) => {
              const calificaciones = data.calificaciones.find(
                (c) => c.alumno === alumno.matricula && c.clase === parseInt(claseId)
              );
              const remedial1 = calificaciones?.remedial1 ?? null;
              const remedial2 = calificaciones?.remedial2 ?? null;
              const remedial3 = calificaciones?.remedial3 ?? null;
              const enableExtraordinario = [remedial1, remedial2, remedial3].some((score) => score < 6 && score !== null);

              return {
                ...alumno,
                remedial1,
                remedial2,
                remedial3,
                extraordinario: enableExtraordinario ? calificaciones?.extraordinario || "" : null,
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
