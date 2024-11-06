import React, { useState, useEffect } from "react";
import { getAsistencias, updateCalificacion } from "@/app/lib/fetchTestData";

export default function StudentsTable({
  alumnos,
  criterios,
  selectedParcial,
  calificacionesData,
}) {
  const [examScores, setExamScores] = useState({});
  const [attendanceData, setAttendanceData] = useState({});
  const [parcialScores, setParcialScores] = useState({});

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const asistencias = await getAsistencias();
        const attendanceMap = asistencias.reduce((acc, asistencia) => {
          const { alumno, tipoAsistencia, tipoActividad, dia } = asistencia;
          if (!acc[alumno]) acc[alumno] = [];
          acc[alumno].push({ tipoAsistencia, tipoActividad, dia });
          return acc;
        }, {});
        setAttendanceData(attendanceMap);
      } catch (error) {
        console.error("Error al obtener datos de asistencia:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  const calculateCriterion = (alumnoMatricula, tipoActividad) => {
    const asistenciaAlumno = attendanceData[alumnoMatricula] || [];
    const criterio = criterios.find((c) => c.tipo === tipoActividad);
    const valorPorcentaje = criterio ? parseInt(criterio.valorPorcentaje, 10) : 0;

    const totalValidas = asistenciaAlumno.filter(
      (asistencia) =>
        asistencia.tipoActividad === tipoActividad &&
        ["A", "R", "J"].includes(asistencia.tipoAsistencia)
    ).length;

    const totalActividad = asistenciaAlumno.filter(
      (asistencia) => asistencia.tipoActividad === tipoActividad
    ).length;

    return totalActividad > 0 ? ((totalValidas / totalActividad) * valorPorcentaje).toFixed(2) : "0.00";
  };

  const calculateTA = (alumnoMatricula) => calculateCriterion(alumnoMatricula, "TA");
  const calculateTE = (alumnoMatricula) => calculateCriterion(alumnoMatricula, "TE");
  const calculateTI = (alumnoMatricula) => calculateCriterion(alumnoMatricula, "TI");

  const calculateInasPercentage = (alumnoMatricula) => {
    const asistenciaAlumno = attendanceData[alumnoMatricula] || [];
    const totalAsistencias = asistenciaAlumno.length;
    const totalInasistencias = asistenciaAlumno.filter(
      (asistencia) => asistencia.tipoAsistencia === "F"
    ).length;

    return totalAsistencias > 0
      ? (100 - ((totalInasistencias / totalAsistencias) * 100)).toFixed(2)
      : "0.00";
  };

  const calculateParcial = (alumnoMatricula, exScore) => {
    const ta = parseFloat(calculateTA(alumnoMatricula));
    const te = parseFloat(calculateTE(alumnoMatricula));
    const ti = parseFloat(calculateTI(alumnoMatricula));
    const ex = exScore || 0;
    const total = ta + te + ti + ex;
    return total.toFixed(2);
  };

  const handleExamScoreChange = async (alumnoMatricula, newScore) => {
    const updatedScores = { ...examScores, [alumnoMatricula]: newScore };
    setExamScores(updatedScores);

    const newParcialScore = calculateParcial(alumnoMatricula, newScore);
    setParcialScores({ ...parcialScores, [alumnoMatricula]: newParcialScore });

    const calificacion = calificacionesData.find(
      (c) => c.alumno === alumnoMatricula
    );

    if (calificacion) {
      const updatedData = {
        ...calificacion,
        [`parcial${selectedParcial}`]: parseFloat(newParcialScore),
      };

      try {
        await updateCalificacion(calificacion.clave, updatedData);
        console.log("Calificación actualizada exitosamente en la base de datos.");
      } catch (error) {
        console.error("Error al actualizar la calificación:", error);
      }
    } else {
      console.warn("No se encontró una calificación para este alumno.");
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mb-4">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="py-3 px-4 border text-left">Alumno</th>
          <th className="py-3 px-4 border text-center">TA</th>
          <th className="py-3 px-4 border text-center">TE</th>
          <th className="py-3 px-4 border text-center">TI</th>
          <th className="py-3 px-4 border text-center">Ex</th>
          <th className="py-3 px-4 border text-center">Parcial {selectedParcial}</th>
          <th className="py-3 px-4 border text-center bg-red-500">INAS</th>
          <th className="py-3 px-4 border text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((alumno) => (
          <tr key={alumno.matricula} className="hover:bg-blue-50">
            <td className="py-3 px-4 border text-gray-700 font-semibold">
              {`${alumno.nomPila} ${alumno.apPat} ${alumno.apMat || ""}`}
            </td>
            <td className="py-3 px-4 border text-gray-500 text-center">{calculateTA(alumno.matricula)}%</td>
            <td className="py-3 px-4 border text-gray-500 text-center">{calculateTE(alumno.matricula)}%</td>
            <td className="py-3 px-4 border text-gray-500 text-center">{calculateTI(alumno.matricula)}%</td>
            <td className="py-3 px-4 border text-gray-500 text-center">
              <select
                value={examScores[alumno.matricula] || ""}
                onChange={(e) => handleExamScoreChange(alumno.matricula, parseFloat(e.target.value))}
                className="w-20 px-2 py-1 border rounded-md text-gray-800"
              >
                <option value="">Seleccione</option>
                {[...Array(31).keys()].map((score) => (
                  <option key={score} value={score}>
                    {score}
                  </option>
                ))}
              </select>
            </td>
            <td className="py-3 px-4 border text-gray-500 text-center">
              {parcialScores[alumno.matricula] || calculateParcial(alumno.matricula, examScores[alumno.matricula] || 0)}
            </td>
            <td className="py-3 px-4 border text-center text-red-600">{calculateInasPercentage(alumno.matricula)}%</td>
            <td className="py-3 px-4 border text-gray-500 text-center">
              <button
                onClick={() => alert(`Actualizando ${alumno.nomPila}`)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              >
                Actualizar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
