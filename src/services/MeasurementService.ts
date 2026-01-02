import apiClient from "../api/apiClient";
import { Measurement } from "../models/Measurement";

export const getLatestMeasurement = async (
    sensorId: number
): Promise<Measurement> => {
    const res = await apiClient.get<{ latest: Measurement }>(
        `/api/measurements/latest/?sensor_id=${sensorId}`
    );
    return res.data.latest;
};
