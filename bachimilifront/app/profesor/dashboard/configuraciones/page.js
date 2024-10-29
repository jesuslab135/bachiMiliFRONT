"use client";

import { useState } from "react";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar"; // Importamos el TeacherSidebar para el menú deslizante

export default function ConfiguracionesPage() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openChangePasswordModal = () => setShowChangePasswordModal(true);
  const closeChangePasswordModal = () => setShowChangePasswordModal(false);
  
  const handlePasswordChange = (e) => {
    e.preventDefault();
    closeChangePasswordModal();
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => setShowConfirmationModal(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar /> {/* Incluimos el menú deslizante */}

      {/* Contenido principal */}
      <div className="p-4 flex-1 mt-16 ml-64"> {/* mt-16 y ml-64 para espacio con sidebar */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
          {/* Título de la página */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-500">Configuraciones</h2>

          {/* Mensaje de información */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6 flex items-start">
            <i className="fas fa-info-circle text-gray-600 text-2xl mr-4"></i>
            <div>
              <h3 className="font-semibold text-gray-700">Información importante</h3>
              <p className="text-gray-600">
                Recuerda que los cambios realizados en esta sección, solo deben ser realizados por el propietario de esta cuenta.
              </p>
            </div>
          </div>

          {/* Información de usuario */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg text-gray-500">
            <h3 className="text-xl font-semibold mb-4">Usuario</h3>
            <p className="text-gray-800"><strong>Usuario:</strong> 0322103778</p>
            <p className="text-gray-800 mb-4"><strong>Cuenta institucional:</strong> 0322103778@ut-tijuana.edu.mx</p>
            <button
              onClick={openChangePasswordModal}
              className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Cambiar Contraseña */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-500">
            <h3 className="text-2xl font-semibold mb-6 ">Cambiar contraseña</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Confirmar contraseña</label>
                <input
                  type="password"
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

      {/* Modal de Confirmación */}
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
