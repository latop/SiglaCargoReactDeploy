import dayjs from "dayjs";
import { useGianttTable } from "./useGianttTable";

jest.mock("react", () => ({
  ...jest.requireActual("react"), // importa todas as exportações do React
  useMemo: jest.fn((fn) => fn()), // Mocka useMemo para executar imediatamente a função fornecida
}));
describe("useGianttTable", () => {
  it("should return correct groups and items", () => {
    const trips = [
      {
        id: 1,
        driverId: 1,
        code: "ABC123",
        plannedStart: "2022-01-01T10:00:00",
        plannedStop: "2022-01-01T12:00:00",
      },
      // Add more trips as needed
    ];

    const drivers = [
      {
        driverId: 1,
        driverName: "John Doe",
      },
      // Add more drivers as needed
    ];

    const { groups, items } = useGianttTable({ trips, drivers });

    // Assert the expected groups and items
    expect(groups).toEqual([
      {
        id: 1,
        title: "John Doe",
      },
      // Add more expected groups as needed
    ]);

    expect(items).toEqual([
      {
        id: 1,
        group: 1,
        title: "ABC123",
        start_time: dayjs("2022-01-01T10:00:00", "YYYY-MM-DDTHH:mm:ss"),
        end_time: dayjs("2022-01-01T12:00:00", "YYYY-MM-DDTHH:mm:ss"),
      },
      // Add more expected items as needed
    ]);

    // Add more assertions as needed
  });

  // Add more test cases as needed
});
