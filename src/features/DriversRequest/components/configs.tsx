import { DriverRequestResponse } from "@/services/query/drivers";
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

const headerClass = "blueColumnHeaders";

interface ColumnBuilder {
  handleChangeStatus: (id: string, status: string) => void;
}

const columns = ({ handleChangeStatus }: ColumnBuilder): GridColDef[] => {
  return [
    {
      field: "requestDate",
      headerName: "Data da Jornada Solicitada",
      width: 150,
      sortable: false,
      filterable: false,
      type: "singleSelect" as const,
      valueFormatter: (value: string) =>
        value ? dayjs(value).format("DD/MM/YYYY") : "",
    },
    {
      field: "",
      headerName: "Motorista",
      width: 150,
      sortable: false,
      filterable: false,
      type: "singleSelect" as const,
      valueGetter: (_: unknown, data: DriverRequestResponse) => {
        return data.driver.name ?? "";
      },
    },
    {
      field: "activityCode",
      headerName: "Atividade",
      width: 150,
      sortable: false,
      filterable: false,
      type: "singleSelect" as const,
      valueGetter: (_: unknown, data: DriverRequestResponse) => {
        return data.activity.code ?? "";
      },
    },
    {
      field: "activityTime",
      headerName: "Horário da Programação",
      width: 150,
      sortable: false,
      filterable: false,
      type: "singleSelect" as const,
      valueGetter: (_: unknown, data: DriverRequestResponse) => {
        return `${data.activity.start} - ${data.activity.end}`;
      },
    },
    {
      field: "notes",
      headerName: "Obs. do Motorista",
      width: 150,
      sortable: false,
      filterable: false,
      type: "singleSelect" as const,
    },
    {
      field: "createAt",
      headerName: "Data do pedido do Motorista",
      width: 150,
      sortable: false,
      filterable: false,
      type: "singleSelect" as const,
      valueFormatter: (value: string) =>
        value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "",
    },

    {
      field: "action",
      headerName: "Ações",
      width: 200,
      type: "singleSelect" as const,
      renderCell: (row) => {
        const flgStatus = row.row.flgStatus;

        return (
          <div>
            {flgStatus}
            {!flgStatus && (
              <>
                <Button
                  onClick={() => handleChangeStatus(row.id, "A")}
                  variant="contained"
                  color="success"
                >
                  Aprovar
                </Button>
                <Button
                  onClick={() => handleChangeStatus(row.id, "D")}
                  variant="contained"
                  color="error"
                >
                  Negar
                </Button>
              </>
            )}

            <Button variant="contained" color="info">
              Sem envio de atualização{" "}
            </Button>
          </div>
        );
      },
    },
  ].map((column) => ({ ...column, headerClassName: headerClass }));
};

export default {
  columns,
};
