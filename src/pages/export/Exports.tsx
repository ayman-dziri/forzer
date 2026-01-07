// src/pages/export/Exports.tsx
import React, {useEffect, useState} from "react";
import { exportMeasurementsPdf} from "../../services/exportService";
import styles from "./Exports.module.css";
import {Sensor} from "../../models/Sensor";
import {getSensors} from "../../services/sensorService";

const Exports: React.FC = () => {
    const [loading] = useState(false);
    const [fromDate, setFromDate] = useState(""); // début intervalle
    const [toDate, setToDate] = useState("");     // fin intervalle
    const [selectedSensorId, setSelectedSensorId] = useState<number | null>(null);
    const [sensors, setSensors] = useState<Sensor[]>([]);


    useEffect(() => {
        const fetchSensors = async () => {
            try {
                const data = await getSensors();
                setSensors(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des capteurs", error);
            }
        };

        fetchSensors();
    }, []);


    const handleExportMeasurementsPDF = async () => {
        if (!selectedSensorId) {
            alert("Veuillez sélectionner un capteur");
            return;
        }

        try {
            const blob = await exportMeasurementsPdf(selectedSensorId);

            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank");
        } catch (error) {
            console.error("Erreur export PDF measurements", error);
            alert("Erreur lors de l’export PDF");
        }
    };





    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Exports Audit PDF</h1>

            <div className={styles.dateInputs}>
                <label>
                    Date de début :
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </label>

                <label>
                    Date de fin :
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </label>
            </div>

            <div className={styles.selector}>
                <label>Choisir un capteur : </label>
                <select
                    value={selectedSensorId || ""}
                    onChange={(e) => setSelectedSensorId(Number(e.target.value))}
                >
                    <option value="" disabled>
                        -- Sélectionnez un capteur --
                    </option>
                    {sensors.map((sensor) => (
                        <option key={sensor.id} value={sensor.id}>
                            {sensor.name}
                        </option>
                    ))}
                </select>
            </div>



            <button
                className={styles.button}
                onClick={handleExportMeasurementsPDF}
                disabled={loading}
            >
                {loading ? "Export en cours…" : "Exporter PDF"}
            </button>

        </div>
    );
};

export default Exports;
