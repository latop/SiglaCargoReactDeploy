import { DriverRequestResponse } from "@/services/query/drivers";
import { DataGrid } from "@mui/x-data-grid";
import config from "../configs";
interface Params {
  data?: DriverRequestResponse[];
  handleChangeStatus: (id: string, status: string) => void;
}

const DriverReleaseGrid = ({ data, handleChangeStatus }: Params) => {
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
