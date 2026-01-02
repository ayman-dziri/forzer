import { useEffect, useState } from "react";
import { Measurement } from "../../models/Measurement";
import { getLatestMeasurement } from "../../services/MeasurementService";

interface Props {
    sensorId: number;
}

export default function LatestMeasurement({ sensorId }: Props) {
    const [measurement, setMeasurement] = useState<Measurement | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getLatestMeasurement(sensorId)
            .then(setMeasurement)
            .finally(() => setLoading(false));
    }, [sensorId]);

    if (loading) return <p>Chargement...</p>;
    if (!measurement) return <p>Aucune mesure</p>;

    return (
        <div style={{ border: "1px solid #ccc", padding: 16 }}>
            <h4>📡 Dernière mesure</h4>

            <p>
                🌡 Température : <strong>{measurement.temperature} °C</strong>
            </p>

            <p>
                💧 Humidité : <strong>{measurement.humidity} %</strong>
            </p>

            <p>
                📊 Statut :
                <strong
                    style={{
                        color: measurement.status === "OK" ? "green" : "red",
                        marginLeft: 6,
                    }}
                >
                    {measurement.status}
                </strong>
            </p>

            <small>
                ⏱ Capturée le :{" "}
                {new Date(measurement.captured_at).toLocaleString()}
            </small>
        </div>
    );
}
