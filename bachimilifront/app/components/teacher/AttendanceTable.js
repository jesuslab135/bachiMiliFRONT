import React from "react";

const AttendanceTable = ({ alumnos, attendanceData, daysInMonth, handleAttendanceChange, calculateTotalClasses }) => {
  return (
    <div className="overflow-auto">
      <table className="min-w-max bg-white border table-fixed shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="w-32 py-2 px-4 border bg-blue-500 text-white sticky left-0 z-10">Alumno</th>
            {daysInMonth.map((day) => (
              <th key={day} className="py-2 px-4 border text-gray-400 bg-blue-100">{day}</th>
            ))}
            <th className="py-2 px-4 border text-gray-400 bg-blue-100 sticky right-0 z-10">Total</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
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
                    <option value="P">P</option>
                    <option value="A">A</option>
                    <option value="J">J</option>
                  </select>
                </td>
              ))}
              <td className="py-2 px-4 border text-gray-700 bg-gray-50 sticky right-0 z-10">
                {calculateTotalClasses(alumno.matricula)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
