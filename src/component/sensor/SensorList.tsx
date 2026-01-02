import { useEffect, useState } from "react";
import { getSensors } from "../../services/sensorService";
import { Sensor } from "../../models/Sensor";
import SensorCard from "./SensorCard";

export default function SensorList() {
    const [sensors, setSensors] = useState<Sensor[]>([]);

    useEffect(() => {
        getSensors().then(setSensors);
    }, []);

    return (
        <>
            {sensors.map(sensor => (
                <SensorCard key={sensor.id} sensor={sensor} />
            ))}
        </>
    );
}
