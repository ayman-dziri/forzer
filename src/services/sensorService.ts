import apiClient from "../api/apiClient";
import { Sensor } from "../models/Sensor";
import {CreateSensorPayload} from "../models/CreateSensorPayload";

export const getSensors = async (): Promise<Sensor[]> => {
    const res = await apiClient.get<Sensor[]>("/sensors/");
    return res.data;
};

export const getSensorById = async (id: number): Promise<Sensor> => {
    const sensors = await getSensors();
    const sensor = sensors.find(s => s.id === id);
    if (!sensor) throw new Error("Capteur introuvable");
    return sensor;
};

export const createSensor = async (
    payload: CreateSensorPayload
): Promise<Sensor> => {
    const res = await apiClient.post<Sensor>("/sensors/", payload);
    return res.data;
};


