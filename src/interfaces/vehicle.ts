import { LocationGroup } from "./trip";

export interface FleetGroup {
  description: string;
  code: string;
  id: string;
  qtyDemands: number;
}

export interface FleetType {
  code: string;
  description: string;
  fleetGroupId: string;
  fleetModelId: string;
  companyId: string;
  standardUnit: string;
  tare: number;
  capacity: number;
  note: string | null;
  fuelType: string;
  steeringGearType: string;
  id: string;
  createAt: string;
  updateAt: string;
  userIdCreate: string | null;
  userIdUpdate: string | null;
}

export interface Truck {
  startDate: string;
  endDate: string;
  isRefurbished: boolean;
  stateId: string;
  state: string | null;
  chassisNumber: string;
  licensePlate: string;
  regulatoryNumber: string;
  regulatoryValidity: string;
  manufactureYear: number;
  serialNumber: string;
  tare: number;
  capacity: number;
  locationGroupId: string;
  locationGroup: LocationGroup;
  fleetTypeId: string;
  fleetType: FleetType;
}

export interface VehiclePlanning {
  id: string;
  line: FleetGroup;
  driverId: string;
  truck: FleetGroup;
  startTime: string;
  endTime: string;
  freqTue: string;
  freqWed: string;
  freqThu: string;
  freqFri: string;
  freqSat: string;
  freqSun: string;
  freqMon: string;
}

export interface VehiclePlanningsResponse {
  hasNext: boolean;
  currentPage: number;
  vehiclePlannings: VehiclePlanning[];
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
}
