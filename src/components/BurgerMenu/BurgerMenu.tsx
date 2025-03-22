import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Button,
  Tooltip,
  styled,
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

const ButtonStyled = styled(Button)`
  transition: all 0.2s ease-in-out;
  background-color: transparent;
  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
`;

const BoxStyled = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: transparent !important;
`;

interface BurgerMenuProps {
  isOpen: boolean;
  toggleDrawer?: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  menuGroupsOpen?: Record<GroupmentType, boolean>;
  setMenuGroupsOpen?: React.Dispatch<
    React.SetStateAction<Record<GroupmentType, boolean>>
  >;
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

const groupConfigs = [
  {
    groupment: "register",
    name: "Cadastros",
    icon: PlaylistAddIcon,
  },
  {
    groupment: "coordination",
    name: "Coordenação de Viagens",
    icon: AltRouteIcon,
  },
  {
    groupment: "driver-schedule",
    name: "Escala de Motoristas",
    icon: CalendarMonthIcon,
  },
  {
    groupment: "planning",
    name: "Planejamento",
    icon: AutoGraphIcon,
  },
  {
    groupment: "reports",
    name: "Relatórios",
    icon: BarChartIcon,
  },
] satisfies Array<{
  groupment: GroupmentType;
  name: string;
  icon: React.ElementType;
}>;

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

const STORAGE_KEY = "burgerMenuOpenGroups";

const initialState: Record<GroupmentType, boolean> = {
  register: false,
  coordination: false,
  "driver-schedule": false,
  planning: false,
  reports: false,
};

const getInitialOpenState = (): Record<GroupmentType, boolean> => {
  if (typeof window === "undefined") return initialState;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialState;
};

const saveOpenState = (state: Record<GroupmentType, boolean>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export function BurgerMenu({ isOpen, toggleDrawer }: BurgerMenuProps) {
  const router = useRouter();

  const [open, setOpen] = useState(initialState);

  const handleMenuOpen = ({ group }: { group: GroupmentType }) => {
    setOpen((prev) => {
      const newState = { ...prev, [group]: !prev[group] };
      saveOpenState(newState);
      return newState;
    });
  };

  const handleMenuCloseAll = () => {
    setOpen(initialState);
    saveOpenState(initialState);
  };

  useEffect(() => {
    const stored = getInitialOpenState();
    setOpen(stored);
  }, []);

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer?.(false)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            sx={{ padding: "20px 0 10px" }}
          >
            <img
              src="/pepsico-logo.png"
              width={144}
              height={40}
              alt="PepsiCo"
            />
          </Box>
          <Box
            sx={{
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <List>
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

              {groupConfigs.map(({ groupment, name, icon: Icon }) => (
                <BurgerMenuGroup
                  key={groupment}
                  routes={routes}
                  groupment={groupment}
                  name={name}
                  router={router}
                  icon={Icon}
                  expanded={open[groupment]}
                  onToggle={() => handleMenuOpen({ group: groupment })}
                />
              ))}
            </List>
          </Box>
        </Box>

        <BoxStyled>
          <Tooltip title="Fecha todos os menus" placement="top">
            <ButtonStyled variant="text" onClick={() => handleMenuCloseAll()}>
              Fechar abas
            </ButtonStyled>
          </Tooltip>
        </BoxStyled>
      </Box>
    </Drawer>
  );
}
