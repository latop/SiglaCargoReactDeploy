import React from "react";
import { Box } from "@mui/material";

export function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>{children}</Box>
  );
}
