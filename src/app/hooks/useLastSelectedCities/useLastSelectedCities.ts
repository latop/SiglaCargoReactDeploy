import { atom, useRecoilState } from 'recoil';
import { ICity } from '@/app/interfaces/city.interface';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const lastSelectedCitiesState = atom<ICity[]>({
  key: 'lastlastSelectedCitiesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export function useLastSelectedCities() {
  const [lastSelectedCities, setLastSelectedCities] = useRecoilState(lastSelectedCitiesState);

  const addCity = (newCity: ICity) => {
    setLastSelectedCities((prevCities) => {
      const isExisting = prevCities.some(city => city.id === newCity.id);
      if (isExisting) {
        return prevCities;
      }

      const updatedCities = prevCities.length >= 5 ? prevCities.slice(1) : prevCities;
      return [...updatedCities, newCity];
    });
  };

  return { addCity, lastSelectedCities };
}
