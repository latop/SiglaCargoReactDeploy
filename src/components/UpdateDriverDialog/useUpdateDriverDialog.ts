import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { Driver } from "@/interfaces/driver";
import { fetchDriverById } from "@/services/drivers";
// import dayjs from "dayjs";
import { FieldValues, useForm } from "react-hook-form";
import useSWR from "swr";

export function useUpdateDriverDialog() {
  const [hash] = useHash();

  const match = (hash as string)?.match(/#driver-id-(.+)/);
  const driverId = match?.[1];

  const getKey = () => {
    if (!driverId) return null;
    return {
      id: driverId,
      url: "/Driver",
    };
  };

  const { data: driverData, isLoading: isLoadingDriver } = useSWR<Driver>(
    getKey,
    fetchDriverById,
    {
      onSuccess: (data) => {
        methods.reset(normalizeData(data));
      },
    },
  );

  const normalizeData = (data: Driver) => {
    const driverDefaultValues = {
      ...data,
    };

    return driverDefaultValues;
  };

  const methods = useForm();

  const { addToast } = useToast();
  const [lineCreate, { loading: loadingCreate }] = useFetch();
  const [, setHash] = useHash();

  const handleSubmit = async (data: FieldValues) => {
    console.log(data);
    const body = {};

    return await lineCreate("/updatedriver", body, {
      onSuccess: () => {
        addToast("Motorista atualizado com sucesso!", { type: "success" });
        setHash("");
        methods.reset({});
      },
      onError: (error) => addToast(error.message, { type: "error" }),
    });
  };

  console.log(driverData);

  return {
    methods,
    handleSubmit,
    loadingCreate,
    isLoadingDriver: isLoadingDriver && !driverData,
  };
}

// {
//   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "createAt": "2024-11-13T13:42:37.677Z",
//   "updateAt": "2024-11-13T13:42:37.677Z",
//   "userIdCreate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "userIdUpdate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "name": "string",
//   "lastName": "string",
//   "nickName": "string",
//   "registration": "string",
//   "seniority": 0,
//   "identification": "string",
//   "genre": "s",
//   "birthdate": "2024-11-13T13:42:37.677Z",
//   "admission": "2024-11-13T13:42:37.677Z",
//   "resign": "2024-11-13T13:42:37.677Z",
//   "address": "string",
//   "zipCode": "string",
//   "district": "string",
//   "cityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "stateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "email": "string",
//   "phone1": "string",
//   "phone2": "string",
//   "note": "string",
//   "isActive": true,
//   "integrationCode": "string",
//   "integrationCodeGPS": "string",
//   "urlPhoto": "string",
//   "password": "string",
//   "driverAttributions": [
//     {
//       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "createAt": "2024-11-13T13:42:37.677Z",
//       "updateAt": "2024-11-13T13:42:37.677Z",
//       "userIdCreate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "userIdUpdate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "driverId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "attributionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "startDate": "2024-11-13T13:42:37.677Z",
//       "endDate": "2024-11-13T13:42:37.677Z"
//     }
//   ],
//   "driverBases": [
//     {
//       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "createAt": "2024-11-13T13:42:37.677Z",
//       "updateAt": "2024-11-13T13:42:37.677Z",
//       "userIdCreate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "userIdUpdate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "driverId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "locationGroupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "startDate": "2024-11-13T13:42:37.677Z",
//       "endDate": "2024-11-13T13:42:37.677Z"
//     }
//   ],
//   "driverFleets": [
//     {
//       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "createAt": "2024-11-13T13:42:37.677Z",
//       "updateAt": "2024-11-13T13:42:37.677Z",
//       "userIdCreate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "userIdUpdate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "driverId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "fleetGroupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "startDate": "2024-11-13T13:42:37.678Z",
//       "endDate": "2024-11-13T13:42:37.678Z"
//     }
//   ],
//   "driverPositions": [
//     {
//       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "createAt": "2024-11-13T13:42:37.678Z",
//       "updateAt": "2024-11-13T13:42:37.678Z",
//       "userIdCreate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "userIdUpdate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "driverId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "positionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "startDate": "2024-11-13T13:42:37.678Z",
//       "endDate": "2024-11-13T13:42:37.678Z"
//     }
//   ],
//   "driverVacations": [
//     {
//       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "createAt": "2024-11-13T13:42:37.678Z",
//       "updateAt": "2024-11-13T13:42:37.678Z",
//       "userIdCreate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "userIdUpdate": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "driverId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "startDate": "2024-11-13T13:42:37.678Z",
//       "endDate": "2024-11-13T13:42:37.678Z"
//     }
//   ]
// }
