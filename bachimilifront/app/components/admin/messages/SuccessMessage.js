"use client";

export default function SuccessMessage({ showMessage }) {
  if (!showMessage) return null;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-md z-50">
      Actualizado exitosamente
    </div>
  );
}
