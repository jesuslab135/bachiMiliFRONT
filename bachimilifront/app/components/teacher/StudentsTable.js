import React, { useState, useEffect } from "react";
import { getAsistencias, updateCalificacion } from "@/app/lib/fetchTestData";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function StudentsTable({
  alumnos,
  criterios,
  selectedPeriodo, // <-- Añadir selectedPeriodo como prop
  selectedParcial,
  selectedParcialDates,
  calificacionesData,
  updateCalificacionesData,
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

    const asistenciaValida = asistenciaAlumno.filter((asistencia) => {
      const fechaAsistencia = new Date(asistencia.dia);
      return (
        asistencia.tipoActividad === tipoActividad &&
        ["A", "R", "J"].includes(asistencia.tipoAsistencia) &&
        fechaAsistencia >= selectedParcialDates.fechaInicio &&
        fechaAsistencia <= selectedParcialDates.fechaCierre
      );
    });

    const totalActividad = asistenciaAlumno.filter(
      (asistencia) =>
        asistencia.tipoActividad === tipoActividad &&
        new Date(asistencia.dia) >= selectedParcialDates.fechaInicio &&
        new Date(asistencia.dia) <= selectedParcialDates.fechaCierre
    ).length;

    return totalActividad > 0
      ? ((asistenciaValida.length / totalActividad) * valorPorcentaje).toFixed(2)
      : "0.00";
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

  const handleExamScoreChange = (alumnoMatricula, newScore) => {
    setExamScores((prevScores) => ({ ...prevScores, [alumnoMatricula]: newScore }));
    const newParcialScore = calculateParcial(alumnoMatricula, newScore);
    setParcialScores((prevScores) => ({
      ...prevScores,
      [alumnoMatricula]: newParcialScore,
    }));
  };

  const handleUpdateClick = async (alumnoMatricula) => {
    const exScore = examScores[alumnoMatricula] || 0;
    const newParcialScore = calculateParcial(alumnoMatricula, exScore);
  
    const calificacion = calificacionesData.find(
      (c) => c.alumno === alumnoMatricula
    );
  
    if (calificacion) {
      const updatedData = { clave: calificacion.clave };
      updatedData[`parcial${selectedParcial}`] = parseFloat(newParcialScore);
  
      console.log("Datos antes de actualizar en la base de datos:", updatedData);
  
      try {
        const response = await updateCalificacion(calificacion.clave, updatedData);
        console.log("Respuesta de la API:", response);
  
        if (response && response.success) {
          updateCalificacionesData({
            ...calificacion,
            [`parcial${selectedParcial}`]: parseFloat(newParcialScore),
          });
          console.log("Calificación actualizada exitosamente en la base de datos.");
        } else {
          console.warn("La actualización no fue exitosa:", response.message || response);
        }
      } catch (error) {
        console.error("Error al actualizar la calificación:", error);
      }
    } else {
      console.warn("No se encontró una calificación para este alumno.");
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Calificaciones", 14, 22);
    doc.setFontSize(12);
    doc.text(`Parcial ${selectedParcial}`, 14, 30);

    const tableColumn = ["Alumno", "TA", "TE", "TI", "Ex", `Parcial ${selectedParcial}`, "INAS"];
    const tableRows = [];

    alumnos.forEach((alumno) => {
      const rowData = [
        `${alumno.nomPila} ${alumno.apPat} ${alumno.apMat || ""}`,
        `${calculateTA(alumno.matricula)}%`,
        `${calculateTE(alumno.matricula)}%`,
        `${calculateTI(alumno.matricula)}%`,
        examScores[alumno.matricula] || "Selec",
        parcialScores[alumno.matricula] || calculateParcial(alumno.matricula, examScores[alumno.matricula] || 0),
        `${calculateInasPercentage(alumno.matricula)}%`,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      startY: 40,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("reporte_calificaciones.pdf");
  };

  // Condición para mostrar la tabla solo si selectedPeriodo y selectedParcial están definidos
  if (!selectedPeriodo || !selectedParcial) {
    return <div className="text-gray-500">Por favor, selecciona un periodo y un parcial para ver la lista de alumnos.</div>;
  }

  return (
    <div>
      <button
        onClick={handleGeneratePDF}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generar PDF
      </button>

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
                  onClick={() => handleUpdateClick(alumno.matricula)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
