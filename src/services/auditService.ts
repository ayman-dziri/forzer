import apiClient from "../api/apiClient";
import { AuditLog } from "../models/AuditLog";
import { PaginatedResponse } from "../models/PaginatedResponse";

export const getAuditLogs = async (
    page: number,
    pageSize: number = 5
): Promise<PaginatedResponse<AuditLog>> => {
    const response = await apiClient.get<PaginatedResponse<AuditLog>>(
        `/api/audit-logs/?page=${page}&page_size=${pageSize}`
    );

    return response.data;
};
