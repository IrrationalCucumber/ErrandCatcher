import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const GeneratePDF = ({ contentRef, buttonLabel }) => {
    const handleGeneratePDF = async () => {
        const content = contentRef.current;
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("generated_report.pdf");
    };

    return (
        <button onClick={handleGeneratePDF} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}>
            {buttonLabel}
        </button>
    );
};

export default GeneratePDF;
