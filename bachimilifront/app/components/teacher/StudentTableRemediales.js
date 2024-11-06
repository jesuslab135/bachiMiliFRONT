export default function StudentTableRemediales({ alumnos, handleRemedialChange, handleUpdateAlumno }) {
  return (
    <table className="min-w-full bg-white border rounded-lg shadow-md">
      <thead>
        <tr>
          <th className="py-3 px-4 bg-blue-500 text-white border">Alumno</th>
          <th className="py-3 px-4 bg-blue-500 text-white border">Remedial 1</th>
          <th className="py-3 px-4 bg-blue-500 text-white border">Remedial 2</th>
          <th className="py-3 px-4 bg-blue-500 text-white border">Remedial 3</th>
          <th className="py-3 px-4 bg-blue-500 text-white border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((alumno) => (
          <tr key={alumno.matricula} className="hover:bg-blue-50">
            <td className="py-3 px-4 border text-gray-700">
              {`${alumno.nomPila} ${alumno.apPat} ${alumno.apMat || ""}`}
            </td>
            {["remedial1", "remedial2", "remedial3"].map((remedial) => (
              <td key={remedial} className="py-3 px-4 border">
                <select
                  className="w-full px-2 py-1 border rounded text-gray-800"
                  value={alumno[remedial] || ""}
                  onChange={(e) => handleRemedialChange(alumno, remedial, e.target.value)}
                  disabled={alumno[remedial] === null}
                >
                  <option value="">N/A</option>
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
                className={`bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 ${
                  alumno.remedial1 === null && alumno.remedial2 === null && alumno.remedial3 === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={alumno.remedial1 === null && alumno.remedial2 === null && alumno.remedial3 === null}
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
