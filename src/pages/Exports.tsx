import React, { useState } from "react";
import { exportMeasurements, exportAuditLogs } from "../services/exportService";
import styles from "./Exports.module.css";

const Exports: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const fromDate = "2026-01-01";
    const toDate = "2026-01-02";

    const handleExportCSV = async () => {
        setLoading(true);
        try {
            const res = await exportMeasurements(1, fromDate, toDate);
            window.open(res.download_url, "_blank");
        } catch (error) {
            console.error("Erreur export mesures CSV", error);
            alert("Erreur lors de l’export des mesures CSV");
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = async () => {
        setLoading(true);
        try {
            const res = await exportAuditLogs(fromDate, toDate);
            window.open(res.download_url, "_blank");
        } catch (error) {
            console.error("Erreur export audit PDF", error);
            alert("Erreur lors de l’export des logs audit");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Exports</h1>
            <button
                className={styles.button}
                onClick={handleExportCSV}
                disabled={loading}
            >
                Exporter mesures CSV
            </button>
            <button
                className={styles.button}
                onClick={handleExportPDF}
                disabled={loading}
            >
                Exporter audit PDF
            </button>
            {loading && <p>Export en cours…</p>}
        </div>
    );
};

export default Exports;
