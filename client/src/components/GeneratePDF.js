import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const GeneratePDF = ({ contentRef, buttonLabel }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    const content = contentRef.current;
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("generated_report.pdf");
    setIsGenerating(false);
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<FileDownloadIcon />}
      onClick={handleGeneratePDF}
      className="generate_report__button"
      sx={{
        mt: 2,
        textTransform: "none",
        fontSize: "14px",
        padding: "8px 20px",
        mb: 2,
        ml: 0.5,
      }}
    >
      {buttonLabel}
    </Button>
  );
};

export default GeneratePDF;

// <button
//     onClick={handleGeneratePDF}
//     style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: "8px",
//         padding: "8px 16px",
//         fontSize: "14px",
//         color: "#fff",
//         backgroundColor: "#007BFF",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//         transition: "background-color 0.3s ease",
//     }}
//     onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
//     onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
// >
//     <FileDownloadIcon style={{ fontSize: "18px" }} />
//     {buttonLabel}
// </button>
