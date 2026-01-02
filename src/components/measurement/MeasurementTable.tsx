import { useEffect, useState } from "react";
import { Measurement } from "../../models/Measurement";
import { getMeasurements } from "../../services/measurementService";

interface Props {
    sensorId: number;
}

export default function MeasurementTable({ sensorId }: Props) {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        getMeasurements(sensorId, page).then(res => {
            setMeasurements(res.results);
            setTotal(res.count);
        });
    }, [sensorId, page]);

    return (
        <div>
            <h4>📈 Historique des mesures</h4>

            <table border={1} cellPadding={8} width="100%">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Température (°C)</th>
                    <th>Humidité (%)</th>
                    <th>Statut</th>
                </tr>
                </thead>

                <tbody>
                {measurements.map(m => (
                    <tr key={m.id}>
                        <td>{new Date(m.captured_at).toLocaleString()}</td>
                        <td>{m.temperature}</td>
                        <td>{m.humidity}</td>
                        <td
                            style={{
                                color: m.status === "OK" ? "green" : "red",
                                fontWeight: "bold",
                            }}
                        >
                            {m.status}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination simple */}
            <div style={{ marginTop: 10 }}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    ◀ Précédent
                </button>

                <span style={{ margin: "0 10px" }}>Page {page}</span>

                <button
                    disabled={page * 10 >= total}
                    onClick={() => setPage(page + 1)}
                >
                    Suivant ▶
                </button>
            </div>
        </div>
    );
}
