import { FleetGroup } from "./vehicle";

export interface Line {
  id: string;
  code: string;
  description: string;
  companyId: string;
  createAt: string;
  updateAt: string | null;
  userIdCreate: string | null;
  userIdUpdate: string | null;
}

interface DailyTrip {
  tripNumber: string;
  tripDate: string;
  fleetGroupCode: string | null;
  fleetGroup: FleetGroup | null;
  flgStatus: string;
  notes: string | null;
  lineId: string | null;
  line: Line;
  dt: string | null;
  sto: string;
  locationOrigId: string | null;
  locationOrig: string | null;
  locationDestId: string | null;
  locationDest: string | null;
  startPlanned: string | null;
  endPlanned: string | null;
  tripTypeId: string | null;
  tripType: string | null;
  stopTypeId: string | null;
  stopType: string | null;
  companyId: string | null;
  id: string;
  createAt: string;
  updateAt: string | null;
  userIdCreate: string | null;
  userIdUpdate: string | null;
}

export interface DailyTripResponse {
  hasNext: boolean;
  currentPage: number;
  dailyTrips: DailyTrip[];
}
