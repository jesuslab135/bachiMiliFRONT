"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function TeacherSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [teacherName, setTeacherName] = useState(""); // Estado para almacenar el nombre del profesor
  const router = useRouter();

  useEffect(() => {
    // Recupera el nombre del profesor desde localStorage y actualiza el estado
    const storedTeacherName = localStorage.getItem("teacherName");
    if (storedTeacherName) {
      setTeacherName(storedTeacherName);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("teacherName"); // Elimina el nombre del profesor al cerrar sesión
    router.push("/"); // Redirecciona a la página de inicio de sesión
  };

  return (
    <div>
      {/* Barra superior */}
      <header className="bg-blue-500 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-50">
        <button onClick={toggleMenu} className="text-white focus:outline-none z-50">
          <i className="fas fa-bars fa-lg text-white"></i> {/* Icono de hamburguesa */}
        </button>

        {/* Logo centrado */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/profesor/dashboard/calificaciones">
            <Image src="/logos/bachiller.png" alt="Logo" width={55} height={55} />
          </Link>
        </div>

        {/* Nombre del Profesor */}
        <span className="text-white">{teacherName || "Profesor"}</span>
      </header>

      {/* Menú lateral deslizante */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-600 text-white shadow-lg z-40 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 1000 }}
      >
        {/* Botón de cerrar (X) */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white focus:outline-none z-50"
        >
          <i className="fas fa-times fa-lg"></i> {/* Icono de la "X" para cerrar el menú */}
        </button>

        <ul className="mt-16 space-y-4 p-4">
          <li>
            <Link href="/profesor/dashboard/calificaciones" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded">
              <i className="fas fa-box mr-4"></i> Calificaciones
            </Link>
          </li>
          <li>
            <Link href="/profesor/dashboard/configuraciones" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded">
              <i className="fas fa-cog mr-4"></i> Configuración
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center py-2 px-4 hover:bg-blue-700 rounded w-full text-left"
            >
              <i className="fas fa-sign-out-alt mr-4"></i> Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
