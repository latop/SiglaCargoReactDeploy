export interface LocationGroup {
  code: string;
  description: string;
  id: string;
}

export interface Location {
  name?: string;
  code: string;
  id?: string;
}

export interface TripType {
  code: string;
  description: string;
  id: string;
}

export interface FetchOptmizedTripsData {
  process: string;
  status: string;
  driverLog: null;
  stoLog: null;
  id: string;
  createAt: string;
  updateAt: string | null;
  userIdCreate: string | null;
  userIdUpdate: string | null;
}

export type StopType = {
  stopTypeCode: string;
  stopTime: number;
  flgJourney: string;
  id: string;
};
