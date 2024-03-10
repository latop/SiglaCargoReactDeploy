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

export interface Journey {
  nickName: string;
  journeyDate: string;
  status: string;
  publishedDate: string | null;
  presentationDate: string;
  cutoffDate: string;
  presentationDateActual: string | null;
  cutoffDateActual: string | null;
  notes: string | null;
  awareDate: string | null;
  restTime: number;
  circuitJourneyId: string | null;
  otmId: string | null;
  journeyId: string;
  driverSchedules: (DriverSchedule | null)[];
}
