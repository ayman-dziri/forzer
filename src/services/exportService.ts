import apiClient from "../api/apiClient";

interface ExportResponse {
    success: boolean;
    format: "csv" | "pdf";
    download_url: string;
    expires_at: string;
}

export const exportMeasurementsPdf = async (sensorId: number) => {
    const response = await apiClient.get(
        `/measurements/export/pdf/?sensor_id=${sensorId}`,
        {
            responseType: "blob", // 🔥 TRÈS IMPORTANT
        }
    );

    return response.data;
};



export const exportAuditLogs = async (from: string, to: string): Promise<ExportResponse> => {
    const response = await apiClient.get<ExportResponse>(
        `/exports/audit/?format=pdf&from=${from}&to=${to}`
    );
    return response.data;
};

