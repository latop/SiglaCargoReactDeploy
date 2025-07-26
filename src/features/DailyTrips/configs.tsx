import { GridColDef } from "@mui/x-data-grid";

const title = "Viagens diárias";

const headerClass = "blueColumnHeaders";

const columns: GridColDef[] = [
  {
    field: "tripDate",
    headerName: "Data da viagem",
    width: 150,
    sortable: false,
    filterable: false,
  },
  {
    field: "sto",
    headerName: "Sto",
    width: 200,
    sortable: false,
    filterable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    sortable: false,
    filterable: false,
  },
  {
    field: "origin",
    headerName: "Origem",
    width: 140,
    sortable: false,
    filterable: false,
  },
  {
    field: "destination",
    headerName: "Destino",
    width: 140,
    sortable: false,
    filterable: false,
  },
  {
    field: "startPlanned",
    headerName: "Saída Prevista",
    width: 150,
    sortable: false,
    filterable: false,
  },
  {
    field: "endPlanned",
    headerName: "Chegada Prevista",
    width: 150,
    sortable: false,
    filterable: false,
  },
  {
    field: "tripType",
    headerName: "Tipo de viagem",
    width: 120,
    sortable: false,
    filterable: false,
  },
  {
    field: "licensePlate",
    headerName: "Placa",
    width: 120,
    sortable: false,
    filterable: false,
    valueFormatter: (value: string | null) => value || "-",
  },
  {
    field: "drivers",
    headerName: "Motoristas",
    width: 150,
    sortable: false,
    filterable: false,
  },
].map((column) => ({ ...column, headerClassName: headerClass }));

export default {
  title,
  columns,
};
