// app/lib/fetchTestData.js

const baseUrl = "http://localhost:5000/api"; // Reemplaza con la URL base de tu API

// Función genérica para realizar requests HTTP
async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error en ${endpoint}: ${response.statusText}`);
    }

    const text = await response.text(); // Obtiene la respuesta como texto primero
    return text ? JSON.parse(text) : {}; // Intenta convertir a JSON si no está vacío
  } catch (error) {
    console.error("Error en fetchApi:", error);
    return null;
  }
}

// Funciones específicas de cada entidad

// Actividades
export const getActividades = () => fetchApi("Actividades");
export const createActividad = (data) => fetchApi("Actividades", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getActividad = (id) => fetchApi(`Actividades/${id}`);
export const updateActividad = (id, data) => fetchApi(`Actividades/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deleteActividad = (id) => fetchApi(`Actividades/${id}`, { method: "DELETE" });

// AlumnoActividades
export const getAlumnoActividades = () => fetchApi("AlumnoActividades");
export const createAlumnoActividad = (data) => fetchApi("AlumnoActividades", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getAlumnoActividad = (id) => fetchApi(`AlumnoActividades/${id}`);
export const updateAlumnoActividad = (id, data) => fetchApi(`AlumnoActividades/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deleteAlumnoActividad = (id) => fetchApi(`AlumnoActividades/${id}`, { method: "DELETE" });

// Alumnos
export const getAlumnos = () => fetchApi("Alumnos");
export const createAlumno = (data) =>
  fetchApi("Alumnos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
export const getAlumno = (id) => fetchApi(`Alumnos/${id}`);
export const updateAlumno = (id, data) =>
  fetchApi(`Alumnos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  export const deleteAlumno = (id) => fetchApi(`Alumnos/${id}`, { method: "DELETE" });

// Asistencias
export const getAsistencias = () => fetchApi("Asistencias");
export const createAsistencia = (data) => fetchApi("Asistencias", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getAsistencia = (id) => fetchApi(`Asistencias/${id}`);
export const updateAsistencia = async (id, data) => {
  return fetchApi(`Asistencias/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...data, codigo: id }), // Agregar 'codigo' explícitamente
    headers: { "Content-Type": "application/json" },
  });
};


export const deleteAsistencia = (id) => fetchApi(`Asistencias/${id}`, { method: "DELETE" });

// Calificaciones
export const getCalificaciones = () => fetchApi("Calificaciones");
export const createCalificacion = (data) => fetchApi("Calificaciones", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getCalificacion = (id) => fetchApi(`Calificaciones/${id}`);
// Función de actualización para calificaciones
export const updateCalificacion = (id, data) =>
  fetchApi(`Calificaciones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteCalificacion = (id) => fetchApi(`Calificaciones/${id}`, { method: "DELETE" });

// Clases
export const getClases = () => fetchApi("Clases");
export const createClase = (data) => 
  fetchApi("Clases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
export const getClase = (id) => fetchApi(`Clases/${id}`);
export const updateClase = (id, data) => fetchApi(`Clases/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deleteClase = (id) => fetchApi(`Clases/${id}`, { method: "DELETE" });

// Criterios
export const getCriterios = () => fetchApi("Criterios");
export const createCriterio = (data) => fetchApi("Criterios", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getCriterio = (id) => fetchApi(`Criterios/${id}`);
export const updateCriterio = (id, data) => fetchApi(`Criterios/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deleteCriterio = (id) => fetchApi(`Criterios/${id}`, { method: "DELETE" });

// Docentes
export const getDocentes = () => fetchApi("Docentes");
export const getDocente = (id) => fetchApi(`Docentes/${id}`);
// fetchTestData.js
export const createDocente = (data) =>
  fetchApi("Docentes", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
export const updateDocente = (id, data) => fetchApi(`Docentes/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deleteDocente = (id) => fetchApi(`Docentes/${id}`, { method: "DELETE" });
export const loginDocente = (correo, contrasena) =>
  fetchApi(`Docentes/login?correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`);

// Grupos
export const getGrupos = () => fetchApi("Grupos");
export const createGrupo = (data) => fetchApi("Grupos", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getGrupo = (id) => fetchApi(`Grupos/${id}`);
export const updateGrupo = (id, data) => fetchApi(`Grupos/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deleteGrupo = (id) => fetchApi(`Grupos/${id}`, { method: "DELETE" });

// Materias
export const getMaterias = () => fetchApi("Materias");
export const createMateria = (data) => fetchApi("Materias", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getMateria = (id) => fetchApi(`Materias/${id}`);
export const updateMateria = (id, data) => fetchApi(`Materias/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deleteMateria = (id) => fetchApi(`Materias/${id}`, { method: "DELETE" });

// Parciales
export const getParciales = () => fetchApi("Parciales");
export const createParcial = (data) => fetchApi("Parciales", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getParcial = (id) => fetchApi(`Parciales/${id}`);
export const updateParcial = (id, data) => fetchApi(`Parciales/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deleteParcial = (id) => fetchApi(`Parciales/${id}`, { method: "DELETE" });

// Periodos
export const getPeriodos = () => fetchApi("Periodos");
export const createPeriodo = (data) => fetchApi("Periodos", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getPeriodo = (id) => fetchApi(`Periodos/${id}`);
export const updatePeriodo = (id, data) => fetchApi(`Periodos/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deletePeriodo = (id) => fetchApi(`Periodos/${id}`, { method: "DELETE" });

// TipoActividades
export const getTipoActividades = () => fetchApi("TipoActividades");
export const createTipoActividad = (data) => fetchApi("TipoActividades", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const getTipoActividad = (id) => fetchApi(`TipoActividades/${id}`);
export const updateTipoActividad = (id, data) => fetchApi(`TipoActividades/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
export const deleteTipoActividad = (id) => fetchApi(`TipoActividades/${id}`, { method: "DELETE" });
