import React, { useEffect, useState } from "react";
import SensorList from "../../components/sensor/SensorList";
import styles from "./Dashboard.module.css";
import AlertList from "../alert/Alert";
import { NavLink } from "react-router-dom";
import { getSensors } from "../../services/sensorService";
import { getMeasurements } from "../../services/measurementService";
import { Sensor } from "../../models/Sensor";
import { Measurement } from "../../models/Measurement";
import SensorGraphs from "../../components/sensor/SensorGraphs";

const Dashboard: React.FC = () => {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [measurementsMap, setMeasurementsMap] = useState<Record<number, Measurement[]>>({});

    useEffect(() => {
        getSensors().then((sensors) => {
            setSensors(sensors);

            // récupérer les mesures pour chaque capteur
            sensors.forEach(async (sensor) => {
                const data = await getMeasurements(sensor.id, 1); // page 1 par exemple
                setMeasurementsMap((prev) => ({ ...prev, [sensor.id]: data.results }));
            });
        });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.dashboardHeader}>
                <h1 className={styles.pageTitle}>Dashboard Frozer</h1>
                <NavLink to="/admin/sensors/new" className={styles.addButton}>
                    ➕ Ajouter un capteur
                </NavLink>
            </div>

            <div className={styles.listInfos}>
                <div className={styles.sensorList}>
                    <SensorList />
                </div>

            </div>

            <div className={styles.graphsSection}>
                {sensors.map((sensor) => (
                    <div key={sensor.id} className={styles.graphCard}>
                        <h3 className={styles.sensorName}>{sensor.name} - Graphiques</h3>
                        <SensorGraphs measurements={measurementsMap[sensor.id] || []} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
