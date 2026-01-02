import apiClient from "../api/apiClient";
import { Alert } from "../models/Alert";

interface AlertResponse {
    count: number;
    results: Alert[];
}

/**
 * Récupérer les alertes ouvertes d’un capteur
 */
export const getOpenAlertsBySensor = async (
    sensorId: number
): Promise<Alert[]> => {
    const response = await apiClient.get<AlertResponse>(
        `/api/alerts/?status=OPEN&sensor_id=${sensorId}`
    );

    return response.data.results;
};
