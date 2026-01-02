import { useEffect, useState } from "react";
import { Alert } from "../../models/Alert";
import { getOpenAlertsBySensor } from "../../services/AlertService";
import AlertItem from "./AlertItem";

interface Props {
    sensorId: number;
}

export default function AlertList({ sensorId }: Props) {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        getOpenAlertsBySensor(sensorId)
            .then(setAlerts)
            .finally(() => setLoading(false));
    }, [sensorId]);

    if (loading) return <p>Chargement des alertes...</p>;

    if (alerts.length === 0)
        return <p>✅ Aucune alerte active pour ce capteur</p>;

    return (
        <div>
            <h3>Alertes actives</h3>
            {alerts.map(alert => (
                <AlertItem key={alert.id} alert={alert} />
            ))}
        </div>
    );
}
