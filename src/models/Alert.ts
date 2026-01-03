export type AlertStatus = "OPEN" | "CLOSED";
export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface AlertChannel {
    type: "EMAIL" | "TELEGRAM" | "WHATSAPP" | "VOICE_CALL";
    to: string;
    sent_at: string;
    delivery_status: "SENT" | "FAILED";
}

export interface Alert {
    id: number;
    sensor_id: number;
    created_at: string;
    status: AlertStatus;
    severity: AlertSeverity;
    reason: string;
    current_escalation_level: number;
    next_escalation_at?: string;
    channels: AlertChannel[];
}
