import { Sensor } from "../../models/Sensor";

interface Props {
    sensor: Sensor;
}

export default function SensorCard({ sensor }: Props) {
    return (
        <div>
            <h3>{sensor.name}</h3>
            <p>📍 {sensor.location}</p>
            <p>🔌 {sensor.status}</p>
        </div>
    );
}
