import React, { useEffect, useState } from "react";
import { getAsistencias, createAsistencia, updateAsistencia } from "@/app/lib/fetchTestData";

const AttendanceTable = ({
  alumnos,
  daysInMonth,
  currentDate,
  tipoActividades,
  selectedParcial,
  claseId,
}) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [actividadData, setActividadData] = useState({});
  const [existingRecords, setExistingRecords] = useState({});

  useEffect(() => {
    const fetchAsistencias = async () => {
      const asistencias = await getAsistencias();
      const initialAttendanceData = {};
      const initialActividadData = {};
      const records = {};

      alumnos.forEach((alumno) => {
        initialAttendanceData[alumno.matricula] = Array(daysInMonth.length).fill("N/A");
        initialActividadData[alumno.matricula] = Array(daysInMonth.length).fill("N/A");
      });

      asistencias.forEach((asistencia) => {
        const dia = new Date(asistencia.dia);
        const diaIndex = dia.getDate() - 1;

        if (
          dia.getMonth() === currentDate.getMonth() &&
          dia.getFullYear() === currentDate.getFullYear() &&
          diaIndex >= 0 &&
          diaIndex < daysInMonth.length
        ) {
          if (initialAttendanceData[asistencia.alumno]) {
            initialAttendanceData[asistencia.alumno][diaIndex] = asistencia.tipoAsistencia || "N/A";
          }
          if (initialActividadData[asistencia.alumno]) {
            initialActividadData[asistencia.alumno][diaIndex] = asistencia.tipoActividad || "N/A";
          }

          records[`${asistencia.alumno}-${asistencia.dia}`] = asistencia;
        }
      });

      setAttendanceData(initialAttendanceData);
      setActividadData(initialActividadData);
      setExistingRecords(records);
    };

    fetchAsistencias();
  }, [alumnos, daysInMonth, currentDate]);

  const handleAttendanceChange = (alumnoMatricula, dayIndex, value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [alumnoMatricula]: prevData[alumnoMatricula].map((att, i) => (i === dayIndex ? value : att)),
    }));
  };

  const handleActividadChange = (alumnoMatricula, dayIndex, value) => {
    setActividadData((prevData) => ({
      ...prevData,
      [alumnoMatricula]: prevData[alumnoMatricula].map((act, i) => (i === dayIndex ? value : act)),
    }));
  };

  const handleUpdateAttendance = async () => {
    try {
      for (let alumno of alumnos) {
        const matricula = alumno.matricula;
  
        for (let dayIndex = 0; dayIndex < daysInMonth.length; dayIndex++) {
          const attendanceType = attendanceData[matricula]?.[dayIndex];
          const actividadType = actividadData[matricula]?.[dayIndex];
          const diaDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), daysInMonth[dayIndex]);
          diaDate.setUTCHours(0, 0, 0, 0);
          const dia = diaDate.toISOString().split("T")[0] + "T00:00:00";
  
          const asistenciaKey = `${matricula}-${dia}`;
  
          if (attendanceType !== "N/A" || actividadType !== "N/A") {
            const existingRecord = existingRecords[asistenciaKey];
  
            // Preparar el objeto `asistenciaData` con el tipo de datos correctos
            const asistenciaData = {
              dia, // Fecha en formato adecuado
              alumno: matricula,
              clase: parseInt(claseId, 10), // Asegurarse de que es `int`
              parcial: parseInt(selectedParcial.clave, 10), // Asegurarse de que es `int`
              tipoAsistencia: attendanceType || null,
              tipoActividad: actividadType || null,
            };
  
            if (existingRecord) {
              const hasChanges =
                existingRecord.tipoAsistencia !== attendanceType ||
                existingRecord.tipoActividad !== actividadType;
  
              if (hasChanges) {
                console.log("Actualizando asistencia:", asistenciaData);
                await updateAsistencia(existingRecord.codigo, asistenciaData);
              }
            } else {
              console.log("Creando nueva asistencia:", asistenciaData);
              await createAsistencia(asistenciaData);
            }
          }
        }
      }
      alert("Asistencias actualizadas exitosamente.");
    } catch (error) {
      console.error("Error al actualizar asistencias:", error);
      alert("Hubo un error al actualizar las asistencias.");
    }
  };
  
  

  const calculateAttendanceCounts = (alumnoMatricula) => {
    const attendances = attendanceData[alumnoMatricula] || [];
    const activities = actividadData[alumnoMatricula] || [];
    const totalMarkedClasses = attendances.filter((att, index) => att !== "N/A" && activities[index] !== "N/A").length;

    return {
      ASIST: attendances.filter((att, index) => att === "A" && activities[index] !== "N/A").length,
      RET: attendances.filter((att, index) => att === "R" && activities[index] !== "N/A").length,
      JUST: attendances.filter((att, index) => att === "J" && activities[index] !== "N/A").length,
      INAS: attendances.filter((att, index) => att === "F" && activities[index] !== "N/A").length,
      total: `${totalMarkedClasses}/${totalMarkedClasses}`,
    };
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-max bg-white border table-fixed shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="w-32 py-2 px-4 border bg-blue-500 text-white sticky left-0 z-10">Alumno</th>
            {daysInMonth.map((day) => (
              <th key={day} className="py-2 px-4 border text-gray-400 bg-blue-100">{day}</th>
            ))}
            <th className="py-2 px-4 border text-gray-400 bg-blue-100">Total</th>
            <th className="py-2 px-4 border text-gray-400 bg-blue-100">ASIST</th>
            <th className="py-2 px-4 border text-gray-400 bg-blue-100">RET</th>
            <th className="py-2 px-4 border text-gray-400 bg-blue-100">JUST</th>
            <th className="py-2 px-4 border text-gray-400 bg-blue-100">INAS</th>
          </tr>
          <tr>
            <th className="py-2 px-4 border text-gray-700 bg-gray-200 sticky left-0 z-10">Actividad</th>
            {daysInMonth.map((_, dayIndex) => (
              <th key={`actividad-${dayIndex}`} className="py-2 px-4 border text-gray-400 bg-gray-100">
                <select
                  value={actividadData[alumnos[0]?.matricula]?.[dayIndex] || "N/A"}
                  onChange={(e) => handleActividadChange(alumnos[0]?.matricula, dayIndex, e.target.value)}
                  className="w-full px-2 py-1 border rounded-md text-gray-800"
                >
                  <option value="N/A">N/A</option>
                  {tipoActividades.map((tipo) => (
                    <option key={tipo.clave} value={tipo.clave}>
                      {tipo.clave}
                    </option>
                  ))}
                </select>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => {
            const attendanceCounts = calculateAttendanceCounts(alumno.matricula);

            return (
              <tr key={alumno.matricula} className="hover:bg-blue-50">
                <td className="py-2 px-4 border text-gray-700 bg-gray-50 sticky left-0 z-10">
                  {`${alumno.nomPila} ${alumno.apPat} ${alumno.apMat || ""}`}
                </td>
                {(attendanceData[alumno.matricula] || []).map((attendance, dayIndex) => (
                  <td key={dayIndex} className="py-2 px-4 border">
                    <select
                      value={attendance}
                      onChange={(e) => handleAttendanceChange(alumno.matricula, dayIndex, e.target.value)}
                      className="w-full px-2 py-1 border rounded-md text-gray-800"
                    >
                      <option value="N/A">N/A</option>
                      <option value="A">A</option>
                      <option value="R">R</option>
                      <option value="J">J</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                ))}
                <td className="py-2 px-4 border text-gray-700 bg-gray-50">{attendanceCounts.total}</td>
                <td className="py-2 px-4 border text-gray-700">{attendanceCounts.ASIST}</td>
                <td className="py-2 px-4 border text-gray-700">{attendanceCounts.RET}</td>
                <td className="py-2 px-4 border text-gray-700">{attendanceCounts.JUST}</td>
                <td className="py-2 px-4 border text-gray-700">{attendanceCounts.INAS}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={handleUpdateAttendance}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Actualizar
      </button>
    </div>
  );
};

export default AttendanceTable;
