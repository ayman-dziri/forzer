export interface Actor {
    id: number;
    full_name: string;
}

export interface AuditLog {
    id: number;
    timestamp: string;
    actor: Actor;
    action: string;
    entity: string;
    entity_id: number;
    metadata: Record<string, any>;
}
