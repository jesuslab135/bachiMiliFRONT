// app/hooks/teacher/pdfUtils.js

import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (materiaNombre, grupoNombre, alumnos) => {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`${materiaNombre} - ${grupoNombre} - Reporte de Calificaciones`, 10, 10);

  const tableColumn = [
    "Alumno",
    "Parcial 1",
    "Parcial 2",
    "Parcial 3",
    "Remedial 1",
    "Remedial 2",
    "Remedial 3",
    "Extraordinario"
  ];

  const tableRows = alumnos.map((alumno) => [
    `${alumno.nomPila} ${alumno.apPat} ${alumno.apMat || ""}`,
    alumno.parcial1 || "",
    alumno.parcial2 || "",
    alumno.parcial3 || "",
    alumno.remedial1 || "",
    alumno.remedial2 || "",
    alumno.remedial3 || "",
    alumno.extraordinario || "",
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 4,
      valign: "middle",
      halign: "center",
      lineColor: [44, 62, 80],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [34, 167, 240],
      textColor: 255,
      fontSize: 8,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [232, 243, 255],
    },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 18 },
      2: { cellWidth: 18 },
      3: { cellWidth: 18 },
      4: { cellWidth: 18 },
      5: { cellWidth: 18 },
      6: { cellWidth: 18 },
      7: { cellWidth: 25 },
    },
    didDrawPage: (data) => {
      if (data.pageNumber > 1) {
        doc.setFontSize(14);
        doc.text(`${materiaNombre} - ${grupoNombre} - Reporte de Calificaciones`, 10, 10);
      }
    },
    margin: { top: 30 },
    pageBreak: "auto",
  });

  doc.save("reporte_calificaciones.pdf");
};
