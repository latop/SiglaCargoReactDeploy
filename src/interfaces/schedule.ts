export interface DriverSchedule {
  driverId: string;
  driverName: string;
}

export interface Trip {
  id?: string;
  code?: string;
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

export interface DriverJourneySchedule {
  type: string;
  task: string;
  locCodeOrig: string | null;
  locCodeDest: string | null;
  lineCode: string | null;
  licensePlate: string | null;
  startPlanned: string;
  endPlanned: string;
  startActual: string | null;
  endActual: string | null;
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
  driverSchedules: DriverJourneySchedule[];
}

export interface DailyTripSection {
  dailyTripSectionId: string;
  dailyTripId: string;
  section: number;
  locOrig: string;
  locDest: string;
  startPlanned: string;
  endPlanned: string;
  startActual: string | null;
  endActual: string | null;
  startEstimated: string;
  endEstimated: string;
  licensePlate: string | null;
  flgStatus: string;
}

export interface DailyTrip {
  dailyTripId: string;
  tripNumber: string;
  tripDate: string;
  fleetGroupCode: string | null;
  flgStatus: string;
  sto: string;
  sectionsUnallocated: DailyTripSection[];
  selected?: boolean;
  startPlanned?: string;
  endPlanned?: string;
}

export interface DeparturesArrivals {
  timePlanned: string;
  locCode: string;
  sto: string;
  dt: string | null;
  statusTrip: string;
  timeEstimated: string;
  truckFleetCode: string | null;
  nickName: string;
  direction: string;
}
