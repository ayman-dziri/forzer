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
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [action, setAction] = useState<"ASSIGN" | "CLOSE" | null>(null);
    const [resolution, setResolution] = useState("");
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        setLoading(true);
        const data = await getOpenTickets();
        setTickets(data);
        setLoading(false);
    };
    const openAssignModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setAction("ASSIGN");
        setModalOpen(true);
    };

    const openCloseModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setAction("CLOSE");
        setResolution("");
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!selectedTicket || !action) return;

        if (action === "ASSIGN") {
            await assignTicket(selectedTicket.id, 4);
        }

        if (action === "CLOSE") {
            if (!resolution.trim()) {
                alert("Veuillez saisir une résolution");
                return;
            }
            await closeTicket(selectedTicket.id, resolution);
        }

        setModalOpen(false);
        setSelectedTicket(null);
        setAction(null);
        loadTickets();
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
                                onClick={() => openAssignModal(ticket)}
                            >
                                Assigner
                            </button>
                        )}

                        {ticket.status !== "CLOSED" && (
                            <button
                                className={`${styles.button} ${styles.close}`}
                                onClick={() => openCloseModal(ticket)}
                            >
                                Clôturer
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {modalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>
                            {action === "ASSIGN"
                                ? "Assigner le ticket"
                                : "Clôturer le ticket"}
                        </h3>

                        <p>
                            Ticket : <strong>{selectedTicket?.title}</strong>
                        </p>

                        {action === "CLOSE" && (
                            <textarea
                                className={styles.textarea}
                                placeholder="Résolution du problème..."
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                            />
                        )}

                        <div className={styles.modalActions}>
                            <button
                                className={styles.cancel}
                                onClick={() => setModalOpen(false)}
                            >
                                Annuler
                            </button>

                            <button
                                className={styles.confirm}
                                onClick={handleConfirm}
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
