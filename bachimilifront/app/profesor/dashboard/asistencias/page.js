"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TeacherSidebar from "@/app/components/teacher/TeacherSidebar";
import useFetchAttendanceData from "@/app/hooks/teacher/useFetchAttendanceData";
import AttendanceNav from "@/app/components/teacher/AttendanceNav";
import MonthNavigator from "@/app/components/teacher/MonthNavigator";
import AttendanceTable from "@/app/components/teacher/AttendanceTable";

export default function AsistenciasPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const claseId = searchParams.get("clase");

  const {
    materiaNombre,
    grupoNombre,
    alumnos,
    attendanceData,
    setAttendanceData,
    daysInMonth,
  } = useFetchAttendanceData(claseId);

  const [activeTab, setActiveTab] = useState("asistencias");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const handleAttendanceChange = (alumnoMatricula, dayIndex, value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [alumnoMatricula]: prevData[alumnoMatricula].map((att, i) => (i === dayIndex ? value : att)),
    }));
  };

  const calculateTotalClasses = (alumnoMatricula) => {
    const totalEffectiveClasses = attendanceData[alumnoMatricula]?.filter((att) => att !== "N/A").length || 0;
    return `${totalEffectiveClasses}/${totalEffectiveClasses}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherSidebar />
      <div className="p-4 flex-1 mt-16 ml-64">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              {materiaNombre} - {grupoNombre} - Asistencias
            </h3>
          </div>
          <AttendanceNav activeTab={activeTab} setActiveTab={setActiveTab} router={router} claseId={claseId} />
          <MonthNavigator currentDate={currentDate} handlePreviousMonth={handlePreviousMonth} handleNextMonth={handleNextMonth} />
          <AttendanceTable
            alumnos={alumnos}
            attendanceData={attendanceData}
            daysInMonth={daysInMonth}
            handleAttendanceChange={handleAttendanceChange}
            calculateTotalClasses={calculateTotalClasses}
          />
        </div>
      </div>
    </div>
  );
}
