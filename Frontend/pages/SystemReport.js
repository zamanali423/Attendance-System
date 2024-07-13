import React, { useState } from "react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SystemReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState([]);

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/admin/generateReport?from=${fromDate}&to=${toDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReportData(data);
        toast.success("Report generated successfully!");
      } else {
        toast.error("Failed to generate report");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Error generating report");
    }
  };

  //! convert pdf
  const downloadPDF = () => {
    const input = document.getElementById("reportTable");
    if (!input) {
      console.error("Element not found");
      return;
    }

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10);
        pdf.save("report.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className="container mt-3 main">
      <h2>Generate Attendance Report</h2>
      <form className="mt-4 form" onSubmit={handleGenerateReport}>
        <div className="from">
          <label className="label">From Date:</label>
          <input
            className="input"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
        </div>
        <div className="mt-3 to">
          <label className="label">To Date:</label>
          <input
            className="input"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>
        <button className="mt-3 submit" type="submit">
          Generate Report
        </button>
      </form>

      {reportData.length > 0 && (
        <div className="reportMain">
          <h3>Report Data:</h3>
          <table id="reportTable" className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((record, index) => (
                <tr key={index}>
                  <td>{new Date(record.date).toISOString().slice(0, 10)}</td>
                  <td>{record.fullName}</td>
                  <td>{record.status ? record.status : "Leave"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-3 download" onClick={downloadPDF}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default SystemReport;
