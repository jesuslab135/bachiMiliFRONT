import Link from "next/link";

export default function AdminTabs({ activeTab, setActiveTab }) {
  return (
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
  );
}
