import apiClient from "../api/apiClient";
import { Sensor } from "../models/Sensor";

interface SensorResponse {
    count: number;
    results: Sensor[];
}

export const getSensors = async (): Promise<Sensor[]> => {
    const res = await apiClient.get<SensorResponse>("/api/sensors/");
    return res.data.results;
};
