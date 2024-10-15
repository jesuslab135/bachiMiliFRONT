"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProfesoresPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profesores");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [formData, setFormData] = useState({
    nombrePila: "",
    apPat: "",
    apMat: "",
    correo: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/admin/dashboard/profesores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profesor registrado exitosamente");
        setFormData({
          nombrePila: "",
          apPat: "",
          apMat: "",
          correo: "",
          contrasena: "",
        });
      } else {
        alert("Error al registrar el profesor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior */}
      <header className="bg-blue-500 p-4 flex justify-between items-center relative">
        <button onClick={toggleMenu} className="text-white focus:outline-none z-50">
          {isMenuOpen ? (
            <i className="fas fa-times fa text-white"></i>
          ) : (
            <i className="fas fa-bars fa text-white"></i>
          )}
        </button>

        {/* Logo centrado */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/admin/dashboard/alumnos">
            <Image src="/logos/bachiller.png" alt="Logo" width={55} height={55} />
          </Link>
        </div>

        {/* Nombre de Admin */}
        <span className="text-white">Nombre de Admin</span>
      </header>

      {/* Menú lateral deslizante */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-blue-600 text-white shadow-lg z-40 transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="mt-10 space-y-4 p-4">
          <li>
            <Link href="/admin/dashboard" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded">
              <i className="fas fa-tools mr-4"></i> Administración
            </Link>
          </li>
          <li>
            <Link href="/admin/dashboard/registros" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded">
              <i className="fas fa-file-alt mr-4"></i> Registros
            </Link>
          </li>
          <li>
            <Link href="/admin/dashboard/configuracion" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded">
              <i className="fas fa-cog mr-4"></i> Configuración
            </Link>
          </li>
          <li>
            <Link href="/logout" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded">
              <i className="fas fa-sign-out-alt mr-4"></i> Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>

      {/* Contenido del formulario */}
      <div className="p-4">
        <div className="bg-white p-4 rounded-lg shadow-md max-w-4xl mx-auto">
          {/* Sección de Tabs */}
          <nav className="mb-6">
            <ul className="flex space-x-4 justify-center border-b-2 pb-2">
              <li>
                <Link href="/admin/dashboard/alumnos">
                  <button
                    onClick={() => setActiveTab("alumnos")}
                    className={`px-4 py-2 rounded-t-md shadow-sm ${
                      activeTab === "alumnos" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Alumnos
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard/materias">
                  <button
                    onClick={() => setActiveTab("materias")}
                    className={`px-4 py-2 rounded-t-md shadow-sm ${
                      activeTab === "materias" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Materias
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard/profesores">
                  <button
                    onClick={() => setActiveTab("profesores")}
                    className={`px-4 py-2 rounded-t-md shadow-sm ${
                      activeTab === "profesores" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Profesores
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard/grupos">
                  <button
                    onClick={() => setActiveTab("grupos")}
                    className={`px-4 py-2 rounded-t-md shadow-sm ${
                      activeTab === "grupos" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Grupos
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard/clases">
                  <button
                    onClick={() => setActiveTab("clases")}
                    className={`px-4 py-2 rounded-t-md shadow-sm ${
                      activeTab === "clases" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Clases
                  </button>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Formulario para agregar profesores */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl mb-4 text-gray-700">Profesores</h2>
            <div>
              <label htmlFor="nombrePila" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="nombrePila"
                name="nombrePila"
                type="text"
                value={formData.nombrePila}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                placeholder="Nombre del profesor"
              />
            </div>
            <div>
              <label htmlFor="apPat" className="block text-sm font-medium text-gray-700">
                Apellido Paterno
              </label>
              <input
                id="apPat"
                name="apPat"
                type="text"
                value={formData.apPat}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                placeholder="Apellido Paterno"
              />
            </div>
            <div>
              <label htmlFor="apMat" className="block text-sm font-medium text-gray-700">
                Apellido Materno
              </label>
              <input
                id="apMat"
                name="apMat"
                type="text"
                value={formData.apMat}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                placeholder="Apellido Materno"
              />
            </div>
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                placeholder="Correo"
              />
            </div>
            <div>
              <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="contrasena"
                name="contrasena"
                type="password"
                value={formData.contrasena}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                placeholder="Contraseña"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
              >
                Añadir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
