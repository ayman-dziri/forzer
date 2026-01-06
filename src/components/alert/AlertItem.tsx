import { useState } from "react";
import { Alert } from "../../models/Alert";
import styles from "./AlertItem.module.css";
import apiClient from "../../api/apiClient";

interface Props {
    alert: Alert;
}

export const acknowledgeAlert = (id: number, comment: string) => {
    return apiClient.patch(`/alerts/${id}/acknowledge/`, {
        comment,
    });
};

export default function AlertItem({ alert }: Props) {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [acknowledged, setAcknowledged] = useState(
        alert.status === "ACKNOWLEDGED"
    );

    const handleAcknowledge = async () => {
        try {
            setLoading(true);
            await acknowledgeAlert(alert.id, comment);
            setAcknowledged(true);
        } catch (error) {
            console.error(error);
            window.alert("Erreur lors de l'accusé de réception");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.card}>
            <h4 className={styles.title}>🚨 Incident #{alert.id}</h4>

            <p className={styles.row}>
                <strong>Gravité :</strong> {alert.severity}
            </p>

            <p className={styles.row}>
                <strong>Raison :</strong> {alert.reason}
            </p>

            <p className={styles.row}>
                <strong>Statut :</strong>{" "}
                <span className={acknowledged ? styles.ok : styles.pending}>
                    {acknowledged ? "Acquittée" : "En attente"}
                </span>
            </p>

            <p className={styles.row}>
                <strong>Escalade :</strong> niveau{" "}
                {alert.current_escalation_level}
            </p>

            {alert.next_escalation_at && (
                <p className={styles.timestamp}>
                    ⏭ Prochaine escalade :{" "}
                    {new Date(alert.next_escalation_at).toLocaleString()}
                </p>
            )}

            {!acknowledged && (
                <>
                    <textarea
                        className={styles.textarea}
                        placeholder="Commentaire opérateur..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button
                        className={styles.ackButton}
                        onClick={handleAcknowledge}
                        disabled={loading}
                    >
                        {loading ? "⏳ Envoi..." : "✅ Accuser réception"}
                    </button>
                </>
            )}
        </div>
    );
}
