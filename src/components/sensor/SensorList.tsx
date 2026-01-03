import { useEffect, useState } from "react";
import { getSensors } from "../../services/sensorService";
import { Sensor } from "../../models/Sensor";
import SensorCard from "./SensorCard";
import styles from "./SensorList.module.css";

export default function SensorList() {
    const [sensors, setSensors] = useState<Sensor[]>([]);

    useEffect(() => {
        getSensors().then(setSensors);
    }, []);

    if (sensors.length === 0) {
        return <p className={styles.empty}>Aucun capteur disponible</p>;
    }

    return (
        <div className={styles.container}>
            {sensors.map((sensor) => (
                <SensorCard key={sensor.id} sensor={sensor} />
            ))}
        </div>
    );
}
