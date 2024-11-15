import React, { useState, useEffect } from "react";
import { getAsistencias, updateCalificacion } from "@/app/lib/fetchTestData";
import SuccessMessage from "../admin/messages/SuccessMessage"; // Asegúrate de importar el componente correctamente
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function StudentsTable({
  alumnos,
  criterios = [],
  selectedPeriodo,
  selectedParcial,
  selectedParcialDates,
  calificacionesData,
  updateCalificacionesData,
  claseId,
}) {
  const [examScores, setExamScores] = useState({});
  const [attendanceData, setAttendanceData] = useState({});
  const [parcialScores, setParcialScores] = useState({});
  const [criteriosHeaders, setCriteriosHeaders] = useState([]);
  const [showMessage, setShowMessage] = useState(false); // Estado para controlar el mensaje de éxito

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

  useEffect(() => {
    const headers = criterios.map((criterio) => criterio.tipo);
    setCriteriosHeaders(headers);
  }, [criterios, claseId]);

  const calculateCriterion = (alumnoMatricula, tipoActividad) => {
    const asistenciaAlumno = attendanceData[alumnoMatricula] || [];
    const criterio = criterios.find(
      (c) => c.tipo === tipoActividad && Number(c.clase) === Number(claseId) && Number(c.parcial) === Number(selectedParcial)
    );
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

  // Restaurar la función `getParcialScore` para obtener el valor guardado en el parcial
  const getParcialScore = (alumnoMatricula) => {
    const calificacion = calificacionesData.find((c) => c.alumno === alumnoMatricula);
    if (calificacion) {
      return calificacion[`parcial${selectedParcial}`] || "";
    }
    return "";
  };

  const calculateParcial = (alumnoMatricula, exScore) => {
    const totalScore = criteriosHeaders.reduce((acc, tipo) => {
      const criterionScore = parseFloat(calculateCriterion(alumnoMatricula, tipo)) || 0;
      return acc + criterionScore;
    }, exScore || 0);
    return totalScore.toFixed(2);
  };

  const handleExamScoreChange = (alumnoMatricula, newScore) => {
    setExamScores((prevScores) => {
      const updatedScores = { ...prevScores, [alumnoMatricula]: newScore };

      // Guardar la selección en localStorage para que persista
      const savedScores = JSON.parse(localStorage.getItem("examScores")) || {};
      savedScores[selectedParcial] = updatedScores;
      localStorage.setItem("examScores", JSON.stringify(savedScores));

      return updatedScores;
    });
    const newParcialScore = calculateParcial(alumnoMatricula, newScore);
    setParcialScores((prevScores) => ({
      ...prevScores,
      [alumnoMatricula]: newParcialScore,
    }));
  };

  useEffect(() => {
    // Cargar la selección guardada de examScores desde localStorage al cambiar de parcial
    const savedExamScores = JSON.parse(localStorage.getItem("examScores")) || {};
    setExamScores(savedExamScores[selectedParcial] || {});
  }, [selectedParcial]);

  const handleUpdateClick = async (alumnoMatricula) => {
    const exScore = examScores[alumnoMatricula] || 0;
    const newParcialScore = calculateParcial(alumnoMatricula, exScore);

    const calificacion = calificacionesData.find(
      (c) => c.alumno === alumnoMatricula
    );

    if (calificacion) {
      const updatedData = { clave: calificacion.clave };
      updatedData[`parcial${selectedParcial}`] = parseFloat(newParcialScore);

      try {
        const response = await updateCalificacion(calificacion.clave, updatedData);
        if (response && response.success) {
          updateCalificacionesData({
            ...calificacion,
            [`parcial${selectedParcial}`]: parseFloat(newParcialScore),
          });
          // Muestra el mensaje de éxito y ocúltalo después de 3 segundos
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 3000);
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

    const tableColumn = ["Alumno", ...criteriosHeaders, "Ex", `Parcial ${selectedParcial}`, "INAS"];
    const tableRows = [];

    alumnos.forEach((alumno) => {
      const rowData = [
        `${alumno.nomPila} ${alumno.apPat} ${alumno.apMat || ""}`,
        ...criteriosHeaders.map((tipo) => `${calculateCriterion(alumno.matricula, tipo)}%`),
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

  return (
    <div>
      <SuccessMessage showMessage={showMessage} />
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
            {criteriosHeaders.map((header, index) => (
              <th key={index} className="py-3 px-4 border text-center">
                {header}
              </th>
            ))}
            <th className="py-3 px-4 border text-center">Ex</th>
            <th className="py-3 px-4 border text-center">Parcial</th>
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
              {criteriosHeaders.map((header) => (
                <td key={header} className="py-3 px-4 border text-gray-500 text-center">
                  {calculateCriterion(alumno.matricula, header)}%
                </td>
              ))}
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
                {parcialScores[alumno.matricula] || getParcialScore(alumno.matricula)}
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
