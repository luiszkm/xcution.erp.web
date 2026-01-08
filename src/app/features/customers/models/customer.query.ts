export interface PageRequest {
  page: number; // 1-based
  pageSize: number;
  search?: string;
}

export interface PageResult<T> {
  items: T[];
  total: number;
}
