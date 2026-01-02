import apiClient from "../api/apiClient";
import { Alert } from "../models/Alert";

interface AlertResponse {
    count: number;
    results: Alert[];
}

export const getOpenAlertsBySensor = async (sensorId: number): Promise<Alert[]> => {
    const res = await apiClient.get<AlertResponse>(`/api/alerts/?status=OPEN&sensor_id=${sensorId}`);
    return res.data.results;
};
