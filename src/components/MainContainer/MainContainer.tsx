/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CircularProgress, Box } from "@mui/material";
import { Container } from "./MainContainer.styles";

export function MainContainer({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

function Content({
  children,
  loading,
  sx,
}: {
  children: React.ReactNode;
  loading: boolean;
  sx?: any;
}) {
  return (
    <Box
      sx={{
        padding: "0 20px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        position: "relative",
        ...sx,
      }}
    >
      {loading && <CircularProgress sx={{ margin: "auto" }} />}
      {!loading && children}
    </Box>
  );
}

MainContainer.Content = Content;
