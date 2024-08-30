"use client";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTruckAssignmentDialog } from "./useTruckAssingmentDialog";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const TruckAssignmentDialog = ({
  isOpen = false,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) => {
  const { data, isLoading, truckAssignmentId } = useTruckAssignmentDialog();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "truckId", headerName: "Truck ID", width: 150 },
    {
      field: "dtRef",
      headerName: "Date Reference",
      width: 150,
      valueGetter: (_, data) => {
        return data.dtRef ? dayjs(data.dtRef).format("DD-MM-YY HH:mm") : "N/A";
      },
    },
    { field: "driverId", headerName: "Driver ID", width: 150 },
    {
      field: "startTime",
      headerName: "Começo",
      width: 180,
      valueGetter: (_, data) => {
        return data.startTime
          ? dayjs(data.startTime).format("DD-MM-YY HH:mm")
          : "N/A";
      },
    },
    {
      field: "endTime",
      headerName: "Fim",
      width: 150,
      valueGetter: (_, data) => {
        return data.endTime
          ? dayjs(data.endTime).format("DD-MM-YY HH:mm")
          : "N/A";
      },
    },

    { field: "userIdCreate", headerName: "User Created", width: 150 },
    { field: "userIdUpdate", headerName: "User Updated", width: 150 },
  ];
  const rows = [data];

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth={"lg"}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Box display="flex" justifyContent="space-between">
          Atribuição de caminhão
          <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
        </Box>
        <hr style={{ opacity: 0.2, margin: "1rem 0" }} />
      </DialogTitle>
      <DialogContent>
        {isLoading && <CircularProgress />}
        {data && !isLoading && (
          <DataGrid
            rows={rows}
            getRowId={() => (truckAssignmentId as string) || ""}
            columns={columns}
            autoHeight
            hideFooter
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
