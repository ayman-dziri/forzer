import React from "react";
import AlertList from "../components/alert/AlertList";

const Alerts: React.FC = () => {
    const sensorId = 1; // exemple : capteur 1
    return (
        <div>
            <h1>Alertes ouvertes</h1>
            <AlertList sensorId={sensorId} />
        </div>
    );
};

export default Alerts;
