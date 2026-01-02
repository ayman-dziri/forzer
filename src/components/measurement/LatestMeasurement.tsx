import { useEffect, useState } from "react";
import { Measurement } from "../../models/Measurement";
import { getLatestMeasurement } from "../../services/measurementService";

interface Props {
    measurement: Measurement | null;
}

export default function LatestMeasurement({ measurement }: Props) {
    if (!measurement) return <p>Aucune mesure</p>;

    return (
        <div style={{ border: "1px solid #ccc", padding: 16 }}>
            <h4>📡 Dernière mesure</h4>
            <p>🌡 Température : <strong>{measurement.temperature} °C</strong></p>
            <p>💧 Humidité : <strong>{measurement.humidity} %</strong></p>
            <p>
                📊 Statut :{" "}
                <strong style={{ color: measurement.status === "OK" ? "green" : "red" }}>
                    {measurement.status}
                </strong>
            </p>
            <small>⏱ Capturée le : {new Date(measurement.captured_at).toLocaleString()}</small>
        </div>
    );
}
