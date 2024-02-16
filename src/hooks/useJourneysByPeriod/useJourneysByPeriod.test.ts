import { renderHook } from "@testing-library/react-hooks";
import { useJourneysByPeriod } from "./useJourneysByPeriod";
import useSWR from "swr";

jest.mock("swr");
describe("useJourneysByPeriod", () => {
  it("should fetch journeys by period", async () => {
    const mockedData = {
      trips: [
        {
          id: "a891d22c-f962-432b-bfcf-13fe9cde50b5",
          code: "2201 []",
          licensePlate: "GCZ2B41",
          plannedStart: "0001-01-02T03:00:00",
          plannedStop: "0001-01-01T11:20:00",
          estimatedStart: "0001-01-02T03:00:00",
          estimatedStop: "0001-01-01T11:20:00",
          actualStart: null,
          actualStop: null,
          driverId: "e76b158d-fc70-43f3-b2a4-04c65f020f66",
          driverName: "JEFFERSON",
          locationOrigCode: null,
          locationDestCode: null,
        },
      ],
    };

    const params = {
      startDate: "2022-01-01",
      endDate: "2022-01-31",
      nickName: "exampleNickname",
      gpId: "exampleGpId",
      locationGroupId: "exampleLocationGroupId",
      demand: "exampleDemand",
    };

    (useSWR as jest.Mock).mockReturnValue({
      data: mockedData,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useJourneysByPeriod(params));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeFalsy();
    expect(result.current.data).toEqual(mockedData);
  });
});
