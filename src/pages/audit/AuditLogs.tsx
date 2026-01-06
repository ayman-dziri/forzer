import { useEffect, useState } from "react";
import { getAuditLogs } from "../../services/auditService";
import { AuditLog } from "../../models/AuditLog";
import Loader from "../../components/common/Loader";
import styles from "./AuditLogs.module.css";

export default function AuditLogs() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedLogs = logs.slice(startIndex, endIndex);


    useEffect(() => {
        setLoading(true);
        getAuditLogs()
            .then(setLogs)
            .catch(() => setLogs([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader />;

    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>Audit Logs</h2>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Acteur</th>
                        <th>Action</th>
                        <th>Entité</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedLogs.map(log => (
                        <tr key={log.id}>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td>{log.actor?.full_name ?? "Système"}</td>
                            <td>{log.action}</td>
                            <td>{log.entity} #{log.entity_id}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                >
                    ◀ Précédent
                </button>
                <button
                    disabled={page * pageSize >= logs.length}
                    onClick={() => setPage(p => p + 1)}
                >
                    Suivant ▶
                </button>
            </div>
        </div>
    );
}
