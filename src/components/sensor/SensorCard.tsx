import { Sensor } from "../../models/Sensor";
import styles from "./SensorCard.module.css";

interface Props {
    sensor: Sensor;
}

export default function SensorCard({ sensor }: Props) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{sensor.name}</h3>

            <p className={styles.info}>
                📍 <span>{sensor.location}</span>
            </p>

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

        </div>

    );
}
