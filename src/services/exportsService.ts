import apiClient from "../api/apiClient";

interface ExportResponse {
    success: boolean;
    format: "csv" | "pdf";
    download_url: string;
    expires_at: string;
}

/**
 * Export des mesures d’un capteur (CSV)
 */
export const exportMeasurements = async (
    sensorId: number,
    from: string,
    to: string
): Promise<ExportResponse> => {
    const response = await apiClient.get<ExportResponse>(
        `/api/exports/measurements/?sensor_id=${sensorId}&format=csv&from=${from}&to=${to}`
    );
    return response.data;
};

/**
 * Export des audit logs (PDF)
 */
export const exportAuditLogs = async (
    from: string,
    to: string
): Promise<ExportResponse> => {
    const response = await apiClient.get<ExportResponse>(
        `/api/exports/audit/?format=pdf&from=${from}&to=${to}`
    );
    return response.data;
};
