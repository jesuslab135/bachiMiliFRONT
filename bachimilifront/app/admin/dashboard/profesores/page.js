"use client";

import { useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabs from "@/app/components/admin/AdminTabs";
import ProfesorForm from "@/app/components/admin/forms/ProfesorForm";
import useProfesorForm from "@/app/hooks/admin/useProfesorForm";
import useSubmitProfesorForm from "@/app/hooks/admin/useSubmitProfesorForm";

export default function ProfesoresPage() {
  const [activeTab, setActiveTab] = useState("profesores");
  const { formData, handleChange, resetForm } = useProfesorForm();
  const handleSubmit = useSubmitProfesorForm(resetForm);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="p-4 flex-1 mt-16 ml-64 flex justify-center items-start">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <ProfesorForm
            formData={formData}
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
