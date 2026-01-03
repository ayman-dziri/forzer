import apiClient from "../api/apiClient";
import { Alert } from "../models/Alert";

export const getOpenAlerts = async (): Promise<Alert[]> => {
    const response = await apiClient.get<Alert[]>(
        "/alerts?status=OPEN"
    );
    return response.data;
};

export const getOpenAlertsBySensor = async (
    sensorId: number
): Promise<Alert[]> => {
    const response = await apiClient.get<Alert[]>(
        `/alerts?status=OPEN&sensor_id=${sensorId}`
    );
    return response.data;
};
