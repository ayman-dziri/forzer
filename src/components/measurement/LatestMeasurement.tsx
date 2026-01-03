import { Measurement } from "../../models/Measurement";
import styles from "./LatestMeasurement.module.css";

interface Props {
    measurement: Measurement | null;
}

export default function LatestMeasurement({ measurement }: Props) {
    if (!measurement) {
        return <p className={styles.empty}>Aucune mesure disponible</p>;
    }

    return (
        <div className={styles.card}>
            <h4 className={styles.title}>📡 Dernière mesure</h4>

            <p className={styles.row}>
                🌡 Température : <strong>{measurement.temperature} °C</strong>
            </p>

            <p className={styles.row}>
                💧 Humidité : <strong>{measurement.humidity} %</strong>
            </p>

            <p className={styles.row}>
                📊 Statut :{" "}
                <span
                    className={`${styles.status} ${
                        measurement.status === "OK" ? styles.ok : styles.error
                    }`}
                >
          {measurement.status}
        </span>
            </p>

            <small className={styles.timestamp}>
                ⏱ Capturée le :{" "}
                {new Date(measurement.captured_at).toLocaleString()}
            </small>
        </div>
    );
}
