"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState(""); // Estado para el nombre del admin
  const router = useRouter();

  useEffect(() => {
    // Obtén el nombre del admin desde localStorage y guárdalo en el estado
    const name = localStorage.getItem("adminName");
    if (name) {
      setAdminName(name);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminName"); // Remueve el nombre del admin al cerrar sesión
    router.push("/"); // Redirecciona a la página de login
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
          <Link href="/admin/dashboard/registros/alumnos">
            <Image src="/logos/bachiller.png" alt="Admin Logo" width={55} height={55} />
          </Link>
        </div>

        {/* Nombre del Admin */}
        <span className="text-white">{adminName || "Admin"}</span>
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
            <Link href="/admin/dashboard/alumnos" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded">
              <i className="fas fa-wrench mr-4"></i> Administración
            </Link>
          </li>
          <li>
            <Link href="/admin/dashboard/registros/alumnos" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded">
              <i className="fas fa-file-alt mr-4"></i> Registros
            </Link>
          </li>
          <li>
            <Link href="/admin/dashboard/configuraciones" className="flex items-center py-2 px-4 hover:bg-blue-700 rounded">
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
