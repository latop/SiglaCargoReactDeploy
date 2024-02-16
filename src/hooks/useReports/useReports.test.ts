import { renderHook } from "@testing-library/react-hooks";
import useSWR from "swr";
import { useReports } from "./useReports";

jest.mock("swr");

describe("useReports", () => {
  it("should return the correct data, error, and loading state", () => {
    const mockData = [
      { id: 1, name: "Report 1" },
      { id: 2, name: "Report 2" },
    ];
    const mockError = new Error("Failed to fetch reports");

    (useSWR as jest.Mock).mockReturnValue({
      data: mockData,
      error: mockError,
      isLoading: false,
    });

    const { result } = renderHook(() => useReports());

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toEqual(false);
  });
});
