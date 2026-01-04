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
                🌡 Température : <strong>{measurement.temperature}°C</strong>
            <strong>
                {measurement.temperature < 2 || measurement.temperature > 8 ? (
                    <p style={{ color: "red", fontWeight: 600 }}>
                        ⚠ Température hors plage (2–8 °C)
                    </p>
                ) : null}
            </strong>
            </p>

            <p className={styles.row}>
                💧 Humidité : <strong>{measurement.humidity} %</strong>
            </p>
            

            <small className={styles.timestamp}>
                ⏱ Capturée le :{" "}
                {new Date(measurement.captured_at).toLocaleString()}
            </small>
        </div>
    );
}
