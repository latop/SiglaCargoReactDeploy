export interface DriverSchedule {
  driverId: string;
  driverName: string;
}

export interface Trip {
  id: string;
  code: string;
  licensePlate: string;
  plannedStart: string;
  plannedStop: string;
  estimatedStart: string;
  estimatedStop: string;
  actualStart: string | null;
  actualStop: string | null;
  driverId: string;
  driverName: string;
  locationOrigCode: string | null;
  locationDestCode: string | null;
}

export interface JourneysByPeriodResponse {
  drivers: DriverSchedule[];
  trips: Trip[];
}
