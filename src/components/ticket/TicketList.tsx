import { useEffect, useState } from "react";
import { Ticket } from "../../models/Ticket";
import {
    getOpenTickets,
    assignTicket,
    closeTicket
} from "../../services/TicketService";
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
        await assignTicket(ticketId, 4); // ex: Chef Equipe
        loadTickets();
    };

    const handleClose = async (ticketId: number) => {
        const resolution =
            "Problème identifié et corrigé. Température redevenue normale.";
        await closeTicket(ticketId, resolution);
        loadTickets();
    };

    if (loading) return <p>Chargement des tickets...</p>;

    return (
        <div>
            <h2>🎫 Tickets ouverts</h2>

            {tickets.map(ticket => (
                <div key={ticket.id} style={{ border: "1px solid #ccc", margin: 10 }}>
                    <h3>{ticket.title}</h3>
                    <p>{ticket.description}</p>

                    <p>
                        📌 Priorité : <b>{ticket.priority}</b>
                    </p>
                    <p>
                        👤 Assigné à :{" "}
                        {ticket.assigned_to
                            ? ticket.assigned_to.full_name
                            : "Non assigné"}
                    </p>

                    <p>📊 Statut : {ticket.status}</p>

                    {ticket.status === "OPEN" && (
                        <button onClick={() => handleAssign(ticket.id)}>
                            Assigner
                        </button>
                    )}

                    {ticket.status !== "CLOSED" && (
                        <button onClick={() => handleClose(ticket.id)}>
                            Clôturer
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
