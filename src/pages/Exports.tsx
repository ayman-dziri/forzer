import React from "react";
import { exportMeasurements, exportAuditLogs } from "../services/exportService";

const Exports: React.FC = () => {
    const fromDate = "2026-01-01";
    const toDate = "2026-01-02";

    const handleExportCSV = async () => {
        try {
            const res = await exportMeasurements(1, fromDate, toDate);
            window.open(res.download_url, "_blank");
        } catch (error) {
            console.error("Erreur export mesures CSV", error);
        }
    };

    const handleExportPDF = async () => {
        try {
            const res = await exportAuditLogs(fromDate, toDate);
            window.open(res.download_url, "_blank");
        } catch (error) {
            console.error("Erreur export audit PDF", error);
        }
    };

    return (
        <div>
            <h1>Exports</h1>
            <button onClick={handleExportCSV}>Exporter mesures CSV</button>
            <button onClick={handleExportPDF}>Exporter audit PDF</button>
        </div>
    );
};

export default Exports;
