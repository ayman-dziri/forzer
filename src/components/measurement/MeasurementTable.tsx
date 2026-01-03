import { useEffect, useState } from "react";
import { Measurement } from "../../models/Measurement";
import { getMeasurements } from "../../services/measurementService";
import styles from "./MeasurementTable.module.css";

interface Props {
    sensorId: number;
}

export default function MeasurementTable({ sensorId }: Props) {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);


    useEffect(() => {
        getMeasurements(sensorId, page).then((res) => {
            setMeasurements(res.results);
            setTotal(res.count ?? 0);
        });
    }, [sensorId, page]);

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>📈 Historique des mesures</h4>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Température (°C)</th>
                    <th>Humidité (%)</th>
                    <th>Statut</th>
                </tr>
                </thead>

                <tbody>
                {measurements.map((m) => (
                    <tr key={m.id}>
                        <td>{new Date(m.captured_at).toLocaleString()}</td>
                        <td>{m.temperature}</td>
                        <td>{m.humidity}</td>
                        <td>
                <span
                    className={`${styles.status} ${
                        m.status === "OK" ? styles.ok : styles.error
                    }`}
                >
                  {m.status}
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className={styles.pagination}>
                <button
                    className={styles.button}
                    disabled={page === 1}
                    onClick={() => setPage((page ?? 1) - 1)}
                >
                    ◀ Précédent
                </button>

                <span className={styles.pageInfo}>Page {page}</span>

                <button
                    className={styles.button}
                    disabled={page * 10 >= total}
                    onClick={() => setPage((page ?? 1) + 1)}
                >
                    Suivant ▶
                </button>
            </div>
        </div>
    );
}
