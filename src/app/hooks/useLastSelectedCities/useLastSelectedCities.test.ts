// useLastSelectedCities.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { RecoilRoot } from "recoil";
import { useLastSelectedCities } from "./useLastSelectedCities";

describe("useLastSelectedCities", () => {
  it("adds a new city", () => {
    const { result } = renderHook(() => useLastSelectedCities(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.addCity({ id: "1", name: "City 1" });
    });

    expect(result.current.lastSelectedCities).toEqual([
      { id: "1", name: "City 1" },
    ]);
  });

  it("maintains only the last 5 cities", () => {
    const { result } = renderHook(() => useLastSelectedCities(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      for (let i = 1; i <= 6; i++) {
        result.current.addCity({ id: i.toString(), name: `City ${i}` });
      }
    });

    expect(result.current.lastSelectedCities.length).toBe(5);
    expect(result.current.lastSelectedCities[0].name).toBe("City 2");
  });
});
