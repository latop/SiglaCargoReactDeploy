export interface DriverSchedule {
  driverId: string;
  driverName: string;
}

export interface Trip {
  id: string;
  code: string;
  startPlanned: string;
  endPlanned: string;
  driverId: string;
  driverName: string;
  locationDestCode?: string;
  locationOrigCode?: string;
}

export interface JourneysByPeriodResponse {
  drivers: DriverSchedule[];
  trips: Trip[];
  hasNext: boolean;
  currentPage: number;
}
