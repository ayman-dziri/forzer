export interface Thresholds {
    temp_min: number;
    temp_max: number;
    hum_min: number;
    hum_max: number;
}

export interface Sensor {
    id: number;
    name: string;
    sensor_type: string;
    esp8266_chip_id: string;
    location: string;
    is_active: "ONLINE" | "OFFLINE";
    temp_min: number;
    temp_max: number;
    hum_min: number;
    hum_max: number;
    last_seen_at: string;
    thresholds: Thresholds;
}
