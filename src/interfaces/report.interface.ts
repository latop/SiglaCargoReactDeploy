interface Driver {
  id: string;
  name: string;
}

interface Travel {
  id: string;
  driverId: string;
  startDate: string; // ISO 8601 format with time, e.g., "2024-03-01T08:00:00"
  endDate: string; // ISO 8601 format with time, e.g., "2024-03-03T17:00:00"
}

export interface ReportResponse {
  drivers: Driver[];
  travels: Travel[];
}

// Exemplo de uso:
