import apiClient from "../api/apiClient";

interface ExportResponse {
    success: boolean;
    format: "csv" | "pdf";
    download_url: string;
    expires_at: string;
}

export const exportMeasurements = async (
    sensorId: number,
    from: string,
    to: string
): Promise<ExportResponse> => {
    const response = await apiClient.get<ExportResponse>(
        `/exports/measurements/?sensor_id=${sensorId}&format=csv&from=${from}&to=${to}`
    );
    return response.data;
};


export const exportAuditLogs = async (
    from: string,
    to: string
): Promise<ExportResponse> => {
    const response = await apiClient.get<ExportResponse>(
        `/exports/audit/?format=pdf&from=${from}&to=${to}`
    );
    return response.data;
};
