"use client";

import { useState, useEffect } from "react";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import { getDocente, updateDocente } from "@/app/lib/fetchTestData";

export default function ConfiguracionesPage() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    async function loadTeacherData() {
      const docenteId = localStorage.getItem("docenteId"); // Obtener el ID del docente
      if (docenteId) {
        const docente = await getDocente(docenteId);
        setTeacherData(docente);
      }
    }
    loadTeacherData();
  }, []);

  const openChangePasswordModal = () => setShowChangePasswordModal(true);
  const closeChangePasswordModal = () => setShowChangePasswordModal(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await updateDocente(teacherData.matricula, {
        ...teacherData,
        contrasena: newPassword,
      });
      if (response) {
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
    } finally {
      closeChangePasswordModal();
    }
  };

  const closeConfirmationModal = () => setShowConfirmationModal(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar />

      <div className="p-4 flex-1 mt-16 ml-64">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-500">Configuraciones</h2>
          
          {teacherData && (
            <div className="bg-white border border-gray-200 p-4 rounded-lg text-gray-500">
              <h3 className="text-xl font-semibold mb-4">Usuario</h3>
              <p className="text-gray-800"><strong>Usuario:</strong> {teacherData.matricula}</p>
              <p className="text-gray-800 mb-4"><strong>Cuenta institucional:</strong> {teacherData.correo}</p>
              <button
                onClick={openChangePasswordModal}
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
              >
                Cambiar Contraseña
              </button>
            </div>
          )}
        </div>
      </div>

      {showChangePasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-500">
            <h3 className="text-2xl font-semibold mb-6 ">Cambiar contraseña</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Nueva Contraseña</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeChangePasswordModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                >
                  Cambiar contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-gray-500">
            <h3 className="text-xl font-semibold mb-4">Contraseña actualizada</h3>
            <div className="flex items-center mb-4">
              <i className="fas fa-check-circle text-green-500 text-2xl mr-2"></i>
              <p className="text-gray-700">Contraseña actualizada exitosamente</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeConfirmationModal}
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
