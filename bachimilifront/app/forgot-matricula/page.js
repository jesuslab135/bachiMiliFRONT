"use client";

import { useRouter } from "next/navigation";
import Image from "next/image"; // Para mostrar el logo
import Link from "next/link";

export default function ForgotMatriculaPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
    router.push("/login"); // Redirigir a la página de login
  };

  return (
    <div>
      {/* Barra superior */}
      <div className="bg-blue-500 py-2 px-6 flex items-center">
        <Link href="/login">
            <Image src="/logos/bachiller.png" alt="Logo" width={55} height={55} />
        </Link>
        <h1 className="text-white text-xl ml-4">Recuperar Matrícula</h1>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mt-8">
          <div className="mb-6">
            <p className="text-gray-600 text-sm">
              Ingresa tus datos personales para proceder con la recuperación de tu matrícula.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
