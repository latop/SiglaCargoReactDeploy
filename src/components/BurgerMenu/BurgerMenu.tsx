import React from "react";
import {
  Drawer,
  List,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { BurgerMenuGroup } from "../BurgerMenuGroup";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BarChartIcon from "@mui/icons-material/BarChart";

interface BurgerMenuProps {
  isOpen: boolean;
  toggleDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}
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

const routes: RouteItem[] = [
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

export function BurgerMenu({ isOpen, toggleDrawer }: BurgerMenuProps) {
  const router = useRouter();

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        sx={{ padding: "20px 0 10px" }}
      >
        <img src="/pepsico-logo.png" width={144} height={40} alt="PepsiCo" />
      </Box>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {routes
          .filter(({ group }) => group === undefined)
          .map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <Link
                href={path}
                passHref
                style={{ width: "100%" }}
                onMouseEnter={() => {
                  void router.prefetch(path);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        <BurgerMenuGroup
          routes={routes}
          groupment="register"
          name="Cadastros"
          router={router}
          icon={PlaylistAddIcon}
        />
        <BurgerMenuGroup
          routes={routes}
          groupment="coordination"
          name="Coordenação de Viagens"
          router={router}
          icon={AltRouteIcon}
        />
        <BurgerMenuGroup
          routes={routes}
          groupment="driver-schedule"
          name="Escala de Motoristas"
          router={router}
          icon={CalendarMonthIcon}
        />
        <BurgerMenuGroup
          routes={routes}
          groupment="planning"
          name="Planejamento"
          router={router}
          icon={AutoGraphIcon}
        />
        <BurgerMenuGroup
          routes={routes}
          groupment="reports"
          name="Relatórios"
          router={router}
          icon={BarChartIcon}
        />
      </List>
    </Drawer>
  );
}
