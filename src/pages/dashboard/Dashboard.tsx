import React from "react";
import SensorList from "../../components/sensor/SensorList";
import styles from "./Dashboard.module.css";
import AlertList from "../alert/Alert";
import {NavLink} from "react-router-dom";

const Dashboard: React.FC = () => {
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
                <div>
                    <AlertList />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
