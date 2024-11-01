// StudentsTable.js
import React from "react";

export default function StudentsTable({ alumnos, setAlumnos, handleCalificacionChange, handleUpdateAlumno }) {
  return (
    <table className="min-w-full bg-white border rounded-lg shadow-md">
      <thead>
        <tr>
          <th className="py-3 px-4 bg-blue-500 text-white border">Alumno</th>
          <th className="py-3 px-4 bg-blue-500 text-white border">Parcial 1</th>
          <th className="py-3 px-4 bg-blue-500 text-white border">Parcial 2</th>
          <th className="py-3 px-4 bg-blue-500 text-white border">Parcial 3</th>
          <th className="py-3 px-4 bg-blue-500 text-white border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((alumno) => (
          <tr key={alumno.matricula} className="hover:bg-blue-50">
            <td className="py-3 px-4 border text-gray-700">
              {`${alumno.nomPila} ${alumno.apPat} ${alumno.apMat || ""}`}
            </td>
            {["parcial1", "parcial2", "parcial3"].map((parcial) => (
              <td key={parcial} className="py-3 px-4 border">
                <select
                  className="w-full px-2 py-1 border rounded text-gray-800"
                  value={alumno[parcial]}
                  onChange={(e) => handleCalificacionChange(alumno, parcial, e.target.value)}
                >
                  {[5, 6, 7, 8, 9, 10].map((score) => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
              </td>
            ))}
            <td className="py-3 px-4 border">
              <button
                type="button"
                onClick={() => handleUpdateAlumno(alumno)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600"
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
