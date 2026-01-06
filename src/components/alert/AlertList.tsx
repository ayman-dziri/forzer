import { useEffect, useState } from "react";
import { Alert } from "../../models/Alert";
import { getOpenAlerts } from "../../services/alertService";
import AlertItem from "./AlertItem";
import Loader from "../common/Loader";
import styles from "./AlertList.module.css";

export default function AlertList() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadAlerts();
    }, []);

    const loadAlerts = async () => {
        setLoading(true);
        const data = await getOpenAlerts(); // ton service qui retourne les alertes ouvertes
        setAlerts(data);
        setLoading(false);
    };

    if (loading) return <Loader />;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>🚨 Incidents ouvertes</h2>

            {alerts.length === 0 ? (
                <p className={styles.empty}>Aucun incident en cours.</p>
            ) : (
                alerts.map((alert) => <AlertItem key={alert.id} alert={alert} />)
            )}
        </div>
    );
}
