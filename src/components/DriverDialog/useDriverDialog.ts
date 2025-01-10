import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { Driver } from "@/interfaces/driver";
import { fetchDriverById } from "@/services/drivers";
import { FieldValues, useForm } from "react-hook-form";
import useSWR from "swr";
import { atom, useRecoilState } from "recoil";

export type TabsType =
  | "driverAttributions"
  | "driverBases"
  | "driverFleets"
  | "driverPositions"
  | "driverVacations";

export const tabState = atom<TabsType>({
  key: "selectedTab",
  default: "driverAttributions",
});

export function useDriverDialog() {
  const [hash] = useHash();
  const [selectedTab, setSelectedTab] = useRecoilState(tabState);
  const isToAddDriverToAdd = !!(hash as string)?.match(/#add-driver/)?.[0];
  const driverToUpdate = (hash as string)?.match(/#driver-id-(.+)/);
  const driverId = driverToUpdate?.[1];

  const getKey = () => {
    if (!driverId || isToAddDriverToAdd) return null;
    return {
      id: driverId,
      url: "/Drivers",
    };
  };

  const { data: driverData, isLoading: isLoadingDriver } = useSWR<Driver>(
    getKey,
    fetchDriverById,
    {
      onSuccess: (data) => {
        if (isToAddDriverToAdd) return;
        methods.reset(getDefaultValues(data, driverId));
      },
    },
  );

  const getDefaultValues = (
    data: Driver | undefined,
    driverId: string | undefined,
  ) => {
    const mapWithDriverId = (items: object[] | undefined) =>
      items?.map((item) => ({ ...item, driverId }));
    return {
      ...data,
      countryId: "BRASIL",
      driverAttributions: mapWithDriverId(data?.driverAttributions),
      driverBases: mapWithDriverId(data?.driverBases),
      driverFleets: mapWithDriverId(data?.driverFleets),
      driverPositions: mapWithDriverId(data?.driverPositions),
      driverVacations: mapWithDriverId(data?.driverVacations),
    };
  };

  const methods = useForm<Driver>();

  const { addToast } = useToast();
  const [handleFetch, { loading: loadingCreate }] = useFetch();
  const [, setHash] = useHash();

  const handleUpdateDriver = async (data: FieldValues) => {
    const body = {
      ...data,
      stateId: data.state.id,
      cityId: data.city.id,
      countryId: data.state.countryId,
    };
    await handleFetch("/updatedriver", body, {
      onSuccess: () => {
        addToast("Motorista atualizado com sucesso!", { type: "success" });
      },
      onError: (error) => addToast(error.message, { type: "error" }),
    });
  };

  const handleAddDriver = async (data: FieldValues) => {
    const body = {
      ...data,
      stateId: data.state.id,
      cityId: data.city.id,
      countryId: data.state.countryId,
    };
    await handleFetch("/Drivers", body, {
      onSuccess: () => {
        addToast("Motorista adicionado com sucesso!", { type: "success" });
        setHash("");
        methods.reset({});
      },
      onError: (error) => addToast(error.message, { type: "error" }),
    });
  };

  const handleSubmit = async (data: FieldValues) => {
    const body = { ...data, countryId: data.state.countryId };
    if (!isToAddDriverToAdd && !!driverId) {
      await handleUpdateDriver(body);
      return;
    }

    await handleAddDriver(body);
  };

  return {
    methods,
    handleSubmit,
    loadingCreate,
    isLoadingDriver: isLoadingDriver && !driverData,
    isToAddDriverToAdd,
    isToUpdateDriver: !!driverId,
    driverData,
    driverId,
    selectedTab,
    setSelectedTab,
  };
}
