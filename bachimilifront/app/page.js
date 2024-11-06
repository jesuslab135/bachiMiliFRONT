"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { loginDocente } from "@/app/lib/fetchTestData";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = await loginDocente(email, password);
  
      if (user) {
        const nombreCompleto = `${user.nombrePila} ${user.apPat} ${user.apMat || ""}`.trim();
  
        if (user.matricula === "ADMIN001") {
          localStorage.setItem("adminName", nombreCompleto);
          router.push("/admin/dashboard/registros/alumnos");
        } else {
          localStorage.setItem("teacherName", nombreCompleto);
          localStorage.setItem("docenteId", user.matricula);
          router.push("/profesor/dashboard/calificaciones");
        }
      } else {
        alert("Usuario no reconocido o contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      alert("Hubo un problema al intentar iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-6 text-center">
          <Image 
            src="/logos/bachiller.png" 
            alt="Logo Bachiller"
            width={200} 
            height={100} 
            className="mx-auto"
          />
          <p className="text-sm text-gray-600 mt-4">
            Con la finalidad de brindar herramientas útiles a la comunidad estudiantil,
            Bachillerato General Militarizado pone a tu disposición las calificaciones y el
            llenado de formatos requeridos durante tu estancia en la preparatoria.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          <p>
            ¿No puede iniciar sesión?{" "}
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Haz click aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
