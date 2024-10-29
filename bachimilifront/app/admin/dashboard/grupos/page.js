"use client";

import { useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTabs from "@/app/components/admin/AdminTabs";
import GrupoForm from "@/app/components/admin/forms/GrupoForm";
import useGrupoForm from "@/app/hooks/admin/useGrupoForm";
import useFetchPeriodos from "@/app/hooks/admin/useFetchPeriodos";
import useSubmitGrupoForm from "@/app/hooks/admin/useSubmitGrupoForm";

export default function GruposPage() {
  const [activeTab, setActiveTab] = useState("grupos");
  const { formData, handleChange, resetForm } = useGrupoForm();
  const periodos = useFetchPeriodos();
  const handleSubmit = useSubmitGrupoForm(resetForm);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="p-4 flex-1 mt-16 ml-64 flex justify-center items-start">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <GrupoForm
            formData={formData}
            periodos={periodos}
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
