export interface PaginatedResponse<T> {
    count: number;
    page: number;
    page_size: number;
    results: T[];
}
