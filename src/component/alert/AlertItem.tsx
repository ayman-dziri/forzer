import { Alert } from "../../models/Alert";

interface Props {
    alert: Alert;
}

export default function AlertItem({ alert }: Props) {
    return (
        <div style={{ border: "1px solid red", marginBottom: 8, padding: 8 }}>
            <h4>🚨 Alerte #{alert.id}</h4>

            <p>
                <strong>Gravité :</strong> {alert.severity}
            </p>

            <p>
                <strong>Raison :</strong> {alert.reason}
            </p>

            <p>
                <strong>Statut :</strong> {alert.status}
            </p>

            <p>
                <strong>Escalade :</strong> niveau {alert.current_escalation_level}
            </p>

            {alert.next_escalation_at && (
                <p>
                    ⏭ Prochaine escalade :{" "}
                    {new Date(alert.next_escalation_at).toLocaleString()}
                </p>
            )}
        </div>
    );
}
