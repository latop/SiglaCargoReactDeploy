import { useGianttTable } from "./useGianttTable";
import { Trip } from "@/interfaces/schedule";
import dayjs from "dayjs";

jest.mock("react", () => ({
  ...jest.requireActual("react"), // importa todas as exportações do React
  useMemo: jest.fn((fn) => fn()), // Mocka useMemo para executar imediatamente a função fornecida
}));
describe("useGianttTable", () => {
  it("should return correct groups and items", () => {
    const trips = [
      {
        id: "1",
        driverId: "1",
        driverName: "John Doe",
        code: "ABC123",
        plannedStart: "2022-01-01T10:00:00",
        plannedStop: "2022-01-01T12:00:00",
      },
      {
        id: "2",
        driverId: "2",
        driverName: "Jane Smith",
        code: "DEF456",
        plannedStart: "2022-01-01T14:00:00",
        plannedStop: "2022-01-01T16:00:00",
      },
    ];

    const { groups, items } = useGianttTable(trips);

    expect(groups).toEqual([
      { id: "1", title: "John Doe" },
      { id: "2", title: "Jane Smith" },
    ]);

    expect(items).toEqual([
      {
        id: "1",
        group: "1",
        title: "ABC123",
        start_time: dayjs("2022-01-01T10:00:00", "YYYY-MM-DDTHH:mm:ss"),
        end_time: dayjs("2022-01-01T12:00:00", "YYYY-MM-DDTHH:mm:ss"),
      },
      {
        id: "2",
        group: "2",
        title: "DEF456",
        start_time: dayjs("2022-01-01T14:00:00", "YYYY-MM-DDTHH:mm:ss"),
        end_time: dayjs("2022-01-01T16:00:00", "YYYY-MM-DDTHH:mm:ss"),
      },
    ]);
  });

  it("should return an empty array for groups and items when trips is empty", () => {
    const trips: Trip[] = [];

    const { groups, items } = useGianttTable(trips);

    expect(groups).toEqual([]);
    expect(items).toEqual([]);
  });

  it("should return correct groups and items when trips have the same driver", () => {
    const trips = [
      {
        id: "1",
        driverId: "1",
        driverName: "John Doe",
        code: "ABC123",
        plannedStart: "2022-01-01T10:00:00",
        plannedStop: "2022-01-01T12:00:00",
      },
      {
        id: "2",
        driverId: "1",
        driverName: "John Doe",
        code: "DEF456",
        plannedStart: "2022-01-01T14:00:00",
        plannedStop: "2022-01-01T16:00:00",
      },
    ];

    const { groups, items } = useGianttTable(trips);

    expect(groups).toEqual([{ id: "1", title: "John Doe" }]);
    expect(items).toEqual([
      {
        id: "1",
        group: "1",
        title: "ABC123",
        start_time: dayjs("2022-01-01T10:00:00", "YYYY-MM-DDTHH:mm:ss"),
        end_time: dayjs("2022-01-01T12:00:00", "YYYY-MM-DDTHH:mm:ss"),
      },
      {
        id: "2",
        group: "1",
        title: "DEF456",
        start_time: dayjs("2022-01-01T14:00:00", "YYYY-MM-DDTHH:mm:ss"),
        end_time: dayjs("2022-01-01T16:00:00", "YYYY-MM-DDTHH:mm:ss"),
      },
    ]);
  });
});
