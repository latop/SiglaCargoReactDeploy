import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HomeIcon from "@mui/icons-material/Home";
import { TbSteeringWheel } from "react-icons/tb";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import MovingIcon from "@mui/icons-material/Moving";
import { BiTrip } from "react-icons/bi";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import RouteIcon from "@mui/icons-material/Route";
import PublishIcon from "@mui/icons-material/Publish";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CategoryIcon from "@mui/icons-material/Category";

export type GroupmentType =
  | "register"
  | "coordination"
  | "driver-schedule"
  | "planning"
  | "reports";

export interface RouteItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  group?: GroupmentType;
}

export const routes: RouteItem[] = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  { text: "Rotas", icon: <RouteIcon />, path: "/lines", group: "register" },
  {
    text: "Motoristas",
    icon: <TbSteeringWheel />,
    path: "/drivers",
    group: "register",
  },
  {
    text: "Caminhão",
    icon: <LocalShippingIcon />,
    path: "/trucks",
    group: "register",
  },
  {
    text: "Localização",
    icon: <AddLocationAltIcon />,
    path: "/locations",
    group: "register",
  },
  {
    text: "Setor Responsável",
    icon: <PersonSearchIcon />,
    path: "/responsible-sector",
    group: "register",
  },
  {
    text: "Justificativas",
    icon: <EditNoteIcon />,
    path: "/justifications",
    group: "register",
  },
  {
    text: "Tipo de Atividade",
    icon: <CategoryIcon />,
    path: "/activity-types",
    group: "register",
  },

  // Coordenação de Viagens
  {
    text: "Coordenação de viagens",
    icon: <TbSteeringWheel />,
    path: "/daily-trips-schedule",
    group: "coordination",
  },
  {
    text: "Partidas e chegadas",
    icon: <SwapVertIcon />,
    path: "/departures-and-arrivals",
    group: "coordination",
  },
  {
    text: "Viagens diárias",
    icon: <MovingIcon />,
    path: "/daily-trips",
    group: "coordination",
  },

  // Escala de Motoristas
  {
    text: "Solicitação de Motoristas",
    icon: <LocalShippingIcon />,
    path: "/drivers-request",
    group: "driver-schedule",
  },
  {
    text: "Escala de Motoristas",
    icon: <LocalShippingIcon />,
    path: "/drivers-schedule",
    group: "driver-schedule",
  },
  {
    text: "Liberação de motoristas",
    icon: <NoCrashIcon />,
    path: "/release-driver",
    group: "driver-schedule",
  },
  {
    text: "Publicação",
    icon: <PublishIcon />,
    path: "/publish-journey",
    group: "driver-schedule",
  },

  // Planejamento
  {
    text: "Planejamento de veículos",
    icon: <TbSteeringWheel />,
    path: "/vehicle-planning",
    group: "planning",
  },
  { text: "Cenários", icon: <BiTrip />, path: "/scenarios", group: "planning" },
  {
    text: "Importação de viagens",
    icon: <UploadFileIcon />,
    path: "/import-trips",
    group: "planning",
  },
  {
    text: "Otimizacão de viagens",
    icon: <SettingsSuggestIcon />,
    path: "/trip-optimization",
    group: "planning",
  },

  // Relatórios
  {
    text: "Relatórios",
    icon: <AssignmentIcon />,
    path: "/reports",
    group: "reports",
  },
];
