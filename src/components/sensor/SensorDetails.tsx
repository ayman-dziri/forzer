import { useParams } from "react-router-dom";
import AlertList from "../alert/AlertList";

export default function SensorDetails() {
    const { id } = useParams<{ id: string }>();
    const sensorId = Number(id);

    return (
        <div>
            <h2>Détails du capteur #{sensorId}</h2>

    {/* Autres composants */}
    <AlertList sensorId={sensorId} />
    </div>
);
}
