import apiClient from "../api/apiClient";
import { AuditLog } from "../models/AuditLog";

export const getAuditLogs = async (): Promise<AuditLog[]> => {
    const res = await apiClient.get<AuditLog[]>("/audit-logs/");
    return res.data;
};
