import { DriverRequestResponse } from "@/services/query/drivers";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import config from "../configs";
import { useDriverReleaseMutation } from "@/services/mutation/drivers";
interface Params {
  data?: DriverRequestResponse[];
}

const DriverReleaseGrid = ({ data }: Params) => {
  const { mutateAsync, isPending } = useDriverReleaseMutation();

  const handleChangeStatus = async (id: string, status: string) => {
    console.log("id", id);
    console.log("status", status);
    const response = await mutateAsync({
      driverRequestId: id,
      flgStatus: status,
    });
    console.log("response", response);
  };

  const columns = config.columns({ handleChangeStatus });

  return (
    <DataGrid
      sx={{
        width: "100%",
        "& .blueColumnHeaders ": {
          backgroundColor: "#24438F",
          color: "white",
        },
      }}
      rows={data}
      localeText={{
        noRowsLabel: "Nenhum registro encontrado",
        columnMenuHideColumn: "Ocultar coluna",
        columnsManagementShowHideAllText: "Mostrar/Ocultar todas",
        columnMenuManageColumns: "Gerenciar colunas",
        MuiTablePagination: {
          labelRowsPerPage: "Registros por página",
          labelDisplayedRows: ({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`,
        },
      }}
      columns={columns}
      // onPaginationModelChange={(params) => {
      //   setCurrentPage(params.page);
      // }}
      paginationMode="server"
      rowCount={data?.length || 0}
      pageSizeOptions={[10]}
      density="compact"
    />
  );
};

export default DriverReleaseGrid;
