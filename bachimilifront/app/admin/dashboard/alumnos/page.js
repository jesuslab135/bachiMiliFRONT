"use client";

import { useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabs from "@/app/components/admin/AdminTabs";
import AlumnoForm from "@/app/components/admin/forms/AlumnoForm";
import useAlumnoForm from "@/app/hooks/admin/useAlumnoForm";
import useFetchGrupos from "@/app/hooks/admin/useFetchGrupos";
import useSubmitAlumnoForm from "@/app/hooks/admin/useSubmitAlumnoForm";

export default function AlumnosPage() {
  const [activeTab, setActiveTab] = useState("alumnos");
  const { formData, handleChange, resetForm } = useAlumnoForm();
  const grupos = useFetchGrupos();
  const handleSubmit = useSubmitAlumnoForm(resetForm);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="p-4 flex-1 mt-16 ml-64 flex justify-center items-start">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <AlumnoForm
            formData={formData}
            grupos={grupos}
            handleChange={handleChange}
            handleSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData);
            }}
          />
        </div>
      </div>
    </div>
  );
}
