export interface Measurement {
    id: number;
    sensor_id: number;
    captured_at: string;
    temperature: number;
    humidity: number;
    status: "OK" | "OUT_OF_RANGE";
}
