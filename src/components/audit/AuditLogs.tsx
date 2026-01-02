import { useEffect, useState } from "react";
import { getAuditLogs } from "../../services/AuditService";
import { AuditLog } from "../../models/AuditLog";

export default function AuditLogs() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getAuditLogs(page).then(res => setLogs(res.results));
    }, [page]);

    return (
        <div>
            <h2>Audit Logs</h2>

            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Acteur</th>
                    <th>Action</th>
                    <th>Entité</th>
                </tr>
                </thead>
                <tbody>
                {logs.map(log => (
                    <tr key={log.id}>
                        <td>{log.timestamp}</td>
                        <td>{log.actor.full_name}</td>
                        <td>{log.action}</td>
                        <td>{log.entity} #{log.entity_id}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={() => setPage(p => Math.max(1, p - 1))}>
                ◀ Précédent
            </button>
            <button onClick={() => setPage(p => p + 1)}>
                Suivant ▶
            </button>
        </div>
    );
}
