import apiClient from "../api/apiClient";
import { Ticket } from "../models/Ticket";


export const getOpenTickets = async (): Promise<Ticket[]> => {
    const res = await apiClient.get<Ticket[]>("/tickets/?status=OPEN");
    return res.data;
};



export const assignTicket = async (
    ticketId: number,
    userId: number
): Promise<Ticket> => {
    const res = await apiClient.patch<Ticket>(`/tickets/${ticketId}/`, {
        assigned_to: userId,
    });
    return res.data; // ticket direct
};



export const closeTicket = async (
    ticketId: number,
    resolution: string
): Promise<Ticket> => {
    const res = await apiClient.patch<Ticket>(`/tickets/${ticketId}/`, {
        resolution,
    });
    return res.data; // ticket direct
};
