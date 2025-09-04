// import { useGetDailyTripDetailQuery } from "@/services/query/daily-trips";
// import Dialog from "@mui/material/Dialog";
// import LoadingTableSkeleton from "@/components/LoadingTableSkeleton/LoadingTableSkeleton";

// import dayjs from "dayjs";
// import "dayjs/locale/pt-br";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { FormProvider, useForm } from "react-hook-form";
// import { Box, DialogContent, DialogTitle, IconButton } from "@mui/material";
// import { GridCloseIcon } from "@mui/x-data-grid";
// import { DailyTripsFormDetailsFooter } from "./DailyTripsFormDetailsFooter";
// import { useDailyTripMutation } from "@/services/mutation/daily-trips";
// import { DailyTrip } from "@/interfaces/daily-trip";
// import { useHash } from "@/hooks/useHash";
// import { DailyTripFormDetails } from "./formDetail";

// dayjs.extend(customParseFormat);

// interface DailyTripDetailsProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function DailyTripDetailsDialog({
//   isOpen,
//   onClose,
// }: DailyTripDetailsProps) {
//   const [hash] = useHash();
//   const match = (hash as string)?.match(/#dailyTrip-(.+)/);
//   const dailyTripId = match?.[1];
//   const { data, isLoading } = useGetDailyTripDetailQuery({ dailyTripId });

//   const handleClose = () => {
//     onClose();
//   };

//   const defaultValues: DailyTrip = {
//     tripNumber: "",
//     tripDate: "",
//     fleetGroupId: "",
//     flgStatus: "",
//     notes: "",
//     lineId: "",
//     dt: "",
//     sto: "",
//     locationOrigId: "",
//     locationDestId: "",
//     startPlanned: null,
//     endPlanned: null,
//     tripTypeId: "",
//     stopTypeId: "",
//     companyId: "",
//     id: "",
//     justification: { description: "" },
//     justificationId: "",
//     dailyTripSections: [],
//     driverId: "",
//     startEstimated: null,
//     endEstimated: null,
//     fleetGroup: null,
//     line: undefined,
//     locationOrig: null,
//     locationDest: null,
//     tripType: null,
//     stopType: null,
//     createAt: "",
//     updateAt: null,
//     userIdCreate: null,
//     userIdUpdate: null,
//   };

//   const initialValues =
//     dailyTripId && data
//       ? {
//           ...data.dailyTrip,
//           dailyTripSections: data.dailyTripSections.map((section: object) => ({
//             nickname: data.nickName,
//             ...section,
//           })),
//         }
//       : defaultValues;

//   const { mutateAsync, isError, error } = useDailyTripMutation();
//   const methods = useForm({
//     defaultValues: initialValues,
//   });

//   console.log(methods.getValues());

//   const onSubmit = async (data: DailyTrip) => {
//     console.log(data);
//     const response = await mutateAsync(data);
//     if (response === "Ok") {
//       handleClose();
//     }
//   };

//   return (
//     <Dialog
//       onClose={onClose}
//       open={isOpen}
//       fullWidth
//       PaperProps={{ sx: { height: "100%", maxWidth: "1400px" } }}
//     >
//       {dailyTripId && isLoading && <LoadingTableSkeleton length={15} />}
//       {!isLoading && (
//         <FormProvider {...methods}>
//           <form
//             onSubmit={methods.handleSubmit(onSubmit)}
//             style={{ display: "flex", flexDirection: "column", height: "100%" }}
//           >
//             <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//               <Box display="flex" justifyContent="space-between">
//                 Viagem diária teste 2
//               </Box>
//             </DialogTitle>
//             <IconButton
//               aria-label="close"
//               onClick={handleClose}
//               sx={{
//                 position: "absolute",
//                 right: 8,
//                 top: 8,
//                 color: (theme) => theme.palette.grey[500],
//               }}
//             >
//               <GridCloseIcon />
//             </IconButton>
//             <DialogContent dividers sx={{ padding: "16px" }}>
//               {isError && <div>{JSON.stringify(error)}</div>}
//               {/* <DailyTripFormDetails
//                 initialValues={defaultValues}
//                 onClose={handleClose}
//               /> */}
//             </DialogContent>
//           </form>
//         </FormProvider>
//       )}
//     </Dialog>
//   );
// }
