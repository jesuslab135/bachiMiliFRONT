"use client";

import { useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabs from "@/app/components/admin/AdminTabs";
import ClaseForm from "@/app/components/admin/forms/ClaseForm";
import useClaseForm from "@/app/hooks/admin/useClaseForm";
import useFetchClaseData from "@/app/hooks/admin/useFetchClaseData";
import useSubmitClaseForm from "@/app/hooks/admin/useSubmitClaseForm";

export default function ClasesPage() {
  const [activeTab, setActiveTab] = useState("clases");
  const { formData, handleChange, resetForm } = useClaseForm();
  const { materias, docentes, grupos } = useFetchClaseData();
  const handleSubmit = useSubmitClaseForm(resetForm);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="p-4 flex-1 mt-16 ml-64 flex justify-center items-start">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <ClaseForm
            formData={formData}
            materias={materias}
            docentes={docentes}
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
