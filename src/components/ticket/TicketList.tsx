import { useEffect, useState } from "react";
import { Ticket } from "../../models/Ticket";
import {
    getOpenTickets,
    assignTicket,
    closeTicket,
} from "../../services/ticketService";
import styles from "./TicketList.module.css";

export default function TicketList() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        setLoading(true);
        const data = await getOpenTickets();
        setTickets(data);
        setLoading(false);
    };

    const handleAssign = async (ticketId: number) => {
        await assignTicket(ticketId, 4); // Chef Equipe (exemple)
        loadTickets();
    };

    const handleClose = async (ticketId: number) => {
        const resolution =
            "Problème identifié et corrigé. Température redevenue normale.";
        await closeTicket(ticketId, resolution);
        loadTickets();
    };

    if (loading) return <p className={styles.loading}>Chargement des tickets...</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>🎫 Tickets ouverts</h2>

            {tickets.map((ticket) => (
                <div key={ticket.id} className={styles.ticketCard}>
                    <h3 className={styles.ticketTitle}>{ticket.title}</h3>
                    <p className={styles.description}>{ticket.description}</p>

                    <p className={styles.info}>
                        📌 Priorité :{" "}
                        <span className={styles.priority}>{ticket.priority}</span>
                    </p>

                    <p className={styles.info}>
                        👤 Assigné à :{" "}
                        {ticket.assigned_to
                            ? ticket.assigned_to.full_name
                            : "Non assigné"}
                    </p>

                    <p
                        className={`${styles.status} ${
                            ticket.status === "OPEN"
                                ? styles.open
                                : ticket.status === "ASSIGNED"
                                    ? styles.assigned
                                    : styles.closed
                        }`}
                    >
                        📊 Statut : {ticket.status}
                    </p>

                    <div className={styles.actions}>
                        {ticket.status === "OPEN" && (
                            <button
                                className={`${styles.button} ${styles.assign}`}
                                onClick={() => handleAssign(ticket.id)}
                            >
                                Assigner
                            </button>
                        )}

                        {ticket.status !== "CLOSED" && (
                            <button
                                className={`${styles.button} ${styles.close}`}
                                onClick={() => handleClose(ticket.id)}
                            >
                                Clôturer
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
