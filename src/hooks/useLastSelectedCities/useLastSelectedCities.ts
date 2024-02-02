import { atom, useRecoilState } from "recoil";
import { ICity } from "@/interfaces/city.interface";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const lastSelectedCitiesState = atom<ICity[]>({
  key: "lastlastSelectedCitiesState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export function useLastSelectedCities() {
  const [lastSelectedCities, setLastSelectedCities] = useRecoilState(
    lastSelectedCitiesState,
  );

  const addCity = (newCity: ICity) => {
    setLastSelectedCities((prevCities: ICity[]) => {
      const isExisting = prevCities.some(
        (city: ICity) => city.name === newCity.name,
      );
      if (isExisting) {
        return prevCities;
      }

      const updatedCities =
        prevCities.length >= 5 ? prevCities.slice(0, 4) : prevCities;
      return [newCity, ...updatedCities];
    });
  };

  return { addCity, lastSelectedCities };
}
