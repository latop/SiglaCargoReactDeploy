import { DriverRequestResponse } from "@/services/query/drivers";
import { DataGrid } from "@mui/x-data-grid";
import config from "../configs";
interface Params {
  page: number;
  totalRecords: number;
  data?: DriverRequestResponse[];
  handleChangeStatus: (id: string, status: string) => void;
  handlePageChange: (page: number) => void;
}

const DriverReleaseGrid = ({
  data,
  page,
  totalRecords,
  handleChangeStatus,
  handlePageChange,
}: Params) => {
  const columns = config.columns({ handleChangeStatus });
  console.log("data", data);
  return (
    <DataGrid
      sx={{
        marginTop: "20px",
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
      initialState={{
        pagination: {
          paginationModel: { page: page - 1, pageSize: 10 },
        },
      }}
      onPaginationModelChange={(params) => {
        handlePageChange(params.page);
      }}
      paginationMode="server"
      rowCount={totalRecords}
      pageSizeOptions={[10]}
      density="compact"
    />
  );
};

export default DriverReleaseGrid;
