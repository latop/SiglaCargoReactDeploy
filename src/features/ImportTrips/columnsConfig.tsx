import { Box, Button, styled, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MapIcon from "@mui/icons-material/Map";
import { ImportGtms } from "@/interfaces/trip";
import { ReactNode } from "react";

const CustomTableButton = styled(Button)(() => ({
  padding: 0,
  width: "10px",
  minWidth: "30px",
  "&:hover": {
    opacity: 0.7,
  },
}));

interface DialogConfig {
  body?: ReactNode;
  onConfirm?: () => Promise<void>;
  onCancel?: () => void;
}

interface ColumnsConfigProps {
  handleImportedTrip: (id: string) => Promise<void>;
  closeDialog: () => void;
  openDialog: (config: DialogConfig) => void;
  handleDelete: (id: string) => Promise<void>;
}

export const columnsConfig = ({
  handleImportedTrip,
  handleDelete,
  closeDialog,
  openDialog,
}: ColumnsConfigProps): GridColDef[] => [
  {
    field: "FileName",
    headerName: "Nome do Arquivo",
    width: 300,
    valueGetter: (_, data: ImportGtms) => {
      return data.FileName ? data.FileName.split(".xlsx")[0] : "";
    },
  },
  {
    field: "LocationCode",
    headerName: "Cód. Loc",
    width: 100,
  },
  {
    field: "CreateAt",
    headerName: "Data criação",
    width: 200,
    valueGetter: (_, data: ImportGtms) => {
      return dayjs(data.CreateAt).format("DD-MM-YY HH:mm");
    },
  },
  {
    field: "action",
    headerName: "Ações",
    width: 100,
    renderCell: (params) => {
      return (
        <Box>
          <CustomTableButton
            onClick={() => handleImportedTrip(params.id as string)}
            size="small"
            variant="text"
          >
            <Tooltip title="Listar">
              <ListAltIcon color="success" />
            </Tooltip>
          </CustomTableButton>
          <CustomTableButton
            onClick={() => alert(params.id)}
            size="small"
            variant="text"
          >
            <Tooltip title="Exportar">
              <MapIcon color="primary" />
            </Tooltip>
          </CustomTableButton>
          <CustomTableButton
            onClick={() => {
              openDialog({
                body: "Deseja apagar este registro?",
                onConfirm: async () => {
                  await handleDelete(params.id as string).then(() => {
                    closeDialog();
                  });
                },
                onCancel: () => {
                  closeDialog();
                },
              });
            }}
            variant="text"
            size="small"
          >
            <Tooltip title="Apagar">
              <DeleteIcon color="error" />
            </Tooltip>
          </CustomTableButton>
        </Box>
      );
    },
  },
];
