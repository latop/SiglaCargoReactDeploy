import { Location, TripType } from "./trip";
import { FleetGroup } from "./vehicle";

export interface Line {
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  freqMon: boolean;
  freqTue: boolean;
  freqWed: boolean;
  freqThu: boolean;
  freqFri: boolean;
  freqSat: boolean;
  freqSun: boolean;
  locationOrigId: string;
  locationDestId: string;
  cost: number;
  fleetGroupId: string;
  overtimeAllowed: number;
  locationOrig: Location;
  locationDest: Location;
  fleetGroup: FleetGroup;
  tripTypeId: string;
  tripType: TripType;
  id: string;
}

export interface LinesResponse {
  hasNext: boolean;
  currentPage: number;
  lines: Line[];
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
}
