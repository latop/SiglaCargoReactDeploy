import dayjs from "dayjs";
import { useGianttTable } from "./useGianttTable";
import { DriverSchedule, Trip } from "@/interfaces/schedule";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useMemo: jest.fn((fn) => fn()),
  useState: jest.fn().mockImplementation((initialState) => {
    let state = initialState;
    const setState = jest.fn((newState) => {
      state = typeof newState === "function" ? newState(state) : newState;
    });
    return [state, setState];
  }),
}));
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn().mockReturnValue({
    get: jest.fn((key) => {
      switch (key) {
        case "startDate":
          return "2023-01-01";
        default:
          return null;
      }
    }),
  }),
}));

describe("useGianttTable", () => {
  it("should return correct groups and items", () => {
    const trips: Trip[] = [
      {
        id: "1",
        driverId: "1",
        driverName: "JEFFERSON",
        code: "ABC123",
        plannedStart: "2022-01-01T10:00:00",
        plannedStop: "2022-01-01T12:00:00",
      },
    ];

    const drivers: DriverSchedule[] = [
      {
        driverId: "1",
        driverName: "JEFFERSON",
      },
    ];

    const { groups, items } = useGianttTable({ trips, drivers });

    expect(groups).toEqual([
      {
        id: "1",
        title: "JEFFERSON",
      },
    ]);

    expect(items).toEqual([
      {
        id: "1",
        group: "1",
        title: "ABC123",
        start_time: dayjs("2022-01-01T10:00:00", "YYYY-MM-DDTHH:mm:ss"),
        end_time: dayjs("2022-01-01T12:00:00", "YYYY-MM-DDTHH:mm:ss"),
      },
    ]);
  });
});
