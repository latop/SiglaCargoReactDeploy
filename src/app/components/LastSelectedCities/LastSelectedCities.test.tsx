import React from "react";
import { render, screen, fireEvent } from "@/app/testUtils";
import { LastSelectedCities } from "./LastSelectedCities";

const mockCities = [{ name: "City 1" }, { name: "City 2" }, { name: "City 3" }];

jest.mock("@/app/hooks/useLastSelectedCities", () => ({
  useLastSelectedCities: () => ({
    lastSelectedCities: mockCities,
  }),
}));
describe("LastSelectedCities", () => {
  it("renders the correct number of cities", () => {
    render(<LastSelectedCities onSelect={() => {}} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(mockCities.length);
  });

  it("calls the onSelect function when a city is clicked", () => {
    const onSelectMock = jest.fn();
    render(<LastSelectedCities onSelect={onSelectMock} />);
    fireEvent.click(screen.getByText("City 1"));
    expect(onSelectMock).toHaveBeenCalledWith(mockCities[0]);
  });
});
