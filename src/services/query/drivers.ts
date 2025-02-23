import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";
import { FetchBasicParams } from "./types";
import dayjs from "dayjs";

const resource = "/Drivers";

export interface DriverReleaseFilterPayload extends FetchBasicParams {
  startDate: string;
  endDate: string;
  driverId?: string;
  activityId?: string;
  fleetGroupId?: string;
  locationGroupId?: string;
  flgStatus: string;
}

export interface Driver {
  name: string;
  lastName: string;
  nickName: string;
  registration: string;
  seniority: string;
  identification: string;
  genre: string;
  birthdate: string;
  admission: string;
  resign: string;
  address: string;
  zipCode: string;
  district: string;
  cityId: string;
  city: string;
  stateId: string;
  state: string;
  countryId: string;
  email: string;
  phone1: string;
  phone2: string;
  note: string;
  isActive: boolean;
  integrationCode: string;
  integrationCodeGPS: string;
  urlPhoto: string;
  password: string;
  driverAttributions: string;
  driverBases: string;
  driverFleets: string;
  driverPositions: string;
  driverVacations: string;
  id: string;
  createAt: string;
  updateAt: string;
  userIdCreate: string;
  userIdUpdate: string;
}

export interface Activity {
  code: string;
  description: string;
  activityTypeId: string;
  start: string;
  end: string;
  flgActive: boolean;
  flgMeal: boolean;
  flgLunch: boolean;
  flgRest: boolean;
  flgRequest: boolean;
  id: string;
  createAt: string;
  updateAt: string;
  userIdCreate: string;
  userIdUpdate: string;
}

export interface DriverRequestResponse {
  driverId: string;
  driver: Driver;
  activityId: string;
  activity: Activity;
  requestDate: string;
  notes: string;
  requestFile: string;
  flgStatus: string;
  id: string;
  createAt: string;
  updateAt: string;
  userIdCreate: string;
  userIdUpdate: string;
}
export const useDriverRequestQuery = (props?: DriverReleaseFilterPayload) => {
  const enabledFlag =
    !!props &&
    (props.startDate ? true : false) &&
    (props.endDate ? true : false);

  return useQuery({
    queryKey: ["driver-request", props],
    queryFn: async (): Promise<DriverRequestResponse[] | Error> => {
      try {
        const {
          pageSize = 15,
          startDate,
          endDate,
          flgStatus,
          ...rest
        } = props || {};
        const params = {
          PageSize: pageSize,
          startDate:
            dayjs(startDate?.toString()).format("ddd, MMM D, YYYY") +
            " 03:00:00 GMT",
          endDate:
            dayjs(endDate?.toString()).format("ddd, MMM D, YYYY") +
            " 03:00:00 GMT",
          flgStatus: flgStatus?.trim(),
          ...rest,
        };
        console.log("params", params);
        const response = await api.get(`${resource}/driverrequest`, {
          params,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        return error as Error;
      }
    },
    enabled: enabledFlag,
  });
};
