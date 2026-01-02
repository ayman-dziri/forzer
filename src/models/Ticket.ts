export interface UserRef {
    id: number;
    full_name: string;
}

export type TicketStatus = "OPEN" | "ASSIGNED" | "CLOSED";
export type TicketPriority = "P1" | "P2" | "P3";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    sensor_id: number;
    linked_alert_id?: number | null;
    status: TicketStatus;
    priority: TicketPriority;
    created_by: UserRef;
    assigned_to?: UserRef | null;
    created_at: string;
    updated_at: string;
}
