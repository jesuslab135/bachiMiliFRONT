// app/hooks/teacher/fetchClassData.js

import { fetchTestData } from "@/app/lib/fetchTestData";

export const fetchClassData = async (claseId) => {
  try {
    const data = await fetchTestData();
    const clase = data.clases.find((c) => c.codigo === parseInt(claseId));

    if (!clase) throw new Error("Clase no encontrada");

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
        remedial1: calificaciones?.remedial1 ?? "",
        remedial2: calificaciones?.remedial2 ?? "",
        remedial3: calificaciones?.remedial3 ?? "",
        extraordinario: calificaciones?.extraordinario ?? "",
      };
    });

    return {
      materiaNombre: materia ? materia.nombre : "Materia desconocida",
      grupoNombre: grupo ? grupo.nombre : "Grupo desconocido",
      alumnos: updatedAlumnos,
    };
  } catch (error) {
    console.error("Error al obtener los datos de la clase:", error);
    throw error;
  }
};
