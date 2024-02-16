"use client";

import React, { useState } from "react";
import { AppBar as AppBarBase, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BurgerMenu } from "../BurgerMenu";

export function AppBar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <>
      <BurgerMenu toggleDrawer={toggleDrawer} isOpen={open} />
      <AppBarBase>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          {children}
        </Toolbar>
      </AppBarBase>
    </>
  );
}
