import { useEffect, useState } from "react";
import { getSensors } from "../../services/sensorService";
import { Sensor } from "../../models/Sensor";
import SensorCard from "./SensorCard";
import styles from "./SensorList.module.css";
import {Link} from "react-router-dom";

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
            <h1 className={styles.pageTitle}>Vos Capteurs</h1>
            <div className={styles.listSensors}>
                {sensors.map((sensor) => (
                    <Link
                        key={sensor.id}
                        to={`/sensors/${sensor.id}`}  // navigation vers les details du capteur
                        className={styles.linkWrapper}
                    >
                        <SensorCard sensor={sensor} />
                    </Link>
            ))}
            </div>
        </div>
    );
}
