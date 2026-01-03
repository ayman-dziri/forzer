import React from "react";
import SensorList from "../components/sensor/SensorList";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Dashboard Frozer</h1>
            <div className={styles.sensorList}>
                <SensorList />
            </div>
        </div>
    );
};

export default Dashboard;
