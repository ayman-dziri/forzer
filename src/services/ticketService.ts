import apiClient from "../api/apiClient";
import { Ticket } from "../models/Ticket";

/**
 * GET /api/tickets/?status=OPEN
 */
export const getOpenTickets = async (): Promise<Ticket[]> => {
    const res = await apiClient.get<{ count: number; results: Ticket[] }>(
        "/api/tickets/?status=OPEN"
    );
    return res.data.results;
};

/**
 * PATCH /api/tickets/{id}/ (assign)
 */
export const assignTicket = async (
    ticketId: number,
    userId: number
): Promise<Ticket> => {
    const res = await apiClient.patch<{ ticket: Ticket }>(
        `/api/tickets/${ticketId}/`,
        { assigned_to: userId }
    );
    return res.data.ticket;
};

/**
 * PATCH /api/tickets/{id}/ (close)
 */
export const closeTicket = async (
    ticketId: number,
    resolution: string
): Promise<Ticket> => {
    const res = await apiClient.patch<{ ticket: Ticket }>(
        `/api/tickets/${ticketId}/`,
        { resolution }
    );
    return res.data.ticket;
};
