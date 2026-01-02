import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sensor } from "../models/Sensor";
import { Measurement } from "../models/Measurement";
import { getLatestMeasurement, getMeasurements } from "../services/measurementService";
import { getSensors } from "../services/sensorService";
import LatestMeasurement from "../components/measurement/LatestMeasurement";
import MeasurementTable from "../components/measurement/MeasurementTable";

const SensorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const sensorId = Number(id);
    const [sensor, setSensor] = useState<Sensor | null>(null);
    const [latest, setLatest] = useState<Measurement | null>(null);

    useEffect(() => {
        getSensors().then(sensors => {
            const s = sensors.find(s => s.id === sensorId) || null;
            setSensor(s);
        });

        getLatestMeasurement(sensorId).then(setLatest);
    }, [sensorId]);

    return (
        <div>
            <h1>Détails du capteur</h1>
            {sensor && (
                <>
                    <h2>{sensor.name}</h2>
                    <p>Location: {sensor.location}</p>
                    <p>Status: {sensor.status}</p>
                    <LatestMeasurement measurement={latest} />
                    <MeasurementTable sensorId={sensorId} />
                </>
            )}
        </div>
    );
};

export default SensorDetails;
