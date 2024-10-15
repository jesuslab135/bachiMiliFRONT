// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Bienvenido a la App</h1>
      <Link href="/login" className="mt-4 text-indigo-600">
        Ir a la página de Login
      </Link>
    </div>
  );
}
