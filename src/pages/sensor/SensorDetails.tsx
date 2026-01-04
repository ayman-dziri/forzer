import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sensor } from "../../models/Sensor";
import { Measurement } from "../../models/Measurement";
import { getLatestMeasurement } from "../../services/measurementService";
import {getSensorById} from "../../services/sensorService";
import LatestMeasurement from "../../components/measurement/LatestMeasurement";
import MeasurementTable from "../../components/measurement/MeasurementTable";
import styles from "./SensorDetails.module.css";

const SensorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const sensorId = Number(id);
    const [sensor, setSensor] = useState<Sensor | null>(null);
    const [latest, setLatest] = useState<Measurement | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getSensorById(sensorId)
            .then(setSensor)
            .catch(() => setSensor(null))
            .finally(() => setLoading(false));

        getLatestMeasurement(sensorId)
            .then(setLatest)
            .catch(() => setLatest(null));
    }, [sensorId]);

    if (loading) return <p>Chargement du capteur...</p>;



    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Détails du capteur</h1>

            {sensor ? (
                <>
                    <div className={styles.sensorInfo}>
                        <h2>{sensor.name}</h2>
                        <p className={styles.attribute}>📍 Location : {sensor.location}</p>

                        <p className={styles.info}>
                            🔌{" "}
                            <span
                                className={`${styles.status} ${
                                    sensor.is_active ? styles.active : styles.inactive
                                }`}
                            >
                                {sensor.is_active ? "ONLINE" : "OFFLINE"}
                            </span>
                        </p>

                        {sensor.last_seen_at && (
                            <p className={styles.attribute}>
                                ⏱ Dernière activité :{" "}
                                {new Date(sensor.last_seen_at).toLocaleString()}
                            </p>
                        )}

                        <p className={styles.info}>
                            🌡 {sensor.temp_min}°C – {sensor.temp_max}°C
                        </p>

                        <p className={styles.info}>
                            💧 {sensor.hum_min}% – {sensor.hum_max}%
                        </p>

                    </div>

                    <div className={styles.section}>
                        <LatestMeasurement measurement={latest} />
                    </div>

                    <div className={styles.section}>
                        <MeasurementTable sensorId={sensorId} />
                    </div>
                </>
            ) : (
                <p>Capteur introuvable.</p>
            )}
        </div>
    );
};

export default SensorDetails;
