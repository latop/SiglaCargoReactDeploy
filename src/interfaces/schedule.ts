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
  colorRGB?: string;
  licensePlate?: string;
  driverName: string;
  demand?: string;
  locationDestCode?: string;
  locationOrigCode?: string;
}

export interface TaskDriver {
  seq: number;
  demand?: string;
  lineCode?: string;
  type: string;
  activityId?: string;
  activityCode?: string;
  locOrig?: string;
  locDest?: string;
  startPlanned?: string;
  endPlanned?: string;
  lineId?: string;
  startActual?: string;
  endActual?: string;
}

export interface Circuit {
  ciruictCode: string;
  endDate: string | Date;
  startDate: string | Date;
  trips: Trip[];
  driverName?: string;
  driverId: string;
}

export interface JourneysByPeriodResponse {
  drivers: DriverSchedule[];
  trips: Trip[];
  circuits: Circuit[];
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

export interface CircuitJourney {
  circuitJourneyId: string | null;
  driverId: string;
  nickName: string;
  driverBase: string;
  driverSubBase: string;
  fleetCode: string;
  startDate?: string; // Assuming date comes in string format
  endDate?: string;
  otmProcess?: string;
  tasksDriver?: TaskDriver[];
}

export interface ActivityRequest {
  journeyDate: string;
  driverId: string;
  activityId: string;
  startActivity: string;
  endActivity: string;
  qtyOccur: number;
  operation: string | null;
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
