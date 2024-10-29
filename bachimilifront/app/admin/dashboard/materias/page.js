"use client";

import { useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabs from "@/app/components/admin/AdminTabs";
import MateriaForm from "@/app/components/admin/forms/MateriaForm";
import useMateriaForm from "@/app/hooks/admin/useMateriaForm";
import useSubmitMateriaForm from "@/app/hooks/admin/useSubmitMateriaForm";

export default function MateriasPage() {
  const [activeTab, setActiveTab] = useState("materias");
  const { formData, handleChange, resetForm } = useMateriaForm();
  const handleSubmit = useSubmitMateriaForm(resetForm);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="p-4 flex-1 mt-16 ml-64 flex justify-center items-start">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <MateriaForm
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
