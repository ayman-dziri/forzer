export interface CreateSensorPayload {
    name: string;
    location: string;
    is_active: boolean;
    temp_min: number | null;
    temp_max: number | null;
    hum_min: number | null;
    hum_max: number | null;
    last_seen_at: string | null;
}
