import apiClient from "../api/apiClient";
import { Measurement } from "../models/Measurement";

interface MeasurementResponse {
    results: Measurement[];
    count?: number;
}


export const getMeasurements = async (sensorId: number, page = 1): Promise<MeasurementResponse> => {
    const res = await apiClient.get<Measurement[]>(`/measurements?sensor_id=${sensorId}`);

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pagedResults = res.data.slice(start, end);

    return {
        results: pagedResults,
        count: res.data.length,
    };
};


export const getLatestMeasurement = async (sensorId: number): Promise<Measurement | null> => {
    const res = await getMeasurements(sensorId);
    if (res.results.length === 0) return null;

    const sorted = res.results.sort(
        (a, b) => new Date(b.captured_at).getTime() - new Date(a.captured_at).getTime()
    );
    return sorted[0];
};
