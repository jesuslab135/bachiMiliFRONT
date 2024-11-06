import React from "react";

const MonthNavigator = ({ currentDate, handlePreviousMonth, handleNextMonth }) => {
  return (
    <div className="flex justify-between mb-4">
      <button onClick={handlePreviousMonth} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600">
        Mes Anterior
      </button>
      <h2 className="text-lg text-gray-400 font-medium">
        {currentDate.toLocaleString("es-ES", { month: "long" })} {currentDate.getFullYear()}
      </h2>
      <button onClick={handleNextMonth} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600">
        Mes Siguiente
      </button>
    </div>
  );
};

export default MonthNavigator;
