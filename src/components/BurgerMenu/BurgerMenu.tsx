import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

interface BurgerMenuProps {
  isOpen: boolean;
  toggleDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

interface RouteItem {
  text: string;
  icon: React.ReactElement;
  path: string;
}

const routes: RouteItem[] = [
  { text: "Home", icon: <HomeIcon />, path: "/dashboard" },
  {
    text: "Escala de Motoristas",
    icon: <LocalShippingIcon />,
    path: "/drivers-schedule",
  },
];

export function BurgerMenu({ isOpen, toggleDrawer }: BurgerMenuProps) {
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <List>
        {routes.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <Link href={path} passHref style={{ width: "100%" }}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
