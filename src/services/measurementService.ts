import apiClient from "../api/apiClient";
import { Measurement } from "../models/Measurement";

interface MeasurementListResponse {
    count: number;
    page: number;
    page_size: number;
    results: Measurement[];
}

export const getLatestMeasurement = async (
    sensorId: number
): Promise<Measurement> => {
    const res = await apiClient.get<{ latest: Measurement }>(
        `/api/measurements/latest/?sensor_id=${sensorId}`
    );
    return res.data.latest;
};

export const getMeasurements = async (
    sensorId: number,
    page: number
): Promise<MeasurementListResponse> => {
    const res = await apiClient.get<MeasurementListResponse>(
        `/api/measurements/?sensor_id=${sensorId}&page=${page}&page_size=10`
    );
    return res.data;
};
