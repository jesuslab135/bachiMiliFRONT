"use client";

import Link from "next/link";

export default function AdminTabsRegistros({ activeTab }) {
  const tabs = [
    { name: "Alumnos", id: "alumnos", href: "/admin/dashboard/registros/alumnos" },
    { name: "Profesores", id: "profesores", href: "/admin/dashboard/registros/profesores" },
    { name: "Clases", id: "clases", href: "/admin/dashboard/registros/clases" },
    { name: "Grupos", id: "grupos", href: "/admin/dashboard/registros/grupos" },
    { name: "Materias", id: "materias", href: "/admin/dashboard/registros/materias" },
  ];

  return (
    <nav className="mb-6">
      <ul className="flex space-x-4 justify-center border-b-2 pb-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link href={tab.href} legacyBehavior>
              <button
                className={`px-4 py-2 rounded-t-md shadow-sm ${
                  activeTab === tab.id ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.name}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
