import { Alert } from "../../models/Alert";
import styles from "./AlertItem.module.css";

interface Props {
    alert: Alert;
}

export default function AlertItem({ alert }: Props) {
    return (
        <div className={styles.card}>
            <h4 className={styles.title}>🚨 Alerte #{alert.id}</h4>

            <p className={styles.row}>
                <strong>Gravité :</strong> {alert.severity}
            </p>

            <p className={styles.row}>
                <strong>Raison :</strong> {alert.reason}
            </p>

            <p className={styles.row}>
                <strong>Statut :</strong> {alert.status}
            </p>

            <p className={styles.row}>
                <strong>Escalade :</strong> niveau {alert.current_escalation_level}
            </p>

            {alert.next_escalation_at && (
                <p className={styles.timestamp}>
                    ⏭ Prochaine escalade :{" "}
                    {new Date(alert.next_escalation_at).toLocaleString()}
                </p>
            )}
        </div>
    );
}
