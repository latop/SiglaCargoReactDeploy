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

import { useRouter } from "next/navigation";
import { BurgerMenuGroup } from "../BurgerMenuGroup";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BarChartIcon from "@mui/icons-material/BarChart";
import { GroupmentType, routes } from "./routes";

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
              <BurgerMenuGroup
                routes={routes}
                groupment="register"
                name="Cadastros"
                router={router}
                icon={PlaylistAddIcon}
                expanded={open.register}
                onToggle={() => handleMenuOpen({ group: "register" })}
              />
              <BurgerMenuGroup
                routes={routes}
                groupment="coordination"
                name="Coordenação de Viagens"
                router={router}
                icon={AltRouteIcon}
                expanded={open.coordination}
                onToggle={() => handleMenuOpen({ group: "coordination" })}
              />
              <BurgerMenuGroup
                routes={routes}
                groupment="driver-schedule"
                name="Escala de Motoristas"
                router={router}
                icon={CalendarMonthIcon}
                expanded={open["driver-schedule"]}
                onToggle={() => handleMenuOpen({ group: "driver-schedule" })}
              />
              <BurgerMenuGroup
                routes={routes}
                groupment="planning"
                name="Planejamento"
                router={router}
                icon={AutoGraphIcon}
                expanded={open.planning}
                onToggle={() => handleMenuOpen({ group: "planning" })}
              />
              <BurgerMenuGroup
                routes={routes}
                groupment="reports"
                name="Relatórios"
                router={router}
                icon={BarChartIcon}
                expanded={open.reports}
                onToggle={() => handleMenuOpen({ group: "reports" })}
              />
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
