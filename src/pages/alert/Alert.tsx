import { useEffect, useState } from "react";
import { Alert } from "../../models/Alert";
import { getOpenAlerts, getOpenAlertsBySensor } from "../../services/alertService";
import AlertItem from "../../components/alert/AlertItem";
import Loader from "../../components/common/Loader";
import styles from "./Alert.module.css";

interface Props {
    sensorId?: number; // optionnel
}

export default function AlertList({ sensorId }: Props) {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadAlerts();
    }, [sensorId]);

    const loadAlerts = async () => {
        setLoading(true);
        let data: Alert[] = [];
        if (sensorId) {
            data = await getOpenAlertsBySensor(sensorId);
        } else {
            data = await getOpenAlerts();
        }
        setAlerts(data);
        setLoading(false);
    };

    if (loading) return <Loader />;

    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>🚨 Alertes ouvertes</h2>

            {alerts.length === 0 ? (
                <p className={styles.empty}>Aucune alerte en cours.</p>
            ) : (
                alerts.map((alert) => <AlertItem key={alert.id} alert={alert} />)
            )}
        </div>
    );
}
